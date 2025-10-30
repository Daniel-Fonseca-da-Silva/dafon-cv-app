import { useState, useEffect } from "react"
import { CvSummary, CvFilter } from "@/types/cv.types"

export function useCvs() {
  const [cvs, setCvs] = useState<CvSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCvs = async () => {
      setLoading(true)
      
      // Simular delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Dados mockados
      const mockCvs: CvSummary[] = [
        {
          id: '1',
          fullName: 'João Silva Santos',
          email: 'joao.silva@email.com',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-20T14:22:00Z'
        },
        {
          id: '2',
          fullName: 'Maria Oliveira Costa',
          email: 'maria.oliveira@email.com',
          createdAt: '2024-01-18T09:15:00Z',
          updatedAt: '2024-01-22T16:45:00Z'
        },
        {
          id: '3',
          fullName: 'Carlos Eduardo Pereira',
          email: 'carlos.pereira@email.com',
          createdAt: '2024-01-20T11:20:00Z'
        },
        {
          id: '4',
          fullName: 'Ana Beatriz Ferreira',
          email: 'ana.ferreira@email.com',
          createdAt: '2024-01-22T08:45:00Z',
          updatedAt: '2024-01-23T12:30:00Z'
        },
        {
          id: '5',
          fullName: 'Pedro Henrique Alves',
          email: 'pedro.alves@email.com',
          createdAt: '2024-01-25T15:10:00Z'
        },
        {
          id: '6',
          fullName: 'Lucia Maria Rodrigues',
          email: 'lucia.rodrigues@email.com',
          createdAt: '2024-01-28T13:25:00Z',
          updatedAt: '2024-01-30T09:15:00Z'
        },
        {
          id: '7',
          fullName: 'Rafael Santos Lima',
          email: 'rafael.lima@email.com',
          createdAt: '2024-02-01T16:40:00Z'
        },
        {
          id: '8',
          fullName: 'Fernanda Costa Silva',
          email: 'fernanda.silva@email.com',
          createdAt: '2024-02-03T12:15:00Z',
          updatedAt: '2024-02-05T11:20:00Z'
        }
      ]
      
      setCvs(mockCvs)
      setLoading(false)
    }
    
    loadCvs()
  }, [])

  const getFilteredCvs = (filter: CvFilter) => {
    return cvs
  }

  const getCvById = (id: string) => {
    return cvs.find(cv => cv.id === id)
  }

  const addCv = (cv: Omit<CvSummary, 'id'>) => {
    const newCv: CvSummary = {
      ...cv,
      id: Date.now().toString()
    }
    setCvs(prev => [newCv, ...prev])
    return newCv
  }

  const updateCv = (id: string, updates: Partial<CvSummary>) => {
    setCvs(prev => prev.map(cv => 
      cv.id === id ? { ...cv, ...updates, updatedAt: new Date().toISOString() } : cv
    ))
  }

  const deleteCv = (id: string) => {
    setCvs(prev => prev.filter(cv => cv.id !== id))
  }

  return {
    cvs,
    loading,
    getFilteredCvs,
    getCvById,
    addCv,
    updateCv,
    deleteCv
  }
}
