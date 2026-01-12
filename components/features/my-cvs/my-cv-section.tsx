"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { CvManagementSectionProps, CvViewMode } from "@/types/cv.types"
import { CvCard } from "../cv-card"
import { CvManagementSkeleton } from "./my-cv-skeleton"
import { useCvsPagination } from "@/hooks/use-cvs-pagination"
import { CvControls } from "@/components/ui/cv-controls"
import { CvPagination } from "@/components/ui/cv-pagination"
import { FiGrid, FiList, FiPlus, FiSearch } from "react-icons/fi"
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

export function CvManagementSection({ onSectionChange }: CvManagementSectionProps) {
  const [viewMode, setViewMode] = useState<CvViewMode>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [cvToDelete, setCvToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const {
    cvs,
    loading,
    error,
    pagination,
    currentPage,
    pageSize,
    sortBy,
    sortOrder,
    setPage,
    setPageSize,
    setSortBy,
    setSortOrder,
    refresh
  } = useCvsPagination({
    page: 1,
    pageSize: 10,
    sortBy: 'full_name',
    sortOrder: 'ASC'
  })
  
  const t = useTranslations('cvManagement')

  // Filter CVs based on search term (client-side filtering for now)
  const filteredCvs = cvs.filter(cv => 
    (cv.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (cv.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  )

  const handleAnalyzeCv = (cvId: string) => {
    localStorage.setItem('analyzingCvId', cvId)
    
    if (onSectionChange) {
      onSectionChange('cv-analysis')
    }
  }

  const handleMatchWithJob = (cvId: string) => {
    // Store CV ID and data in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('matchingJobCvId', cvId)
      const cv = cvs.find(c => c.id === cvId)
      if (cv) {
        localStorage.setItem('matchingJobCvData', JSON.stringify(cv))
      }
    }
    
    // Navigate to job analysis section
    if (onSectionChange) {
      onSectionChange('cv-analysis-job')
    }
  }

  const handleDeleteCv = (cvId: string) => {
    setCvToDelete(cvId)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteCv = async () => {
    if (!cvToDelete) return

    setIsDeleting(true)
    
    try {
      const response = await fetch(`/api/curriculums/${cvToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error deleting curriculum')
      }

      // Atualizar a lista de CVs
      refresh()
      
      // Fechar o dialog
      setDeleteDialogOpen(false)
      setCvToDelete(null)
      
    } catch (error) {
      console.error('Error deleting CV:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const cancelDeleteCv = () => {
    setDeleteDialogOpen(false)
    setCvToDelete(null)
  }

  const handleUseCv = (cvId: string) => {
    console.log('Usando CV:', cvId)
    // Armazenar o cvId no localStorage
    localStorage.setItem('selectedCvId', cvId)
    
    // Redirecionar para a seção de gerenciamento de CVs
    if (onSectionChange) {
      onSectionChange('templates')
    }
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
        <div className="space-y-4">
          {/* Pagination and Sort Controls */}
          <CvControls
            pageSize={pageSize}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onPageSizeChange={setPageSize}
            onSortChange={setSortBy}
            onSortOrderChange={setSortOrder}
            onRefresh={refresh}
            loading={loading}
          />

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
            <CvManagementSkeleton key={index} />
          ))
        ) : (
          filteredCvs.map((cv) => (
            <CvCard 
              key={cv.id} 
              cv={cv}
              onAnalyze={handleAnalyzeCv}
              onMatchWithJob={handleMatchWithJob}
              onDelete={handleDeleteCv}
              onUse={handleUseCv}
            />
          ))
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="text-red-400 text-lg mb-4">
            Erro ao carregar currículos: {error}
          </div>
          <Button
            onClick={refresh}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Tentar Novamente
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredCvs.length === 0 && (
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

      {/* Pagination */}
      {!loading && !error && pagination && pagination.totalPages > 1 && (
        <div className="mt-8">
          <CvPagination
            pagination={pagination}
            currentPage={currentPage}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteDialog.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('deleteDialog.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteCv} disabled={isDeleting}>
              {t('deleteDialog.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteCv} 
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? t('deleteDialog.deleting') : t('deleteDialog.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
