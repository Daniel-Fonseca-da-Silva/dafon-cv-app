"use client"

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  FiGlobe,
  FiPlus,
  FiTrash2
} from "react-icons/fi"
import { Language } from "../../../types/cv.types"

interface LanguagesSectionProps {
  languages: Language[]
  onLanguagesChange: (languages: Language[]) => void
}

export function LanguagesSection({ languages, onLanguagesChange }: LanguagesSectionProps) {
  const t = useTranslations('cvForm.skills')
  
  // Função que retorna as linguas comuns diretamente das traduções
  const getCommonLanguages = () => {
    return [
      { key: 'english', name: t('languages.commonLanguagesList.english') },
      { key: 'spanish', name: t('languages.commonLanguagesList.spanish') },
      { key: 'french', name: t('languages.commonLanguagesList.french') },
      { key: 'german', name: t('languages.commonLanguagesList.german') },
      { key: 'italian', name: t('languages.commonLanguagesList.italian') },
      { key: 'portuguese', name: t('languages.commonLanguagesList.portuguese') }
    ]
  }

  const [newLanguage, setNewLanguage] = useState('')
  const [showAllLanguages, setShowAllLanguages] = useState(false)

  const addLanguage = (language?: string) => {
    const languageToAdd = language || newLanguage.trim()
    if (languageToAdd && !languages.some((l) => l.name === languageToAdd)) {
      const newLanguageObj: Language = {
        id: Date.now().toString(),
        name: languageToAdd,
        level: 'intermediate'
      }
      onLanguagesChange([...languages, newLanguageObj])
      if (!language) {
        setNewLanguage('')
      }
    }
  }

  const removeLanguage = (id: string) => {
    onLanguagesChange(languages.filter((l) => l.id !== id))
  }

  const updateLanguage = (id: string, level: string) => {
    onLanguagesChange(
      languages.map((l) => 
        l.id === id ? { ...l, level: level as 'basic' | 'intermediate' | 'advanced' | 'native' } : l
      )
    )
  }

  return (
    <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <FiGlobe className="w-5 h-5" />
          <span>{t('languages.title')}</span>
        </CardTitle>
        <CardDescription className="text-white/70">
          {t('languages.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Campo de entrada para novo idioma */}
        <div className="flex gap-2">
          <Input
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            placeholder={t('languages.placeholder')}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 flex-1"
            onKeyDown={(e) => e.key === 'Enter' && addLanguage()}
          />
          <Button
            type="button"
            onClick={() => addLanguage()}
            disabled={!newLanguage.trim()}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiPlus className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Sugestões de idiomas */}
        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">{t('languages.commonLanguages')}</label>
          <div className="flex flex-wrap gap-2">
            {getCommonLanguages().map((language, index) => {
              const shouldShow = index < 4 || showAllLanguages
              return (
                <button
                  key={language.key}
                  type="button"
                  onClick={() => addLanguage(language.name)}
                  disabled={languages.some((l) => l.name === language.name)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    languages.some((l) => l.name === language.name)
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg cursor-default'
                      : 'bg-white/20 border border-white/30 text-white hover:bg-white/30 shadow-sm hover:shadow-md'
                  } ${
                    shouldShow ? 'block' : 'hidden sm:block'
                  }`}
                >
                  {language.name}
                </button>
              )
            })}
          </div>
          {/* Botão para mostrar mais em mobile */}
          {getCommonLanguages().length > 4 && (
            <div className="sm:hidden">
              <button
                type="button"
                onClick={() => setShowAllLanguages(!showAllLanguages)}
                className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
              >
                {showAllLanguages ? t('languages.showLess') : t('languages.showMore')}
              </button>
            </div>
          )}
        </div>

        {/* Idiomas selecionados */}
        {languages.length > 0 && (
          <div className="space-y-2">
            <label className="text-white/80 text-sm font-medium">{t('languages.selectedLanguages')}</label>
            <div className="space-y-3">
              {languages.map((language) => (
                <div key={language.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white font-medium">{language.name}</span>
                  <div className="flex items-center gap-3">
                    <Select value={language.level} onValueChange={(value) => updateLanguage(language.id, value)}>
                      <SelectTrigger className="bg-white/20 border-white/30 text-white w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">{t('languages.levels.basic')}</SelectItem>
                        <SelectItem value="intermediate">{t('languages.levels.intermediate')}</SelectItem>
                        <SelectItem value="advanced">{t('languages.levels.advanced')}</SelectItem>
                        <SelectItem value="native">{t('languages.levels.native')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() => removeLanguage(language.id)}
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
