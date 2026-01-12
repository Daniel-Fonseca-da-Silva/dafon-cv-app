"use client"

import { useState, useEffect } from "react"
import { DashboardCards } from "./dashboard-cards"
import { TemplateManagementSection } from "./manage-template/manage-template-section"
import { CvManagementSection } from "./my-cvs/my-cv-section"
import { CvAnalysisSection } from "./my-cvs/cv-analysis-section"
import { CvAnalysisJobSection } from "./my-cvs/cv-analysis-job-section"
import { CvAnalysisJobResult } from "./my-cvs/cv-analysis-job-result"
import { CvCreationSection } from "./cv-creation-section"
import { ProfileSection } from "./profile/profile-section"
import { SettingsSection } from "./settings/settings-section"
import { PlansSection } from "./my-plans/plans-section"
import { CvSummary, JobAnalysisResponse } from "@/types/cv.types"

interface DashboardContentProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function DashboardContent({ activeSection, onSectionChange }: DashboardContentProps) {
  const [analyzingCvId, setAnalyzingCvId] = useState<string>('')
  const [analyzingCvData, setAnalyzingCvData] = useState<CvSummary | undefined>(undefined)
  const [matchingJobCvId, setMatchingJobCvId] = useState<string>('')
  const [matchingJobCvData, setMatchingJobCvData] = useState<CvSummary | undefined>(undefined)
  const [jobAnalysisResult, setJobAnalysisResult] = useState<JobAnalysisResponse | undefined>(undefined)

  useEffect(() => {
    if (activeSection === 'cv-analysis' && typeof window !== 'undefined') {
      const storedCvId = localStorage.getItem('analyzingCvId')
      const storedCvData = localStorage.getItem('analyzingCvData')
      
      if (storedCvId) {
        setAnalyzingCvId(storedCvId)
      }
      
      if (storedCvData) {
        try {
          setAnalyzingCvData(JSON.parse(storedCvData))
        } catch (e) {
          console.error('Error parsing stored CV data:', e)
        }
      }
    }

    if (activeSection === 'cv-analysis-job' && typeof window !== 'undefined') {
      const storedCvId = localStorage.getItem('matchingJobCvId')
      const storedCvData = localStorage.getItem('matchingJobCvData')
      
      if (storedCvId) {
        setMatchingJobCvId(storedCvId)
      }
      
      if (storedCvData) {
        try {
          setMatchingJobCvData(JSON.parse(storedCvData))
        } catch (e) {
          console.error('Error parsing stored CV data:', e)
        }
      }
    }

    if (activeSection === 'cv-analysis-job-result' && typeof window !== 'undefined') {
      const storedCvId = localStorage.getItem('jobAnalysisCvId')
      const storedCvData = localStorage.getItem('jobAnalysisCvData')
      const storedAnalysis = localStorage.getItem('jobAnalysisResult')
      
      if (storedCvId) {
        setMatchingJobCvId(storedCvId)
      }
      
      if (storedCvData) {
        try {
          setMatchingJobCvData(JSON.parse(storedCvData))
        } catch (e) {
          console.error('Error parsing stored CV data:', e)
        }
      }

      if (storedAnalysis) {
        try {
          setJobAnalysisResult(JSON.parse(storedAnalysis))
        } catch (e) {
          console.error('Error parsing stored analysis data:', e)
        }
      }
    }
  }, [activeSection])

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
      case "cv-analysis":
        return <CvAnalysisSection 
          cvId={analyzingCvId}
          cvData={analyzingCvData}
          onSectionChange={onSectionChange} 
        />
      case "cv-analysis-job":
        return <CvAnalysisJobSection 
          cvId={matchingJobCvId}
          cvData={matchingJobCvData}
          onSectionChange={onSectionChange} 
        />
      case "cv-analysis-job-result":
        return jobAnalysisResult ? (
          <CvAnalysisJobResult 
            analysis={jobAnalysisResult}
            cvId={matchingJobCvId}
            cvData={matchingJobCvData}
            onSectionChange={onSectionChange} 
          />
        ) : null
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
