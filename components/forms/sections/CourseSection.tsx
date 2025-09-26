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
import { CvSectionProps, Course } from "@/types/cv.types"
import { useState } from "react"

export function CourseSection({ data, onDataChange, onNext, onPrevious }: CvSectionProps) {
  const t = useTranslations('cvForm.courses')
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)


  const updateCourse = (id: string, field: keyof Course, value: string) => {
    onDataChange({
      ...data,
      courses: data.courses.map(course => 
        course.id === id ? { ...course, [field]: value } : course
      )
    })
  }

  const generateCoursesList = async () => {
    if (!aiPrompt.trim()) return
    
    setIsGenerating(true)
    try {
      // Simulação de chamada para API de IA
      // Em uma implementação real, você faria uma chamada para sua API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Geração de lista de cursos baseada no prompt
      const generatedCourses = `CURSOS E CERTIFICAÇÕES RELACIONADOS A ${aiPrompt.toUpperCase()}

1. Curso de Fundamentos em ${aiPrompt}
   • Instituição: Coursera/Udemy
   • Período: 2024
   • Descrição: Curso introdutório cobrindo conceitos básicos e fundamentais da área.

2. Especialização em ${aiPrompt} Avançado
   • Instituição: Universidade Virtual/Plataforma Online
   • Período: 2024
   • Descrição: Especialização aprofundada com foco em aplicações práticas e casos reais.

3. Certificação Profissional em ${aiPrompt}
   • Instituição: Instituto de Certificação
   • Período: 2024
   • Descrição: Certificação reconhecida pelo mercado com validade internacional.

4. Workshop Prático de ${aiPrompt}
   • Instituição: Centro de Treinamento
   • Período: 2024
   • Descrição: Workshop hands-on com projetos práticos e mentoria especializada.

5. Curso Online de ${aiPrompt} para Iniciantes
   • Instituição: Plataforma de Ensino Online
   • Período: 2024
   • Descrição: Curso estruturado para iniciantes com exercícios e projetos.

6. Masterclass em ${aiPrompt} e Aplicações
   • Instituição: Academia Digital
   • Período: 2024
   • Descrição: Masterclass com especialistas da área e estudos de caso.

7. Bootcamp Intensivo de ${aiPrompt}
   • Instituição: Escola de Tecnologia
   • Período: 2024
   • Descrição: Bootcamp imersivo com foco em desenvolvimento prático e networking.

8. Curso de ${aiPrompt} e Tendências do Mercado
   • Instituição: Instituto de Pesquisa
   • Período: 2024
   • Descrição: Curso atualizado com as últimas tendências e inovações do mercado.

Estes cursos demonstram compromisso com aprendizado contínuo e desenvolvimento profissional na área de ${aiPrompt}.`
      
      // Aplicar a lista gerada ao curso
      if (data.courses.length > 0) {
        const firstCourse = data.courses[0]
        updateCourse(firstCourse.id, 'description', generatedCourses)
      } else {
        // Se não há cursos, criar um novo com a lista
        const newCourse: Course = {
          id: Date.now().toString(),
          name: '',
          institution: '',
          startDate: '',
          endDate: '',
          description: generatedCourses
        }
        onDataChange({
          ...data,
          courses: [newCourse]
        })
      }
      
      setAiPrompt('')
    } catch (error) {
      console.error('Erro ao gerar lista de cursos:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const isFormValid = () => {
    return data.courses.some(course => 
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
      {data.courses.map((course) => (
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
