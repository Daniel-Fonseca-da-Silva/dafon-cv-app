import { useState, useEffect } from "react"
import { Template, TemplateFilter } from "@/types/template.types"

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true)
      
      // Simular delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Dados mockados
      const mockTemplates: Template[] = [
        {
          id: '1',
          title: 'Modern Professional',
          description: 'Clean and modern design perfect for tech professionals',
          isPremium: false,
          isSoon: false,
          category: 'Technology',
          thumbnail: '/images/templates/modern-professional.jpg',
          downloads: 1250,
          rating: 4.8,
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          title: 'Executive Classic',
          description: 'Traditional and elegant template for executive positions',
          isPremium: false,
          isSoon: true,
          category: 'Executive',
          thumbnail: '/images/templates/executive-classic.jpg',
          downloads: 890,
          rating: 4.9,
          createdAt: '2024-01-10'
        },
        {
          id: '3',
          title: 'Creative Portfolio',
          description: 'Bold and creative design for designers and artists',
          isPremium: true,
          isSoon: true,
          category: 'Creative',
          thumbnail: '/images/templates/creative-portfolio.jpg',
          downloads: 2100,
          rating: 4.7,
          createdAt: '2024-01-20'
        },
        {
          id: '4',
          title: 'Academic Scholar',
          description: 'Formal template ideal for academic and research positions',
          isPremium: false,
          isSoon: true,
          category: 'Academic',
          thumbnail: '/images/templates/academic-scholar.jpg',
          downloads: 750,
          rating: 4.6,
          createdAt: '2024-01-12'
        },
        {
          id: '5',
          title: 'Startup Innovator',
          description: 'Dynamic template for startup founders and entrepreneurs',
          isPremium: true,
          isSoon: true,
          category: 'Entrepreneur',
          thumbnail: '/images/templates/startup-innovator.jpg',
          downloads: 1650,
          rating: 4.8,
          createdAt: '2024-01-18'
        },
        {
          id: '6',
          title: 'Healthcare Professional',
          description: 'Clean and trustworthy design for healthcare workers',
          isPremium: false,
          isSoon: true,
          category: 'Healthcare',
          thumbnail: '/images/templates/healthcare-professional.jpg',
          downloads: 980,
          rating: 4.5,
          createdAt: '2024-01-14'
        },
        {
          id: '7',
          title: 'Finance Executive',
          description: 'Professional template for finance and banking professionals',
          isPremium: true,
          isSoon: true,
          category: 'Finance',
          thumbnail: '/images/templates/finance-executive.jpg',
          downloads: 1200,
          rating: 4.7,
          createdAt: '2024-01-16'
        },
        {
          id: '8',
          title: 'Marketing Specialist',
          description: 'Colorful and engaging template for marketing professionals',
          isPremium: false,
          isSoon: true,
          category: 'Marketing',
          thumbnail: '/images/templates/marketing-specialist.jpg',
          downloads: 1350,
          rating: 4.4,
          createdAt: '2024-01-22'
        }
      ]
      
      setTemplates(mockTemplates)
      setLoading(false)
    }
    
    loadTemplates()
  }, [])

  const getFilteredTemplates = (filter: TemplateFilter) => {
    return templates.filter(template => {
      if (filter === 'premium') return template.isPremium
      if (filter === 'free') return !template.isPremium
      if (filter ===  'soon') return template.isSoon
      return true
    })
  }

  return {
    templates,
    loading,
    getFilteredTemplates
  }
}
