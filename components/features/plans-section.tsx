"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FiCreditCard, FiCheck, FiAward, FiZap, FiStar, FiArrowRight } from "react-icons/fi"

export function PlansSection() {
  const currentPlan = {
    name: "Plano Pro",
    price: "R$ 19,99",
    period: "mês",
    features: [
      "CVs ilimitados",
      "Templates premium",
      "Análise de IA avançada",
      "Suporte prioritário",
      "Exportação em PDF/Word"
    ],
    status: "Ativo",
    nextBilling: "15 de Janeiro, 2024"
  }

  const availablePlans = [
    {
      name: "Básico",
      price: "€ 20,00",
      period: "mês",
      features: [
        "5 CVs por mês",
        "2 Templates básicos",
        "2 Templates premium",
        "Análise básica de IA",
        "Exportação em PDF",
        "Suporte por email"
      ],
      popular: false,
      current: false
    },
    {
      name: "Pro",
      price: "€ 40,00",
      period: "mês",
      features: [
        "20 CVs por mês",
        "Alteracao de cores e estilos",
        "Traducao automatica de texto",
        "10 Templates premium",
        "Análise de IA avançada",
        "Exportação em PDF/Word"
      ],
      popular: true,
      current: true
    },
    {
      name: "Enterprise",
      price: "€ 100,00",
      period: "mês",
      features: [
        "CVs ilimitados",
        "Templates premium",
        "API personalizada",
        "Integração com ATS",
        "Suporte dedicado",
        "Relatórios avançados",
      ],
      popular: false,
      current: false
    }
  ]

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4 lg:mb-6">
        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
          <FiCreditCard className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg lg:text-2xl font-bold text-white">Meus Planos Atuais</h1>
          <p className="text-white/70 text-sm lg:text-base hidden sm:block">Gerencie sua assinatura e recursos</p>
        </div>
      </div>

      {/* Current Plan */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <FiAward className="w-5 h-5" />
            <span>Plano Atual</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            Seu plano de assinatura atual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">{currentPlan.name}</h3>
              <p className="text-white/70">Próxima cobrança: {currentPlan.nextBilling}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{currentPlan.price}</div>
              <div className="text-white/70">/{currentPlan.period}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <FiCheck className="w-4 h-4 text-green-400" />
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-3">
            <Button className="bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white">
              <FiZap className="w-4 h-4 mr-2" />
              Gerenciar Assinatura
            </Button>
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
              Cancelar Assinatura
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-lg lg:text-xl font-bold text-white mb-4">Planos Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {availablePlans.map((plan, index) => (
            <Card 
              key={index}
              className={`backdrop-blur-xl border-white/20 shadow-2xl transition-all duration-300 hover:scale-105 ${
                plan.current 
                  ? 'bg-gradient-to-br from-green-400/20 to-emerald-400/20 border-green-400/30' 
                  : 'bg-white/10 hover:bg-white/15'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <FiStar className="w-3 h-3" />
                    <span>Popular</span>
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/70">/{plan.period}</span>
                </div>
                {plan.current && (
                  <div className="inline-flex items-center space-x-1 bg-green-400/20 text-green-300 px-3 py-1 rounded-full text-sm">
                    <FiCheck className="w-3 h-3" />
                    <span>Atual</span>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <FiCheck className="w-4 h-4 text-green-400" />
                      <span className="text-white/90 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${
                    plan.current 
                      ? 'bg-white/20 text-white hover:bg-white/30' 
                      : 'bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white'
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? 'Plano Atual' : 'Escolher Plano'}
                  {!plan.current && <FiArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Usage Statistics */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white">Uso do Plano</CardTitle>
          <CardDescription className="text-white/70">
            Estatísticas de uso do seu plano atual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-white/70 text-sm">CVs Criados</div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-white/70 text-sm">Templates Usados</div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full" style={{width: '40%'}}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24</div>
              <div className="text-white/70 text-sm">Dias Restantes</div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full" style={{width: '80%'}}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
