export interface ApiResponse<T = any> {
  message: string
  data: T
}

export interface ApiError {
  error: {
    message: string
    code: string
    details?: any[]
    status?: number
  }
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}