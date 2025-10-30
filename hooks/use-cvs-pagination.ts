import { useState, useEffect, useCallback } from "react"
import { CvSummary, PaginationParams, PaginationMeta } from "@/types/cv.types"

interface UseCvsPaginationReturn {
  cvs: CvSummary[]
  loading: boolean
  error: string | null
  pagination: PaginationMeta | null
  currentPage: number
  pageSize: number
  sortBy: string
  sortOrder: 'ASC' | 'DESC'
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  setSortBy: (field: string) => void
  setSortOrder: (order: 'ASC' | 'DESC') => void
  refresh: () => void
}

export function useCvsPagination(initialParams?: Partial<PaginationParams>): UseCvsPaginationReturn {
  const [cvs, setCvs] = useState<CvSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationMeta | null>(null)
  
  const [currentPage, setCurrentPage] = useState(initialParams?.page || 1)
  const [pageSize, setPageSizeState] = useState(initialParams?.pageSize || 10)
  const [sortBy, setSortByState] = useState(initialParams?.sortBy || 'full_name')
  const [sortOrder, setSortOrderState] = useState<'ASC' | 'DESC'>(initialParams?.sortOrder || 'ASC')

  const fetchCvs = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        page_size: pageSize.toString(),
        sort_by: sortBy,
        sort_order: sortOrder
      })
      
      const response = await fetch(`/api/curriculums?${params}`)
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch curriculums')
      }
      
      if (result.success && result.data) {
        console.log('Backend response:', result.data)
        
        // Mapear os dados do backend para o formato esperado
        const mappedCvs = (result.data.data || []).map((cv: any) => ({
          id: cv.id,
          fullName: cv.full_name || cv.fullName || '',
          email: cv.email || '',
          createdAt: cv.created_at || cv.createdAt || new Date().toISOString(),
          updatedAt: cv.updated_at || cv.updatedAt || null
        }))
        
        setCvs(mappedCvs)
        setPagination(result.data.meta || null)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      console.error('Error fetching curriculums:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      setCvs([])
      setPagination(null)
    } finally {
      setLoading(false)
    }
  }, [currentPage, pageSize, sortBy, sortOrder])

  useEffect(() => {
    fetchCvs()
  }, [fetchCvs])

  const setPage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const setPageSize = useCallback((size: number) => {
    setPageSizeState(size)
    setCurrentPage(1) // Reset to first page when changing page size
  }, [])

  const setSortBy = useCallback((field: string) => {
    setSortByState(field)
    setCurrentPage(1) // Reset to first page when changing sort
  }, [])

  const setSortOrder = useCallback((order: 'ASC' | 'DESC') => {
    setSortOrderState(order)
    setCurrentPage(1) // Reset to first page when changing sort order
  }, [])

  const refresh = useCallback(() => {
    fetchCvs()
  }, [fetchCvs])

  return {
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
  }
}
