import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Play,
  Pause,
  StopCircle,
  MapPin,
  Clock,
  TrendingUp,
  Target,
  Users,
  Trophy,
  ChevronLeft,
  Share2,
  Zap,
  Navigation,
  BarChart3,
  Award,
  Heart,
  MessageCircle,
  Bell
} from 'lucide-react'

const Tracking: React.FC = () => {
  const { raceId } = useParams<{ raceId: string }>()
  const [isTracking, setIsTracking] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [distance, setDistance] = useState(0)
  const [pace, setPace] = useState('0:00')
  const [heartRate, setHeartRate] = useState(0)

  // Mock data
  const race = {
    id: raceId,
    name: 'Maratona Virtual São Paulo',
    distance: 42.2,
    participants: 1250,
    status: 'ongoing',
  }

  const leaderboard = [
    { position: 1, name: 'Carlos Silva', distance: 42.2, time: '2:45:32', pace: '3:55/km' },
    { position: 2, name: 'Ana Santos', distance: 42.2, time: '2:48:15', pace: '3:59/km' },
    { position: 3, name: 'Miguel Costa', distance: 41.8, time: '2:50:42', pace: '4:02/km' },
    { position: 4, name: 'Julia Oliveira', distance: 41.5, time: '2:52:18', pace: '4:04/km' },
    { position: 5, name: 'Roberto Lima', distance: 41.2, time: '2:53:45', pace: '4:06/km' },
    { position: 42, name: 'Você', distance: 10.5, time: '1:05:30', pace: '6:15/km' },
  ]

  const userStats = {
    position: 42,
    distance: 10.5,
    time: '1:05:30',
    pace: '6:15/km',
    calories: 850,
    elevation: 120,
    heartRate: 156,
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
        // Simulate distance increase
        setDistance(prev => prev + 0.01)
        // Simulate pace calculation
        const newPace = (elapsedTime / 60) / (distance || 1)
        const minutes = Math.floor(newPace)
        const seconds = Math.floor((newPace - minutes) * 60)
        setPace(`${minutes}:${seconds.toString().padStart(2, '0')}`)
        // Simulate heart rate
        setHeartRate(140 + Math.floor(Math.random() * 30))
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTracking, elapsedTime, distance])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartTracking = () => {
    setIsTracking(true)
  }

  const handlePauseTracking = () => {
    setIsTracking(false)
  }

  const handleStopTracking = () => {
    setIsTracking(false)
    setElapsedTime(0)
    setDistance(0)
    setPace('0:00')
    setHeartRate(0)
  }

  const progressPercentage = (userStats.distance / race.distance) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/races"
            className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tracking Ao Vivo
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {race.name} • {race.participants.toLocaleString()} participantes
            </p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tracking Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tracking Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Seu Progresso
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Acompanhe sua corrida em tempo real
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Ao Vivo
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Posição: #{userStats.position}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {userStats.distance.toFixed(1)} km / {race.distance} km
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {progressPercentage.toFixed(1)}% completo
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Distância</p>
                      <p className="text-2xl font-bold mt-1">{userStats.distance.toFixed(1)} km</p>
                    </div>
                    <MapPin className="h-8 w-8 opacity-80" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Tempo</p>
                      <p className="text-2xl font-bold mt-1">{formatTime(elapsedTime)}</p>
                    </div>
                    <Clock className="h-8 w-8 opacity-80" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Ritmo</p>
                      <p className="text-2xl font-bold mt-1">{pace}/km</p>
                    </div>
                    <TrendingUp className="h-8 w-8 opacity-80" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Frequência</p>
                      <p className="text-2xl font-bold mt-1">{heartRate} bpm</p>
                    </div>
                    <Heart className="h-8 w-8 opacity-80" />
                  </div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                {!isTracking ? (
                  <button
                    onClick={handleStartTracking}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Iniciar Tracking
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handlePauseTracking}
                      className="flex-1 flex items-center justify-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <Pause className="mr-2 h-5 w-5" />
                      Pausar
                    </button>
                    <button
                      onClick={handleStopTracking}
                      className="flex-1 flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <StopCircle className="mr-2 h-5 w-5" />
                      Finalizar
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Additional Stats */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.calories}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Calorias</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.elevation}m</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Elevação</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.heartRate}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">FC Média</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">#{userStats.position}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Posição</div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Mapa do Percurso
              </h3>
              <Navigation className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">
                  Mapa do percurso será exibido aqui
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Integração com Mapbox em desenvolvimento
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Leaderboard */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Leaderboard
                </h3>
                <Trophy className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {leaderboard.map((runner) => (
                  <div
                    key={runner.position}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      runner.position === userStats.position
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        runner.position === 1 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        runner.position === 2 ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300' :
                        runner.position === 3 ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                        runner.position === userStats.position ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                        'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                      }`}>
                        <span className="font-bold">{runner.position}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {runner.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {runner.pace}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {runner.distance === race.distance ? '🏁' : `${runner.distance.toFixed(1)} km`}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {runner.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to={`/races/${raceId}/leaderboard`}
                className="block w-full mt-4 text-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Ver Leaderboard Completo
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Estatísticas da Corrida
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-white mr-3" />
                  <span className="text-white">Participantes Ativos</span>
                </div>
                <span className="text-xl font-bold text-white">1,250</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-white mr-3" />
                  <span className="text-white">Distância Média</span>
                </div>
                <span className="text-xl font-bold text-white">28.4 km</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-white mr-3" />
                  <span className="text-white">Tempo Médio</span>
                </div>
                <span className="text-xl font-bold text-white">3:12:45</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-yellow-300 mr-3" />
                  <span className="text-white">Velocidade Média</span>
                </div>
                <span className="text-xl font-bold text-white">8.9 km/h</span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to={`/races/${raceId}/stats`}
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors backdrop-blur-sm"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Ver Estatísticas Detalhadas
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Ações Rápidas
            </h3>
            <div className="space-y-3">
              <button className="flex items-center justify-between w-full p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div className="flex items-center">
                  <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Chat da Corrida
                  </span>
                </div>
                <div className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  12
                </div>
              </button>
              <button className="flex items-center justify-between w-full p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Conquistas
                  </span>
                </div>
                <div className="w-6 h-6 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </div>
              </button>
              <button className="flex items-center justify-between w-full p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <div className="flex items-center">
                  <Share2 className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Compartilhar Progresso
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Dicas de Corrida
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-sm">💧</span>
                </div>
                <p className="text-white text-sm">
                  Mantenha-se hidratado! Beba água a cada 20-30 minutos.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-sm">⚡</span>
                </div>
                <p className="text-white text-sm">
                  Mantenha um ritmo constante para economizar energia.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-sm">🎯</span>
                </div>
                <p className="text-white text-sm">
                  Foque em pequenos objetivos: próximo km, próximo checkpoint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tracking
