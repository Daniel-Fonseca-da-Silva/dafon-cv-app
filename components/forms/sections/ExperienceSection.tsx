"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  FiBriefcase,
  FiPlus,
  FiTrash2,
  FiArrowRight,
  FiArrowLeft,
  FiInfo,
  FiZap
} from "react-icons/fi"
import { CvSectionProps, Experience } from "@/types/cv.types"

export function ExperienceSection({ data, onDataChange, onNext, onPrevious }: CvSectionProps) {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrentJob: false
    }
    onDataChange({
      ...data,
      experiences: [...data.experiences, newExperience]
    })
  }

  const removeExperience = (id: string) => {
    onDataChange({
      ...data,
      experiences: data.experiences.filter(exp => exp.id !== id)
    })
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onDataChange({
      ...data,
      experiences: data.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    })
  }

  const isFormValid = () => {
    return data.experiences.every(exp => 
      exp.company.trim() !== '' && 
      exp.position.trim() !== '' && 
      exp.startDate.trim() !== ''
    )
  }

  const generateAIDescription = async (experienceId: string) => {
    const experience = data.experiences.find(exp => exp.id === experienceId)
    if (!experience) return

    // Simulação de geração de IA - em produção, você faria uma chamada real para uma API
    const aiDescription = `Como ${experience.position} na ${experience.company}, sou responsável por:

• Desenvolver e implementar soluções inovadoras
• Colaborar com equipes multidisciplinares
• Otimizar processos e melhorar a eficiência operacional
• Contribuir para o crescimento e sucesso da empresa

Principais conquistas:
• Resultados mensuráveis e impacto positivo no negócio
• Liderança em projetos estratégicos
• Desenvolvimento contínuo de habilidades técnicas e interpessoais`

    updateExperience(experienceId, 'description', aiDescription)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          Work Experience
        </h1>
        <p className="text-white/70 text-lg">
          Conte-nos sobre sua trajetória profissional
        </p>
      </div>

      {/* Botão Add Work Experience */}
      <Button
        onClick={addExperience}
        className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-200 rounded-xl py-4"
      >
        <FiPlus className="w-5 h-5 mr-2" />
        Add Work Experience
      </Button>

      {/* Cards de Experiência */}
      {data.experiences.map((experience, index) => (
        <Card key={experience.id} className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl rounded-xl">
          <CardContent className="p-6">
            {/* Header do Card com botão de remover */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <FiBriefcase className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white text-lg font-semibold">Work Experience {index + 1}</h3>
              </div>
              {data.experiences.length > 1 && (
                <Button
                  onClick={() => removeExperience(experience.id)}
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 hover:text-pink-200"
                >
                  <FiTrash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Campos do formulário */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">Job Title *</label>
                <Input
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                  placeholder="e.g., Software Developer"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-lg h-12"
                  required
                />
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">Company Name *</label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="e.g., Tech Company Inc."
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-lg h-12"
                  required
                />
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">Start Date *</label>
                <Input
                  type="date"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  placeholder="mm/dd/yyyy"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-lg h-12"
                  required
                />
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">End Date</label>
                <div className="space-y-3">
                  <Input
                    type="date"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    placeholder="mm/dd/yyyy"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-lg h-12"
                    disabled={experience.isCurrentJob}
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`current-job-${experience.id}`}
                      checked={experience.isCurrentJob}
                      onChange={(e) => {
                        const isCurrent = e.target.checked
                        onDataChange({
                          ...data,
                          experiences: data.experiences.map(exp => 
                            exp.id === experience.id 
                              ? { ...exp, isCurrentJob: isCurrent, endDate: isCurrent ? '' : exp.endDate }
                              : exp
                          )
                        })
                      }}
                      className="w-4 h-4 text-purple-600 bg-white/20 border-white/30 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <label htmlFor={`current-job-${experience.id}`} className="text-white/80 text-sm font-medium">
                      I currently work here
                    </label>
                  </div>
                </div>
              </div>

              {/* Company Description */}
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-white/80 text-sm font-medium">Company Description</label>
                  <Button
                    onClick={() => generateAIDescription(experience.id)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                  >
                    <FiZap className="w-4 h-4" />
                    Use AI
                  </Button>
                </div>
                <textarea
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  placeholder="Brief description of the company and your role..."
                  rows={4}
                  className="w-full bg-white/20 border border-white/30 text-white placeholder:text-white/60 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Dica Profissional */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl rounded-xl">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <FiInfo className="w-4 h-4 text-pink-400" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-1">Dica Profissional</h4>
              <p className="text-white/70 text-xs leading-relaxed">
                Inclua conquistas específicas e responsabilidades em sua experiência profissional. Use verbos de ação e quantifique suas realizações sempre que possível. Isso ajuda os recrutadores a entenderem seu impacto e valor.
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
