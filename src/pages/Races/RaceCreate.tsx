import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Clock,
  ChevronLeft,
  Upload,
  DollarSign,
  Tag,
  Globe,
  Lock,
  Target,
  Map,
  Award,
  Info,
  X
} from 'lucide-react'

const RaceCreate: React.FC = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    description: '',
    distance: '5',
    distanceUnit: 'km',
    date: '',
    time: '',
    registrationDeadline: '',
    
    // Step 2: Details
    locationType: 'virtual',
    location: '',
    maxParticipants: '100',
    categories: ['Geral'],
    tags: ['Corrida', 'Virtual'],
    difficulty: 'medium',
    timeLimit: '2',
    timeLimitUnit: 'hours',
    
    // Step 3: Settings
    visibility: 'public',
    registrationFee: '0',
    prize: '',
    requireProof: false,
    allowTeams: false,
    
    // Step 4: Advanced
    elevationGain: '',
    checkpoints: [],
    rules: '',
    equipmentRequirements: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Corrida criada com sucesso!')
      navigate('/races')
    }, 1500)
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const distanceOptions = [
    { value: '1', label: '1 km' },
    { value: '5', label: '5 km' },
    { value: '10', label: '10 km' },
    { value: '21.1', label: 'Meia Maratona (21.1 km)' },
    { value: '42.2', label: 'Maratona (42.2 km)' },
    { value: '50', label: '50 km' },
    { value: '100', label: '100 km' },
    { value: 'custom', label: 'Distância Personalizada' },
  ]

  const difficultyOptions = [
    { value: 'easy', label: 'Fácil', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Médio', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'hard', label: 'Difícil', color: 'bg-orange-100 text-orange-800' },
    { value: 'extreme', label: 'Extremo', color: 'bg-red-100 text-red-800' },
  ]

  const visibilityOptions = [
    { value: 'public', label: 'Pública', icon: Globe, description: 'Qualquer pessoa pode ver e participar' },
    { value: 'private', label: 'Privada', icon: Lock, description: 'Somente com link ou convite' },
    { value: 'friends', label: 'Amigos', icon: Users, description: 'Somente seus amigos podem participar' },
  ]

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Informações Básicas
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Defina o nome, descrição e data da corrida
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome da Corrida *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Ex: Maratona Virtual São Paulo"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descrição *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Descreva sua corrida, objetivos, regras especiais..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Distância *
            </label>
            <select
              name="distance"
              value={formData.distance}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {distanceOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data da Corrida *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Horário de Início *
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Prazo de Inscrição
            </label>
            <input
              type="date"
              name="registrationDeadline"
              value={formData.registrationDeadline}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Detalhes da Corrida
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Configure localização, participantes e dificuldade
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Tipo de Localização *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, locationType: 'virtual' }))}
              className={`p-4 border rounded-lg text-center transition-colors ${
                formData.locationType === 'virtual'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Globe className="h-8 w-8 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
              <div className="font-medium text-gray-900 dark:text-white">Virtual</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Participantes correm de qualquer lugar
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, locationType: 'physical' }))}
              className={`p-4 border rounded-lg text-center transition-colors ${
                formData.locationType === 'physical'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
              <div className="font-medium text-gray-900 dark:text-white">Presencial</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Local físico específico
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, locationType: 'hybrid' }))}
              className={`p-4 border rounded-lg text-center transition-colors ${
                formData.locationType === 'hybrid'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Map className="h-8 w-8 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
              <div className="font-medium text-gray-900 dark:text-white">Híbrida</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Presencial e virtual
              </div>
            </button>
          </div>
        </div>

        {formData.locationType !== 'virtual' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Localização *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Endereço completo ou coordenadas"
              required={formData.locationType !== 'virtual'}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Número Máximo de Participantes *
            </label>
            <input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleInputChange}
              min="1"
              max="10000"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Limite de Tempo
            </label>
            <div className="flex">
              <input
                type="number"
                name="timeLimit"
                value={formData.timeLimit}
                onChange={handleInputChange}
                min="0.5"
                step="0.5"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ex: 2"
              />
              <select
                name="timeLimitUnit"
                value={formData.timeLimitUnit}
                onChange={handleInputChange}
                className="px-4 py-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="hours">Horas</option>
                <option value="minutes">Minutos</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Dificuldade *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {difficultyOptions.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, difficulty: option.value }))}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  formData.difficulty === option.value
                    ? `border-blue-500 ${option.color}`
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Configurações
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Defina visibilidade, taxas e requisitos
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Visibilidade da Corrida *
          </label>
          <div className="space-y-3">
            {visibilityOptions.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, visibility: option.value }))}
                className={`w-full p-4 border rounded-lg text-left transition-colors ${
                  formData.visibility === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <option.icon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {option.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {option.description}
                    </div>
                  </div>
                  {formData.visibility === option.value && (
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Taxa de Inscrição (R$)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="registrationFee"
                value={formData.registrationFee}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Prêmio (opcional)
            </label>
            <div className="relative">
              <Trophy className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="prize"
                value={formData.prize}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ex: R$ 1.000 ou Troféu"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="requireProof"
              name="requireProof"
              checked={formData.requireProof}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="requireProof" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Exigir comprovação de conclusão (foto/arquivo GPS)
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="allowTeams"
              name="allowTeams"
              checked={formData.allowTeams}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="allowTeams" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Permitir inscrição em equipes
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Configurações Avançadas
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Defina regras específicas e requisitos adicionais
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ganho de Elevação (opcional)
          </label>
          <input
            type="text"
            name="elevationGain"
            value={formData.elevationGain}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Ex: 500m ou Variável"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Regras Específicas
          </label>
          <textarea
            name="rules"
            value={formData.rules}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Liste regras específicas da corrida..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Requisitos de Equipamento
          </label>
          <textarea
            name="equipmentRequirements"
            value={formData.equipmentRequirements}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Ex: Smartphone com GPS, aplicativo específico..."
          />
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">
                Dica de Criação
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-400">
                Corridas bem detalhadas atraem mais participantes. Certifique-se de fornecer todas as informações necessárias para que os corredores saibam exatamente o que esperar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      case 4:
        return renderStep4()
      default:
        return null
    }
  }

  const steps = [
    { number: 1, title: 'Informações Básicas' },
    { number: 2, title: 'Detalhes' },
    { number: 3, title: 'Configurações' },
    { number: 4, title: 'Avançado' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/races')}
            className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Criar Nova Corrida
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Configure todos os detalhes da sua corrida
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {steps.map((stepItem) => (
              <div key={stepItem.number} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === stepItem.number
                      ? 'bg-blue-600 text-white'
                      : step > stepItem.number
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {step > stepItem.number ? '✓' : stepItem.number}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Passo {stepItem.number}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {stepItem.title}
                  </div>
                </div>
                {stepItem.number < steps.length && (
                  <div className="hidden md:block ml-4 w-12 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {step} de {steps.length} passos
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-700 mt-8">
            <div>
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Voltar
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              {step < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Próximo
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Criando...
                    </span>
                  ) : (
                    'Criar Corrida'
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Preview Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Prévia da Corrida
        </h3>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex space-x-2">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            </div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
          Esta prévia será atualizada conforme você preenche o formulário
        </p>
      </div>
    </div>
  )
}

export default RaceCreate
