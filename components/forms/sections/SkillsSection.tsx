"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  FiAward,
  FiPlus,
  FiTrash2,
  FiArrowLeft,
  FiSave,
  FiDownload,
  FiX,
  FiCalendar,
  FiGlobe,
  FiZap
} from "react-icons/fi"
import { CvSectionProps, Language } from "@/types/cv.types"

const SKILL_AREAS = [
  'Frontend Development', 'Backend Development', 'Full Stack Development',
  'Mobile Development', 'DevOps', 'Data Science', 'Machine Learning',
  'UI/UX Design', 'Product Management', 'Project Management',
  'Quality Assurance', 'Cybersecurity', 'Cloud Computing',
  'Database Administration', 'System Administration'
]

const COMMON_LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Chinese', 'Japanese', 'Korean', 'Arabic', 'Russian', 'Dutch'
]

export function SkillsSection({ data, onDataChange, onPrevious }: CvSectionProps) {
  const [newArea, setNewArea] = useState('')
  const [newLanguage, setNewLanguage] = useState('')
  const [showAllAreas, setShowAllAreas] = useState(false)
  const [showAllLanguages, setShowAllLanguages] = useState(false)

  const addArea = (area?: string) => {
    const areaToAdd = area || newArea.trim()
    if (areaToAdd && !data.skillsData.areas.includes(areaToAdd)) {
      onDataChange({
        ...data,
        skillsData: {
          ...data.skillsData,
          areas: [...data.skillsData.areas, areaToAdd]
        }
      })
      if (!area) {
        setNewArea('')
      }
    }
  }

  const removeArea = (area: string) => {
    onDataChange({
      ...data,
      skillsData: {
        ...data.skillsData,
        areas: data.skillsData.areas.filter(a => a !== area)
      }
    })
  }

  const addLanguage = (language?: string) => {
    const languageToAdd = language || newLanguage.trim()
    if (languageToAdd && !data.skillsData.languages.some(l => l.name === languageToAdd)) {
      const newLanguageObj: Language = {
        id: Date.now().toString(),
        name: languageToAdd,
        level: 'intermediario'
      }
      onDataChange({
        ...data,
        skillsData: {
          ...data.skillsData,
          languages: [...data.skillsData.languages, newLanguageObj]
        }
      })
      if (!language) {
        setNewLanguage('')
      }
    }
  }

  const removeLanguage = (id: string) => {
    onDataChange({
      ...data,
      skillsData: {
        ...data.skillsData,
        languages: data.skillsData.languages.filter(l => l.id !== id)
      }
    })
  }

  const updateLanguage = (id: string, level: string) => {
    onDataChange({
      ...data,
      skillsData: {
        ...data.skillsData,
        languages: data.skillsData.languages.map(l => 
          l.id === id ? { ...l, level: level as 'basico' | 'intermediario' | 'avancado' | 'nativo' } : l
        )
      }
    })
  }

  const updateAvailabilityDate = (date: string) => {
    onDataChange({
      ...data,
      skillsData: {
        ...data.skillsData,
        availabilityDate: date
      }
    })
  }

  const generateAISkills = () => {
    // Áreas de habilidade comuns para diferentes perfis
    const commonSkillAreas = [
      'Frontend Development',
      'Backend Development', 
      'Full Stack Development',
      'UI/UX Design',
      'Project Management'
    ]
    
    // Adiciona as áreas que ainda não estão selecionadas
    const newAreas = commonSkillAreas.filter(area => !data.skillsData.areas.includes(area))
    
    if (newAreas.length > 0) {
      onDataChange({
        ...data,
        skillsData: {
          ...data.skillsData,
          areas: [...data.skillsData.areas, ...newAreas]
        }
      })
    }
  }

  const isFormValid = () => {
    return data.skillsData.areas.length > 0 && data.skillsData.availabilityDate.trim() !== ''
  }

  const handleSave = () => {
    // Implementar lógica de salvamento
    console.log('Salvando currículo...', data)
  }

  const handleDownload = () => {
    // Implementar lógica de download
    console.log('Baixando currículo...', data)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          Habilidades e Competências
        </h1>
        <p className="text-white/70 text-lg">
          Defina suas áreas de expertise, disponibilidade e idiomas
        </p>
      </div>

      {/* Áreas de Habilidade */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center space-x-2">
                <FiAward className="w-5 h-5" />
                <span>Áreas de Habilidade</span>
              </CardTitle>
              <CardDescription className="text-white/70">
                Selecione ou adicione suas áreas de expertise
              </CardDescription>
            </div>
            <Button
              onClick={generateAISkills}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <FiZap className="w-4 h-4" />
              Use AI
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Campo de entrada para nova área */}
          <div className="flex gap-2">
            <Input
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              placeholder="Digite uma área de habilidade..."
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 flex-1"
              onKeyPress={(e) => e.key === 'Enter' && addArea()}
            />
            <Button
              type="button"
              onClick={() => addArea()}
              disabled={!newArea.trim()}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiPlus className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Sugestões de áreas */}
          <div className="space-y-2">
            <label className="text-white/80 text-sm font-medium">Sugestões:</label>
            <div className="flex flex-wrap gap-2">
              {SKILL_AREAS.map((area, index) => {
                const shouldShow = index < 6 || showAllAreas
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => addArea(area)}
                    disabled={data.skillsData.areas.includes(area)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      data.skillsData.areas.includes(area)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg cursor-default'
                        : 'bg-white/20 border border-white/30 text-white hover:bg-white/30 shadow-sm hover:shadow-md'
                    } ${
                      // Mostrar apenas 6 primeiros em mobile, todos em desktop
                      shouldShow ? 'block' : 'hidden sm:block'
                    }`}
                  >
                    {area}
                  </button>
                )
              })}
            </div>
            {/* Botão para mostrar mais em mobile */}
            {SKILL_AREAS.length > 6 && (
              <div className="sm:hidden">
                <button
                  type="button"
                  onClick={() => setShowAllAreas(!showAllAreas)}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  {showAllAreas ? 'Ver menos...' : 'Ver mais sugestões...'}
                </button>
              </div>
            )}
          </div>

          {/* Áreas selecionadas */}
          {data.skillsData.areas.length > 0 && (
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Áreas Selecionadas:</label>
              <div className="flex flex-wrap gap-2">
                {data.skillsData.areas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 px-3 py-2 rounded-lg text-sm border border-blue-400/30"
                  >
                    {area}
                    <button
                      type="button"
                      onClick={() => removeArea(area)}
                      className="hover:text-red-300 transition-colors"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data de Disponibilidade */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <FiCalendar className="w-5 h-5" />
            <span>Data de Disponibilidade</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            Quando você estará disponível para começar?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="date"
            value={data.skillsData.availabilityDate}
            onChange={(e) => updateAvailabilityDate(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
            required
          />
        </CardContent>
      </Card>

      {/* Idiomas */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <FiGlobe className="w-5 h-5" />
            <span>Idiomas</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            Selecione ou adicione os idiomas que você fala
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Campo de entrada para novo idioma */}
          <div className="flex gap-2">
            <Input
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Digite um idioma..."
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 flex-1"
              onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
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
            <label className="text-white/80 text-sm font-medium">Idiomas Comuns:</label>
            <div className="flex flex-wrap gap-2">
              {COMMON_LANGUAGES.map((language, index) => {
                const shouldShow = index < 4 || showAllLanguages
                return (
                  <button
                    key={language}
                    type="button"
                    onClick={() => addLanguage(language)}
                    disabled={data.skillsData.languages.some(l => l.name === language)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      data.skillsData.languages.some(l => l.name === language)
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg cursor-default'
                        : 'bg-white/20 border border-white/30 text-white hover:bg-white/30 shadow-sm hover:shadow-md'
                    } ${
                      // Mostrar apenas 6 primeiros em mobile, todos em desktop
                      shouldShow ? 'block' : 'hidden sm:block'
                    }`}
                  >
                    {language}
                  </button>
                )
              })}
            </div>
            {/* Botão para mostrar mais em mobile */}
            {COMMON_LANGUAGES.length > 4 && (
              <div className="sm:hidden">
                <button
                  type="button"
                  onClick={() => setShowAllLanguages(!showAllLanguages)}
                  className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                >
                  {showAllLanguages ? 'Ver menos...' : 'Ver mais idiomas...'}
                </button>
              </div>
            )}
          </div>

          {/* Idiomas selecionados */}
          {data.skillsData.languages.length > 0 && (
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Idiomas Selecionados:</label>
              <div className="space-y-3">
                {data.skillsData.languages.map((language) => (
                  <div key={language.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-white font-medium">{language.name}</span>
                    <div className="flex items-center gap-3">
                      <Select value={language.level} onValueChange={(value) => updateLanguage(language.id, value)}>
                        <SelectTrigger className="bg-white/20 border-white/30 text-white w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basico">Básico</SelectItem>
                          <SelectItem value="intermediario">Intermediário</SelectItem>
                          <SelectItem value="avancado">Avançado</SelectItem>
                          <SelectItem value="nativo">Nativo</SelectItem>
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

      {/* Botões de Navegação e Ação */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button
          onClick={onPrevious}
          size="lg"
          className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <FiArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </Button>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleSave}
            size="lg"
            disabled={!isFormValid()}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <FiSave className="w-5 h-5 mr-2" />
            Salvar Currículo
          </Button>
          <Button
            onClick={handleDownload}
            size="lg"
            disabled={!isFormValid()}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <FiDownload className="w-5 h-5 mr-2" />
            Baixar PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
