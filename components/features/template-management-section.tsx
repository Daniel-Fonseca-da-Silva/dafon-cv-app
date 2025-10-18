"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { FiEye, FiDownload, FiStar, FiGrid, FiList } from "react-icons/fi"
import { useTranslations } from "next-intl"

interface Template {
  id: string
  title: string
  description: string
  isPremium: boolean
  category: string
  thumbnail: string
  downloads: number
  rating: number
  createdAt: string
}

interface TemplateManagementSectionProps {
  onSectionChange: (section: string) => void
}

export function TemplateManagementSection({ onSectionChange }: TemplateManagementSectionProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState<'all' | 'premium' | 'free'>('all')
  
  const t = useTranslations('templateManagement')

  // Simular carregamento de dados
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
          isPremium: true,
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

  const filteredTemplates = templates.filter(template => {
    if (filter === 'premium') return template.isPremium
    if (filter === 'free') return !template.isPremium
    return true
  })

  const handleViewTemplate = (templateId: string) => {
    console.log('Viewing template:', templateId)
    // Implementar visualização do template
  }

  const handleDownloadTemplate = (templateId: string) => {
    console.log('Downloading template:', templateId)
    // Implementar download do template
  }

  const TemplateCard = ({ template }: { template: Template }) => (
    <Card className="group hover:scale-105 transition-all duration-300 backdrop-blur-xl bg-white/10 border-white/20 shadow-xl hover:shadow-2xl">
      <CardHeader className="p-4">
        <div className="relative">
          {/* Thumbnail placeholder */}
          <div className="w-full h-48 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-lg mb-4 flex items-center justify-center">
            <div className="text-white/60 text-sm">Template Preview</div>
          </div>
          
          {/* Premium badge */}
          {template.isPremium && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <FiStar className="w-3 h-3 mr-1" />
              Premium
            </div>
          )}
        </div>
        
        <CardTitle className="text-white text-lg font-semibold mb-2">
          {template.title}
        </CardTitle>
        
        <CardDescription className="text-white/70 text-sm mb-3">
          {template.description}
        </CardDescription>
        
        <div className="flex items-center justify-between text-xs text-white/60 mb-3">
          <span>{template.downloads} downloads</span>
          <span>★ {template.rating}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="flex space-x-2">
          <Button
            onClick={() => handleViewTemplate(template.id)}
            variant="outline"
            size="sm"
            className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
          >
            <FiEye className="w-4 h-4 mr-2" />
            {t('actions.view')}
          </Button>
          
          <Button
            onClick={() => handleDownloadTemplate(template.id)}
            size="sm"
            className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white"
          >
            <FiDownload className="w-4 h-4 mr-2" />
            {t('actions.download')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const TemplateSkeleton = () => (
    <Card className="backdrop-blur-xl bg-white/10 border-white/20">
      <CardHeader className="p-4">
        <Skeleton className="w-full h-48 bg-white/20 rounded-lg mb-4" />
        <Skeleton className="h-6 bg-white/20 rounded mb-2" />
        <Skeleton className="h-4 bg-white/20 rounded mb-3" />
        <div className="flex justify-between mb-3">
          <Skeleton className="h-3 w-16 bg-white/20 rounded" />
          <Skeleton className="h-3 w-12 bg-white/20 rounded" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex space-x-2">
          <Skeleton className="flex-1 h-8 bg-white/20 rounded" />
          <Skeleton className="flex-1 h-8 bg-white/20 rounded" />
        </div>
      </CardContent>
    </Card>
  )

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

      {/* Filters and Controls */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            className={filter === 'all' 
              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' 
              : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }
          >
            {t('filters.all')}
          </Button>
          <Button
            onClick={() => setFilter('free')}
            variant={filter === 'free' ? 'default' : 'outline'}
            size="sm"
            className={filter === 'free' 
              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' 
              : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }
          >
            {t('filters.free')}
          </Button>
          <Button
            onClick={() => setFilter('premium')}
            variant={filter === 'premium' ? 'default' : 'outline'}
            size="sm"
            className={filter === 'premium' 
              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' 
              : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }
          >
            {t('filters.premium')}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setViewMode('grid')}
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            className={viewMode === 'grid' 
              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' 
              : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }
          >
            <FiGrid className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setViewMode('list')}
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            className={viewMode === 'list' 
              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' 
              : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }
          >
            <FiList className="w-4 h-4" />
          </Button>
        </div>
      </div>

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
            <TemplateCard key={template.id} template={template} />
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
