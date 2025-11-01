import { NextRequest, NextResponse } from 'next/server'
import { registerSchema } from '@/lib/validations'
import { prisma } from '@/lib/database'
import { randomBytes } from 'crypto'
import { AUTH_CONFIG, calculateExpirationDate } from '@/lib/auth-config'
import { getBaseUrl } from '@/lib/url-helper'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email } = body

    // Validate input data
    const validatedData = registerSchema.parse({ name, email })

    // Make request to Golang backend
    const response = await fetch(`${process.env.BACKEND_API_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BACKEND_APIKEY}`,
      },
      body: JSON.stringify({
        name: validatedData.name,
        email: validatedData.email
      }),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          error: data.message || data.error || 'Error creating user on backend' 
        },
        { status: response.status }
      )
    }

    // Após criar o usuário com sucesso, enviar email de verificação
    try {
      // Gerar token único para verificação
      const token = randomBytes(32).toString('hex')
      
      // Calcular expiração usando configuração
      const expires = calculateExpirationDate(AUTH_CONFIG.MAGIC_LINK_TOKEN_EXPIRATION_MINUTES)

      // Verificar se temos o user_id na resposta
      const userId = data.user?.id || data.id || data.user_id
      
      if (!userId) {
        console.error('User ID not found in backend response:', data)
        throw new Error('User ID not found in backend response')
      }

      // Salvar na tabela de sessions
      await prisma.sessions.create({
        data: {
          token,
          user_id: userId,
          expires_at: expires
        }
      })

      // Construir URL do magic link
      const baseUrl = getBaseUrl()
      const urlToken = `${baseUrl}/api/auth/magic-link/verify?token=${token}&email=${encodeURIComponent(email)}`

      // Enviar email através do backend Golang
      const emailResponse = await fetch(`${process.env.BACKEND_API_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BACKEND_APIKEY}`,
        },
        body: JSON.stringify({
          name: validatedData.name,
          email: validatedData.email,
          url_token: urlToken
        })
      })

      if (!emailResponse.ok) {
        console.error('Error sending verification email:', await emailResponse.text())
        // Não falhar o registro se o email falhar, apenas logar o erro
      }
    } catch (emailError) {
      console.error('Error sending verification email:', emailError)
      // Não falhar o registro se o email falhar, apenas logar o erro
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'User created successfully and verification email sent'
    })

  } catch (error) {
    console.error('Register API error:', error)
    
    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid data provided' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
