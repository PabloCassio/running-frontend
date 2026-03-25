import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Trophy, Activity, Clock, Settings, Award } from 'lucide-react'
import { useAuth } from '../../components/common/AuthProvider'

const formatTime = (seconds: number | null | undefined): string => {
  if (!seconds) return '—'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}h ${m}m ${s}s`
  return `${m}m ${s}s`
}

const formatDistance = (km: number): string => {
  return km >= 1000 ? `${(km / 1000).toFixed(1)}k km` : `${km.toFixed(1)} km`
}

const Profile: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400">Usuário não encontrado.</p>
      </div>
    )
  }

  const initials = [user.firstName, user.lastName]
    .filter(Boolean)
    .map((n) => n![0].toUpperCase())
    .join('') || user.username[0].toUpperCase()

  const location = [user.city, user.country].filter(Boolean).join(', ')

  const personalBests = [
    { label: '5km', value: (user as any).personalBest5k },
    { label: '10km', value: (user as any).personalBest10k },
    { label: 'Meia Maratona', value: (user as any).personalBestHalfMarathon },
    { label: 'Maratona', value: (user as any).personalBestMarathon },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl font-bold">{initials}</span>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {[user.firstName, user.lastName].filter(Boolean).join(' ') || user.username}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">@{user.username}</p>

            {location && (
              <div className="flex items-center justify-center sm:justify-start gap-1 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <MapPin size={14} />
                <span>{location}</span>
              </div>
            )}

            {user.bio && (
              <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {user.bio}
              </p>
            )}
          </div>

          {/* Edit button */}
          <Link
            to="/settings"
            aria-label="Editar Perfil"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Settings size={15} />
            Editar Perfil
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Activity size={18} className="text-blue-500" />
          Estatísticas
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {(user as any).totalRaces ?? 0}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Corridas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatDistance((user as any).totalDistance ?? 0)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Distância Total</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {(user as any).wins ?? 0}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Vitórias</p>
          </div>
        </div>
      </div>

      {/* Personal Bests */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy size={18} className="text-yellow-500" />
          Melhores Tempos Pessoais
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {personalBests.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatTime(value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements placeholder */}
      {(user as any).isVerified && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Award size={18} className="text-purple-500" />
            Conquistas
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Conta verificada ✓
          </p>
        </div>
      )}
    </div>
  )
}

export default Profile
