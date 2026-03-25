import React from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  Trophy,
  Clock,
  TrendingUp,
  Users,
  Map,
  Calendar,
  Award,
  BarChart3,
  Target,
  ChevronRight,
  Play,
  Star,
  Zap
} from 'lucide-react'

const Dashboard: React.FC = () => {
  // Mock data - in a real app, this would come from API
  const stats = [
    {
      title: 'Distância Total',
      value: '42.5 km',
      change: '+12.5%',
      icon: Map,
      color: 'bg-blue-500',
      trend: 'up',
    },
    {
      title: 'Tempo Médio',
      value: '5:20 min/km',
      change: '-0:15',
      icon: Clock,
      color: 'bg-green-500',
      trend: 'down',
    },
    {
      title: 'Corridas Completas',
      value: '8',
      change: '+3',
      icon: Trophy,
      color: 'bg-purple-500',
      trend: 'up',
    },
    {
      title: 'Posição no Ranking',
      value: '#42',
      change: '+5 posições',
      icon: TrendingUp,
      color: 'bg-yellow-500',
      trend: 'up',
    },
  ]

  const upcomingRaces = [
    {
      id: 1,
      name: 'Maratona Virtual São Paulo',
      date: '25 Mar 2026',
      distance: '42.2 km',
      participants: 1250,
      registered: true,
    },
    {
      id: 2,
      name: 'Corrida Noturna 10K',
      date: '28 Mar 2026',
      distance: '10 km',
      participants: 850,
      registered: false,
    },
    {
      id: 3,
      name: 'Desafio Semanal 5K',
      date: 'Hoje, 20:00',
      distance: '5 km',
      participants: 3200,
      registered: true,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'race_completed',
      title: 'Corrida de 10K completada',
      description: 'Tempo: 48:32 - Novo recorde pessoal!',
      time: '2 horas atrás',
      icon: Trophy,
      color: 'text-green-500',
    },
    {
      id: 2,
      type: 'achievement_unlocked',
      title: 'Conquista desbloqueada',
      description: 'Primeiros 50km completados',
      time: '1 dia atrás',
      icon: Award,
      color: 'text-yellow-500',
    },
    {
      id: 3,
      type: 'friend_joined',
      title: 'Amigo adicionado',
      description: 'João Silva começou a usar o app',
      time: '2 dias atrás',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      id: 4,
      type: 'weekly_challenge',
      title: 'Desafio semanal iniciado',
      description: 'Complete 25km esta semana',
      time: '3 dias atrás',
      icon: Target,
      color: 'text-purple-500',
    },
  ]

  const goals = [
    {
      title: 'Meta Mensal',
      target: '100 km',
      current: '42.5 km',
      progress: 42.5,
      icon: Target,
    },
    {
      title: 'Corridas Semanais',
      target: '4 corridas',
      current: '2 corridas',
      progress: 50,
      icon: Calendar,
    },
    {
      title: 'Tempo 5K',
      target: '25:00 min',
      current: '26:45 min',
      progress: 85,
      icon: Clock,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Bem-vindo de volta! Aqui está seu resumo de atividades.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link
            to="/races/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Play className="mr-2 h-4 w-4" />
            Nova Corrida
          </Link>
          <Link
            to="/races"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ver Todas
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm font-medium ${
                  stat.trend === 'up'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                desde o mês passado
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Upcoming Races */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Races */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Próximas Corridas
                </h2>
                <Link
                  to="/races"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Ver todas
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {upcomingRaces.map((race) => (
                <div key={race.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {race.name}
                          </h3>
                          <div className="flex items-center mt-1 space-x-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {race.date}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {race.distance}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {race.participants.toLocaleString()} participantes
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      {race.registered ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                          Inscrito
                        </span>
                      ) : (
                        <Link
                          to={`/races/${race.id}`}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          Inscrever-se
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Metas e Progresso
            </h2>
            <div className="space-y-6">
              {goals.map((goal) => (
                <div key={goal.title}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <goal.icon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {goal.title}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {goal.current} / {goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Recent Activity & Quick Stats */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Atividade Recente
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="px-6 py-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Estatísticas Rápidas
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-yellow-300 mr-3" />
                  <span className="text-white">Streak Atual</span>
                </div>
                <span className="text-xl font-bold text-white">7 dias</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-white mr-3" />
                  <span className="text-white">Amigos Ativos</span>
                </div>
                <span className="text-xl font-bold text-white">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-300 mr-3" />
                  <span className="text-white">Nível</span>
                </div>
                <span className="text-xl font-bold text-white">8</span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/stats"
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors backdrop-blur-sm"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Ver Estatísticas Detalhadas
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Ações Rápidas
            </h2>
            <div className="space-y-3">
              <Link
                to="/tracking/live"
                className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Iniciar Tracking
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                to="/community"
                className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Ver Comunidade
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                to="/races/create"
                className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Criar Corrida
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard