"use client"

import { DashboardCards } from "./dashboard-cards"
import { GenerateCvSection } from "./generate-cv-section"
import { ProfileSection } from "./profile-section"
import { SettingsSection } from "./settings-section"
import { PlansSection } from "./plans-section"

interface DashboardContentProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function DashboardContent({ activeSection, onSectionChange }: DashboardContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardCards onCardClick={onSectionChange} />
      case "generate-cv":
        return <GenerateCvSection />
      case "profile":
        return <ProfileSection />
      case "settings":
        return <SettingsSection />
      case "plans":
        return <PlansSection />
      default:
        return <DashboardCards onCardClick={onSectionChange} />
    }
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {renderContent()}
    </div>
  )
}
