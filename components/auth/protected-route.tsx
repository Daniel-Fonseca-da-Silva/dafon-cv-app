'use client'

import { useAuth } from '@/hooks/use-auth'
import { useSessionCheck } from '@/hooks/use-session-check'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { loading, authenticated } = useAuth()
  const router = useRouter()
  
  // Ativar verificação automática de sessão
  useSessionCheck()

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push('/auth/login')
    }
  }, [loading, authenticated, router])
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!authenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Redirecionando para login...
          </h2>
          <p className="text-gray-600">
            Você precisa estar logado para acessar esta página.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
