import { NextRequest, NextResponse } from 'next/server'

const BACKEND_API_URL = process.env.BACKEND_API_URL

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content } = body

    if (!content || !content.trim()) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      )
    }

    // Fazer requisição para o backend Golang
    const response = await fetch(`${BACKEND_API_URL}/generate-skill-ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BACKEND_APIKEY}`,
      },
      body: JSON.stringify({
        content: content.trim()
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          error: data.message || data.error || 'Error processing skill content with AI' 
        },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Skill content processed successfully'
    })

  } catch (error) {
    console.error('Generate skill AI API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
