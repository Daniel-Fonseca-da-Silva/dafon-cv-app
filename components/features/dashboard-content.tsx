"use client"

import { DashboardCards } from "./dashboard-cards"
import { TemplateManagementSection } from "./manage-template/manage-template-section"
import { CvManagementSection } from "./my-cvs/my-cv-section"
import { CvCreationSection } from "./cv-creation-section"
import { ProfileSection } from "./profile/profile-section"
import { SettingsSection } from "./settings/settings-section"
import { PlansSection } from "./my-plans/plans-section"

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
        return <CvCreationSection onSectionChange={onSectionChange} context="generate-cv" />
      case "templates":
        return <TemplateManagementSection onSectionChange={onSectionChange} />
      case "my-cvs":
        return <CvManagementSection onSectionChange={onSectionChange} />
      case "cv-creation":
        return <CvCreationSection onSectionChange={onSectionChange} context="my-cvs" />
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
