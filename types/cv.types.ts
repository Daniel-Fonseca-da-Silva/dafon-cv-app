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
}

export interface Skill {
  id: string
  name: string
  level: 'iniciante' | 'intermediario' | 'avancado' | 'expert'
}

export interface Language {
  id: string
  name: string
  level: 'basico' | 'intermediario' | 'avancado' | 'nativo'
}

export interface SkillsData {
  areas: string[]
  availabilityDate: string
  languages: Language[]
}

export interface SocialLink {
  id: string
  type: 'linkedin' | 'github' | 'website' | 'portfolio' | 'blog'
  url: string
}

export interface CvData {
  personalInfo: PersonalInfo
  experiences: Experience[]
  educations: Education[]
  skills: Skill[]
  skillsData: SkillsData
  socialLinks?: SocialLink[]
}

export type CvSection = 'personal' | 'experience' | 'education' | 'skills' | 'social' | 'complete'

export interface CvSectionProps {
  data: CvData
  onDataChange: (data: CvData) => void
  onNext: () => void
  onPrevious?: () => void
}
