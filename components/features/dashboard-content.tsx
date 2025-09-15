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
        return <GenerateCvSection onSectionChange={onSectionChange} />
      case "profile":
        return <ProfileSection onSectionChange={onSectionChange} />
      case "settings":
        return <SettingsSection onSectionChange={onSectionChange} />
      case "plans":
        return <PlansSection onSectionChange={onSectionChange} />
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
