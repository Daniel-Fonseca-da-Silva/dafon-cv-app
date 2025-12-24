"use client"

import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SettingsSkeleton } from "@/components/features/settings/settings-skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FiSettings, FiBell, FiGlobe, FiSave, FiArrowLeft } from "react-icons/fi"
import { useLocale } from '@/hooks/use-locale'
import { useEffect, useState } from "react"

interface SettingsSectionProps {
  onSectionChange?: (section: string) => void
}

export function SettingsSection({ onSectionChange }: SettingsSectionProps) {
  const t = useTranslations('settings')
  const { locale, changeLocale } = useLocale()
  
  // Estados para controle de carregamento e dados
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState<boolean>(false)
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false)
  
  // Estados para os dados do formulário
  const [formData, setFormData] = useState({
    language: 'en',
    newsletter: false
  })
  
  // Garantir que locale sempre tenha um valor válido
  const currentLocale = locale || 'en'

  const handleBackToDashboard = () => {
    if (onSectionChange) {
      onSectionChange('dashboard')
    }
  }

  const handleLanguageChange = (newLocale: string) => {
    setFormData(prev => ({
      ...prev,
      language: newLocale
    }))
  }

  const handleNewsletterChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      newsletter: checked
    }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)
      setSaveSuccess(false)

      // Preparar dados para envio
      const updateData = {
        language: formData.language,
        newsletter: formData.newsletter
      }

      const response = await fetch('/api/configuration', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      })

      const result = await response.json()

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'Failed to save configuration')
      }

      setSaveSuccess(true)
      
      // Atualizar locale se necessário
      if (formData.language !== currentLocale) {
        changeLocale(formData.language)
      }
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSaveSuccess(false), 3000)
      
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Error saving configuration'
      setError(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    const fetchConfiguration = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/configuration', { cache: 'no-store' })
        const body = await res.json()
        if (!res.ok || !body?.success) {
          throw new Error(body?.error || 'Failed to load configuration')
        }
        
        // Atualizar dados do formulário
        setFormData({
          language: body.data?.language || 'en',
          newsletter: body.data?.newsletter || false
        })
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Unexpected error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    fetchConfiguration()
  }, [])

  if (loading) {
    return <SettingsSkeleton />
  }

  if (error) {
    return (
      <div className="p-4 lg:p-6">
        <div className="text-red-400">{error}</div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center">
            <FiSettings className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg lg:text-2xl font-bold text-white">{t('header.title')}</h1>
            <p className="text-white/70 text-sm lg:text-base hidden sm:block">{t('header.subtitle')}</p>
          </div>
        </div>
        
        {/* Botão de voltar */}
        {onSectionChange && (
          <Button
            onClick={handleBackToDashboard}
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('header.backButton')}</span>
            <span className="sm:hidden">{t('header.backButton')}</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">

        {/* Notificações */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FiBell className="w-5 h-5" />
              <span>{t('notifications.title')}</span>
            </CardTitle>
            <CardDescription className="text-white/70">
              {t('notifications.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{t('notifications.options.newsletter.title')}</p>
                  <p className="text-white/60 text-sm">{t('notifications.options.newsletter.description')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={formData.newsletter}
                    onChange={(e) => handleNewsletterChange(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-400 peer-checked:to-red-400"></div>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aparência */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FiGlobe className="w-5 h-5" />
              <span>{t('appearance.title')}</span>
            </CardTitle>
            <CardDescription className="text-white/70">
              {t('appearance.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">{t('appearance.options.language.label')}</label>
              <Select value={formData.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full bg-white/20 border-white/30 text-white hover:text-white/80 focus:ring-white/50">
                  <SelectValue placeholder={t('appearance.options.language.label')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">{t('appearance.options.language.options.pt')}</SelectItem>
                  <SelectItem value="en">{t('appearance.options.language.options.en')}</SelectItem>
                  <SelectItem value="es">{t('appearance.options.language.options.es')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              {saveSuccess && (
                <div className="text-green-400 text-sm font-medium">
                  {t('appearance.saveSuccess')}
                </div>
              )}
              {error && (
                <div className="text-red-400 text-sm font-medium">
                  {error}
                </div>
              )}
              <Button 
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('appearance.saving')}
                  </>
                ) : (
                  <>
                    <FiSave className="w-4 h-4 mr-2" />
                    {t('appearance.saveButton')}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
