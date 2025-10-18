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
  const tForm = useTranslations('generateCv.form')
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
              {showForm ? t('header.backButton') : t('header.backButton')}
            </span>
            <span className="sm:hidden">
              {showForm ? t('header.backButtonMobile') : t('header.backButtonMobile')}
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
                <span>{tForm('title')}</span>
              </CardTitle>
              <CardDescription className="text-white/70">
                {tForm('subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={handleGenerateCv}
                size="lg"
                className="bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <FiZap className="w-5 h-5 mr-2" />
                {tForm('generateButton')}
              </Button>
            </CardContent>
          </Card>

          {/* Card de Gerenciamento */}
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center space-x-2">
                <FiEdit3 className="w-6 h-6" />
                <span>{tForm('manageTitle')}</span>
              </CardTitle>
              <CardDescription className="text-white/70">
                {tForm('manageSubtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => onSectionChange && onSectionChange('templates')}
                size="lg"
                className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <FiEdit3 className="w-5 h-5 mr-2" />
                {tForm('manageButton')}
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
