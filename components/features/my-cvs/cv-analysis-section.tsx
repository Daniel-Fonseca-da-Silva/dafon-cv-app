"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "next-intl"
import { CvAnalysisSectionProps, CvAnalysisResponse, CvSummary } from "@/types/cv.types"
import { FiArrowLeft, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiTarget, FiAward, FiInfo, FiFileText, FiLoader } from "react-icons/fi"

export function CvAnalysisSection({ cvId, cvData, onSectionChange }: CvAnalysisSectionProps) {
  const [analysis, setAnalysis] = useState<CvAnalysisResponse | null>(null)
  const [curriculum, setCurriculum] = useState<CvSummary | null>(cvData || null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentCvId, setCurrentCvId] = useState<string>(cvId || '')
  const t = useTranslations('cvAnalysis')

  useEffect(() => {
    // Obter cvId do localStorage se não foi fornecido via props
    if (!currentCvId && typeof window !== 'undefined') {
      const storedCvId = localStorage.getItem('analyzingCvId')
      if (storedCvId) {
        setCurrentCvId(storedCvId)
      }
    }

    // Obter cvData do localStorage se não foi fornecido via props
    if (!curriculum && typeof window !== 'undefined') {
      const storedCvData = localStorage.getItem('analyzingCvData')
      if (storedCvData) {
        try {
          setCurriculum(JSON.parse(storedCvData))
        } catch (e) {
          console.error('Error parsing stored CV data:', e)
        }
      }
    }
  }, [curriculum, currentCvId])

  useEffect(() => {
    const fetchAnalysis = async () => {
      const idToUse = currentCvId || cvId
      
      if (!idToUse) {
        setError('ID of the curriculum was not provided')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        // Buscar dados do currículo se não foram fornecidos
        if (!curriculum) {
          const cvResponse = await fetch(`/api/curriculums/${idToUse}`)
          if (cvResponse.ok) {
            const cvData = await cvResponse.json()
            setCurriculum({
              id: cvData.id,
              fullName: cvData.full_name || cvData.fullName,
              email: cvData.email,
              createdAt: cvData.created_at || cvData.createdAt,
              updatedAt: cvData.updated_at || cvData.updatedAt
            })
          }
        }

        // Buscar análise
        const response = await fetch(`/api/curriculums/${idToUse}/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          let errorMessage = 'Error analyzing curriculum'
          try {
            const errorData = await response.json()
            errorMessage = errorData.error || errorData.message || errorMessage
          } catch {
            // Se não conseguir ler o JSON, usar mensagem padrão baseada no status
            if (response.status === 404) {
              errorMessage = 'Curriculum not found'
            } else if (response.status === 500) {
              errorMessage = 'Internal server error'
            } else {
              errorMessage = `Error analyzing curriculum (${response.status})`
            }
          }
          throw new Error(errorMessage)
        }
        
        const analysisData = await response.json()
        setAnalysis(analysisData)
      } catch (err) {
        console.error('Error fetching analysis:', err)
        setError(err instanceof Error ? err.message : 'Unknown error analyzing curriculum')
      } finally {
        setLoading(false)
      }
    }

    if (currentCvId || cvId) {
      fetchAnalysis()
    }
  }, [currentCvId, cvId, curriculum])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-400'
    if (score >= 60) return 'from-yellow-400 to-orange-400'
    return 'from-red-400 to-pink-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Needs Improvement'
  }

  const getAtsChanceColor = (chance: string) => {
    switch (chance) {
      case 'high':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      default:
        return 'bg-red-500/20 text-red-300 border-red-500/30'
    }
  }

  const handleBack = () => {
    if (onSectionChange) {
      onSectionChange('my-cvs')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-white/60 animate-spin mx-auto mb-4" />
          <p className="text-white/80 text-lg">{t('loading')}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="mb-6">
          <Button
            onClick={handleBack}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            {t('back')}
          </Button>
        </div>
        <Card className="backdrop-blur-xl bg-red-500/10 border-red-500/30">
          <CardContent className="p-6 text-center">
            <FiAlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-300 text-lg">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!analysis) {
    return null
  }

  return (
    <div className="min-h-screen p-6">
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
        <h1 className="text-3xl font-bold text-white mb-2">
          {t('title')}
        </h1>
        {curriculum && (
          <p className="text-white/70 text-lg">
            {t('subtitle', { name: curriculum.fullName })}
          </p>
        )}
      </div>

      {/* Score Card */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl mb-6">
        <CardHeader>
          <CardTitle className="text-white text-2xl flex items-center">
            <FiTrendingUp className="w-6 h-6 mr-2" />
            {t('score.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-6">
            <div className={`text-6xl font-bold bg-gradient-to-r ${getScoreColor(analysis.score)} bg-clip-text text-transparent`}>
              {analysis.score}
            </div>
            <div>
              <p className="text-white/80 text-lg font-semibold">{getScoreLabel(analysis.score)}</p>
              <p className="text-white/60 text-sm">{t('score.outOf')} 100</p>
            </div>
          </div>
          <p className="text-white/70 mt-4 text-center">{analysis.description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FiAward className="w-5 h-5 mr-2 text-green-400" />
              {t('strengths.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.strengths.map((strength, index) => (
                <li key={index} className="flex items-start text-white/80">
                  <FiCheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Professional Alignment */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FiTarget className="w-5 h-5 mr-2 text-blue-400" />
              {t('professionalAlignment.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.professional_alignment.map((alignment, index) => (
                <li key={index} className="flex items-start text-white/80">
                  <FiCheckCircle className="w-5 h-5 text-blue-400 mr-2 mt-0.5 shrink-0" />
                  <span>{alignment}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Improvement Points */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FiAlertCircle className="w-5 h-5 mr-2 text-yellow-400" />
              {t('improvementPoints.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.improvement_points.map((point, index) => (
                <li key={index} className="flex items-start text-white/80">
                  <FiAlertCircle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FiInfo className="w-5 h-5 mr-2 text-purple-400" />
              {t('bestPractices.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.best_practices.map((practice, index) => (
                <li key={index} className="flex items-start text-white/80">
                  <FiCheckCircle className="w-5 h-5 text-purple-400 mr-2 mt-0.5 shrink-0" />
                  <span>{practice}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ATS Compatibility */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FiFileText className="w-5 h-5 mr-2 text-cyan-400" />
              {t('atsCompatibility.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-white/80 mb-2">{analysis.ats_compatibility.assessment}</p>
              <div className={`inline-block px-4 py-2 rounded-lg border ${getAtsChanceColor(analysis.ats_compatibility.chance)}`}>
                {t('atsCompatibility.chance')}: {analysis.ats_compatibility.chance}
              </div>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">{t('atsCompatibility.recommendations')}:</p>
              <ul className="space-y-2">
                {analysis.ats_compatibility.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start text-white/80">
                    <FiCheckCircle className="w-5 h-5 text-cyan-400 mr-2 mt-0.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FiTarget className="w-5 h-5 mr-2 text-pink-400" />
              {t('recommendations.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start text-white/80">
                  <FiCheckCircle className="w-5 h-5 text-pink-400 mr-2 mt-0.5 shrink-0" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
