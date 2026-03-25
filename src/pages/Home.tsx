import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../components/common/AuthProvider'

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-500 rounded-full p-2">
                <svg
                  className="h-6 w-6 text-white"
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
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Maratona Ao Vivo
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/races"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
                  >
                    Corridas
                  </Link>
                  <Link
                    to="/profile"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
                  >
                    Perfil
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Cadastre-se
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Competições de Running em{' '}
            <span className="text-primary-600 dark:text-primary-400">Tempo Real</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
            Participe de corridas online, compita com pessoas de todo o mundo e 
            alcance seus objetivos de running em uma plataforma interativa e motivadora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Link
                  to="/races"
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition-colors shadow-lg"
                >
                  Ver Corridas
                </Link>
                <Link
                  to="/races/create"
                  className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Criar Corrida
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition-colors shadow-lg"
                >
                  Começar Agora
                </Link>
                <Link
                  to="/login"
                  className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Fazer Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Como funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Inscreva-se
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Escolha uma corrida que combine com seus objetivos e faça sua inscrição.
                Corridas para todos os níveis, de 5K a maratonas completas.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Corra em Tempo Real
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Use nosso app durante sua corrida para reportar seu progresso em tempo real.
                Veja sua posição no leaderboard e compita com outros participantes.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Conquiste e Compartilhe
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ganhe conquistas, melhore suas estatísticas e compartilhe seus resultados
                nas redes sociais. Acompanhe seu progresso ao longo do tempo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                10K+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Corredores</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                500+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Corridas Realizadas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                50K+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Km Percorridos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                30+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Países</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Junte-se à comunidade de corredores mais motivadora do mundo.
            Supere seus limites e alcance novos objetivos.
          </p>
          <Link
            to={isAuthenticated ? '/races' : '/register'}
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-block"
          >
            {isAuthenticated ? 'Ver Corridas' : 'Cadastre-se Grátis'}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary-500 rounded-full p-2">
                  <svg
                    className="h-6 w-6 text-white"
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
                <span className="text-xl font-bold text-white">
                  Maratona Ao Vivo
                </span>
              </div>
              <p className="text-gray-400">
                Competições de running em tempo real
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Termos
              </Link>
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacidade
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contato
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Sobre
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Maratona Ao Vivo. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home