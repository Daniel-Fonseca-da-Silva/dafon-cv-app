"use client"

import { useState, useTransition } from "react"
import { useFormStatus } from "react-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FiMail, FiArrowLeft, FiLoader } from "react-icons/fi"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { forgotPasswordSchema } from "@/lib/validations"
import { forgotPasswordWithEmail, ApiError } from "@/lib/auth-api"
import { ZodError } from "zod"

// Componente de botão que usa useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus()
  const t = useTranslations("auth.forgotPassword")
  
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {pending ? (
        <>
          <FiLoader className="w-4 h-4 mr-2 animate-spin" />
          {t('loading')}
        </>
      ) : (
        t('action')
      )}
    </Button>
  )
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [isPending, startTransition] = useTransition()
  const t = useTranslations("auth.forgotPassword")
  
  const handleForgotPassword = async (formData: FormData) => {
    const emailValue = formData.get("email") as string
    
    // Limpar erros anteriores e alerta de sucesso
    setErrors({})
    setShowSuccessAlert(false)
    
    try {
      // Validar com Zod
      const validatedData = forgotPasswordSchema.parse({ email: emailValue })
      
      // Fazer requisição para a API
      await forgotPasswordWithEmail(validatedData.email)
      
      // Exibir alerta de sucesso
      setShowSuccessAlert(true)
    } catch (error) {
      if (error instanceof ZodError) {
        // Erro de validação do Zod
        const zodErrors: Record<string, string> = {}
        error.issues.forEach((issue) => {
          zodErrors[issue.path[0] as string] = issue.message
        })
        setErrors(zodErrors)
      } else if (error instanceof ApiError) {
        // Erro da API
        setErrors({ 
          general: error.message || 'Error when sending password reset instructions. Try again.' 
        })
      } else {
        // Erro genérico
        setErrors({ 
          general: 'Unexpected error. Try again.' 
        })
      }
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
            <FiMail className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
          {t('title')}
          </CardTitle>
          <CardDescription className="text-white/90">
            {t('subtitle')}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {showSuccessAlert && (
            <Alert className="bg-green-500/20 border-green-500/30 text-green-200">
              <AlertTitle className="text-green-100 font-semibold">
                {t('codeSent.title')}
              </AlertTitle>
              <AlertDescription className="text-green-200/90">
                {t('codeSent.message')}
              </AlertDescription>
            </Alert>
          )}
          
          {errors.general && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-200 text-sm">{errors.general}</p>
            </div>
          )}
          
          <form action={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white/90">
                {t('subtitle2')}
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('email')}
                  defaultValue={email}
                  className={`pl-10 bg-white/20 border-white/30 backdrop-blur-sm focus:bg-white/30 transition-all duration-200 text-white placeholder:text-white/60 ${
                    errors.email ? 'border-red-400 focus:border-red-400' : ''
                  }`}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-300 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <SubmitButton />
          </form>

          <div className="text-center pt-4 border-t border-white/20">
            <Link 
              href="/auth/login" 
              className="inline-flex items-center gap-2 text-sm text-orange-300 hover:text-orange-200 transition-colors duration-200 hover:underline"
            >
              <FiArrowLeft className="w-4 h-4" />
              {t('backToLogin')}
            </Link>
          </div>
        </CardContent>
      </Card>
      </main>

      <Footer />
    </div>
  )
}
