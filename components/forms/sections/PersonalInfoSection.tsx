"use client"

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { CvSectionProps } from "../../../types/cv.types"

const DRIVER_LICENSE_CATEGORIES = [
  'A', 'B', 'AB', 'C', 'D'
]

const COUNTRY_CODES = [
  { code: '+351', country: 'Portugal' },
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+33', country: 'France' },
  { code: '+49', country: 'Germany' },
  { code: '+34', country: 'Spain' },
  { code: '+39', country: 'Italy' },
  { code: '+55', country: 'Brazil' },
  { code: '+52', country: 'Mexico' },
  { code: '+86', country: 'China' },
  { code: '+81', country: 'Japan' },
  { code: '+91', country: 'India' },
]

export function PersonalInfoSection({ data, onDataChange, onNext }: CvSectionProps) {
  const t = useTranslations('cvForm.personalInfo')
  const [newCategory, setNewCategory] = useState('')
  const [isProcessingAI, setIsProcessingAI] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [countryCode, setCountryCode] = useState('+351')
  const [phoneNumber, setPhoneNumber] = useState('')

  const updatePersonalInfo = useCallback((field: keyof typeof data.personalInfo, value: string | string[]) => {
    onDataChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    })
  }, [data, onDataChange])

  const handlePhoneChange = useCallback((value: string | undefined) => {
    const phoneValue = value || ''
    updatePersonalInfo('phone', phoneValue)
    
    if (phoneError) setPhoneError('')
    
    if (phoneValue && phoneValue.length > 0) {
      setPhoneError('')
    }
  }, [updatePersonalInfo, phoneError])

  const handleCountryCodeChange = useCallback((value: string) => {
    setCountryCode(value)
    const fullPhone = `${value}${phoneNumber}`
    updatePersonalInfo('phone', fullPhone)
  }, [phoneNumber, updatePersonalInfo])

  const handlePhoneNumberChange = useCallback((value: string) => {
    const cleanNumber = value.replace(/[^0-9]/g, '')
    setPhoneNumber(cleanNumber)
    const fullPhone = `${countryCode}${cleanNumber}`
    updatePersonalInfo('phone', fullPhone)
  }, [countryCode, updatePersonalInfo])

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

  const handleUseAI = async () => {
    try {
      setIsProcessingAI(true)
      
      // Obter o texto atual do textarea
      const currentText = data.personalInfo.aboutYourself || ''
      
      if (!currentText.trim()) {
        console.log('No text to process')
        return
      }

      // Fazer requisição para a rota interna do Next.js
      const response = await fetch('/api/generate-intro-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: currentText
        })
      })

      if (!response.ok) {
        throw new Error(`Error in request: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.success && result.data?.filtered_content) {
        // Atualizar o textarea com o texto formatado
        updatePersonalInfo('aboutYourself', result.data.filtered_content)
      } else {
        throw new Error(result.error || 'Error processing text')
      }
    } catch (error) {
      console.error('Error processing text with AI:', error)
      // Em caso de erro, manter o texto original
    } finally {
      setIsProcessingAI(false)
    }
  }

  const isFormValid = useCallback(() => {
    const { fullName, email, aboutYourself } = data.personalInfo
    const phoneOk = phoneNumber.trim() !== '' && phoneNumber.length >= 7
    const introOk = aboutYourself && aboutYourself.trim() !== ''
    return fullName.trim() !== '' && email.trim() !== '' && phoneOk && phoneError === '' && introOk
  }, [data.personalInfo, phoneNumber, phoneError])

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
              <label className="text-white/80 text-sm font-medium">{t('fields.fullName.label')} <span className="text-white">*</span></label>
              <Input
                value={data.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                placeholder={t('fields.fullName.placeholder')}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">{t('fields.email.label')} <span className="text-white">*</span></label>
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
              <label className="text-white/80 text-sm font-medium">{t('fields.phone.label')} <span className="text-white">*</span></label>
              <div className="flex gap-2">
                <Select value={countryCode} onValueChange={handleCountryCodeChange}>
                  <SelectTrigger className="w-[140px] bg-white/20 border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-white/30">
                    {COUNTRY_CODES.map((country) => (
                      <SelectItem key={country.code} value={country.code} className="text-gray-900">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">{country.code}</span>
                          <span className="text-sm">{country.country}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <Input
                    value={phoneNumber}
                    onChange={(e) => handlePhoneNumberChange(e.target.value)}
                    placeholder={t('fields.phone.placeholder')}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pl-10"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>
              <div className="text-xs mt-1">
                {phoneError ? (
                  <span className="text-red-300">{phoneError}</span>
                ) : (
                  <span className="text-white/60">{t('fields.phone.help')}</span>
                )}
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
                {t('aboutYourself.title')} <span className="text-white">*</span>
              </label>
              <Button
                type="button"
                onClick={handleUseAI}
                disabled={isProcessingAI}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiZap className={`w-4 h-4 ${isProcessingAI ? 'animate-spin' : ''}`} />
                {isProcessingAI ? 'Processing...' : t('aboutYourself.useAiButton')}
              </Button>
            </div>

            {/* Área de Texto */}
            <Textarea
              value={data.personalInfo.aboutYourself || ''}
              onChange={(e) => updatePersonalInfo('aboutYourself', e.target.value)}
              placeholder={t('aboutYourself.placeholder')}
              className="h-32 bg-transparent border-white/30 text-white placeholder:text-white/60 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
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
