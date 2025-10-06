import { NextRequest, NextResponse } from 'next/server'
import { CvData } from '@/types/cv.types'
import { prisma } from '@/lib/database'
import { AUTH_CONFIG, isTokenExpired } from '@/lib/auth-config'

interface CvBackendPayload {
  user_id: string
  full_name: string
  email: string
  phone: string
  driver_license: string
  intro: string
  educations: Array<{
    institution: string
    degree: string
    start_date: string
    end_date: string
    description: string
  }>
  works: Array<{
    position: string
    company: string
    start_date: string
    end_date: string
    description: string
  }>
  courses: string
  social_links: string
  skills: string
  languages: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cvData, userId: clientUserId } = body

    if (!cvData) {
      return NextResponse.json(
        { success: false, error: 'Dados do CV são obrigatórios' },
        { status: 400 }
      )
    }

    // Obter userId da sessão (mais seguro)
    let userId = clientUserId
    
    // Se não foi fornecido pelo cliente, tentar obter da sessão
    if (!userId) {
      const sessionToken = request.cookies.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value
      
      if (sessionToken) {
        const session = await prisma.sessions.findUnique({
          where: { token: sessionToken },
          include: { users: true }
        })
        
        if (session && !isTokenExpired(session.expires_at)) {
          userId = session.user_id
        }
      }
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User not authenticated' },
        { status: 401 }
      )
    }

    // Validar dados do CV
    const validation = validateCvData(cvData)
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Incomplete data', 
          details: validation.errors 
        },
        { status: 400 }
      )
    }

    // Transformar dados para o formato do backend
    const payload = transformCvData(cvData, userId)

    // Configurações do backend
    const backendUrl = process.env.BACKEND_API_URL 
    const apiKey = process.env.BACKEND_APIKEY

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'BACKEND_APIKEY not configured' },
        { status: 500 }
      )
    }

    // Fazer requisição para o backend
    const response = await fetch(`${backendUrl}/curriculums`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error from backend:', response.status, errorText)
      return NextResponse.json(
        { 
          success: false, 
          error: `Error from backend: ${response.status}`,
          details: errorText
        },
        { status: response.status }
      )
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: 'CV saved successfully!',
      data: result
    })

  } catch (error) {
    console.error('Error saving CV:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

function transformCvData(cvData: CvData, userId: string): CvBackendPayload {
  return {
    user_id: userId,
    full_name: cvData.personalInfo.fullName,
    email: cvData.personalInfo.email,
    phone: cvData.personalInfo.phone,
    driver_license: cvData.personalInfo.driverLicense.join(', '),
    intro: cvData.personalInfo.aboutYourself || '',
    educations: cvData.educations.map(education => ({
      institution: education.institution,
      degree: education.degree,
      start_date: convertDateToISO(education.startDate),
      end_date: convertDateToISO(education.endDate),
      description: education.description
    })),
    works: cvData.experiences.map(experience => ({
      position: experience.position,
      company: experience.company,
      start_date: convertDateToISO(experience.startDate),
      end_date: convertDateToISO(experience.endDate),
      description: experience.description
    })),
    courses: cvData.courses.map(course => course.description).join(', '),
    social_links: cvData.socialLinks.map(link => link.url).join(', '),
    skills: cvData.skillsData.areas.join(', '),
    languages: cvData.skillsData.languages.map(lang => `${lang.name} (${lang.level})`).join(', ')
  }
}

/**
 * Converte data do formato MySQL (YYYY-MM-DD) para ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
 */
function convertDateToISO(dateString: string): string {
  if (!dateString || dateString.trim() === '') {
    return ''
  }
  
  try {
    // Se já está no formato ISO, retorna como está
    if (dateString.includes('T')) {
      return dateString
    }
    
    // Converte de YYYY-MM-DD para YYYY-MM-DDTHH:mm:ssZ
    const date = new Date(dateString + 'T00:00:00Z')
    return date.toISOString()
  } catch (error) {
    console.error('Erro ao converter data:', dateString, error)
    return dateString // Retorna original em caso de erro
  }
}

function validateCvData(cvData: CvData): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // Validar informações pessoais
  if (!cvData.personalInfo.fullName.trim()) {
    errors.push('Full name is required')
  }
  if (!cvData.personalInfo.email.trim()) {
    errors.push('Email is required')
  }
  if (!cvData.personalInfo.phone.trim()) {
    errors.push('Phone is required')
  }

  // Validar pelo menos uma educação
  if (cvData.educations.length === 0) {
    errors.push('At least one education is required')
  } else {
    cvData.educations.forEach((education, index) => {
      if (!education.institution.trim()) {
        errors.push(`Institution of education ${index + 1} is required`)
      }
      if (!education.degree.trim()) {
        errors.push(`Degree of education ${index + 1} is required`)
      }
      if (!education.startDate.trim()) {
        errors.push(`Start date of education ${index + 1} is required`)
      }
    })
  }

  // Validar pelo menos uma experiência
  if (cvData.experiences.length === 0) {
    errors.push('At least one experience is required')
  } else {
    cvData.experiences.forEach((experience, index) => {
      if (!experience.company.trim()) {
        errors.push(`Company of experience ${index + 1} is required`)
      }
      if (!experience.position.trim()) {
        errors.push(`Position of experience ${index + 1} is required`)
      }
      if (!experience.startDate.trim()) {
        errors.push(`Start date of experience ${index + 1} is required`)
      }
    })
  }

  // Validar pelo menos uma área de habilidade
  if (cvData.skillsData.areas.length === 0) {
    errors.push('At least one skill area is required')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}
