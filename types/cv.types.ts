export type CvSection = 'personal' | 'education' | 'experience' | 'courses' | 'social' | 'skills' | 'complete'

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  driverLicense: string[]
  aboutYourself: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  isCurrentJob: boolean
}

export interface Education {
  id: string
  institution: string
  degree: string
  startDate: string
  endDate: string
  description: string
  isCurrentlyStudying: boolean
}

export interface Course {
  id: string
  name: string
  institution: string
  completionDate: string
  description: string
}

export interface Skill {
  id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Language {
  id: string
  name: string
  level: 'basic' | 'intermediate' | 'advanced' | 'native'
}

export interface SkillsData {
  areas: string[]
  languages: Language[]
}

export interface SocialLink {
  id: string
  platform: string
  url: string
}

export interface CvData {
  personalInfo: PersonalInfo
  experiences: Experience[]
  educations: Education[]
  courses: Course[]
  skills: Skill[]
  skillsData: SkillsData
  socialLinks: SocialLink[]
}

export interface CvSectionProps {
  data: CvData
  onDataChange: (data: CvData) => void
  onNext?: () => void
  onPrevious?: () => void
  onCvSaved?: () => void
}

// CV Management Types
export interface CvSummary {
  id: string
  fullName: string
  email: string
  createdAt: string
  updatedAt?: string
}

export interface CvManagementSectionProps {
  onSectionChange?: (section: string) => void
}

export interface CvCardProps {
  cv: CvSummary
  onView: (cvId: string) => void
  onEdit: (cvId: string) => void
  onDelete: (cvId: string) => void
  onDownload: (cvId: string) => void
}

export type CvFilter = 'all'
export type CvViewMode = 'grid' | 'list'

// Pagination Types
export interface PaginationParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
}

export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
