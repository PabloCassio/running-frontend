import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Trophy,
  Calendar,
  Map,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  X,
  Activity,
  Target,
  Clock,
  Award
} from 'lucide-react'

interface SidebarProps {
  onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      current: location.pathname === '/dashboard',
    },
    {
      name: 'Minhas Corridas',
      href: '/races',
      icon: Trophy,
      current: location.pathname.startsWith('/races') && !location.pathname.includes('/create'),
    },
    {
      name: 'Criar Corrida',
      href: '/races/create',
      icon: Calendar,
      current: location.pathname === '/races/create',
    },
    {
      name: 'Tracking Ao Vivo',
      href: '/tracking',
      icon: Map,
      current: location.pathname.startsWith('/tracking'),
    },
    {
      name: 'Estatísticas',
      href: '/stats',
      icon: BarChart3,
      current: location.pathname === '/stats',
    },
    {
      name: 'Comunidade',
      href: '/community',
      icon: Users,
      current: location.pathname === '/community',
    },
  ]

  const quickActions = [
    {
      name: 'Corrida Rápida',
      description: 'Iniciar uma corrida de 5km',
      icon: Activity,
      href: '/races/create?distance=5',
      color: 'bg-blue-500',
    },
    {
      name: 'Meta Diária',
      description: '5km completados',
      icon: Target,
      href: '/dashboard',
      color: 'bg-green-500',
      progress: 60,
    },
    {
      name: 'Próxima Corrida',
      description: 'Em 2 horas',
      icon: Clock,
      href: '/races/upcoming',
      color: 'bg-purple-500',
    },
  ]

  const achievements = [
    { name: 'Primeiros 10km', icon: Award, unlocked: true },
    { name: 'Maratonista', icon: Award, unlocked: false },
    { name: 'Consistência', icon: Award, unlocked: true },
  ]

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Mobile close button */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            Maratona Ao Vivo
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={onClose}
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              item.current
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <item.icon
              className={`mr-3 h-5 w-5 flex-shrink-0 ${
                item.current ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
              }`}
            />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Ações Rápidas
        </h3>
        <div className="space-y-2">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              onClick={onClose}
              className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className={`${action.color} p-2 rounded-lg mr-3`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {action.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {action.description}
                </p>
                {action.progress && (
                  <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: `${action.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Conquistas
        </h3>
        <div className="flex space-x-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.name}
              className={`flex-1 flex flex-col items-center p-2 rounded-lg ${
                achievement.unlocked
                  ? 'bg-yellow-50 dark:bg-yellow-900/20'
                  : 'bg-gray-100 dark:bg-gray-700 opacity-50'
              }`}
            >
              <achievement.icon
                className={`h-5 w-5 mb-1 ${
                  achievement.unlocked
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              />
              <span className="text-xs text-center text-gray-700 dark:text-gray-300">
                {achievement.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Help & Settings */}
      <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/settings"
          onClick={onClose}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Settings className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
          Configurações
        </Link>
        <Link
          to="/help"
          onClick={onClose}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <HelpCircle className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
          Ajuda & Suporte
        </Link>
      </div>
    </div>
  )
}

export default Sidebar