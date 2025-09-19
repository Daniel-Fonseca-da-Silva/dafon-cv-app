"use client"

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiPlus,
  FiX,
  FiArrowRight,
  FiZap,
  FiInfo,
  FiStar
} from "react-icons/fi"
import { CvSectionProps } from "@/types/cv.types"

const DRIVER_LICENSE_CATEGORIES = [
  'A', 'B', 'AB', 'C', 'D'
]

export function PersonalInfoSection({ data, onDataChange, onNext }: CvSectionProps) {
  const t = useTranslations('cvForm.personalInfo')
  const [newCategory, setNewCategory] = useState('')
  const updatePersonalInfo = (field: keyof typeof data.personalInfo, value: string | string[]) => {
    onDataChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    })
  }

  const toggleDriverLicenseCategory = (category: string) => {
    const currentCategories = data.personalInfo.driverLicense || []
    const isSelected = currentCategories.includes(category)
    
    if (isSelected) {
      // Remove a categoria
      updatePersonalInfo('driverLicense', currentCategories.filter(cat => cat !== category))
    } else {
      // Adiciona a categoria
      updatePersonalInfo('driverLicense', [...currentCategories, category])
    }
  }

  const addCustomCategory = (category?: string) => {
    const categoryToAdd = category || newCategory.trim()
    if (categoryToAdd && !data.personalInfo.driverLicense?.includes(categoryToAdd)) {
      const currentCategories = data.personalInfo.driverLicense || []
      updatePersonalInfo('driverLicense', [...currentCategories, categoryToAdd])
      if (!category) {
        setNewCategory('')
      }
    }
  }

  const removeCustomCategory = (category: string) => {
    const currentCategories = data.personalInfo.driverLicense || []
    updatePersonalInfo('driverLicense', currentCategories.filter(cat => cat !== category))
  }

  const handleUseAI = () => {
    // TODO: Implementar integração com IA
    console.log('Usando IA para gerar texto sobre você')
    // Por enquanto, vamos adicionar um texto de exemplo
    updatePersonalInfo('aboutYourself', 'I`m a dedicated and passionate professional with experience in software development and a strong ability to work in a team. I always seek to learn new technologies and contribute to innovative projects.')
  }

  const isFormValid = () => {
    const { fullName, email, phone } = data.personalInfo
    return fullName.trim() !== '' && email.trim() !== '' && phone.trim() !== ''
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          {t('title')}
        </h1>
        <p className="text-white/70 text-lg">
          {t('subtitle')}
        </p>
      </div>

      {/* Formulário de Dados de Contato */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <FiUser className="w-5 h-5" />
            <span>{t('contactData.title')}</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            {t('contactData.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">{t('fields.fullName.label')}</label>
              <Input
                value={data.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                placeholder={t('fields.fullName.placeholder')}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">{t('fields.email.label')}</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder={t('fields.email.placeholder')}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pl-10"
                  type="email"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">{t('fields.phone.label')}</label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder={t('fields.phone.placeholder')}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">{t('fields.driverLicense.label')}</label>
              <div className="flex gap-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder={t('fields.driverLicense.placeholder')}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addCustomCategory()}
                />
                <Button
                  type="button"
                  onClick={() => addCustomCategory()}
                  disabled={!newCategory.trim()}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiPlus className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Quick Suggestions */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">{t('fields.driverLicense.quickSuggestions')}</label>
                <div className="flex flex-wrap gap-2">
                  {DRIVER_LICENSE_CATEGORIES.map((category) => {
                    const isSelected = data.personalInfo.driverLicense?.includes(category) || false
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => toggleDriverLicenseCategory(category)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'bg-white/20 border border-white/30 text-white hover:bg-white/30 shadow-sm hover:shadow-md'
                        }`}
                      >
{t('fields.driverLicense.categoryPrefix')} {category}
                      </button>
                    )
                  })}
                  <button
                    type="button"
                    onClick={() => {
                      if (data.personalInfo.driverLicense?.includes('No License')) {
                        removeCustomCategory('No License')
                      } else {
                        addCustomCategory('No License')
                      }
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      data.personalInfo.driverLicense?.includes('No License')
                        ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg'
                        : 'bg-white/20 border border-white/30 text-white hover:bg-white/30 shadow-sm hover:shadow-md'
                    }`}
                  >
{t('fields.driverLicense.noLicense')}
                  </button>
                </div>
              </div>

              {/* Categorias Selecionadas - Compacto */}
              {data.personalInfo.driverLicense && data.personalInfo.driverLicense.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.personalInfo.driverLicense.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md text-sm border border-blue-400/30"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => removeCustomCategory(category)}
                        className="hover:text-red-300 transition-colors"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Secção de Escrita sobre você */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Header com Botão de Use AI */}
            <div className="flex items-center justify-between">
              <label className="text-white text-lg font-medium">
                {t('aboutYourself.title')}
              </label>
              <Button
                type="button"
                onClick={handleUseAI}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                <FiZap className="w-4 h-4" />
                {t('aboutYourself.useAiButton')}
              </Button>
            </div>

            {/* Área de Texto */}
            <textarea
              value={data.personalInfo.aboutYourself || ''}
              onChange={(e) => updatePersonalInfo('aboutYourself', e.target.value)}
              placeholder={t('aboutYourself.placeholder')}
              className="w-full h-32 bg-transparent border border-white/30 rounded-lg text-white placeholder:text-white/60 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              required
            />

            {/* Dica Pessoal */}
            <div className="bg-purple-500/20 border border-white/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2 text-white">
                  <FiInfo className="w-4 h-4" />
                  <FiStar className="w-4 h-4" />
                </div>
                <div className="text-white">
                  <div className="font-medium mb-2">{t('aboutYourself.personalTip.title')}</div>
                  <p className="text-sm leading-relaxed">
                    {t('aboutYourself.personalTip.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botão Continuar */}
      <div className="flex justify-center">
        <Button
          onClick={onNext}
          size="lg"
          disabled={!isFormValid()}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
        >
{t('continueButton')}
          <FiArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
