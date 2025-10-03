'use client'

import { useSessionCheck } from '@/hooks/use-session-check'

/**
 * Componente que verifica automaticamente a sessão
 * Use este componente em páginas que precisam de verificação de sessão
 */
export function SessionGuard({ children }: { children: React.ReactNode }) {
  // Ativar verificação automática de sessão
  useSessionCheck()
  
  return <>{children}</>
}
