/**
 * Serviço de limpeza automática de tokens expirados
 */

import { prisma } from '@/lib/database'

/**
 * Remove todos os tokens expirados da tabela sessions
 */
export async function cleanupExpiredTokens(): Promise<number> {
  try {
    const result = await prisma.sessions.deleteMany({
      where: {
        expires_at: {
          lt: new Date() // Menor que a data atual = expirado
        }
      }
    })
    
    console.log(`Automatic cleanup: ${result.count} expired tokens removed`)
    return result.count
  } catch (error) {
    console.error('Error cleaning expired tokens:', error)
    return 0
  }
}

/**
 * Remove tokens expirados de um usuário específico
 */
export async function cleanupUserExpiredTokens(userId: string): Promise<number> {
  try {
    const result = await prisma.sessions.deleteMany({
      where: {
        user_id: userId,
        expires_at: {
          lt: new Date()
        }
      }
    })
    
    console.log(`Cleanup of user ${userId}: ${result.count} expired tokens removed`)
    return result.count
  } catch (error) {
    console.error('Error cleaning user tokens:', error)
    return 0
  }
}

/**
 * Remove um token específico (usado quando detecta expiração)
 */
export async function cleanupSpecificToken(token: string): Promise<boolean> {
  try {
    await prisma.sessions.delete({
      where: { token }
    })
    
    console.log(`Specific token removed: ${token.substring(0, 8)}...`)
    return true
  } catch (error) {
    console.error('Error removing specific token:', error)
    return false
  }
}

/**
 * Inicia o scheduler de limpeza automática
 */
export function startTokenCleanupScheduler() {
  // Limpeza a cada 5 minutos
  const interval = 5 * 60 * 1000
  
  setInterval(async () => {
    await cleanupExpiredTokens()
  }, interval)
  
  console.log('Scheduler of token cleanup started (every 5 minutes)')
}

/**
 * Limpeza imediata de todos os tokens expirados
 */
export async function immediateCleanup(): Promise<number> {
  console.log('Starting immediate cleanup of expired tokens...')
  return await cleanupExpiredTokens()
}
