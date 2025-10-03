'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from './use-auth'

/**
 * Hook que verifica a sessão automaticamente em mudanças de rota
 * e em eventos do navegador
 */
export function useSessionCheck() {
  const { authenticated, checkSession } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Verificar sessão sempre que a rota mudar
    checkSession()
  }, [pathname, checkSession])

  useEffect(() => {
    // Verificar sessão quando a página ganha foco
    const handleFocus = () => {
      checkSession()
    }

    // Verificar sessão quando a visibilidade da página muda
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkSession()
      }
    }

    // Verificar sessão quando o usuário interage com a página
    const handleUserInteraction = () => {
      checkSession()
    }

    // Adicionar listeners
    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('keydown', handleUserInteraction)

    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
    }
  }, [checkSession])

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (authenticated === false) {
      router.push('/auth/login')
    }
  }, [authenticated, router])
}
