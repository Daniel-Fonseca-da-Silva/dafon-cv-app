import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import { AUTH_CONFIG, isTokenExpired } from '@/lib/auth-config'
import { sessionCache } from '@/lib/session-cache'
import { cleanupExpiredTokens, cleanupSpecificToken } from '@/lib/token-cleanup'

export async function GET(request: NextRequest) {
  try {
    // Limpeza automática de tokens expirados (executa em background)
    cleanupExpiredTokens().catch(console.error)
    
    // Obter token de sessão do cookie
    const sessionToken = request.cookies.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value

    if (!sessionToken) {
      return NextResponse.json({ 
        authenticated: false,
        user: null 
      })
    }

    // Verificar cache primeiro
    let session = sessionCache.get(sessionToken)
    
    if (!session) {
      // Se não estiver no cache, consultar banco
      const dbSession = await prisma.sessions.findUnique({
        where: { token: sessionToken },
        include: { users: true }
      })

      if (!dbSession) {
        return NextResponse.json({ 
          authenticated: false,
          user: null 
        })
      }

      if (isTokenExpired(dbSession.expires_at)) {
        // Remover sessão expirada
        await prisma.sessions.delete({
          where: { token: sessionToken }
        })
        
        return NextResponse.json({ 
          authenticated: false,
          user: null 
        })
      }

      // Adicionar ao cache
      session = {
        token: dbSession.token,
        userId: dbSession.user_id,
        expiresAt: dbSession.expires_at,
        user: {
          id: dbSession.users.id,
          name: dbSession.users.name,
          email: dbSession.users.email
        }
      }
      
      sessionCache.set(sessionToken, session)
    }

    // Verificar se expirou (mesmo com cache)
    if (isTokenExpired(session.expiresAt)) {
      // Remover do cache e banco
      sessionCache.delete(sessionToken)
      await cleanupSpecificToken(sessionToken)
      
      return NextResponse.json({ 
        authenticated: false,
        user: null 
      })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: null // Campo image não existe na tabela users
      }
    })

  } catch (error) {
    console.error('Erro na verificação de sessão:', error)
    return NextResponse.json({ 
      authenticated: false,
      user: null 
    })
  }
}
