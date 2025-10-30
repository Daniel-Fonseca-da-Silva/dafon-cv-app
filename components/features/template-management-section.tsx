"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { TemplateManagementSectionProps, TemplateFilter, ViewMode } from "@/types/template.types"
import { TemplateCard } from "./template-card"
import { TemplateFilters } from "./template-filters"
import { TemplateSkeleton } from "./template-skeleton"
import { useTemplates } from "@/hooks/use-templates"
import { generatePDF, previewPDF } from "@/lib/pdf-generator"
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
  const [showNoCvAlert, setShowNoCvAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  
  const { loading, getFilteredTemplates } = useTemplates()
  const t = useTranslations('templateManagement')

  const filteredTemplates = getFilteredTemplates(filter)

  const handleViewTemplate = async (templateId: string) => {
    const cvIdLocalStorage = localStorage.getItem('selectedCvId')
    
    // Verificar se há um currículo selecionado
    if (!cvIdLocalStorage) {
      setShowNoCvAlert(true)
      return
    }
    
    try {
      setIsGeneratingPDF(true)
      await previewPDF(cvIdLocalStorage) // Visualizar PDF
    } catch (error) {
      // Lança um alerta de erro para o usuário
      setErrorMessage(t('errorAlert.viewPdfError'))
      setShowErrorAlert(true)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleDownloadTemplate = async (templateId: string) => {
    const cvIdLocalStorage = localStorage.getItem('selectedCvId')
    
    // Verificar se há um currículo selecionado
    if (!cvIdLocalStorage) {
      setShowNoCvAlert(true)
      return
    }
    
    try {
      setIsGeneratingPDF(true)
      await generatePDF(cvIdLocalStorage, true) // true = download
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
