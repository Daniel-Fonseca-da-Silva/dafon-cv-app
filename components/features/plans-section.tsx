"use client"

import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { FiCreditCard, FiCheck, FiAward, FiZap, FiStar, FiArrowRight, FiArrowLeft } from "react-icons/fi"

interface PlansSectionProps {
  onSectionChange?: (section: string) => void
}

export function PlansSection({ onSectionChange }: PlansSectionProps) {
  const t = useTranslations('plans')

  const handleBackToDashboard = () => {
    if (onSectionChange) {
      onSectionChange('dashboard')
    }
  }
  
  const currentPlan = {
    name: t('plans.basic.name'),
    price: "Testing",
    period: t('common.period'),
    features: t.raw('plans.basic.features') as string[],
    status: t('currentPlan.status'),
    nextBilling: "Undefined"
  }

  const availablePlans = [
    {
      name: t('plans.basic.name'),
      price: "Free undefined",
      period: t('common.period'),
      features: t.raw('plans.basic.features') as string[],
      popular: false,
      current: true
    },
    {
      name: t('plans.pro.name'),
      price: "€ 40,00",
      period: t('common.period'),
      features: t.raw('plans.pro.features') as string[],
      popular: true,
      current: false
    },
    {
      name: t('plans.enterprise.name'),
      price: "€ 100,00",
      period: t('common.period'),
      features: t.raw('plans.enterprise.features') as string[],
      popular: false,
      current: false
    }
  ]

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
            <FiCreditCard className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg lg:text-2xl font-bold text-white">{t('header.title')}</h1>
            <p className="text-white/70 text-sm lg:text-base hidden sm:block">{t('header.subtitle')}</p>
          </div>
        </div>
        
        {/* Back Button */}
        {onSectionChange && (
          <Button
            onClick={handleBackToDashboard}
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('header.backButton')}</span>
            <span className="sm:hidden">Voltar</span>
          </Button>
        )}
      </div>

      {/* Plano Atual */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <FiAward className="w-5 h-5" />
            <span>{t('currentPlan.title')}</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            {t('currentPlan.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">{currentPlan.name}</h3>
              <p className="text-white/70">{t('currentPlan.nextBilling')}: {currentPlan.nextBilling}</p>
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
          
          <div className="flex flex-col sm:flex-row gap-3 sm:space-x-3 sm:space-y-0 space-y-3">
            <Button className="bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white">
              <FiZap className="w-4 h-4 mr-2" />
              {t('currentPlan.manageSubscription')}
            </Button>
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
              {t('currentPlan.cancelSubscription')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Planos Disponíveis */}
      <div>
        <h2 className="text-lg lg:text-xl font-bold text-white mb-4">{t('availablePlans.title')}</h2>
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
                    <span>{t('availablePlans.popular')}</span>
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
                    <span>{t('availablePlans.current')}</span>
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
                  {plan.current ? t('availablePlans.current') : t('availablePlans.choosePlan')}
                  {!plan.current && <FiArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Estatísticas de Uso */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white">{t('usage.title')}</CardTitle>
          <CardDescription className="text-white/70">
            {t('usage.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-white/70 text-sm">{t('usage.cvsCreated')}</div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-white/70 text-sm">{t('usage.templatesUsed')}</div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full" style={{width: '40%'}}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24</div>
              <div className="text-white/70 text-sm">{t('usage.daysRemaining')}</div>
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
