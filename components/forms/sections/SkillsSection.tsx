"use client"

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { 
  FiArrowLeft,
  FiSave,
  FiDownload,
  FiLoader,
  FiCheck,
  FiX
} from "react-icons/fi"
import { CvSectionProps, Language } from "../../../types/cv.types"
import { SkillAreasSection } from "./SkillAreasSection"
import { LanguagesSection } from "./LanguagesSection"
import { useAuth } from "@/hooks/use-auth"

export function SkillsSection({ data, onDataChange, onPrevious, onCvSaved }: CvSectionProps) {
  const t = useTranslations('cvForm.skills')
  const { user, authenticated } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [saveMessage, setSaveMessage] = useState('')

  const handleAreasChange = (areas: string[]) => {
    onDataChange({
      ...data,
      skillsData: {
        ...data.skillsData,
        areas
      }
    })
  }

  const handleLanguagesChange = (languages: Language[]) => {
    onDataChange({
      ...data,
      skillsData: {
        ...data.skillsData,
        languages
      }
    })
  }

  const isFormValid = () => {
    return data.skillsData.areas.length > 0
  }

  const handleSave = async () => {
    // Verificar se o usuário está autenticado
    if (!authenticated || !user?.id) {
      setSaveStatus('error')
      setSaveMessage('User not authenticated. Please login to save the CV.')
      return
    }

    setIsSaving(true)
    setSaveStatus('idle')
    setSaveMessage('')

    try {
      const userId = user.id
      
      const response = await fetch('/api/save-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cvData: data,
          userId
        })
      })

      const result = await response.json()

      if (!response.ok) {
        setSaveStatus('error')
        setSaveMessage(result.error || 'Error saving CV')
        if (result.details) {
          console.error('Error details:', result.details)
        }
      } else {
        setSaveStatus('success')
        setSaveMessage(result.message || 'CV saved successfully!')
        // Chamar callback se fornecido
        if (onCvSaved) {
          setTimeout(() => {
            onCvSaved()
          }, 2000) // Aguardar 2 segundos para mostrar a mensagem de sucesso
        }
      }
    } catch (error) {
      setSaveStatus('error')
      setSaveMessage('Unexpected error saving CV')
      console.error('Error saving CV:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownload = () => {
    // Implementar lógica de download
    console.log('Downloading CV...', data)
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

      {/* Áreas de Habilidade */}
      <SkillAreasSection
        areas={data.skillsData.areas}
        onAreasChange={handleAreasChange}
      />


      {/* Idiomas */}
      <LanguagesSection
        languages={data.skillsData.languages}
        onLanguagesChange={handleLanguagesChange}
      />

      {/* Status de Salvamento */}
      {saveMessage && (
        <div className={`p-4 rounded-lg border ${
          saveStatus === 'success' 
            ? 'bg-green-500/20 border-green-400/30 text-green-300' 
            : 'bg-red-500/20 border-red-400/30 text-red-300'
        }`}>
          <div className="flex items-center space-x-2">
            {saveStatus === 'success' ? (
              <FiCheck className="w-5 h-5" />
            ) : (
              <FiX className="w-5 h-5" />
            )}
            <span className="font-medium">{saveMessage}</span>
          </div>
        </div>
      )}

      {/* Botões de Navegação e Ação */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button
          onClick={onPrevious}
          size="lg"
          className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <FiArrowLeft className="w-5 h-5 mr-2" />
          {t('navigation.back')}
        </Button>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleSave}
            size="lg"
            disabled={!isFormValid() || isSaving}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isSaving ? (
              <FiLoader className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <FiSave className="w-5 h-5 mr-2" />
            )}
            {isSaving ? 'Saving...' : t('navigation.save')}
          </Button>
        </div>
      </div>
    </div>
  )
}
