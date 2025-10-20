export interface Template {
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

export type TemplateFilter = 'all' | 'premium' | 'free'
export type ViewMode = 'grid' | 'list'

export interface TemplateCardProps {
  template: Template
  onView: (templateId: string) => void
  onDownload: (templateId: string) => void
}

export interface TemplateFiltersProps {
  filter: TemplateFilter
  viewMode: ViewMode
  onFilterChange: (filter: TemplateFilter) => void
  onViewModeChange: (viewMode: ViewMode) => void
}

export interface TemplateManagementSectionProps {
  onSectionChange: (section: string) => void
}
