import { NextRequest, NextResponse } from 'next/server'
import { AUTH_CONFIG } from '@/lib/auth-config'
import { sessionCache } from '@/lib/session-cache'
import { cleanupSpecificToken } from '@/lib/token-cleanup'

export async function POST(request: NextRequest) {
  try {
    // Obter token de sessão do cookie
    const sessionToken = request.cookies.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value

    if (sessionToken) {
      // Remover do cache
      sessionCache.delete(sessionToken)
      
      // Remover token específico usando função de limpeza
      await cleanupSpecificToken(sessionToken)
    }

    // Limpar cookie de sessão
    const response = NextResponse.json({
      success: true,
      message: 'Logout completed successfully'
    })

    // Remover cookie de sessão customizado
    response.cookies.delete(AUTH_CONFIG.SESSION_COOKIE_NAME)
    
    return response

  } catch (error) {
    console.error('Error logging out:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
