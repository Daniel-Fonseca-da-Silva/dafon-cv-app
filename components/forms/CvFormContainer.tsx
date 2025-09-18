"use client"

import { useState } from 'react'
import { PersonalInfoSection } from './sections/PersonalInfoSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { EducationSection } from './sections/EducationSection'
import { SkillsSection } from './sections/SkillsSection'
import { SocialSection } from './sections/SocialSection'
import { CvData, CvSection } from '@/types/cv.types'

const initialCvData: CvData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    driverLicense: [],
    aboutYourself: ''
  },
  experiences: [
    { id: '1', company: '', position: '', startDate: '', endDate: '', description: '', isCurrentJob: false }
  ],
  educations: [
    { id: '1', institution: '', degree: '', startDate: '', endDate: '', description: '' }
  ],
  skills: [
    { id: '1', name: '', level: 'iniciante' }
  ],
  skillsData: {
    areas: [],
    availabilityDate: '',
    languages: []
  },
  socialLinks: []
}

export function CvFormContainer() {
  const [currentSection, setCurrentSection] = useState<CvSection>('personal')
  const [cvData, setCvData] = useState<CvData>(initialCvData)

  const handleDataChange = (newData: CvData) => {
    setCvData(newData)
  }

  const handleNext = () => {
    switch (currentSection) {
      case 'personal':
        setCurrentSection('education')
        break
      case 'education':
        setCurrentSection('experience')
        break
      case 'experience':
        setCurrentSection('social')
        break
      case 'social':
        setCurrentSection('skills')
        break
      case 'skills':
        setCurrentSection('complete')
        break
      default:
        break
    }
  }

  const handlePrevious = () => {
    switch (currentSection) {
      case 'education':
        setCurrentSection('personal')
        break
      case 'experience':
        setCurrentSection('education')
        break
      case 'social':
        setCurrentSection('experience')
        break
      case 'skills':
        setCurrentSection('social')
        break
      default:
        break
    }
  }

  const renderCurrentSection = () => {
    const commonProps = {
      data: cvData,
      onDataChange: handleDataChange,
      onNext: handleNext,
      onPrevious: currentSection !== 'personal' ? handlePrevious : undefined
    }

    switch (currentSection) {
      case 'personal':
        return <PersonalInfoSection {...commonProps} />
      case 'education':
        return <EducationSection {...commonProps} />
      case 'experience':
        return <ExperienceSection {...commonProps} />
      case 'social':
        return <SocialSection {...commonProps} />
      case 'skills':
        return <SkillsSection {...commonProps} />
      case 'complete':
        return (
          <div className="text-center space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Currículo Criado com Sucesso!
            </h1>
            <p className="text-white/70 text-lg">
              Seu currículo foi salvo e está pronto para download.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentSection('personal')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Criar Novo Currículo
              </button>
            </div>
          </div>
        )
      default:
        return <PersonalInfoSection {...commonProps} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-2 sm:space-x-4 px-4">
            {(['personal', 'education', 'experience', 'social', 'skills'] as CvSection[]).map((section, index) => {
              const isActive = currentSection === section
              const isCompleted = ['personal', 'education', 'experience', 'social', 'skills'].indexOf(currentSection) > index
              
              return (
                <div key={section} className="flex items-center">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : isCompleted
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                        : 'bg-white/20 text-white/60 hover:bg-white/30'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < 4 && (
                    <div
                      className={`w-8 sm:w-12 md:w-16 h-1 mx-1 sm:mx-2 transition-all duration-300 ${
                        isCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-white/20'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
          <div className="flex justify-center mt-4 px-4">
            <div className="text-white/70 text-xs sm:text-sm text-center">
              {currentSection === 'personal' && 'Informações Pessoais'}
              {currentSection === 'education' && 'Educação'}
              {currentSection === 'experience' && 'Experiência Profissional'}
              {currentSection === 'social' && 'Redes Sociais'}
              {currentSection === 'skills' && 'Habilidades'}
              {currentSection === 'complete' && 'Concluído'}
            </div>
          </div>
        </div>

        {/* Current Section */}
        {renderCurrentSection()}
      </div>
    </div>
  )
}
