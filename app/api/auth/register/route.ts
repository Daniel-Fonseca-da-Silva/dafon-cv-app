import { NextRequest, NextResponse } from 'next/server'
import { registerSchema } from '@/lib/validations'

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

    return NextResponse.json({
      success: true,
      data,
      message: 'User created successfully'
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
