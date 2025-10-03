/**
 * Cache de sessões em memória para reduzir consultas ao banco
 */

interface CachedSession {
  token: string
  userId: string
  expiresAt: Date
  user: {
    id: string
    name: string | null
    email: string
  }
}

class SessionCache {
  private cache = new Map<string, CachedSession>()
  private readonly TTL = 5 * 60 * 1000 // 5 minutos

  set(token: string, session: CachedSession) {
    this.cache.set(token, session)
    
    // Limpar automaticamente após TTL
    setTimeout(() => {
      this.cache.delete(token)
    }, this.TTL)
  }

  get(token: string): CachedSession | null {
    const session = this.cache.get(token)
    
    if (!session) return null
    
    // Verificar se expirou
    if (session.expiresAt < new Date()) {
      this.cache.delete(token)
      return null
    }
    
    return session
  }

  delete(token: string) {
    this.cache.delete(token)
  }

  clear() {
    this.cache.clear()
  }

  // Limpar sessões expiradas
  cleanup() {
    const now = new Date()
    for (const [token, session] of this.cache.entries()) {
      if (session.expiresAt < now) {
        this.cache.delete(token)
      }
    }
  }
}

export const sessionCache = new SessionCache()

// Limpar cache a cada 10 minutos
setInterval(() => {
  sessionCache.cleanup()
}, 10 * 60 * 1000)
