import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Main Content */}
      <main className="relative flex items-center justify-center p-4 pt-24 pb-16 min-h-screen">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-blue-800" />
        
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl" />
        </div>

        <RegisterForm />
      </main>

      <Footer />
    </div>
  )
}