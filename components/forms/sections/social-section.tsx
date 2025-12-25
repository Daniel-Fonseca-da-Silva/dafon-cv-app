"use client"

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  FiPlus,
  FiTrash2,
  FiArrowLeft,
  FiArrowRight,
  FiLink,
  FiGlobe,
  FiGithub,
  FiLinkedin,
  FiExternalLink,
  FiInfo
} from "react-icons/fi"
import { CvSectionProps, SocialLink } from "@/types/cv.types"

const SOCIAL_TYPES = [
  { value: 'linkedin', label: 'LinkedIn', icon: FiLinkedin },
  { value: 'github', label: 'GitHub', icon: FiGithub },
  { value: 'website', label: 'Website', icon: FiGlobe },
  { value: 'portfolio', label: 'Portfolio', icon: FiExternalLink },
  { value: 'blog', label: 'Blog', icon: FiLink }
]

export function SocialSection({ data, onDataChange, onNext, onPrevious }: CvSectionProps) {
  const t = useTranslations('cvForm.social')
  const [selectedType, setSelectedType] = useState('')
  const [urlValue, setUrlValue] = useState('')

  const addSocialLink = () => {
    if (selectedType && urlValue.trim()) {
      const newSocialLink: SocialLink = {
        id: Date.now().toString(),
        platform: selectedType,
        url: urlValue.trim()
      }
      
      onDataChange({
        ...data,
        socialLinks: [...(data.socialLinks || []), newSocialLink]
      })
      
      setSelectedType('')
      setUrlValue('')
    }
  }

  const removeSocialLink = (id: string) => {
    onDataChange({
      ...data,
      socialLinks: (data.socialLinks || []).filter((link: SocialLink) => link.id !== id)
    })
  }

  const getAvailableTypes = () => {
    const usedTypes = (data.socialLinks || []).map((link: SocialLink) => link.platform)
    return SOCIAL_TYPES.filter(type => !usedTypes.includes(type.value))
  }

  const isFormValid = () => {
    return true
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          {t('title')}
        </h1>
        <p className="text-white/70 text-lg">
          {t('subtitle')}
        </p>
      </div>

      {/* Formulário de Adição de Link Social */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <FiLink className="w-5 h-5" />
            <span>{t('addLink.title')}</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            {t('addLink.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dropdown para tipo de rede social */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">{t('addLink.typeLabel')}</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder={t('addLink.typePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableTypes().map((type) => {
                    const IconComponent = type.icon
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <IconComponent className="w-4 h-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Campo de URL */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">{t('addLink.urlLabel')}</label>
              <Input
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                placeholder={t('addLink.urlPlaceholder')}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                onKeyDown={(e) => e.key === 'Enter' && addSocialLink()}
              />
            </div>
          </div>

          {/* Botão de adicionar */}
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={addSocialLink}
              disabled={!selectedType || !urlValue.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              {t('addLink.addButton')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Links Sociais Adicionados */}
      {(data.socialLinks || []).length > 0 && (
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FiGlobe className="w-5 h-5" />
              <span>{t('addedLinks.title')}</span>
            </CardTitle>
            <CardDescription className="text-white/70">
              {t('addedLinks.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(data.socialLinks || []).map((link: SocialLink) => {
                const socialType = SOCIAL_TYPES.find(type => type.value === link.platform)
                const IconComponent = socialType?.icon || FiLink
                
                return (
                  <div key={link.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{socialType?.label}</p>
                        <p className="text-white/60 text-sm truncate max-w-xs">{link.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => window.open(link.url, '_blank')}
                        size="sm"
                        variant="ghost"
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                      >
                        <FiExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => removeSocialLink(link.id)}
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dica Profissional */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl rounded-xl">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <FiInfo className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-1">{t('tip.title')}</h4>
              <p className="text-white/70 text-xs leading-relaxed">
                {t('tip.description')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Navegação */}
      <div className="flex justify-between">
        <Button
          onClick={onPrevious}
          size="lg"
          className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <FiArrowLeft className="w-5 h-5 mr-2" />
          {t('navigation.back')}
        </Button>
        <Button
          onClick={onNext}
          size="lg"
          disabled={!isFormValid()}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {t('navigation.continue')}
          <FiArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
