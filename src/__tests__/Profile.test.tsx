import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Profile from '../pages/Profile/Profile'

const mockUser = {
  id: '1',
  email: 'test@test.com',
  username: 'testuser',
  firstName: 'João',
  lastName: 'Silva',
  bio: 'Corredor amador',
  country: 'Brasil',
  city: 'São Paulo',
  isActive: true,
  role: 'user' as const,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  totalRaces: 10,
  totalDistance: 150.5,
  wins: 2,
  personalBest5k: 1500,
  personalBest10k: 3200,
  personalBestHalfMarathon: 7200,
  personalBestMarathon: 15600,
  isVerified: true,
}

vi.mock('../components/common/AuthProvider', () => ({
  useAuth: () => ({ user: mockUser }),
}))

const renderProfile = () =>
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  )

describe('Profile page', () => {
  it('renders user full name and username', () => {
    renderProfile()
    expect(screen.getByText('João Silva')).toBeTruthy()
    expect(screen.getByText('@testuser')).toBeTruthy()
  })

  it('renders user bio', () => {
    renderProfile()
    expect(screen.getByText('Corredor amador')).toBeTruthy()
  })

  it('renders stats section with totalRaces, totalDistance and wins', () => {
    renderProfile()
    expect(screen.getByText('10')).toBeTruthy()
    expect(screen.getByText('2')).toBeTruthy()
  })

  it('renders Edit Profile link pointing to /settings', () => {
    renderProfile()
    const link = screen.getByRole('link', { name: /editar perfil/i })
    expect(link.getAttribute('href')).toBe('/settings')
  })
})
