import { useState, useEffect } from "react"

export interface UserData {
  name: string
  email: string
  phone?: string
  country?: string
  state?: string
  city?: string
  age?: number | null
  salary?: number | null
  employment?: boolean
  gender?: string
  migration?: boolean
  image_url?: string | null
}

export function useUserData() {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: ""
  })

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carrega dados reais do usuário da API
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const response = await fetch('/api/user/me', { 
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        const body = await response.json()
        
        if (!response.ok || !body?.success) {
          throw new Error(body?.error || 'Failed to load user data')
        }
        
        // Mapeia os dados da API para o formato esperado
        console.log('User data from API:', body.data);
        setUserData({
          name: body.data?.name || "",
          email: body.data?.email || "",
          phone: body.data?.phone,
          country: body.data?.country,
          state: body.data?.state,
          city: body.data?.city,
          age: body.data?.age,
          salary: body.data?.salary,
          employment: body.data?.employment,
          gender: body.data?.gender,
          migration: body.data?.migration,
          image_url: body.data?.image_url
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error loading user data"
        setError(errorMessage)
        console.error("Error loading user data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  const updateUserData = async (newData: Partial<UserData>) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/user/me', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
      
      const body = await response.json()
      
      if (!response.ok || !body?.success) {
        throw new Error(body?.error || 'Failed to update user data')
      }
      
      // Atualiza o estado local com os novos dados
      setUserData(prev => ({ ...prev, ...newData }))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error updating user data"
      setError(errorMessage)
      console.error("Error updating user data:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    userData,
    isLoading,
    error,
    updateUserData
  }
}
