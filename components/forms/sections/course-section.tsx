"use client"

import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  FiBookOpen,
  FiArrowRight,
  FiArrowLeft,
  FiInfo,
  FiZap,
  FiLoader
} from "react-icons/fi"
import { CvSectionProps } from "../../../types/cv.types"
import type { Course } from "@/types/cv.types"
import { useEffect, useState } from "react"

export function CourseSection({ data, onDataChange, onNext, onPrevious }: CvSectionProps) {
  const t = useTranslations('cvForm.courses')
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Garante que o utilizador tenha imediatamente um campo para escrever cursos
  useEffect(() => {
    const hasCourses = Array.isArray(data.courses) && data.courses.length > 0
    if (!hasCourses) {
      const newCourse: Course = {
        id: Date.now().toString(),
        name: '',
        institution: '',
        completionDate: '',
        description: ''
      }
      onDataChange({
        ...data,
        courses: [newCourse]
      })
    }
    // Dependemos apenas do comprimento para evitar loops desnecessários
  }, [data, onDataChange])

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    onDataChange({
      ...data,
      courses: data.courses.map((course: Course) => 
        course.id === id ? { ...course, [field]: value } : course
      )
    })
  }

  const generateCoursesList = async () => {
    if (!aiPrompt.trim()) return
    
    setIsGenerating(true)
    try {
      // Fazer requisição para a rota interna do Next.js
      const response = await fetch('/api/generate-courses-ai', {
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
        // Aplicar a lista gerada ao curso
        if (data.courses.length > 0) {
          const firstCourse = data.courses[0]
          updateCourse(firstCourse.id, 'description', result.data.filtered_content)
        } else {
          // Se não há cursos, criar um novo com a lista
          const newCourse: Course = {
            id: Date.now().toString(),
            name: '',
            institution: '',
            completionDate: '',
            description: result.data.filtered_content
          }
          onDataChange({
            ...data,
            courses: [newCourse]
          })
        }
        setAiPrompt('')
      } else {
        throw new Error(result.error || 'Error processing courses list')
      }
    } catch (error) {
      console.error('Error generating courses list:', error)
      // Em caso de erro, manter o prompt para o usuário tentar novamente
    } finally {
      setIsGenerating(false)
    }
  }

  const isFormValid = () => {
    return data.courses.some((course: Course) => 
      course.description.trim() !== ''
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

      {/* Campo de IA para Gerar Lista de Cursos */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <FiZap className="w-5 h-5" />
            <span>{t('aiGenerator.title')}</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            {t('aiGenerator.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder={t('aiGenerator.placeholder')}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                disabled={isGenerating}
              />
            </div>
            <Button
              onClick={generateCoursesList}
              disabled={!aiPrompt.trim() || isGenerating}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <FiLoader className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <FiZap className="w-4 h-4 mr-2" />
                  {t('aiGenerator.useAiButton')}
                </>
              )}
            </Button>
          </div>
          {isGenerating && (
            <div className="text-center">
              <p className="text-white/70 text-sm">
                {t('aiGenerator.generating')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cards de Cursos */}
      {data.courses.map((course: Course) => (
        <Card key={course.id} className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl rounded-xl">
          <CardContent className="p-6">
            {/* Header do Card */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <FiBookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white text-lg font-semibold">{t('coursesTitle')}</h3>
            </div>

            {/* Campo de Descrição */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">{t('fields.description.label')}</label>
              <Textarea
                value={course.description}
                onChange={(e) => updateCourse(course.id, 'description', e.target.value)}
                placeholder={t('fields.description.placeholder')}
                rows={12}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:ring-2 focus:ring-emerald-400/50"
              />
            </div>
          </CardContent>
        </Card>
      ))}

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
