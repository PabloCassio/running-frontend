import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import toast from 'react-hot-toast'
import { ApiError } from '../types/api.types'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Handle 401 Unauthorized (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        // Try to refresh token
        const response = await axios.post('/api/auth/refresh-token', {
          refreshToken,
        })

        const { token, refreshToken: newRefreshToken } = response.data.data

        // Update tokens in localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', newRefreshToken)

        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${token}`

        // Retry original request
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login'
          toast.error('Sessão expirada. Por favor, faça login novamente.')
        }
        return Promise.reject(refreshError)
      }
    }

    // Handle other errors
    if (error.response) {
      const apiError = error.response.data.error
      const errorMessage = apiError.message || 'Ocorreu um erro inesperado.'

      // Don't show toast for validation errors (they're handled in forms)
      if (apiError.code !== 'VALIDATION_ERROR') {
        toast.error(errorMessage)
      }

      // Log error for debugging
      console.error('API Error:', {
        code: apiError.code,
        message: apiError.message,
        status: error.response.status,
        url: error.config?.url,
      })
    } else if (error.request) {
      // Network error
      toast.error('Erro de conexão. Verifique sua internet e tente novamente.')
      console.error('Network Error:', error.request)
    } else {
      // Request setup error
      console.error('Request Error:', error.message)
    }

    return Promise.reject(error)
  }
)

export default api