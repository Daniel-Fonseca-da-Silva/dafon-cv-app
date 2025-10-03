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
  level: 'iniciante' | 'intermediario' | 'avancado' | 'especialista'
}

export interface SkillsData {
  areas: string[]
  availabilityDate: string
  languages: string[]
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
