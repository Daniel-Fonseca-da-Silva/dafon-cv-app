"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { CvManagementSectionProps, CvViewMode } from "@/types/cv.types"
import { CvCard } from "./cv-card"
import { CvSkeleton } from "./cv-skeleton"
import { useCvs } from "@/hooks/use-cvs"
import { FiGrid, FiList, FiPlus, FiSearch } from "react-icons/fi"

export function CvManagementSection({ onSectionChange }: CvManagementSectionProps) {
  const [viewMode, setViewMode] = useState<CvViewMode>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  
  const { loading, getFilteredCvs } = useCvs()
  const t = useTranslations('cvManagement')

  const filteredCvs = getFilteredCvs('all').filter(cv => 
    cv.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cv.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewCv = (cvId: string) => {
    console.log('Visualizando CV:', cvId)
    // Implementar visualização do CV
  }

  const handleEditCv = (cvId: string) => {
    console.log('Editando CV:', cvId)
    // Implementar edição do CV
  }

  const handleDeleteCv = (cvId: string) => {
    console.log('Excluindo CV:', cvId)
    // Implementar exclusão do CV
  }

  const handleDownloadCv = (cvId: string) => {
    console.log('Baixando CV:', cvId)
    // Implementar download do CV
  }

  const handleCreateNewCv = () => {
    console.log('Criando novo CV')
    // Navegar para a seção de criação de CV
    if (onSectionChange) {
      onSectionChange('cv-creation')
    }
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {t('title')}
        </h1>
        <p className="text-white/70 text-lg">
          {t('subtitle')}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 backdrop-blur-xl"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">

          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setViewMode('grid')}
                variant={viewMode === 'grid' ? "default" : "outline"}
                size="sm"
                className={
                  viewMode === 'grid'
                    ? "bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                }
              >
                <FiGrid className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setViewMode('list')}
                variant={viewMode === 'list' ? "default" : "outline"}
                size="sm"
                className={
                  viewMode === 'list'
                    ? "bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                }
              >
                <FiList className="w-4 h-4" />
              </Button>
            </div>

            {/* Create New CV Button */}
            <Button
              onClick={handleCreateNewCv}
              className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              {t('actions.createNew')}
            </Button>
          </div>
        </div>
      </div>

      {/* CVs Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {loading ? (
          // Loading skeletons
          Array.from({ length: 8 }).map((_, index) => (
            <CvSkeleton key={index} />
          ))
        ) : (
          filteredCvs.map((cv) => (
            <CvCard 
              key={cv.id} 
              cv={cv}
              onView={handleViewCv}
              onEdit={handleEditCv}
              onDelete={handleDeleteCv}
              onDownload={handleDownloadCv}
            />
          ))
        )}
      </div>

      {/* Empty State */}
      {!loading && filteredCvs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-white/60 text-lg mb-4">
            {searchTerm ? t('emptyState.noSearchResults') : t('emptyState.title')}
          </div>
          <div className="space-x-4">
            {searchTerm && (
              <Button
                onClick={() => setSearchTerm('')}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {t('emptyState.clearSearch')}
              </Button>
            )}
            <Button
              onClick={() => setSearchTerm('')}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {t('emptyState.viewAll')}
            </Button>
            <Button
              onClick={handleCreateNewCv}
              className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              {t('emptyState.createFirst')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
