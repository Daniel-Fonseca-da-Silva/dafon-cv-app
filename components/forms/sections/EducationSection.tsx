"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { CvSectionProps, Education } from "@/types/cv.types"
import { useState } from "react"

export function EducationSection({ data, onDataChange, onNext, onPrevious }: CvSectionProps) {
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: ''
    }
    onDataChange({
      ...data,
      educations: [...data.educations, newEducation]
    })
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

  const generateDescription = async () => {
    if (!aiPrompt.trim()) return
    
    setIsGenerating(true)
    try {
      // Simulação de chamada para API de IA
      // Em uma implementação real, você faria uma chamada para sua API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Geração de descrição baseada no prompt
      const generatedDescription = `Durante o curso de ${aiPrompt}, desenvolvi habilidades essenciais e participei de projetos relevantes que contribuíram para minha formação acadêmica e profissional.`
      
      // Aplicar a descrição gerada ao primeiro item de educação (ou criar um novo se não existir)
      if (data.educations.length > 0) {
        const firstEducation = data.educations[0]
        updateEducation(firstEducation.id, 'description', generatedDescription)
      } else {
        // Se não há educação, criar uma nova com a descrição
        const newEducation: Education = {
          id: Date.now().toString(),
          institution: '',
          degree: aiPrompt,
          startDate: '',
          endDate: '',
          description: generatedDescription
        }
        onDataChange({
          ...data,
          educations: [...data.educations, newEducation]
        })
      }
      
      setAiPrompt('')
    } catch (error) {
      console.error('Erro ao gerar descrição:', error)
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
          Educação
        </h1>
        <p className="text-white/70 text-lg">
          Sua formação acadêmica e certificações
        </p>
      </div>

      {/* Campo de IA para Gerar Descrição */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <FiZap className="w-5 h-5" />
            <span>Gerador de Descrição com IA</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            Digite o nome do seu curso e deixe a IA gerar uma descrição profissional
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ex: Engenharia de Software, Administração, Medicina..."
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                disabled={isGenerating}
              />
            </div>
            <Button
              onClick={generateDescription}
              disabled={!aiPrompt.trim() || isGenerating}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <FiLoader className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <FiZap className="w-4 h-4 mr-2" />
                  Usar IA
                </>
              )}
            </Button>
          </div>
          {isGenerating && (
            <div className="text-center">
              <p className="text-white/70 text-sm">
                Gerando descrição profissional...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Formulário */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <FiBookOpen className="w-5 h-5" />
            <span>Formação Acadêmica</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            Adicione sua formação acadêmica e certificações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.educations.map((education, index) => (
            <div key={education.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-white font-medium">Educação {index + 1}</h4>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Instituição *</label>
                  <Input
                    value={education.institution}
                    onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                    placeholder="Nome da instituição"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Curso/Grau *</label>
                  <Input
                    value={education.degree}
                    onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                    placeholder="Nome do curso"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Data de Início *</label>
                  <Input
                    type="date"
                    value={education.startDate}
                    onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Data de Conclusão</label>
                  <Input
                    type="date"
                    value={education.endDate}
                    onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                    placeholder="Deixe vazio se ainda estiver cursando"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-white/80 text-sm font-medium">Descrição</label>
                  <textarea
                    value={education.description}
                    onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
                    placeholder="Informações adicionais sobre o curso, notas, projetos..."
                    rows={3}
                    className="w-full bg-white/20 border border-white/30 text-white placeholder:text-white/60 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            onClick={addEducation}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Adicionar Educação
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
              <h4 className="text-white font-medium text-sm mb-1">Dica Acadêmica</h4>
              <p className="text-white/70 text-xs leading-relaxed">
                Inclua sua formação mais relevante primeiro. Se você tem múltiplos graus, liste-os em ordem cronológica decrescente. Certificações e cursos complementares também são valiosos para demonstrar aprendizado contínuo.
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
          Voltar
        </Button>
        <Button
          onClick={onNext}
          size="lg"
          disabled={!isFormValid()}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Continuar
          <FiArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
