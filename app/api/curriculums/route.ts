import { NextRequest, NextResponse } from 'next/server'

const BACKEND_API_URL = process.env.BACKEND_API_URL

export async function GET(request: NextRequest) {
  try {
    // Buscar sessão atual para obter o ID do usuário logado
    const sessionRes = await fetch(`${request.nextUrl.origin}/api/auth/session`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || ''
      },
      cache: 'no-store'
    })

    const sessionData = await sessionRes.json()

    if (!sessionData?.authenticated || !sessionData?.user?.id) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }
    
    const userId = sessionData.user.id as string

    // Obter parâmetros de paginação da query string
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const pageSize = searchParams.get('page_size') || '10'
    const sortBy = searchParams.get('sort_by') || 'full_name'
    const sortOrder = searchParams.get('sort_order') || 'ASC'

    // Chamar backend Go para buscar currículos com paginação
    const backendUrl = `${BACKEND_API_URL}/curriculums/get-all-by-user/${encodeURIComponent(userId)}?page=${page}&page_size=${pageSize}&sort_by=${sortBy}&sort_order=${sortOrder}`
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BACKEND_APIKEY}`
      },
      cache: 'no-store'
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ 
        success: false, 
        error: data?.message || data?.error || 'Failed to fetch curriculums' 
      }, { status: response.status })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Curriculums GET error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
