"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FiMail, FiLock, FiUserPlus } from "react-icons/fi"
import Link from "next/link"
import { useTranslations } from "next-intl"
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const t = useTranslations("auth.login")
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar lógica de login aqui
    console.log("Login com email:", email)
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
              <FiLock className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              {t('title')}
            </CardTitle>
            <CardDescription className="text-white/90">
              {t('subtitle')}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/90">
                  {t('subtitle2')}
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/20 border-white/30 backdrop-blur-sm focus:bg-white/30 transition-all duration-200 text-white placeholder:text-white/60"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t('action')}
              </Button>
            </form>

            <div className="space-y-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <Link 
                  href="/auth/forgot-password" 
                  className="text-sm text-orange-300 hover:text-orange-200 transition-colors duration-200 hover:underline"
                >
                  {t('forgotPassword')}
                </Link>
              </div>

              <div className="text-center">
                <span className="text-sm text-white/80">
                  {t('dontHaveAccount')}
                </span>
                <Link 
                  href="/auth/register" 
                  className="inline-flex items-center gap-1 text-sm font-medium text-pink-300 hover:text-pink-200 transition-colors duration-200 hover:underline"
                >
                  <FiUserPlus className="w-4 h-4" />
                  {t('register')}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
