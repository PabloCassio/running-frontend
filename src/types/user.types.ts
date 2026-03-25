export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  birthDate?: string
  country?: string
  city?: string
  bio?: string
  avatarUrl?: string
  isActive: boolean
  role: 'user' | 'moderator' | 'admin'
  lastLogin?: string
  createdAt: string
  updatedAt: string
}

export interface UserStats {
  totalRaces: number
  completedRaces: number
  totalDistance: number
  bestTime?: number
  averagePace?: number
  wins: number
  podiumFinishes: number
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: string
}

export interface UserPublicProfile {
  id: string
  username: string
  firstName: string
  lastName: string
  avatarUrl?: string
  country?: string
  city?: string
  bio?: string
  stats: UserStats
  createdAt: string
}

export interface AuthTokens {
  token: string
  refreshToken: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  username: string
  birthDate?: string
  country?: string
  city?: string
}

export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  username?: string
  birthDate?: string
  country?: string
  city?: string
  bio?: string
  avatarUrl?: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}