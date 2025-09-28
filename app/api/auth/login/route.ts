import { NextRequest, NextResponse } from 'next/server'

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:8080'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Fazer requisição para o backend Golang
    const response = await fetch(`${BACKEND_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.message || 'Error during login' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Login successful'
    })

  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
