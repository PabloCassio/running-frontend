import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Clock,
  ChevronRight,
  Plus,
  Star,
  TrendingUp,
  Award
} from 'lucide-react'

const RacesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'Todas' },
    { id: 'upcoming', label: 'Próximas' },
    { id: 'ongoing', label: 'Em Andamento' },
    { id: 'completed', label: 'Concluídas' },
    { id: 'registered', label: 'Inscritas' },
    { id: 'featured', label: 'Destaques' },
  ]

  const races = [
    {
      id: 1,
      name: 'Maratona Virtual São Paulo',
      description: 'A maior maratona virtual do Brasil com participantes de todo o país',
      date: '25 Mar 2026',
      time: '07:00',
      distance: '42.2 km',
      location: 'Virtual - Qualquer lugar',
      participants: 1250,
      maxParticipants: 5000,
      registered: true,
      featured: true,
      status: 'upcoming',
      prize: 'R$ 10.000',
      difficulty: 'Difícil',
    },
    {
      id: 2,
      name: 'Corrida Noturna 10K',
      description: 'Corrida noturna com iluminação especial e música ao vivo',
      date: '28 Mar 2026',
      time: '20:00',
      distance: '10 km',
      location: 'Parque Ibirapuera, SP',
      participants: 850,
      maxParticipants: 2000,
      registered: false,
      featured: true,
      status: 'upcoming',
      prize: 'R$ 5.000',
      difficulty: 'Médio',
    },
    {
      id: 3,
      name: 'Desafio Semanal 5K',
      description: 'Desafio semanal para manter a consistência nos treinos',
      date: 'Hoje',
      time: '20:00',
      distance: '5 km',
      location: 'Virtual - Qualquer lugar',
      participants: 3200,
      maxParticipants: 10000,
      registered: true,
      featured: false,
      status: 'ongoing',
      prize: 'Troféu Virtual',
      difficulty: 'Fácil',
    },
    {
      id: 4,
      name: 'Meia Maratona Rio de Janeiro',
      description: 'Percurso desafiador com vista para o Pão de Açúcar',
      date: '5 Abr 2026',
      time: '06:30',
      distance: '21.1 km',
      location: 'Rio de Janeiro, RJ',
      participants: 2100,
      maxParticipants: 3000,
      registered: false,
      featured: true,
      status: 'upcoming',
      prize: 'R$ 7.500',
      difficulty: 'Médio',
    },
    {
      id: 5,
      name: 'Corrida da Amizade',
      description: 'Corrida em dupla para incentivar a prática esportiva em grupo',
      date: '12 Abr 2026',
      time: '08:00',
      distance: '8 km',
      location: 'Virtual - Qualquer lugar',
      participants: 1800,
      maxParticipants: 5000,
      registered: false,
      featured: false,
      status: 'upcoming',
      prize: 'Kit Esportivo',
      difficulty: 'Fácil',
    },
    {
      id: 6,
      name: 'Ultramaratona 50K',
      description: 'Desafio extremo para corredores experientes',
      date: '20 Abr 2026',
      time: '05:00',
      distance: '50 km',
      location: 'Serra da Mantiqueira',
      participants: 150,
      maxParticipants: 300,
      registered: false,
      featured: true,
      status: 'upcoming',
      prize: 'R$ 15.000',
      difficulty: 'Extremo',
    },
  ]

  const filteredRaces = races.filter((race) => {
    if (selectedFilter !== 'all' && race.status !== selectedFilter) {
      return false
    }
    if (searchTerm) {
      return (
        race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        race.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        race.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
            Em Breve
          </span>
        )
      case 'ongoing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            Ao Vivo
          </span>
        )
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
            Concluída
          </span>
        )
      default:
        return null
    }
  }

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            {difficulty}
          </span>
        )
      case 'Médio':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
            {difficulty}
          </span>
        )
      case 'Difícil':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
            {difficulty}
          </span>
        )
      case 'Extremo':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
            {difficulty}
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Corridas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Encontre e participe das melhores corridas online
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/races/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            Criar Corrida
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar corridas por nome, local ou descrição..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
            <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total de Corridas</p>
              <p className="text-2xl font-bold mt-1">156</p>
            </div>
            <Trophy className="h-8 w-8 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Participantes Ativos</p>
              <p className="text-2xl font-bold mt-1">8.5K</p>
            </div>
            <Users className="h-8 w-8 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Próxima Corrida</p>
              <p className="text-2xl font-bold mt-1">Em 2h</p>
            </div>
            <Clock className="h-8 w-8 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Prêmio Total</p>
              <p className="text-2xl font-bold mt-1">R$ 85K</p>
            </div>
            <Award className="h-8 w-8 opacity-80" />
          </div>
        </div>
      </div>

      {/* Races Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRaces.map((race) => (
          <div
            key={race.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Race Header */}
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {race.featured && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                        <Star className="h-3 w-3 mr-1" />
                        Destaque
                      </span>
                    )}
                    {getStatusBadge(race.status)}
                    {getDifficultyBadge(race.difficulty)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {race.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {race.description}
                  </p>
                </div>
                {race.registered && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    Inscrito
                  </span>
                )}
              </div>

              {/* Race Details */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {race.date} • {race.time}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{race.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    <span>
                      {race.participants.toLocaleString()}/{race.maxParticipants.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {race.distance}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(race.participants / race.maxParticipants) * 100}%`,
                    }}
                  />
                </div>

                {/* Prize */}
                {race.prize && (
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg">
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Prêmio
                      </span>
                    </div>
                    <span className="font-bold text-yellow-700 dark:text-yellow-300">
                      {race.prize}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <Link
                  to={`/races/${race.id}`}
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Ver detalhes
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
                <div className="flex space-x-2">
                  {race.status === 'ongoing' ? (
                    <Link
                      to={`/tracking/${race.id}`}
                      className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Acompanhar
                    </Link>
                  ) : race.registered ? (
                    <button className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg cursor-not-allowed">
                      Inscrito
                    </button>
                  ) : (
                    <Link
                      to={`/races/${race.id}/register`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Inscrever-se
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRaces.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhuma corrida encontrada
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
            Não encontramos corridas correspondentes aos seus filtros. Tente ajustar sua busca ou criar uma nova corrida.
          </p>
          <Link
            to="/races/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Criar Primeira Corrida
          </Link>
        </div>
      )}

      {/* Pagination */}
      {filteredRaces.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Mostrando <span className="font-medium">1-6</span> de{' '}
            <span className="font-medium">156</span> corridas
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Anterior
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              2
            </button>
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              3
            </button>
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RacesList
