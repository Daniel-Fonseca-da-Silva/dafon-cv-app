"use client"

import { CvFormContainer } from "@/components/forms/CvFormContainer"
import { Button } from "@/components/ui/button"
import { FiArrowLeft } from "react-icons/fi"
import { useTranslations } from "next-intl"

interface CvCreationSectionProps {
  onSectionChange?: (section: string) => void
  context?: 'generate-cv' | 'my-cvs'
}

export function CvCreationSection({ onSectionChange, context = 'my-cvs' }: CvCreationSectionProps) {
  const t = useTranslations('cvCreation')

  const handleBackToCvs = () => {
    if (onSectionChange) {
      onSectionChange(context === 'generate-cv' ? 'dashboard' : 'my-cvs')
    }
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            onClick={handleBackToCvs}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            {t('backButton')}
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">
          {t('title')}
        </h1>
        <p className="text-white/70 text-lg">
          {t('subtitle')}
        </p>
      </div>

      {/* CV Creation Form */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg shadow-xl">
        <CvFormContainer onCvSaved={handleBackToCvs} />
      </div>
    </div>
  )
}
