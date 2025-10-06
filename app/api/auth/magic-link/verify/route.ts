import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { prisma } from '@/lib/database'
import { AUTH_CONFIG, calculateExpirationDate } from '@/lib/auth-config'
import { cleanupExpiredTokens } from '@/lib/token-cleanup'

export async function GET(request: NextRequest) {
  try {
    // Limpeza automática de tokens expirados (executa em background)
    cleanupExpiredTokens().catch(console.error)
    
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    if (!token || !email) {
      const baseUrl = process.env.NEXTAUTH_URL
      const errorUrl = `${baseUrl}/token-error?type=invalid&email=${encodeURIComponent(email || '')}`
      return NextResponse.redirect(errorUrl)
    }

    // Verificar se o token existe e não expirou
    const session = await prisma.sessions.findUnique({
      where: { token },
      include: { users: true }
    })

    if (!session) {
      const baseUrl = process.env.NEXTAUTH_URL
      const errorUrl = `${baseUrl}/token-error?type=invalid&email=${encodeURIComponent(email)}`
      return NextResponse.redirect(errorUrl)
    }

    if (session.expires_at < new Date()) {
      // Remover token expirado
      await prisma.sessions.delete({
        where: { token }
      })
      
      const baseUrl = process.env.NEXTAUTH_URL
      const errorUrl = `${baseUrl}/token-error?type=expired&email=${encodeURIComponent(email)}`
      return NextResponse.redirect(errorUrl)
    }

    if (session.users.email !== email) {
      const baseUrl = process.env.NEXTAUTH_URL
      const errorUrl = `${baseUrl}/token-error?type=email_mismatch&email=${encodeURIComponent(email)}`
      return NextResponse.redirect(errorUrl)
    }

    // Remover o token após uso
    await prisma.sessions.delete({
      where: { token }
    })

    // Criar nova sessão de autenticação
    const sessionToken = await createSessionToken(session.user_id)
    
    // Redirecionar para o dashboard
    const baseUrl = process.env.NEXTAUTH_URL
    const redirectUrl = `${baseUrl}/dashboard`

    // Criar resposta com cookie de sessão
    const response = NextResponse.redirect(redirectUrl)
    response.cookies.set(AUTH_CONFIG.SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: AUTH_CONFIG.COOKIE_HTTP_ONLY,
      secure: AUTH_CONFIG.COOKIE_SECURE,
      sameSite: AUTH_CONFIG.COOKIE_SAME_SITE,
      maxAge: AUTH_CONFIG.SESSION_TOKEN_EXPIRATION_MINUTES * 60 // Converter para segundos
    })

    return response

  } catch (error) {
    console.error('Error verifying magic link:', error)
    const baseUrl = process.env.NEXTAUTH_URL
    const errorUrl = `${baseUrl}/token-error?type=server_error`
    return NextResponse.redirect(errorUrl)
  }
}

async function createSessionToken(userId: string): Promise<string> {
  const sessionToken = randomBytes(32).toString('hex')
  const expires = calculateExpirationDate(AUTH_CONFIG.SESSION_TOKEN_EXPIRATION_MINUTES)

  await prisma.sessions.create({
    data: {
      token: sessionToken,
      user_id: userId,
      expires_at: expires
    }
  })

  return sessionToken
}
