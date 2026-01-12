"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from "next-intl"
import { CvAnalysisJobSectionProps } from "@/types/cv.types"
import { FiArrowLeft, FiFileText, FiInfo, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi"

export function CvAnalysisJobSection({ cvId, cvData, onSectionChange }: CvAnalysisJobSectionProps) {
  const [jobDescription, setJobDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentCvId, setCurrentCvId] = useState<string>(cvId || "")
  const [curriculum, setCurriculum] = useState(cvData)
  const t = useTranslations('cvAnalysisJob')

  useEffect(() => {
    // Get cvId from localStorage if not provided via props
    if (!currentCvId && typeof window !== 'undefined') {
      const storedCvId = localStorage.getItem('matchingJobCvId')
      if (storedCvId) {
        setCurrentCvId(storedCvId)
      }
    }

    // Get cvData from localStorage if not provided via props
    if (!curriculum && typeof window !== 'undefined') {
      const storedCvData = localStorage.getItem('matchingJobCvData')
      if (storedCvData) {
        try {
          setCurriculum(JSON.parse(storedCvData))
        } catch (e) {
          console.error('Error parsing stored CV data:', e)
        }
      }
    }
  }, [curriculum, currentCvId])

  const handleBack = () => {
    if (onSectionChange) {
      onSectionChange('my-cvs')
    }
  }

  const handleAnalyze = async () => {
    const idToUse = currentCvId || cvId
    
    if (!idToUse) {
      setError('CV ID is required')
      return
    }

    if (!jobDescription.trim() || jobDescription.trim().length < 300) {
      setError('Job description must be at least 300 characters')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/curriculums/${idToUse}/analyze-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Content: jobDescription.trim()
        }),
      })

      if (!response.ok) {
        let errorMessage = 'Error analyzing job'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorData.message || errorMessage
        } catch {
          if (response.status === 404) {
            errorMessage = 'Curriculum not found'
          } else if (response.status === 400) {
            errorMessage = 'Invalid job description'
          } else if (response.status === 500) {
            errorMessage = 'Internal server error'
          } else {
            errorMessage = `Error analyzing job (${response.status})`
          }
        }
        throw new Error(errorMessage)
      }

      const analysisData = await response.json()
      
      // Store analysis result in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('jobAnalysisResult', JSON.stringify(analysisData))
        localStorage.setItem('jobAnalysisCvId', idToUse)
        if (curriculum) {
          localStorage.setItem('jobAnalysisCvData', JSON.stringify(curriculum))
        }
      }

      // Navigate to results page
      if (onSectionChange) {
        onSectionChange('cv-analysis-job-result')
      }
    } catch (err) {
      console.error('Error analyzing job:', err)
      setError(err instanceof Error ? err.message : 'Unknown error analyzing job')
    } finally {
      setLoading(false)
    }
  }

  const isAnalyzeDisabled = !jobDescription.trim() || jobDescription.trim().length < 300 || loading
  const characterCount = jobDescription.length
  const minCharacters = 300

  return (
    <div className="min-h-screen p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <Button
          onClick={handleBack}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 mb-4"
        >
          <FiArrowLeft className="w-4 h-4 mr-2" />
          {t('back')}
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          {t('title')}
        </h1>
        {curriculum && (
          <p className="text-white/70 text-base sm:text-lg">
            {t('subtitle', { name: curriculum.fullName })}
          </p>
        )}
      </div>

      {/* Info Card */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl mb-6">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center">
            <FiInfo className="w-5 h-5 mr-2 text-blue-400" />
            {t('info.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start text-white/80">
              <FiCheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
              <span>{t('info.tip1')}</span>
            </div>
            <div className="flex items-start text-white/80">
              <FiCheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
              <span>{t('info.tip2')}</span>
            </div>
            <div className="flex items-start text-white/80">
              <FiCheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
              <span>{t('info.tip3')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Card */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center">
            <FiFileText className="w-5 h-5 mr-2 text-purple-400" />
            {t('form.title')}
          </CardTitle>
          <CardDescription className="text-white/70">
            {t('form.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="job-description" className="block text-white/80 text-sm font-medium mb-2">
              {t('form.label')}
            </label>
            <Textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value)
                setError(null)
              }}
              placeholder={t('form.placeholder')}
              className="min-h-[200px] sm:min-h-[300px] bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/50"
              disabled={loading}
            />
            <div className="mt-2 flex items-center justify-between">
              <p className={`text-xs ${
                characterCount < minCharacters 
                  ? 'text-yellow-400' 
                  : 'text-green-400'
              }`}>
                {characterCount} / {minCharacters} {t('form.characters')}
              </p>
              {characterCount < minCharacters && (
                <p className="text-xs text-yellow-400">
                  {t('form.minCharacters', { count: minCharacters - characterCount })}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="flex items-start bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <FiAlertCircle className="w-5 h-5 text-red-400 mr-2 mt-0.5 shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzeDisabled}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <FiLoader className="w-4 h-4 mr-2 animate-spin" />
                {t('form.analyzing')}
              </>
            ) : (
              <>
                <FiFileText className="w-4 h-4 mr-2" />
                {t('form.analyze')}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

