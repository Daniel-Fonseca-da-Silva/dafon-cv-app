"use client"

import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FiSettings, FiBell, FiShield, FiGlobe, FiMoon, FiSun, FiSave, FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiArrowLeft } from "react-icons/fi"
import { useState } from "react"
import { useLocale } from '@/hooks/use-locale'

interface SettingsSectionProps {
  onSectionChange?: (section: string) => void
}

export function SettingsSection({ onSectionChange }: SettingsSectionProps) {
  const t = useTranslations('settings')
  const [darkMode, setDarkMode] = useState(false)
  const { locale, changeLocale } = useLocale()

  const handleBackToDashboard = () => {
    if (onSectionChange) {
      onSectionChange('dashboard')
    }
  }

  const handleLanguageChange = (newLocale: string) => {
    changeLocale(newLocale)
  }

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center">
            <FiSettings className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg lg:text-2xl font-bold text-white">{t('header.title')}</h1>
            <p className="text-white/70 text-sm lg:text-base hidden sm:block">{t('header.subtitle')}</p>
          </div>
        </div>
        
        {/* Botão de voltar */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Informações Pessoais */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FiUser className="w-5 h-5" />
              <span>{t('personalInfo.title')}</span>
            </CardTitle>
            <CardDescription className="text-white/70">
              {t('personalInfo.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">{t('personalInfo.fields.fullName.label')}</label>
              <Input 
                type="text"
                placeholder={t('personalInfo.fields.fullName.placeholder')}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">{t('personalInfo.fields.phone.label')}</label>
              <Input 
                type="tel"
                placeholder={t('personalInfo.fields.phone.placeholder')}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">{t('personalInfo.fields.email.label')}</label>
              <Input 
                type="email"
                placeholder={t('personalInfo.fields.email.placeholder')}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">{t('personalInfo.fields.country.label')}</label>
              <Input 
                type="text"
                placeholder={t('personalInfo.fields.country.placeholder')}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">{t('personalInfo.fields.age.label')}</label>
              <Input 
                type="number"
                placeholder={t('personalInfo.fields.age.placeholder')}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white">
              <FiSave className="w-4 h-4 mr-2" />
              {t('personalInfo.saveButton')}
            </Button>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FiBell className="w-5 h-5" />
              <span>{t('notifications.title')}</span>
            </CardTitle>
            <CardDescription className="text-white/70">
              {t('notifications.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{t('notifications.options.marketingEmail.title')}</p>
                  <p className="text-white/60 text-sm">{t('notifications.options.marketingEmail.description')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-400 peer-checked:to-red-400"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{t('notifications.options.pushNotifications.title')}</p>
                  <p className="text-white/60 text-sm">{t('notifications.options.pushNotifications.description')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-400 peer-checked:to-red-400"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{t('notifications.options.cvReminders.title')}</p>
                  <p className="text-white/60 text-sm">{t('notifications.options.cvReminders.description')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-400 peer-checked:to-red-400"></div>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aparência */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              {darkMode ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
              <span>{t('appearance.title')}</span>
            </CardTitle>
            <CardDescription className="text-white/70">
              {t('appearance.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{t('appearance.options.darkMode.title')}</p>
                <p className="text-white/60 text-sm">{t('appearance.options.darkMode.description')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-400 peer-checked:to-red-400"></div>
              </label>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">{t('appearance.options.language.label')}</label>
              <Select value={locale} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full bg-white/20 border-white/30 text-white hover:text-white/80 focus:ring-white/50">
                  <SelectValue placeholder={t('appearance.options.language.label')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">{t('appearance.options.language.options.pt')}</SelectItem>
                  <SelectItem value="en">{t('appearance.options.language.options.en')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacidade */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FiGlobe className="w-5 h-5" />
              <span>{t('privacy.title')}</span>
            </CardTitle>
            <CardDescription className="text-white/70">
              {t('privacy.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{t('privacy.options.publicProfile.title')}</p>
                <p className="text-white/60 text-sm">{t('privacy.options.publicProfile.description')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-400 peer-checked:to-red-400"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{t('privacy.options.analytics.title')}</p>
                <p className="text-white/60 text-sm">{t('privacy.options.analytics.description')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-400 peer-checked:to-red-400"></div>
              </label>
            </div>
            
            <Button variant="ghost" className="w-full text-white/80 hover:text-white hover:bg-white/10">
              {t('privacy.downloadData')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
