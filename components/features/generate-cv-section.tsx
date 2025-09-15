"use client"

import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FiFileText, FiUpload, FiDownload, FiEdit3, FiZap, FiArrowLeft } from "react-icons/fi"

interface GenerateCvSectionProps {
  onSectionChange?: (section: string) => void
}

export function GenerateCvSection({ onSectionChange }: GenerateCvSectionProps) {
  const t = useTranslations('generateCv')

  const handleBackToDashboard = () => {
    if (onSectionChange) {
      onSectionChange('dashboard')
    }
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
            onClick={handleBackToDashboard}
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('header.backButton')}</span>
            <span className="sm:hidden">Voltar</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Seção de Upload */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FiUpload className="w-5 h-5" />
              <span>Upload de Currículo Existente</span>
            </CardTitle>
            <CardDescription className="text-white/70">
              Faça upload do seu currículo atual para melhorar com IA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-white/30 rounded-lg p-4 lg:p-8 text-center hover:border-white/50 transition-colors duration-200">
              <FiUpload className="w-8 h-8 lg:w-12 lg:h-12 text-white/60 mx-auto mb-2 lg:mb-4" />
              <p className="text-white/80 mb-1 lg:mb-2 text-sm lg:text-base">Arraste e solte seu arquivo aqui</p>
              <p className="text-white/60 text-xs lg:text-sm">ou clique para selecionar</p>
              <p className="text-white/50 text-xs mt-1 lg:mt-2">PDF, DOC, DOCX (máx. 10MB)</p>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white">
              Selecionar Arquivo
            </Button>
          </CardContent>
        </Card>

        {/* Seção de Geração com IA */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FiZap className="w-5 h-5" />
              <span>Criar do Zero</span>
            </CardTitle>
            <CardDescription className="text-white/70">
              Gere um currículo completamente novo usando IA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Input 
                placeholder="Cargo desejado (ex: Desenvolvedor Frontend)"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
              <Input 
                placeholder="Área de atuação (ex: Tecnologia)"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
              <Input 
                placeholder="Nível de experiência (ex: Sênior)"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white">
              <FiZap className="w-4 h-4 mr-2" />
              Gerar com IA
            </Button>
          </CardContent>
        </Card>
      </div>

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
    </div>
  )
}
