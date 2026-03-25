import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Clock,
  ChevronLeft,
  Share2,
  Bookmark,
  Flag,
  BarChart3,
  Award,
  DollarSign,
  TrendingUp,
  MessageCircle,
  Heart,
  Play,
  CheckCircle,
  Map,
  Navigation,
  Target,
  Zap
} from 'lucide-react'

const RaceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Mock data - in a real app, this would come from API based on id
  const race = {
    id: 1,
    name: 'Maratona Virtual São Paulo',
    description: 'A maior maratona virtual do Brasil com participantes de todo o país. Participe de qualquer lugar e competa em tempo real com corredores de todo o Brasil.',
    longDescription: `A Maratona Virtual São Paulo é um evento anual que reúne corredores de todo o Brasil em uma competição online. O evento permite que participantes corram de qualquer localidade, utilizando nosso sistema de tracking em tempo real para competir entre si.

Características principais:
• Sistema de tracking em tempo real
• Leaderboard atualizado a cada minuto
• Certificado digital para todos os participantes
• Premiação em dinheiro para os 3 primeiros colocados
• Kit do corredor enviado para sua casa
• Comunidade ativa no Discord

Como funciona:
1. Inscreva-se na corrida
2. No dia do evento, acesse a página de tracking
3. Inicie seu dispositivo de tracking (app ou smartwatch)
4. Corra a distância completa (42.2km)
5. Acompanhe sua posição no leaderboard em tempo real

Requisitos:
• Dispositivo com GPS (smartphone ou smartwatch)
• Conexão com internet durante a corrida
• App oficial ou integração com Strava/Garmin`,
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
    organizer: 'Associação de Corredores do Brasil',
    organizerAvatar: 'https://via.placeholder.com/40',
    registrationDeadline: '24 Mar 2026',
    startPoint: 'Qualquer localidade',
    endPoint: 'Qualquer localidade',
    elevationGain: 'Variável',
    timeLimit: '6 horas',
    categories: ['Geral', 'Master (40+)', 'Veterano (50+)', 'Feminino'],
    tags: ['Maratona', 'Virtual', 'Competitivo', 'Prêmio em Dinheiro'],
  }

  const leaderboard = [
    { position: 1, name: 'Carlos Silva', time: '2:45:32', pace: '3:55/km', country: '🇧🇷' },
    { position: 2, name: 'Ana Santos', time: '2:48:15', pace: '3:59/km', country: '🇧🇷' },
    { position: 3, name: 'Miguel Costa', time: '2:50:42', pace: '4:02/km', country: '🇵🇹' },
    { position: 4, name: 'Julia Oliveira', time: '2:52:18', pace: '4:04/km', country: '🇧🇷' },
    { position: 5, name: 'Roberto Lima', time: '2:53:45', pace: '4:06/km', country: '🇦🇷' },
  ]

  const comments = [
    { id: 1, user: 'João Pereira', time: '2 horas atrás', text: 'Estou muito animado para essa corrida! Será minha primeira maratona virtual.', likes: 24 },
    { id: 2, user: 'Maria Fernandes', time: '4 horas atrás', text: 'Alguém vai correr em grupo? Podemos nos organizar no Discord.', likes: 18 },
    { id: 3, user: 'Pedro Almeida', time: '1 dia atrás', text: 'O prêmio está excelente! Vamos com tudo galera!', likes: 42 },
  ]

  const handleRegister = () => {
    // In a real app, this would call an API
    alert('Inscrição realizada com sucesso!')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: race.name,
        text: `Participe da ${race.name} - ${race.distance}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copiado para a área de transferência!')
    }
  }

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
              {race.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Detalhes completos da corrida
            </p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            aria-label={isBookmarked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Bookmark className="h-5 w-5" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Compartilhar"
          >
            <Share2 className="h-5 w-5" />
          </button>
          {race.status === 'upcoming' && (
            <button
              onClick={handleRegister}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              {race.registered ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Inscrito
                </>
              ) : (
                <>
                  <Flag className="mr-2 h-4 w-4" />
                  Inscrever-se
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Race Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Race Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Race Header */}
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  <Calendar className="mr-1 h-4 w-4" />
                  {race.date} • {race.time}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  <MapPin className="mr-1 h-4 w-4" />
                  {race.location}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                  <Users className="mr-1 h-4 w-4" />
                  {race.participants.toLocaleString()} participantes
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                  <Trophy className="mr-1 h-4 w-4" />
                  {race.prize}
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {race.description}
              </p>

              {/* Detailed Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Target className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="font-medium text-gray-900 dark:text-white">Distância</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{race.distance}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                    <span className="font-medium text-gray-900 dark:text-white">Limite de Tempo</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{race.timeLimit}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Navigation className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                    <span className="font-medium text-gray-900 dark:text-white">Ganho de Elevação</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{race.elevationGain}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                    <span className="font-medium text-gray-900 dark:text-white">Dificuldade</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{race.difficulty}</p>
                </div>
              </div>

              {/* Long Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Sobre a Corrida
                </h3>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {race.longDescription}
                  </p>
                </div>
              </div>

              {/* Categories and Tags */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Categorias</h4>
                  <div className="flex flex-wrap gap-2">
                    {race.categories.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {race.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">ACB</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Organizado por {race.organizer}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Prazo de inscrição: {race.registrationDeadline}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Comentários ({comments.length})
              </h3>
            </div>
            <div className="p-6">
              {/* New Comment */}
              <div className="mb-6">
                <textarea
                  placeholder="Deixe seu comentário sobre a corrida..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-3">
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Publicar Comentário
                  </button>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isLiked
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Heart className="mr-2 h-4 w-4" fill={isLiked ? 'currentColor' : 'none'} />
                    Curtir Corrida
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">
                          {comment.user.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {comment.user}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-500 ml-2">
                              {comment.time}
                            </span>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Heart className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mt-2">{comment.text}</p>
                        <div className="flex items-center mt-2">
                          <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            <Heart className="h-4 w-4 mr-1" />
                            {comment.likes}
                          </button>
                          <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 ml-4">
                            Responder
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Leaderboard
                </h3>
                <BarChart3 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {leaderboard.map((runner) => (
                  <div
                    key={runner.position}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        runner.position === 1 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        runner.position === 2 ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300' :
                        runner.position === 3 ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      }`}>
                        <span className="font-bold">{runner.position}</span>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {runner.name}
                          </span>
                          <span className="ml-2">{runner.country}</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {runner.pace}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {runner.time}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Tempo
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to={`/races/${race.id}/leaderboard`}
                className="block w-full mt-4 text-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Ver Leaderboard Completo
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Ações Rápidas
            </h3>
            <div className="space-y-3">
              {race.status === 'ongoing' ? (
                <Link
                  to={`/tracking/${race.id}`}
                  className="flex items-center justify-between p-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <Play className="h-5 w-5 mr-3" />
                    <span className="font-medium">Acompanhar Corrida</span>
                  </div>
                  <TrendingUp className="h-5 w-5" />
                </Link>
              ) : race.registered ? (
                <div className="p-3 bg-white/20 text-white rounded-lg backdrop-blur-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <div>
                      <p className="font-medium">Você está inscrito</p>
                      <p className="text-sm opacity-90">Aguardando início da corrida</p>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleRegister}
                  className="flex items-center justify-between w-full p-3 bg-white hover:bg-white/90 text-blue-600 font-medium rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <Flag className="h-5 w-5 mr-3" />
                    <span>Inscrever-se Agora</span>
                  </div>
                  <DollarSign className="h-5 w-5" />
                </button>
              )}
              
              <Link
                to={`/races/${race.id}/map`}
                className="flex items-center justify-between p-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm"
              >
                <div className="flex items-center">
                  <Map className="h-5 w-5 mr-3" />
                  <span className="font-medium">Ver Mapa do Percurso</span>
                </div>
                <Navigation className="h-5 w-5" />
              </Link>
              
              <Link
                to={`/races/${race.id}/rules`}
                className="flex items-center justify-between p-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm"
              >
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-3" />
                  <span className="font-medium">Regras e Premiação</span>
                </div>
                <Trophy className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Estatísticas
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Vagas Disponíveis</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {(race.maxParticipants - race.participants).toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${(race.participants / race.maxParticipants) * 100}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Taxa de Inscrição</span>
                <span className="font-bold text-gray-900 dark:text-white">R$ 89,90</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Dias Restantes</span>
                <span className="font-bold text-gray-900 dark:text-white">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Curtidas</span>
                <span className="font-bold text-gray-900 dark:text-white">248</span>
              </div>
            </div>
          </div>

          {/* Share */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Compartilhar
            </h3>
            <div className="flex space-x-3">
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Compartilhar
              </button>
              <button className="flex-1 flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                <MessageCircle className="h-5 w-5 mr-2" />
                Convite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RaceDetails
