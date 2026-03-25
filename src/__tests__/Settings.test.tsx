import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Settings from '../pages/Settings/Settings'

const mockUser = {
  id: '1',
  email: 'test@test.com',
  username: 'testuser',
  firstName: 'João',
  lastName: 'Silva',
  bio: 'Corredor',
  country: 'Brasil',
  city: 'SP',
  isActive: true,
  role: 'user' as const,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
}

vi.mock('../components/common/AuthProvider', () => ({
  useAuth: () => ({
    user: mockUser,
    updateProfile: vi.fn(),
    changePassword: vi.fn(),
  }),
}))

vi.mock('../components/common/ThemeProvider', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
}))

vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() },
}))

const renderSettings = () =>
  render(
    <MemoryRouter>
      <Settings />
    </MemoryRouter>
  )

describe('Settings page', () => {
  beforeEach(() => vi.clearAllMocks())

  describe('Perfil tab', () => {
    it('renders profile form fields by default', () => {
      renderSettings()
      expect(screen.getByLabelText(/primeiro nome/i)).toBeTruthy()
      expect(screen.getByLabelText(/sobrenome/i)).toBeTruthy()
      expect(screen.getByLabelText(/username/i)).toBeTruthy()
      expect(screen.getByLabelText(/bio/i)).toBeTruthy()
    })
  })

  describe('Segurança tab', () => {
    it('renders password fields when Segurança tab is clicked', () => {
      renderSettings()
      fireEvent.click(screen.getByRole('button', { name: /segurança/i }))
      expect(screen.getByLabelText('Senha Atual')).toBeTruthy()
      expect(screen.getByLabelText('Nova Senha')).toBeTruthy()
      expect(screen.getByLabelText('Confirmar Nova Senha')).toBeTruthy()
    })
  })

  describe('Aparência tab', () => {
    it('renders theme toggle when Aparência tab is clicked', () => {
      renderSettings()
      fireEvent.click(screen.getByRole('button', { name: /aparência/i }))
      expect(screen.getByText(/modo escuro/i)).toBeTruthy()
    })
  })
})
