import api from './axios.config'
import {
  ApiResponse,
  AuthTokens,
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  RefreshTokenRequest,
  User,
} from '../types'

export const authApi = {
  // Register new user
  register: async (data: RegisterRequest): Promise<ApiResponse<{ user: User; token: string; refreshToken: string }>> => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  // Login user
  login: async (data: LoginRequest): Promise<ApiResponse<{ user: User; token: string; refreshToken: string }>> => {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  // Refresh token
  refreshToken: async (data: RefreshTokenRequest): Promise<ApiResponse<AuthTokens>> => {
    const response = await api.post('/auth/refresh-token', data)
    return response.data
  },

  // Get current user profile
  getProfile: async (): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.get('/auth/profile')
    return response.data
  },

  // Update user profile
  updateProfile: async (data: UpdateProfileRequest): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.put('/auth/profile', data)
    return response.data
  },

  // Change password
  changePassword: async (data: ChangePasswordRequest): Promise<ApiResponse> => {
    const response = await api.put('/auth/change-password', data)
    return response.data
  },

  // Logout (client-side operation)
  logout: async (): Promise<ApiResponse> => {
    const response = await api.post('/auth/logout')
    return response.data
  },

  // Health check
  health: async (): Promise<ApiResponse> => {
    const response = await api.get('/auth/health')
    return response.data
  },
}

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('token') !== null
}

// Helper function to get current user from localStorage
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

// Helper function to set user data in localStorage
export const setUserData = (user: User, tokens: AuthTokens): void => {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', tokens.token)
  localStorage.setItem('refreshToken', tokens.refreshToken)
}

// Helper function to clear user data from localStorage
export const clearUserData = (): void => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
}

// Helper function to get auth headers
export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}