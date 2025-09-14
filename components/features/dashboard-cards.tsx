"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FiFileText, FiUser, FiSettings, FiCreditCard, FiArrowRight } from "react-icons/fi"

interface DashboardCardsProps {
  onCardClick: (section: string) => void
}

export function DashboardCards({ onCardClick }: DashboardCardsProps) {
  const cards = [
    {
      id: "generate-cv",
      title: "Gerar CV com IA",
      description: "Crie um currículo profissional usando inteligência artificial. Personalize e otimize seu CV em minutos.",
      icon: FiFileText,
      gradient: "from-blue-400 to-cyan-400",
      hoverGradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "profile",
      title: "Meu Perfil",
      description: "Gerencie suas informações pessoais, experiência profissional e dados de contato.",
      icon: FiUser,
      gradient: "from-purple-400 to-pink-400",
      hoverGradient: "from-purple-500 to-pink-500"
    },
    {
      id: "settings",
      title: "Configurações",
      description: "Personalize suas preferências, notificações e configurações da conta.",
      icon: FiSettings,
      gradient: "from-orange-400 to-red-400",
      hoverGradient: "from-orange-500 to-red-500"
    },
    {
      id: "plans",
      title: "Meus Planos Atuais",
      description: "Visualize seu plano atual, recursos disponíveis e opções de upgrade.",
      icon: FiCreditCard,
      gradient: "from-green-400 to-emerald-400",
      hoverGradient: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 p-4 lg:p-6">
      {cards.map((card) => {
        const Icon = card.icon
        
        return (
          <Card 
            key={card.id}
            className="group cursor-pointer backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 lg:hover:-translate-y-2 hover:scale-105"
            onClick={() => onCardClick(card.id)}
          >
            <CardHeader className="pb-3 lg:pb-4">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <FiArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-2 lg:space-y-3">
              <CardTitle className="text-lg lg:text-xl font-bold text-white group-hover:text-white/90 transition-colors duration-300">
                {card.title}
              </CardTitle>
              <CardDescription className="text-white/80 text-xs lg:text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                {card.description}
              </CardDescription>
              
              <div className="pt-2">
                <div className={`h-1 w-full bg-gradient-to-r ${card.gradient} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
