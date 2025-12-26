"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HexColorPicker } from "react-colorful"
import { Palette } from "lucide-react"
import { useTranslations, useMessages, useLocale } from "next-intl"
import { TemplateManagementSectionProps, TemplateFilter, ViewMode } from "@/types/template.types"
import { TemplateCard } from "../template-card"
import { TemplateFilters } from "../template-filters"
import { TemplateSkeleton } from "./manage-template-skeleton"
import { useTemplates } from "@/hooks/use-templates"
import { generatePDF, previewPDF, PdfTranslations } from "@/lib/modern-professional-generator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function TemplateManagementSection({ onSectionChange }: TemplateManagementSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filter, setFilter] = useState<TemplateFilter>('all')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showNoCvAlert, setShowNoCvAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  
  const { loading, getFilteredTemplates } = useTemplates()
  const t = useTranslations('templateManagement')
  const messages = useMessages() as any
  const locale = useLocale()
  
  // Pegando a parte específica das traduções
  const pdfTranslations = messages.cvPdf as PdfTranslations

  const filteredTemplates = getFilteredTemplates(filter)

  const handleViewTemplate = async () => {
    const cvIdLocalStorage = localStorage.getItem('selectedCvId')
    
    // Verificar se há um currículo selecionado
    if (!cvIdLocalStorage) {
      setShowNoCvAlert(true)
      return
    }
    
    try {
      setIsGeneratingPDF(true)
      await previewPDF(cvIdLocalStorage, pdfTranslations, locale, { backgroundColor }) // Passando a cor
    } catch (error) {
      // Lança um alerta de erro para o usuário
      setErrorMessage(t('errorAlert.viewPdfError'))
      setShowErrorAlert(true)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleDownloadTemplate = async () => {
    const cvIdLocalStorage = localStorage.getItem('selectedCvId')
    
    // Verificar se há um currículo selecionado
    if (!cvIdLocalStorage) {
      setShowNoCvAlert(true)
      return
    }
    
    try {
      setIsGeneratingPDF(true)
      await generatePDF(cvIdLocalStorage, pdfTranslations, locale, true, { backgroundColor }) // Passando a cor
    } catch (error) {
      // Lança um alerta de erro para o usuário
      setErrorMessage(t('errorAlert.downloadPdfError'))
      setShowErrorAlert(true)
    } finally {
      setIsGeneratingPDF(false)
    }
  }


  const handleBackToDashboard = () => {
    if (onSectionChange) {
      onSectionChange('dashboard')
    }
  }

  const handleSelectCv = () => {
    setShowNoCvAlert(false)
    if (onSectionChange) {
      onSectionChange('my-cvs')
    }
  }

  const handleCancelAlert = () => {
    setShowNoCvAlert(false)
  }

  const handleCloseErrorAlert = () => {
    setShowErrorAlert(false)
    setErrorMessage('')
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={handleBackToDashboard}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            ← {t('backToDashboard', { default: 'Back to Dashboard' })}
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {t('title')}
        </h1>
        <p className="text-white/70 text-lg">
          {t('subtitle')}
        </p>
      </div>

      {/* Color Picker Section */}
      <div className="mb-6 flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10 w-fit mx-auto sm:mx-0">
        <div className="flex items-center gap-2 text-white">
          <Palette className="w-5 h-5" />
          <span className="font-medium">Background Color</span>
        </div>
        <div className="relative">
          <button
            className="w-10 h-10 rounded-full border-2 border-white/50 shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{ backgroundColor: backgroundColor }}
            onClick={() => setShowColorPicker(!showColorPicker)}
            aria-label="Select background color"
          />
          {showColorPicker && (
            <div className="absolute top-12 left-0 z-50">
              <div 
                className="fixed inset-0" 
                onClick={() => setShowColorPicker(false)} 
              />
              <div className="relative bg-white p-3 rounded-xl shadow-xl border border-gray-200">
                <HexColorPicker color={backgroundColor} onChange={setBackgroundColor} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filters and Controls */}
      <TemplateFilters
        filter={filter}
        viewMode={viewMode}
        onFilterChange={setFilter}
        onViewModeChange={setViewMode}
      />

      {/* Templates Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {loading || isGeneratingPDF ? (
          // Loading skeletons
          Array.from({ length: 8 }).map((_, index) => (
            <TemplateSkeleton key={index} />
          ))
        ) : (
          filteredTemplates.map((template) => (
            <TemplateCard 
              key={template.id} 
              template={template}
              onView={handleViewTemplate}
              onDownload={handleDownloadTemplate}
            />
          ))
        )}
      </div>

      {/* Empty State */}
      {!loading && filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-white/60 text-lg mb-4">
            {t('emptyState.title')}
          </div>
          <Button
            onClick={() => setFilter('all')}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {t('emptyState.action')}
          </Button>
        </div>
      )}

      {/* Alert Dialog para quando não há currículo selecionado */}
      <AlertDialog open={showNoCvAlert} onOpenChange={setShowNoCvAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t('noCvSelected.title')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('noCvSelected.message')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelAlert}>
              {t('noCvSelected.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSelectCv}>
              {t('noCvSelected.selectCv')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert Dialog para erros */}
      <AlertDialog open={showErrorAlert} onOpenChange={setShowErrorAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t('errorAlert.title')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {errorMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleCloseErrorAlert}>
              {t('errorAlert.ok')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
