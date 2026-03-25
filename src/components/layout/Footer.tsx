import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Github, Twitter, Instagram, Facebook, Mail } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Produto: [
      { name: 'Recursos', href: '/features' },
      { name: 'Preços', href: '/pricing' },
      { name: 'API', href: '/api' },
      { name: 'Documentação', href: '/docs' },
    ],
    Empresa: [
      { name: 'Sobre', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Carreiras', href: '/careers' },
      { name: 'Contato', href: '/contact' },
    ],
    Legal: [
      { name: 'Privacidade', href: '/privacy' },
      { name: 'Termos', href: '/terms' },
      { name: 'Cookies', href: '/cookies' },
      { name: 'Segurança', href: '/security' },
    ],
    Comunidade: [
      { name: 'Fórum', href: '/forum' },
      { name: 'Discord', href: '/discord' },
      { name: 'Eventos', href: '/events' },
      { name: 'Parceiros', href: '/partners' },
    ],
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Email', icon: Mail, href: 'mailto:contato@maratonaaovivo.com' },
  ]

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Maratona Ao Vivo
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Competindo juntos, onde quer que você esteja
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Plataforma de corridas online onde atletas podem competir em tempo real,
              acompanhar seu progresso e se conectar com uma comunidade global de corredores.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Receba novidades
              </h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Inscrever
                </button>
              </div>
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Maratona Ao Vivo. Todos os direitos reservados.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Feito com <Heart className="inline h-3 w-3 text-red-500" /> para corredores ao redor do mundo.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* App badges */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Disponível em breve nas lojas
            </p>
            <div className="flex space-x-4">
              <div className="bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <span className="text-black font-bold text-xs">A</span>
                </div>
                <div>
                  <div className="text-xs">Baixe na</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </div>
              <div className="bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">P</span>
                </div>
                <div>
                  <div className="text-xs">Disponível no</div>
                  <div className="text-sm font-semibold">Play Store</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PWA badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium">
            <span className="mr-1">📱</span>
            Disponível como PWA - Instale no seu dispositivo
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer