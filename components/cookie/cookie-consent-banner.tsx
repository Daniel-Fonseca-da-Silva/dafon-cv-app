"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { FiCheck, FiInfo } from "react-icons/fi"

import { useCookieConsent } from "@/hooks/use-cookie-consent"
import { Button } from "@/components/ui/button"
import { CookieSettingsModal } from "./cookie-settings-modal"

export function CookieConsentBanner() {
  const t = useTranslations("cookie.banner")
  const { consentGiven, isLoading, acceptAll } = useCookieConsent()
  const [settingsOpen, setSettingsOpen] = useState(false)

  if (isLoading || consentGiven) {
    return null
  }

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 md:p-6 animate-in slide-in-from-bottom duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 sm:gap-4">
            <div className="flex-1 space-y-2 sm:space-y-2.5 min-w-0">
              <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-white leading-tight">
                <FiInfo className="size-4 sm:size-5 text-white flex-shrink-0" />
                <span>{t("title")}</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {t("description")}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-white/80">
                <div className="flex items-center gap-1.5">
                  <FiCheck className="size-3.5 sm:size-4 text-green-400 flex-shrink-0" />
                  <span className="whitespace-nowrap">{t("necessary")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiCheck className="size-3.5 sm:size-4 text-green-400 flex-shrink-0" />
                  <span className="whitespace-nowrap">{t("analytics")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiCheck className="size-3.5 sm:size-4 text-green-400 flex-shrink-0" />
                  <span className="whitespace-nowrap">{t("marketing")}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:flex-shrink-0">
              <Button
                variant="outline"
                onClick={() => setSettingsOpen(true)}
                className="whitespace-nowrap w-full sm:w-auto min-h-[44px] sm:min-h-0 text-sm sm:text-base"
              >
                {t("settings")}
              </Button>
              <Button 
                onClick={acceptAll} 
                className="whitespace-nowrap w-full sm:w-auto min-h-[44px] sm:min-h-0 text-sm sm:text-base"
              >
                {t("acceptAll")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CookieSettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  )
}


