import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactForm } from "@/components/features/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-blue-800 -z-10" />
      
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl" />
      </div>

      <main className="flex-grow pt-16"> 
        <ContactForm />
      </main>

      <Footer />
    </div>
  )
}
