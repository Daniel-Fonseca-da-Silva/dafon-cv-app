import { NextRequest, NextResponse } from 'next/server'

const BACKEND_API_URL = process.env.BACKEND_API_URL
const BACKEND_APIKEY = process.env.BACKEND_APIKEY

interface GenerateAIRequest {
  content: string
}

interface GenerateAIResponse {
  success: boolean
  data?: any
  error?: string
  message?: string
}

interface GenerateAIOptions {
  endpoint: string
  errorMessage: string
  successMessage: string
  logContext: string
}

export async function handleGenerateAIRequest(
  request: NextRequest,
  options: GenerateAIOptions
): Promise<NextResponse<GenerateAIResponse>> {
  try {
    const body = await request.json()
    const { content } = body

    if (!content || !content.trim()) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      )
    }

    const response = await fetch(`${BACKEND_API_URL}${options.endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BACKEND_APIKEY}`,
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
          error: data.message || data.error || options.errorMessage
        },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      message: options.successMessage
    })

  } catch (error) {
    console.error(`${options.logContext} error:`, error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
