"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FiMail, FiUser, FiArrowLeft, FiCheckCircle } from "react-icons/fi"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { registerUser } from "@/lib/auth-api"
import { registerSchema, type RegisterFormData } from "@/lib/validations"
import { ZodError } from "zod"
export default function RegisterPage() {

  const t = useTranslations("auth.register")
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      // Validar dados com Zod
      const validatedData = registerSchema.parse(formData)
      
      // Chamar API de registro
      await registerUser(validatedData)
      
      // Mostrar alerta de boas-vindas
      setShowWelcomeAlert(true)
      
      // Limpar formulário
      setFormData({ name: "", email: "" })
      
    } catch (error) {
      if (error instanceof ZodError) {
        // Tratar erros de validação do Zod
        const fieldErrors: Record<string, string> = {}
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
      } else if (error instanceof Error) {
        // Tratar outros erros (API, rede, etc.)
        setErrors({ general: error.message })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Main Content */}
      <main className="relative flex items-center justify-center p-4 pt-24 pb-16 min-h-screen">
        {/* Background Gradient - mesmo padrão das outras telas */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-blue-800" />
        
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl" />
        </div>

        <Card className="w-full max-w-md relative backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl z-10">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center mb-4">
            <FiUser className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            {t('title')}
          </CardTitle>
          <CardDescription className="text-white/90">
            {t('subtitle')}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Alerta de boas-vindas */}
          {showWelcomeAlert && (
            <Alert className="bg-green-500/20 border-green-400/30 text-green-100">
              <FiCheckCircle className="h-4 w-4 text-green-400" />
              <AlertTitle className="text-green-200">{t('welcomeAlert.title')}</AlertTitle>
              <AlertDescription className="text-green-100">
                {t('welcomeAlert.message')}
              </AlertDescription>
            </Alert>
          )}

          {/* Alerta de erro geral */}
          {errors.general && (
            <Alert variant="destructive" className="bg-red-500/20 border-red-400/30 text-red-100">
              <AlertTitle className="text-red-200">Erro</AlertTitle>
              <AlertDescription className="text-red-100">
                {errors.general}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-white/90">
                {t('subtitleName2')}
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t('name')}
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`pl-10 bg-white/20 border-white/30 backdrop-blur-sm focus:bg-white/30 transition-all duration-200 text-white placeholder:text-white/60 ${
                    errors.name ? 'border-red-400 focus:border-red-400' : ''
                  }`}
                  required
                />
              </div>
              {errors.name && (
                <p className="text-red-300 text-sm">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white/90">
                {t('email')}
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('subtitleEmail2')}
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`pl-10 bg-white/20 border-white/30 backdrop-blur-sm focus:bg-white/30 transition-all duration-200 text-white placeholder:text-white/60 ${
                    errors.email ? 'border-red-400 focus:border-red-400' : ''
                  }`}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-300 text-sm">{errors.email}</p>
              )}
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Criando conta...' : t('action')}
            </Button>
          </form>

          <div className="text-center pt-4 border-t border-white/20">
            <span className="text-sm text-white/80">
              {t('alreadyHaveAccount')}
            </span>
            <Link 
              href="/auth/login" 
              className="inline-flex items-center gap-2 text-sm font-medium text-orange-300 hover:text-orange-200 transition-colors duration-200 hover:underline"
            >
              <FiArrowLeft className="w-4 h-4" />
              {t('login')}
            </Link>
          </div>
        </CardContent>
      </Card>
      </main>

      <Footer />
    </div>
  )
}
