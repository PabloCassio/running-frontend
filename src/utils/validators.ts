import { z } from 'zod'

// Common validation schemas
export const emailSchema = z
  .string()
  .min(1, 'Email é obrigatório')
  .email('Email inválido')
  .toLowerCase()

export const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter pelo menos 8 caracteres')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número')

export const usernameSchema = z
  .string()
  .min(3, 'Username deve ter pelo menos 3 caracteres')
  .max(30, 'Username não pode exceder 30 caracteres')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username pode conter apenas letras, números e underscores')

export const nameSchema = z
  .string()
  .min(1, 'Nome é obrigatório')
  .max(50, 'Nome não pode exceder 50 caracteres')

export const birthDateSchema = z
  .string()
  .optional()
  .refine((date) => {
    if (!date) return true
    const birthDate = new Date(date)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 13
    }
    return age >= 13
  }, 'Você deve ter pelo menos 13 anos')

// Login validation schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
})

// Register validation schema
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  firstName: nameSchema,
  lastName: nameSchema,
  username: usernameSchema,
  birthDate: birthDateSchema,
  country: z.string().max(100, 'País não pode exceder 100 caracteres').optional(),
  city: z.string().max(100, 'Cidade não pode exceder 100 caracteres').optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})

// Race creation validation schema
export const createRaceSchema = z.object({
  name: z.string().min(1, 'Nome da corrida é obrigatório').max(100, 'Nome não pode exceder 100 caracteres'),
  description: z.string().max(1000, 'Descrição não pode exceder 1000 caracteres').optional(),
  distance: z.number().min(0.1, 'Distância deve ser um número positivo (em quilômetros)'),
  startTime: z.string().refine((date) => {
    const startTime = new Date(date)
    const now = new Date()
    return startTime > now
  }, 'Horário de início deve ser no futuro'),
  maxParticipants: z.number().int().min(1, 'Número máximo de participantes deve ser um inteiro positivo').optional(),
  type: z.enum(['public', 'private', 'invite-only']).optional().default('public'),
  entryFee: z.number().min(0, 'Taxa de inscrição deve ser um número não negativo').optional(),
  currency: z.string().length(3, 'Moeda deve ser um código de 3 letras (ex: BRL, USD)').optional(),
  location: z.string().max(200, 'Localização não pode exceder 200 caracteres').optional(),
  latitude: z.number().min(-90).max(90, 'Latitude deve estar entre -90 e 90').optional(),
  longitude: z.number().min(-180).max(180, 'Longitude deve estar entre -180 e 180').optional(),
  timezone: z.string().max(50, 'Fuso horário não pode exceder 50 caracteres').optional(),
  bannerImage: z.string().url('URL da imagem do banner inválida').optional(),
})

// Profile update validation schema
export const updateProfileSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  username: usernameSchema.optional(),
  birthDate: birthDateSchema,
  country: z.string().max(100, 'País não pode exceder 100 caracteres').optional(),
  city: z.string().max(100, 'Cidade não pode exceder 100 caracteres').optional(),
  bio: z.string().max(500, 'Bio não pode exceder 500 caracteres').optional(),
  avatarUrl: z.string().url('URL do avatar inválida').optional(),
})

// Change password validation schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: passwordSchema,
})

// Helper function to format validation errors
export const formatValidationErrors = (errors: z.ZodError) => {
  return errors.errors.reduce((acc, error) => {
    const path = error.path.join('.')
    acc[path] = error.message
    return acc
  }, {} as Record<string, string>)
}

// Helper function to validate form data
export const validateFormData = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  try {
    return { success: true, data: schema.parse(data) } as const
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatValidationErrors(error) } as const
    }
    throw error
  }
}