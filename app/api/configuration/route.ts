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

    // Chamar backend Go para buscar configurações do usuário por ID
    const response = await fetch(`${BACKEND_API_URL}/configuration/${encodeURIComponent(userId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BACKEND_APIKEY}`
      },
      cache: 'no-store'
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ success: false, error: data?.message || data?.error || 'Failed to fetch configuration' }, { status: response.status })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
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

    // Obter dados do body da requisição
    const body = await request.json()

    // Chamar backend Go para atualizar configurações do usuário por ID
    const response = await fetch(`${BACKEND_API_URL}/configuration/${encodeURIComponent(userId)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BACKEND_APIKEY}`
      },
      body: JSON.stringify(body),
      cache: 'no-store'
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ success: false, error: data?.message || data?.error || 'Failed to update configuration' }, { status: response.status })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
