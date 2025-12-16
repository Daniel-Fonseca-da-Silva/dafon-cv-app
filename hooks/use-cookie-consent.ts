'use client'

import { useState, useEffect } from 'react'

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const COOKIE_CONSENT_KEY = 'cookie-consent'
const COOKIE_PREFERENCES_KEY = 'cookie-preferences'

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always active
  analytics: false,
  marketing: false,
  functional: false,
}

export function useCookieConsent() {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null)
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    const storedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)

    if (storedConsent === 'true') {
      setConsentGiven(true)
    } else {
      setConsentGiven(false)
    }

    if (storedPreferences) {
      try {
        const parsed = JSON.parse(storedPreferences)
        setPreferences({
          ...defaultPreferences,
          ...parsed,
          necessary: true, // Always keep necessary as true
        })
      } catch {
        setPreferences(defaultPreferences)
      }
    }

    setIsLoading(false)
  }, [])

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setConsentGiven(true)
    setPreferences(allAccepted)
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(allAccepted))
  }

  const rejectAll = () => {
    setConsentGiven(true)
    setPreferences(defaultPreferences)
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(defaultPreferences))
  }

  const savePreferences = (newPreferences: CookiePreferences) => {
    const updated = {
      ...newPreferences,
      necessary: true, // Always keep necessary as true
    }
    setConsentGiven(true)
    setPreferences(updated)
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(updated))
  }

  return {
    consentGiven,
    preferences,
    isLoading,
    acceptAll,
    rejectAll,
    savePreferences,
  }
}


