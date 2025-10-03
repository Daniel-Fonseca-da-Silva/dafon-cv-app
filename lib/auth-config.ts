/**
 * Configurações de autenticação
 * Todas as configurações relacionadas a tokens, sessões e expiração
 */

export const AUTH_CONFIG = {
  // Tempo de expiração do token de sessão (em minutos)
  SESSION_TOKEN_EXPIRATION_MINUTES: parseInt(process.env.SESSION_TOKEN_EXPIRATION_MINUTES || '30'),
  
  // Tempo de expiração do token de magic link (em minutos)
  MAGIC_LINK_TOKEN_EXPIRATION_MINUTES: parseInt(process.env.MAGIC_LINK_TOKEN_EXPIRATION_MINUTES || '30'),
  
  // Intervalo para verificação de sessão (em minutos)
  SESSION_CHECK_INTERVAL_MINUTES: parseInt(process.env.SESSION_CHECK_INTERVAL_MINUTES || '5'),
  
  // Nome do cookie de sessão
  SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME || 'session-token',
  
  // Configurações de segurança do cookie
  COOKIE_SECURE: process.env.NODE_ENV === 'production',
  COOKIE_SAME_SITE: 'lax' as const,
  COOKIE_HTTP_ONLY: true,
}

/**
 * Converte minutos para milissegundos
 */
export function minutesToMs(minutes: number): number {
  return minutes * 60 * 1000
}

/**
 * Converte minutos para segundos
 */
export function minutesToSeconds(minutes: number): number {
  return minutes * 60
}

/**
 * Calcula data de expiração baseada nos minutos configurados
 */
export function calculateExpirationDate(minutes: number): Date {
  return new Date(Date.now() + minutesToMs(minutes))
}

/**
 * Verifica se um token está expirado
 */
export function isTokenExpired(expiresAt: Date): boolean {
  return expiresAt < new Date()
}
