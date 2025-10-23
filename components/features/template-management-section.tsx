"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { TemplateManagementSectionProps, TemplateFilter, ViewMode } from "@/types/template.types"
import { TemplateCard } from "./template-card"
import { TemplateFilters } from "./template-filters"
import { TemplateSkeleton } from "./template-skeleton"
import { useTemplates } from "@/hooks/use-templates"

export function TemplateManagementSection({ onSectionChange }: TemplateManagementSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filter, setFilter] = useState<TemplateFilter>('all')
  
  const { loading, getFilteredTemplates } = useTemplates()
  const t = useTranslations('templateManagement')

  const filteredTemplates = getFilteredTemplates(filter)

  const handleViewTemplate = (templateId: string) => {
    console.log('Viewing template:', templateId)
    // Navigate to CV creation with selected template
    if (onSectionChange) {
      onSectionChange('cv-creation')
    }
  }

  const handleDownloadTemplate = (templateId: string) => {
    console.log('Downloading template:', templateId)
    // Implementar download do template
  }

  const handleBackToDashboard = () => {
    if (onSectionChange) {
      onSectionChange('dashboard')
    }
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
        {loading ? (
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
    </div>
  )
}
