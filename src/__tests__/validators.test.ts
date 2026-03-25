import { describe, it, expect } from 'vitest'
import { registerSchema, usernameSchema } from '../utils/validators'

describe('usernameSchema', () => {
  it('accepts valid username with letters, numbers and underscore', () => {
    expect(usernameSchema.safeParse('joao_silva123').success).toBe(true)
  })

  it('rejects username with dot', () => {
    expect(usernameSchema.safeParse('joao.silva').success).toBe(false)
  })

  it('rejects username with hyphen', () => {
    expect(usernameSchema.safeParse('joao-silva').success).toBe(false)
  })
})

describe('registerSchema', () => {
  const validBase = {
    email: 'test@example.com',
    password: 'Password1',
    firstName: 'João',
    lastName: 'Silva',
    username: 'joaosilva',
  }

  it('accepts valid data when confirmPassword matches password', () => {
    const result = registerSchema.safeParse({
      ...validBase,
      confirmPassword: 'Password1',
    })
    expect(result.success).toBe(true)
  })

  it('rejects when confirmPassword differs from password', () => {
    const result = registerSchema.safeParse({
      ...validBase,
      confirmPassword: 'DifferentPass1',
    })
    expect(result.success).toBe(false)
  })

  it('rejects when confirmPassword is missing', () => {
    const result = registerSchema.safeParse(validBase)
    expect(result.success).toBe(false)
  })
})
