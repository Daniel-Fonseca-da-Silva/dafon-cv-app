import { NextRequest, NextResponse } from 'next/server'
import { registerSchema } from '@/lib/validations'
import { BACKEND_API_URL } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email } = body

    // Validate input data
    const validatedData = registerSchema.parse({ name, email })

    // Make request to Golang backend
    const response = await fetch(`${BACKEND_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
          error: data.message || data.error || 'Erro ao criar usuário no backend' 
        },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Usuário criado com sucesso'
    })

  } catch (error) {
    console.error('Register API error:', error)
    
    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Dados inválidos fornecidos' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
