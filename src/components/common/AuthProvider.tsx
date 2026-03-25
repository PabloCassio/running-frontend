import React, { createContext, useContext, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi, getCurrentUser, clearUserData, setUserData } from '../../api/auth.api'
import { User } from '../../types'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: any) => Promise<void>
  changePassword: (data: { currentPassword: string; newPassword: string }) => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getCurrentUser())
  const queryClient = useQueryClient()

  // Fetch user profile if token exists
  const { isLoading, refetch } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      try {
        const response = await authApi.getProfile()
        const userData = response.data.user
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return userData
      } catch (error) {
        // If fetching profile fails, clear user data
        clearUserData()
        setUser(null)
        throw error
      }
    },
    enabled: !!localStorage.getItem('token') && !user,
    retry: false,
  })

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password })
      const { user: userData, token, refreshToken } = response.data
      
      setUserData(userData, { token, refreshToken })
      setUser(userData)
      
      toast.success('Login realizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.')
      throw error
    }
  }

  const register = async (data: any) => {
    try {
      const response = await authApi.register(data)
      const { user: userData, token, refreshToken } = response.data
      
      setUserData(userData, { token, refreshToken })
      setUser(userData)
      
      toast.success('Conta criada com sucesso!')
    } catch (error) {
      toast.error('Erro ao criar conta. Tente novamente.')
      throw error
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      // Silently fail if logout API call fails
      console.error('Logout API error:', error)
    } finally {
      clearUserData()
      setUser(null)
      queryClient.clear()
      toast.success('Logout realizado com sucesso!')
    }
  }

  const updateProfile = async (data: any) => {
    try {
      const response = await authApi.updateProfile(data)
      const updatedUser = response.data.user
      
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar perfil.')
      throw error
    }
  }

  const changePassword = async (data: { currentPassword: string; newPassword: string }) => {
    try {
      await authApi.changePassword(data)
      toast.success('Senha alterada com sucesso!')
    } catch (error) {
      toast.error('Erro ao alterar senha.')
      throw error
    }
  }

  const refreshUser = async () => {
    await refetch()
  }

  // Check token expiration periodically
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const expirationTime = payload.exp * 1000
        const currentTime = Date.now()
        const timeUntilExpiration = expirationTime - currentTime

        // If token expires in less than 5 minutes, refresh it
        if (timeUntilExpiration < 5 * 60 * 1000 && timeUntilExpiration > 0) {
          const refreshToken = localStorage.getItem('refreshToken')
          if (refreshToken) {
            authApi.refreshToken({ refreshToken })
              .then((response) => {
                const { token: newToken, refreshToken: newRefreshToken } = response.data
                localStorage.setItem('token', newToken)
                localStorage.setItem('refreshToken', newRefreshToken)
              })
              .catch((error) => {
                console.error('Failed to refresh token:', error)
              })
          }
        }
      } catch (error) {
        console.error('Error checking token expiration:', error)
      }
    }

    // Check every minute
    const interval = setInterval(checkTokenExpiration, 60 * 1000)
    checkTokenExpiration() // Initial check

    return () => clearInterval(interval)
  }, [])

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}