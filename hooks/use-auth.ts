'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AUTH_CONFIG } from '@/lib/auth-config'

export interface User {
  id: string
  name: string | null
  email: string
  image: string | null
}

export interface AuthState {
  user: User | null
  loading: boolean
  authenticated: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    authenticated: false
  })
  
  const router = useRouter()

  const checkSession = async () => {
    try {
      const response = await fetch('/api/auth/session')
      const data = await response.json()
      
      if (data.authenticated && data.user) {
        setAuthState({
          user: data.user,
          loading: false,
          authenticated: true
        })
      } else {
        setAuthState({
          user: null,
          loading: false,
          authenticated: false
        })
        
        // Redirecionar para login com parâmetro de sessão expirada
        router.push('/auth/login?expired=true')
      }
    } catch (error) {
      console.error('Error checking session:', error)
      setAuthState({
        user: null,
        loading: false,
        authenticated: false
      })
      
      // Redirecionar para login com parâmetro de erro
      router.push('/auth/login?error=session')
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      
      setAuthState({
        user: null,
        loading: false,
        authenticated: false
      })
      
      // Limpar dados locais
      localStorage.clear()
      sessionStorage.clear()
      
      // Redirecionar para login
      router.push('/auth/login')
    } catch (error) {
      console.error('Error logging out:', error)
      // Mesmo com erro, limpar estado local
      setAuthState({
        user: null,
        loading: false,
        authenticated: false
      })
      router.push('/auth/login')
    }
  }

  const login = async (email: string) => {
    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      
      if (data.success) {
        return { success: true, message: data.message }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error('Error logging in:', error)
      return { success: false, error: 'Internal server error' }
    }
  }

  useEffect(() => {
    checkSession()
    
    // Verificar sessão periodicamente para detectar expiração
    const interval = setInterval(checkSession, AUTH_CONFIG.SESSION_CHECK_INTERVAL_MINUTES * 60 * 1000)
    
    // Verificar sessão quando a página ganha foco (usuário volta à aba)
    const handleFocus = () => checkSession()
    const handleVisibilityChange = () => {
      if (!document.hidden) checkSession()
    }
    
    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return {
    ...authState,
    logout,
    login,
    checkSession
  }
}
