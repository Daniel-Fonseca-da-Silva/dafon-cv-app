import { NextRequest, NextResponse } from 'next/server'
import { LOCALE_COOKIE_NAME } from '@/lib/cookies'

const BACKEND_API_URL = process.env.BACKEND_API_URL
const DEFAULT_LOCALE = 'en'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { Content } = body

    if (!Content || typeof Content !== 'string' || Content.trim().length < 300) {
      return NextResponse.json(
        { error: 'Job description content is required and must be at least 300 characters' },
        { status: 400 }
      )
    }

    // Get locale from cookie or use default
    const locale = request.cookies.get(LOCALE_COOKIE_NAME)?.value || DEFAULT_LOCALE

    // Build URL with lang parameter
    const backendUrl = `${BACKEND_API_URL}/generate-analyze-job-ai/${encodeURIComponent(id)}?lang=${locale}`

    // Make request to external backend
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BACKEND_APIKEY}`,
      },
      body: JSON.stringify({
        Content: Content.trim()
      }),
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Curriculum not found' },
          { status: 404 }
        )
      }
      
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { error: errorData.error || errorData.message || `Error analyzing job: ${response.status}` },
        { status: response.status }
      )
    }

    const analysisData = await response.json()
    
    return NextResponse.json(analysisData)
    
  } catch (error) {
    console.error('Error in job analysis API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

