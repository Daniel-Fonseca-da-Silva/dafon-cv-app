"use client"

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  FiAward,
  FiPlus,
  FiX,
  FiZap
} from "react-icons/fi"

interface SkillAreasSectionProps {
  areas: string[]
  onAreasChange: (areas: string[]) => void
}

export function SkillAreasSection({ areas, onAreasChange }: SkillAreasSectionProps) {
  const t = useTranslations('cvForm.skills')
  
  // Função que retorna as áreas de habilidades diretamente das traduções
  const getSkillAreas = () => {
    return [
      { key: 'mobileDevelopment', name: t('skillAreasList.mobileDevelopment') },
      { key: 'devOps', name: t('skillAreasList.devOps') },
      { key: 'dataScience', name: t('skillAreasList.dataScience') },
      { key: 'machineLearning', name: t('skillAreasList.machineLearning') },
      { key: 'uiUxDesign', name: t('skillAreasList.uiUxDesign') },
      { key: 'productManagement', name: t('skillAreasList.productManagement') },
      { key: 'projectManagement', name: t('skillAreasList.projectManagement') },
      { key: 'qualityAssurance', name: t('skillAreasList.qualityAssurance') },
      { key: 'cybersecurity', name: t('skillAreasList.cybersecurity') },
      { key: 'cloudComputing', name: t('skillAreasList.cloudComputing') },
      { key: 'constructionCivilEngineering', name: t('skillAreasList.constructionCivilEngineering') },
      { key: 'healthcareMedicine', name: t('skillAreasList.healthcareMedicine') }
    ]
  }

  const [newArea, setNewArea] = useState('')
  const [showAllAreas, setShowAllAreas] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const addArea = (area?: string) => {
    const areaToAdd = area || newArea.trim()
    if (areaToAdd && !areas.includes(areaToAdd)) {
      onAreasChange([...areas, areaToAdd])
      if (!area) {
        setNewArea('')
      }
    }
  }

  const removeArea = (area: string) => {
    onAreasChange(areas.filter(a => a !== area))
  }

  const generateAISkills = async () => {
    if (!aiPrompt.trim()) return
    
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-skill-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: aiPrompt
        })
      })

      if (!response.ok) {
        throw new Error(`Error in request: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.success && result.data?.filtered_content) {
        const skills = result.data.filtered_content
          .split(/[,\n]/)
          .map((skill: string) => skill.trim())
          .filter((skill: string) => skill.length > 0)
        
        const newAreas = skills.filter((area: string) => !areas.includes(area))
        
        if (newAreas.length > 0) {
          onAreasChange([...areas, ...newAreas])
        }
        setAiPrompt('')
      } else {
        throw new Error(result.error || 'Error processing skills')
      }
    } catch (error) {
      console.error('Error generating skills:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <FiAward className="w-5 h-5" />
          <span>{t('skillAreas.title')}</span>
        </CardTitle>
        <CardDescription className="text-white/70">
          {t('skillAreas.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Campo de IA para gerar habilidades */}
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="flex gap-2">
            <Input
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder={t('skillAreas.aiPrompt.placeholder')}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 flex-1"
              disabled={isGenerating}
            />
            <Button
              type="button"
              onClick={generateAISkills}
              disabled={!aiPrompt.trim() || isGenerating}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <FiZap className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <FiZap className="w-4 h-4 mr-1" />
                  {t('skillAreas.useAiButton')}
                </>
              )}
            </Button>
          </div>
          {isGenerating && (
            <div className="text-center mt-2">
              <p className="text-white/70 text-sm">
                {t('skillAreas.aiPrompt.generating')}
              </p>
            </div>
          )}
        </div>

        {/* Campo de entrada para nova área */}
        <div className="flex gap-2">
          <Input
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            placeholder={t('skillAreas.placeholder')}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 flex-1"
            onKeyDown={(e) => e.key === 'Enter' && addArea()}
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
          <label className="text-white/80 text-sm font-medium">{t('skillAreas.suggestions')}</label>
          <div className="flex flex-wrap gap-2">
            {getSkillAreas().map((area, index) => {
              const shouldShow = index < 6 || showAllAreas
              return (
                <button
                  key={area.key}
                  type="button"
                  onClick={() => addArea(area.name)}
                  disabled={areas.includes(area.name)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    areas.includes(area.name)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg cursor-default'
                      : 'bg-white/20 border border-white/30 text-white hover:bg-white/30 shadow-sm hover:shadow-md'
                  } ${
                    shouldShow ? 'block' : 'hidden sm:block'
                  }`}
                >
                  {area.name}
                </button>
              )
            })}
          </div>
          {/* Botão para mostrar mais em mobile */}
          {getSkillAreas().length > 6 && (
            <div className="sm:hidden">
              <button
                type="button"
                onClick={() => setShowAllAreas(!showAllAreas)}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                {showAllAreas ? t('skillAreas.showLess') : t('skillAreas.showMore')}
              </button>
            </div>
          )}
        </div>

        {/* Áreas selecionadas */}
        {areas.length > 0 && (
          <div className="space-y-2">
            <label className="text-white/80 text-sm font-medium">{t('skillAreas.selectedAreas')}</label>
            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
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
  )
}
