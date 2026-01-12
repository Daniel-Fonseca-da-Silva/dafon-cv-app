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
  onAnalyze: (cvId: string) => void
  onMatchWithJob: (cvId: string) => void
  onDelete: (cvId: string) => void
  onUse: (cvId: string) => void
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

// CV Analysis Types
export interface AtsCompatibility {
  assessment: string
  chance: 'low' | 'medium' | 'high'
  recommendations: string[]
}

export interface CvAnalysisResponse {
  score: number
  description: string
  improvement_points: string[]
  best_practices: string[]
  ats_compatibility: AtsCompatibility
  professional_alignment: string[]
  strengths: string[]
  recommendations: string[]
}

export interface CvAnalysisSectionProps {
  cvId: string
  cvData?: CvSummary
  onSectionChange?: (section: string) => void
}

// Job Analysis Types
export interface JobAnalysisEvaluation {
  resume_match_assessment: string
  required_skills_match: number
  experience_match: number
  education_match: number
  detailed_analysis: string
  missing_requirements: string[]
  exceeding_requirements: string[]
}

export interface KeywordImportance {
  keyword: string
  importance: 'low' | 'medium' | 'high'
  impact_score: number
  is_matched?: boolean
}

export interface KeywordAnalysis {
  total_keywords_in_job_offer: number
  matched_keywords: number
  match_percentage: number
  matched_keywords_list: string[]
  missing_keywords_list: string[]
  keyword_importance: KeywordImportance[]
  recommendations: string[]
}

export interface JobAnalysisAtsCompatibility {
  assessment: string
  chance: 'low' | 'medium' | 'high'
  recommendations: string[]
}

export interface JobAnalysisResponse {
  overall_score: number
  compatibility_score: number
  linearity_score: number
  match_percentage: number
  description: string
  evaluation: JobAnalysisEvaluation
  keyword_analysis: KeywordAnalysis
  improvement_points: string[]
  strengths: string[]
  recommendations: string[]
  market_insights: string[]
  professional_alignment: string[]
  ats_compatibility: JobAnalysisAtsCompatibility
}

export interface CvAnalysisJobSectionProps {
  cvId: string
  cvData?: CvSummary
  onSectionChange?: (section: string) => void
}

export interface CvAnalysisJobResultProps {
  analysis: JobAnalysisResponse
  cvId: string
  cvData?: CvSummary
  onSectionChange?: (section: string) => void
}
