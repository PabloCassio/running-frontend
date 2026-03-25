import { render, screen, act } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from '../components/common/AuthProvider'

vi.mock('../api/auth.api', () => ({
  authApi: {
    getProfile: vi.fn().mockRejectedValue(new Error('not authenticated')),
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    updateProfile: vi.fn(),
    changePassword: vi.fn(),
    refreshToken: vi.fn(),
  },
  getCurrentUser: vi.fn().mockReturnValue(null),
  clearUserData: vi.fn(),
  setUserData: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() },
}))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}

const TestConsumer = () => {
  const auth = useAuth()
  return (
    <div>
      <span data-testid="has-change-password">{typeof auth.changePassword}</span>
    </div>
  )
}

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('exposes changePassword function in context', async () => {
    const Wrapper = createWrapper()
    await act(async () => {
      render(
        <Wrapper>
          <TestConsumer />
        </Wrapper>
      )
    })
    expect(screen.getByTestId('has-change-password').textContent).toBe('function')
  })

  it('calls authApi.changePassword with correct args', async () => {
    const { authApi } = await import('../api/auth.api')
    const mockChangePassword = vi.fn().mockResolvedValue({ data: {} })
    vi.mocked(authApi.changePassword).mockImplementation(mockChangePassword)

    const Wrapper = createWrapper()
    let changePasswordFn: ((data: { currentPassword: string; newPassword: string }) => Promise<void>) | undefined

    const Capture = () => {
      const auth = useAuth()
      changePasswordFn = auth.changePassword
      return null
    }

    await act(async () => {
      render(
        <Wrapper>
          <Capture />
        </Wrapper>
      )
    })

    await act(async () => {
      await changePasswordFn!({ currentPassword: 'old123', newPassword: 'new456' })
    })

    expect(mockChangePassword).toHaveBeenCalledWith({
      currentPassword: 'old123',
      newPassword: 'new456',
    })
  })
})
