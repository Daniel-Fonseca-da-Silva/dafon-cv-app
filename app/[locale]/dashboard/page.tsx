"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DashboardContent } from "@/components/features/dashboard-content"
import { useUserData } from "@/hooks/use-user-data"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const { userData, isLoading, error } = useUserData()

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400">Erro: {error}</div>
      </div>
    )
  }

  return (
    <DashboardLayout
      userData={userData}
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
    >
      <DashboardContent 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
    </DashboardLayout>
  )
}
