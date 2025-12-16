'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { FiAlertCircle, FiShield, FiBarChart, FiTarget, FiSettings } from 'react-icons/fi'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCookieConsent, type CookiePreferences } from '@/hooks/use-cookie-consent'

interface CookieSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CookieSettingsModal({ open, onOpenChange }: CookieSettingsModalProps) {
  const t = useTranslations('cookie.settings')
  const { preferences, savePreferences, rejectAll } = useCookieConsent()
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences)

  useEffect(() => {
    setLocalPreferences(preferences)
  }, [preferences, open])

  const handleSave = () => {
    savePreferences(localPreferences)
    onOpenChange(false)
  }

  const handleRejectAll = () => {
    rejectAll()
    onOpenChange(false)
  }

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'necessary') return // Cannot change necessary cookies
    setLocalPreferences((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl p-4 sm:p-6"
      >
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-xl sm:text-2xl">{t("title")}</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          {/* Necessary Cookies */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <FiShield className="size-4 sm:size-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg">{t("necessary.title")}</CardTitle>
                    <CardDescription className="mt-0.5 sm:mt-1 text-xs sm:text-sm">{t("necessary.status")}</CardDescription>
                  </div>
                </div>
                <Switch checked={true} disabled className="self-start sm:self-auto" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("necessary.description")}
              </p>
            </CardContent>
          </Card>

          {/* Analytics Cookies */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <FiBarChart className="size-4 sm:size-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg">{t("analytics.title")}</CardTitle>
                    <CardDescription className="mt-0.5 sm:mt-1 text-xs sm:text-sm">{t("analytics.status")}</CardDescription>
                  </div>
                </div>
                <Switch checked={true} disabled className="self-start sm:self-auto" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("analytics.description")}
              </p>
            </CardContent>
          </Card>

          {/* Marketing Cookies */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <FiTarget className="size-4 sm:size-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg">{t("marketing.title")}</CardTitle>
                    <CardDescription className="mt-0.5 sm:mt-1 text-xs sm:text-sm">{t("marketing.status")}</CardDescription>
                  </div>
                </div>
                <Switch checked={true} disabled className="self-start sm:self-auto" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("marketing.description")}
              </p>
            </CardContent>
          </Card>

          {/* Functional Cookies */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <FiSettings className="size-4 sm:size-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg">{t("functional.title")}</CardTitle>
                    <CardDescription className="mt-0.5 sm:mt-1 text-xs sm:text-sm">{t("functional.status")}</CardDescription>
                  </div>
                </div>
                <Switch checked={true} disabled className="self-start sm:self-auto" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("functional.description")}
              </p>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 sm:p-6 pt-4 sm:pt-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <FiAlertCircle className="size-4 sm:size-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base text-blue-900 dark:text-blue-100">
                    {t("privacy.title")}
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                    {t("privacy.description")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end mt-4 sm:mt-6">
          <Button 
            variant="outline" 
            onClick={handleRejectAll}
            className="w-full sm:w-auto min-h-[44px] sm:min-h-0"
          >
            {t("rejectAll")}
          </Button>
          <Button 
            onClick={handleSave}
            className="w-full sm:w-auto min-h-[44px] sm:min-h-0"
          >
            {t("savePreferences")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

