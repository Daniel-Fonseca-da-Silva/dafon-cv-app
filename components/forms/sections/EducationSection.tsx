"use client"

import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  FiBookOpen,
  FiPlus,
  FiTrash2,
  FiArrowRight,
  FiArrowLeft,
  FiInfo,
  FiZap,
  FiLoader
} from "react-icons/fi"
import { CvSectionProps, Education } from "../../../types/cv.types"
import { useState } from "react"

export function EducationSection({ data, onDataChange, onNext, onPrevious }: CvSectionProps) {
  const t = useTranslations('cvForm.education')
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [targetEducationIndex, setTargetEducationIndex] = useState(0)

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrentlyStudying: false
    }
    onDataChange({
      ...data,
      educations: [...data.educations, newEducation]
    })
    // Atualizar o índice para o novo card de educação
    setTargetEducationIndex(data.educations.length)
  }

  const removeEducation = (id: string) => {
    onDataChange({
      ...data,
      educations: data.educations.filter(edu => edu.id !== id)
    })
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onDataChange({
      ...data,
      educations: data.educations.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    })
  }

  const generateDescription = async (educationIndex: number) => {
    if (!aiPrompt.trim()) return
    
    setTargetEducationIndex(educationIndex)
    setIsGenerating(true)
    try {
      // Fazer requisição para a rota interna do Next.js
      const response = await fetch('/api/generate-academic-ai', {
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
        // Aplicar a descrição gerada ao card de educação específico
        if (data.educations.length > educationIndex) {
          const targetEducation = data.educations[educationIndex]
          updateEducation(targetEducation.id, 'description', result.data.filtered_content)
        }
        setAiPrompt('')
      } else {
        throw new Error(result.error || 'Error processing academic description')
      }
    } catch (error) {
      console.error('Error generating description:', error)
      // Em caso de erro, manter o prompt para o usuário tentar novamente
    } finally {
      setIsGenerating(false)
    }
  }

  const isFormValid = () => {
    return data.educations.every(edu => 
      edu.institution.trim() !== '' && 
      edu.degree.trim() !== '' && 
      edu.startDate.trim() !== ''
    )
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
    
      {/* Formulário */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <FiBookOpen className="w-5 h-5" />
            <span>{t('formTitle')}</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            {t('formSubtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.educations.map((education, index) => (
            <div key={education.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
              {/* Cabeçalho do card - responsivo */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-white font-medium">{t('educationNumber', { number: index + 1 })}</h4>
                  {data.educations.length > 1 && (
                    <Button
                      onClick={() => removeEducation(education.id)}
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                {/* Seção de IA - responsiva */}
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    <div className="flex-1">
                      <Input
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder={t('aiPrompt.placeholder')}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60 w-full text-sm"
                        disabled={isGenerating}
                      />
                    </div>
                    <Button
                      onClick={() => generateDescription(index)}
                      disabled={!aiPrompt.trim() || isGenerating}
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    >
                      {isGenerating ? (
                        <FiLoader className="w-3 h-3 animate-spin" />
                      ) : (
                        <>
                          <FiZap className="w-3 h-3 mr-1" />
                          {t('aiPrompt.useAiButton')}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">{t('fields.institution.label')}</label>
                  <Input
                    value={education.institution || ''}
                    onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                    placeholder={t('fields.institution.placeholder')}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">{t('fields.degree.label')}</label>
                  <Input
                    value={education.degree || ''}
                    onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                    placeholder={t('fields.degree.placeholder')}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">{t('fields.startDate.label')}</label>
                  <Input
                    type="date"
                    value={education.startDate || ''}
                    onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">{t('fields.endDate.label')}</label>
                  <Input
                    type="date"
                    value={education.endDate || ''}
                    onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                    placeholder={t('fields.endDate.placeholder')}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    disabled={education.isCurrentlyStudying}
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`currently-studying-${education.id}`}
                      checked={education.isCurrentlyStudying}
                      onChange={(e) => {
                        const isCurrentlyStudying = e.target.checked
                        const currentDate = new Date().toISOString().split('T')[0]
                        onDataChange({
                          ...data,
                          educations: data.educations.map(edu => 
                            edu.id === education.id 
                              ? { ...edu, isCurrentlyStudying, endDate: isCurrentlyStudying ? currentDate : edu.endDate }
                              : edu
                          )
                        })
                      }}
                      className="w-4 h-4 text-purple-600 bg-white/20 border-white/30 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <label htmlFor={`currently-studying-${education.id}`} className="text-white/80 text-sm font-medium">
                      {t('fields.currentlyStudying')}
                    </label>
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-white/80 text-sm font-medium">{t('fields.description.label')}</label>
                  <Textarea
                    value={education.description || ''}
                    onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
                    placeholder={t('fields.description.placeholder')}
                    rows={3}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:ring-2 focus:ring-blue-400/50"
                  />
                  {isGenerating && targetEducationIndex === index && (
                    <div className="text-center">
                      <p className="text-white/70 text-xs">
                        {t('aiPrompt.generating', { number: index + 1 })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Button
            onClick={addEducation}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            {t('addEducationButton')}
          </Button>
        </CardContent>
      </Card>

      {/* Dica Profissional */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl rounded-xl">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <FiInfo className="w-4 h-4 text-emerald-400" />
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

      {/* Botões de Navegação - responsivos */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
        <Button
          onClick={onPrevious}
          size="lg"
          className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 sm:px-8 py-3 shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
        >
          <FiArrowLeft className="w-5 h-5 mr-2" />
          {t('navigation.back')}
        </Button>
        <Button
          onClick={onNext}
          size="lg"
          disabled={!isFormValid()}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
        >
          {t('navigation.continue')}
          <FiArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
