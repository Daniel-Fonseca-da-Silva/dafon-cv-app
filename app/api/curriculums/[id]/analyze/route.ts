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

    // Obter localte do cookie ou usar padrão
    const locale = request.cookies.get(LOCALE_COOKIE_NAME)?.value || DEFAULT_LOCALE

     // Construir URL com parâmetro lang
    const backendUrl = `${BACKEND_API_URL}/generate-analyze-ai/${encodeURIComponent(id)}?lang=${locale}`

    // Fazer requisição para o backend externo
    const response = await fetch(backendUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BACKEND_APIKEY}`,
        },
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Curriculum not found' },
          { status: 404 }
        )
      }
      
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { error: errorData.error || `Error analyzing curriculum: ${response.status}` },
        { status: response.status }
      )
    }

    const analysisData = await response.json()
    
    return NextResponse.json(analysisData)
    
  } catch (error) {
    console.error('Error in curriculum analysis API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
