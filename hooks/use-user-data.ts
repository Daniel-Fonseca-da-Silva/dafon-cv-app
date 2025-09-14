import { useState, useEffect } from "react"

export interface UserData {
  name: string
  email: string
  avatar?: string
}

export function useUserData() {
  const [userData, setUserData] = useState<UserData>({
    name: "Dafon CV",
    email: "dafoncv@email.com",
    avatar: undefined
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Simula carregamento de dados do usuário
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Em uma aplicação real, aqui seria feita uma chamada para a API
        // const response = await fetch('/api/user')
        // const data = await response.json()
        // setUserData(data)
        
        // Simula delay de carregamento
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Dados mockados por enquanto
        setUserData({
          name: "Dafon CV",
          email: "dafoncv@email.com",
          avatar: undefined
        })
      } catch (err) {
        setError("Erro ao carregar dados do usuário")
        console.error("Erro ao carregar dados do usuário:", err)
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
      // Em uma aplicação real, aqui seria feita uma chamada para a API
      // const response = await fetch('/api/user', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newData)
      // })
      // const data = await response.json()
      
      // Simula delay de atualização
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setUserData(prev => ({ ...prev, ...newData }))
    } catch (err) {
      setError("Erro ao atualizar dados do usuário")
      console.error("Erro ao atualizar dados do usuário:", err)
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
