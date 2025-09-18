"use client"

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FiFileText, FiDownload, FiEdit3, FiZap, FiArrowLeft } from "react-icons/fi"
import { CvCreationForm } from "@/components/forms/cv-creation-form"

interface GenerateCvSectionProps {
  onSectionChange?: (section: string) => void
}

export function GenerateCvSection({ onSectionChange }: GenerateCvSectionProps) {
  const t = useTranslations('generateCv')
  const [showForm, setShowForm] = useState(false)

  const handleBackToDashboard = () => {
    if (onSectionChange) {
      onSectionChange('dashboard')
    }
  }

  const handleGenerateCv = () => {
    setShowForm(true)
  }

  const handleBackToCards = () => {
    setShowForm(false)
  }

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
            <FiFileText className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg lg:text-2xl font-bold text-white">{t('header.title')}</h1>
            <p className="text-white/70 text-sm lg:text-base hidden sm:block">{t('header.subtitle')}</p>
          </div>
        </div>
        
        {/* Back Button */}
        {onSectionChange && (
          <Button
            onClick={showForm ? handleBackToCards : handleBackToDashboard}
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">
              {showForm ? 'Voltar aos Cards' : t('header.backButton')}
            </span>
            <span className="sm:hidden">
              {showForm ? 'Voltar' : 'Voltar'}
            </span>
          </Button>
        )}
      </div>

      {showForm ? (
        /* Formulário de Criação de Currículo */
        <CvCreationForm />
      ) : (
        <>
          {/* Card Principal de Geração */}
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center space-x-2">
                <FiZap className="w-6 h-6" />
                <span>Gerar Currículo</span>
              </CardTitle>
              <CardDescription className="text-white/70">
                Crie um currículo profissional usando inteligência artificial
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={handleGenerateCv}
                size="lg"
                className="bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <FiZap className="w-5 h-5 mr-2" />
                Gerar Currículo
              </Button>
            </CardContent>
          </Card>

          {/* Currículos Recentes */}
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <FiEdit3 className="w-5 h-5" />
                <span>Currículos Recentes</span>
              </CardTitle>
              <CardDescription className="text-white/70">
                Seus currículos gerados recentemente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <FiFileText className="w-5 h-5 text-white/60" />
                      <div>
                        <p className="text-white font-medium">CV Desenvolvedor Frontend - {item}</p>
                        <p className="text-white/60 text-sm">Criado há {item} dia{item > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                        <FiEdit3 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                        <FiDownload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
