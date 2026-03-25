import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../components/common/AuthProvider'
import { registerSchema } from '../../utils/validators'
import { RegisterRequest } from '../../types'

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      username: '',
      birthDate: '',
      country: '',
      city: '',
    },
  })

  const password = watch('password')

  const onSubmit = async (data: RegisterRequest) => {
    setIsLoading(true)
    try {
      await registerUser(data)
      navigate('/dashboard')
    } catch (error: any) {
      // Handle specific error cases
      if (error.response?.data?.error?.code === 'EMAIL_EXISTS') {
        setError('email', {
          type: 'manual',
          message: 'Este email já está em uso.',
        })
      } else if (error.response?.data?.error?.code === 'USERNAME_EXISTS') {
        setError('username', {
          type: 'manual',
          message: 'Este username já está em uso.',
        })
      } else if (error.response?.data?.error?.code === 'VALIDATION_ERROR') {
        // Validation errors are already handled by zod
        const validationErrors = error.response.data.error.details
        validationErrors?.forEach((err: any) => {
          setError(err.path[0], {
            type: 'manual',
            message: err.msg,
          })
        })
      } else {
        setError('root', {
          type: 'manual',
          message: 'Erro ao criar conta. Tente novamente.',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="bg-primary-500 rounded-full p-3">
              <svg
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Maratona Ao Vivo
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Competições de running em tempo real
          </p>
          <h3 className="mt-8 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
            Crie sua conta
          </h3>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            <div className="rounded-md bg-danger-50 dark:bg-danger-900/20 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-danger-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-danger-800 dark:text-danger-200">
                    {errors.root.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="firstName" className="label">
                  Nome
                </label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  className={`input ${errors.firstName ? 'input-error' : ''}`}
                  placeholder="João"
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="label">
                  Sobrenome
                </label>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  className={`input ${errors.lastName ? 'input-error' : ''}`}
                  placeholder="Silva"
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                className={`input ${errors.username ? 'input-error' : ''}`}
                placeholder="joaosilva"
                {...register('username')}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">
                  {errors.username.message}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Pode conter letras, números, pontos, underscores e hífens
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`input ${errors.email ? 'input-error' : ''}`}
                placeholder="seu@email.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="label">
                Senha
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className={`input ${errors.password ? 'input-error' : ''}`}
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">
                  {errors.password.message}
                </p>
              )}
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  A senha deve conter:
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <li className={`flex items-center ${password?.length >= 8 ? 'text-success-600 dark:text-success-400' : ''}`}>
                    <svg
                      className={`h-3 w-3 mr-1 ${password?.length >= 8 ? 'text-success-500' : 'text-gray-400'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={password?.length >= 8 ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"}
                      />
                    </svg>
                    Pelo menos 8 caracteres
                  </li>
                  <li className={`flex items-center ${/[a-z]/.test(password || '') ? 'text-success-600 dark:text-success-400' : ''}`}>
                    <svg
                      className={`h-3 w-3 mr-1 ${/[a-z]/.test(password || '') ? 'text-success-500' : 'text-gray-400'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={/[a-z]/.test(password || '') ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"}
                      />
                    </svg>
                    Pelo menos uma letra minúscula
                  </li>
                  <li className={`flex items-center ${/[A-Z]/.test(password || '') ? 'text-success-600 dark:text-success-400' : ''}`}>
                    <svg
                      className={`h-3 w-3 mr-1 ${/[A-Z]/.test(password || '') ? 'text-success-500' : 'text-gray-400'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={/[A-Z]/.test(password || '') ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"}
                      />
                    </svg>
                    Pelo menos uma letra maiúscula
                  </li>
                  <li className={`flex items-center ${/\d/.test(password || '') ? 'text-success-600 dark:text-success-400' : ''}`}>
                    <svg
                      className={`h-3 w-3 mr-1 ${/\d/.test(password || '') ? 'text-success-500' : 'text-gray-400'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={/\d/.test(password || '') ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"}
                      />
                    </svg>
                    Pelo menos um número
                  </li>
                </ul>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="birthDate" className="label">
                Data de Nascimento
              </label>
              <input
                id="birthDate"
                type="date"
                className={`input ${errors.birthDate ? 'input-error' : ''}`}
                {...register('birthDate')}
              />
              {errors.birthDate && (
                <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">
                  {errors.birthDate.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="country" className="label">
                  País
                </label>
                <input
                  id="country"
                  type="text"
                  autoComplete="country"
                  className={`input ${errors.country ? 'input-error' : ''}`}
                  placeholder="Brasil"
                  {...register('country')}
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="city" className="label">
                  Cidade
                </label>
                <input
                  id="city"
                  type="text"
                  autoComplete="address-level2"
                  className={`input ${errors.city ? 'input-error' : ''}`}
                  placeholder="São Paulo"
                  {...register('city')}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Eu concordo com os{' '}
              <Link
                to="/terms"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Termos de Serviço
              </Link>{' '}
              e{' '}
              <Link
                to="/privacy"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Política de Privacidade
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Criando conta...
                </>
              ) : (
                'Criar conta'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Já tem uma conta?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Faça login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register