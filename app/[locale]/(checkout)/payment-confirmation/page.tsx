"use client"

import { Logo } from "@/components/ui/logo"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FiCheckCircle } from "react-icons/fi"
import { Link } from "@/i18n/navigation"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useTranslations } from "next-intl"

export default function PaymentConfirmationPage() {
  const t = useTranslations('paymentConfirmation')
  return (
    <ProtectedRoute>
    <div className="min-h-screen flex flex-col relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-blue-800 -z-10" />
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl" />
      </div>

      {/* Logo Section */}
      <div className="relative z-10 pt-8 px-4 sm:px-6 lg:px-8">
        <Logo size="md" showText={true} />
      </div>
      
      {/* Main Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader className="text-center space-y-4 pb-4">
            {/* Purchase Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-400/20 flex items-center justify-center shadow-lg">
                <FiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
              </div>
            </div>

            {/* Title */}
            <CardTitle className="text-2xl sm:text-3xl font-bold text-white">
              {t('title')}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-center">
            {/* Paragraph */}
            <p className="text-white/90 text-sm sm:text-base">
              {t('message')}
            </p>

            {/* Description */}
            <CardDescription className="text-white/70 text-sm sm:text-base leading-relaxed">
              {t('description')}
            </CardDescription>

            {/* Button */}
            <div className="pt-4">
              <Link href="/dashboard">
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  {t('goToDashboard')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
    </ProtectedRoute>
  )
}

