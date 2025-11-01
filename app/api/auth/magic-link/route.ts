import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import { randomBytes } from 'crypto'
import { AUTH_CONFIG, calculateExpirationDate } from '@/lib/auth-config'
import { getBaseUrl } from '@/lib/url-helper'

export async function POST(request: NextRequest) {
  try {
    // Validar NEXTAUTH_URL antes de processar
    let baseUrl: string
    try {
      baseUrl = getBaseUrl()
    } catch (urlError) {
      console.error('NEXTAUTH_URL configuration error:', urlError)
      return NextResponse.json(
        { 
          error: 'Configuration error: NEXTAUTH_URL not properly configured',
          details: process.env.NODE_ENV === 'production' 
            ? 'Configure NEXTAUTH_URL in Vercel as: https://www.site.com'
            : 'Configure NEXTAUTH_URL in .env.local'
        },
        { status: 500 }
      )
    }

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Verificar se o usuário existe
    const user = await prisma.users.findUnique({
      where: { email },
      select: { id: true, name: true, email: true }
    })

    // Se o usuário não existir, ainda retornamos sucesso para evitar vazamento de informações
    if (!user) {
      return NextResponse.json({
        message: 'Magic link sent successfully',
        success: true
      })
    }

    // Gerar token único
    const token = randomBytes(32).toString('hex')
    
    // Calcular expiração usando configuração
    const expires = calculateExpirationDate(AUTH_CONFIG.MAGIC_LINK_TOKEN_EXPIRATION_MINUTES)

    // Salvar na tabela de sessions
    await prisma.sessions.create({
      data: {
        token,
        user_id: user.id,
        expires_at: expires
      }
    })

    // Construir URL do magic link
    const urlToken = `${baseUrl}/api/auth/magic-link/verify?token=${token}&email=${encodeURIComponent(email)}`

    // Enviar email através do backend Golang
    try {
      const emailResponse = await fetch(`${process.env.BACKEND_API_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BACKEND_APIKEY}`,
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          url_token: urlToken
        })
      })

      if (!emailResponse.ok) {
        console.error('Error sending email:', await emailResponse.text())
        return NextResponse.json(
          { error: 'Error sending email' },
          { status: 500 }
        )
      }
    } catch (emailError) {
      console.error('Error communicating with the backend:', emailError)
      return NextResponse.json(
        { error: 'Error communicating with the email server' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Magic link sent successfully',
      success: true
    })

  } catch (error) {
    console.error('Error sending magic link:', error)
    
    // Log detalhado em desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      })
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        ...(process.env.NODE_ENV !== 'production' && {
          details: error instanceof Error ? error.message : 'Unknown error'
        })
      },
      { status: 500 }
    )
  }
}
