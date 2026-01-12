"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "next-intl"
import { CvAnalysisJobResultProps, JobAnalysisResponse, CvSummary } from "@/types/cv.types"
import { 
  FiArrowLeft, 
  FiTrendingUp, 
  FiTarget, 
  FiAward, 
  FiAlertCircle, 
  FiInfo, 
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiBarChart,
  FiDollarSign
} from "react-icons/fi"

export function CvAnalysisJobResult({ analysis, cvId, cvData, onSectionChange }: CvAnalysisJobResultProps) {
  const [currentAnalysis, setCurrentAnalysis] = useState<JobAnalysisResponse | null>(analysis)
  const [curriculum, setCurriculum] = useState<CvSummary | undefined>(cvData)
  const [currentCvId, setCurrentCvId] = useState<string>(cvId || "")
  const t = useTranslations('cvAnalysisJobResult')

  useEffect(() => {
    // Get analysis from localStorage if not provided via props
    if (!currentAnalysis && typeof window !== 'undefined') {
      const storedAnalysis = localStorage.getItem('jobAnalysisResult')
      if (storedAnalysis) {
        try {
          setCurrentAnalysis(JSON.parse(storedAnalysis))
        } catch (e) {
          console.error('Error parsing stored analysis data:', e)
        }
      }
    }

    // Get cvId from localStorage if not provided via props
    if (!currentCvId && typeof window !== 'undefined') {
      const storedCvId = localStorage.getItem('jobAnalysisCvId')
      if (storedCvId) {
        setCurrentCvId(storedCvId)
      }
    }

    // Get cvData from localStorage if not provided via props
    if (!curriculum && typeof window !== 'undefined') {
      const storedCvData = localStorage.getItem('jobAnalysisCvData')
      if (storedCvData) {
        try {
          setCurriculum(JSON.parse(storedCvData))
        } catch (e) {
          console.error('Error parsing stored CV data:', e)
        }
      }
    }
  }, [currentAnalysis, curriculum, currentCvId])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-400'
    if (score >= 60) return 'from-yellow-400 to-orange-400'
    return 'from-red-400 to-pink-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return t('score.excellent')
    if (score >= 60) return t('score.good')
    return t('score.needsImprovement')
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

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'text-red-400'
      case 'medium':
        return 'text-yellow-400'
      default:
        return 'text-blue-400'
    }
  }

  const handleBack = () => {
    if (onSectionChange) {
      onSectionChange('cv-analysis-job')
    }
  }

  const handleBackToCvs = () => {
    if (onSectionChange) {
      onSectionChange('my-cvs')
    }
  }

  if (!currentAnalysis) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Card className="backdrop-blur-xl bg-white/10 border-white/20">
          <CardContent className="p-6 text-center">
            <FiAlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <p className="text-white/80 text-lg">{t('noData')}</p>
            <Button
              onClick={handleBackToCvs}
              className="mt-4 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              {t('backToCvs')}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

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

      {/* Overall Score Card */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl mb-6">
        <CardHeader>
          <CardTitle className="text-white text-xl sm:text-2xl flex items-center">
            <FiTrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            {t('overallScore.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${getScoreColor(currentAnalysis.overall_score)} bg-clip-text text-transparent`}>
                {currentAnalysis.overall_score}
              </div>
              <p className="text-white/60 text-xs sm:text-sm mt-1">{t('overallScore.overall')}</p>
            </div>
            <div className="text-center">
              <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${getScoreColor(currentAnalysis.compatibility_score)} bg-clip-text text-transparent`}>
                {currentAnalysis.compatibility_score}
              </div>
              <p className="text-white/60 text-xs sm:text-sm mt-1">{t('overallScore.compatibility')}</p>
            </div>
            <div className="text-center">
              <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${getScoreColor(currentAnalysis.linearity_score)} bg-clip-text text-transparent`}>
                {currentAnalysis.linearity_score}
              </div>
              <p className="text-white/60 text-xs sm:text-sm mt-1">{t('overallScore.linearity')}</p>
            </div>
            <div className="text-center">
              <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${getScoreColor(currentAnalysis.match_percentage)} bg-clip-text text-transparent`}>
                {currentAnalysis.match_percentage}%
              </div>
              <p className="text-white/60 text-xs sm:text-sm mt-1">{t('overallScore.match')}</p>
            </div>
          </div>
          <p className="text-white/70 text-center text-sm sm:text-base">{currentAnalysis.description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Evaluation */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-lg sm:text-xl">
              <FiBarChart className="w-5 h-5 mr-2 text-blue-400" />
              {t('evaluation.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-white/80 text-sm mb-2">{currentAnalysis.evaluation.resume_match_assessment}</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <div className="text-xl font-bold text-blue-400">{currentAnalysis.evaluation.required_skills_match}%</div>
                <p className="text-white/60 text-xs">{t('evaluation.skills')}</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <div className="text-xl font-bold text-green-400">{currentAnalysis.evaluation.experience_match}%</div>
                <p className="text-white/60 text-xs">{t('evaluation.experience')}</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <div className="text-xl font-bold text-purple-400">{currentAnalysis.evaluation.education_match}%</div>
                <p className="text-white/60 text-xs">{t('evaluation.education')}</p>
              </div>
            </div>
            <div>
              <p className="text-white/80 text-sm">{currentAnalysis.evaluation.detailed_analysis}</p>
            </div>
          </CardContent>
        </Card>

        {/* Strengths */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-lg sm:text-xl">
              <FiAward className="w-5 h-5 mr-2 text-green-400" />
              {t('strengths.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentAnalysis.strengths.map((strength, index) => (
                <li key={index} className="flex items-start text-white/80 text-sm">
                  <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Missing Requirements */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-lg sm:text-xl">
              <FiXCircle className="w-5 h-5 mr-2 text-red-400" />
              {t('missingRequirements.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentAnalysis.evaluation.missing_requirements.map((req, index) => (
                <li key={index} className="flex items-start text-white/80 text-sm">
                  <FiXCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mr-2 mt-0.5 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Exceeding Requirements */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-lg sm:text-xl">
              <FiAward className="w-5 h-5 mr-2 text-green-400" />
              {t('exceedingRequirements.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentAnalysis.evaluation.exceeding_requirements.map((req, index) => (
                <li key={index} className="flex items-start text-white/80 text-sm">
                  <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Keyword Analysis */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-lg sm:text-xl">
              <FiTarget className="w-5 h-5 mr-2 text-purple-400" />
              {t('keywordAnalysis.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">{currentAnalysis.keyword_analysis.total_keywords_in_job_offer}</div>
                <p className="text-white/60 text-xs mt-1">{t('keywordAnalysis.total')}</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{currentAnalysis.keyword_analysis.matched_keywords}</div>
                <p className="text-white/60 text-xs mt-1">{t('keywordAnalysis.matched')}</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">{currentAnalysis.keyword_analysis.match_percentage}%</div>
                <p className="text-white/60 text-xs mt-1">{t('keywordAnalysis.matchPercentage')}</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-red-400">{currentAnalysis.keyword_analysis.missing_keywords_list.length}</div>
                <p className="text-white/60 text-xs mt-1">{t('keywordAnalysis.missing')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-white font-semibold mb-2 text-sm sm:text-base">{t('keywordAnalysis.matchedKeywords')}:</p>
                <div className="flex flex-wrap gap-2">
                  {currentAnalysis.keyword_analysis.matched_keywords_list.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white font-semibold mb-2 text-sm sm:text-base">{t('keywordAnalysis.missingKeywords')}:</p>
                <div className="flex flex-wrap gap-2">
                  {currentAnalysis.keyword_analysis.missing_keywords_list.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="text-white font-semibold mb-2 text-sm sm:text-base">{t('keywordAnalysis.importantKeywords')}:</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {currentAnalysis.keyword_analysis.keyword_importance.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded text-sm">
                    <div className="flex items-center">
                      {item.is_matched ? (
                        <FiCheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      ) : (
                        <FiXCircle className="w-4 h-4 text-red-400 mr-2" />
                      )}
                      <span className="text-white/80">{item.keyword}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${getImportanceColor(item.importance)}`}>
                        {item.importance}
                      </span>
                      <span className="text-white/60 text-xs">{item.impact_score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Improvement Points */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-lg sm:text-xl">
              <FiAlertCircle className="w-5 h-5 mr-2 text-yellow-400" />
              {t('improvementPoints.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentAnalysis.improvement_points.map((point, index) => (
                <li key={index} className="flex items-start text-white/80 text-sm">
                  <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-2 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-lg sm:text-xl">
              <FiTarget className="w-5 h-5 mr-2 text-pink-400" />
              {t('recommendations.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentAnalysis.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start text-white/80 text-sm">
                  <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 mr-2 mt-0.5 shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Market Insights */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-lg sm:text-xl">
              <FiDollarSign className="w-5 h-5 mr-2 text-cyan-400" />
              {t('marketInsights.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentAnalysis.market_insights.map((insight, index) => (
                <li key={index} className="flex items-start text-white/80 text-sm">
                  <FiInfo className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mr-2 mt-0.5 shrink-0" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Professional Alignment */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-lg sm:text-xl">
              <FiTarget className="w-5 h-5 mr-2 text-blue-400" />
              {t('professionalAlignment.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentAnalysis.professional_alignment.map((alignment, index) => (
                <li key={index} className="flex items-start text-white/80 text-sm">
                  <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 mt-0.5 shrink-0" />
                  <span>{alignment}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ATS Compatibility */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-lg sm:text-xl">
              <FiFileText className="w-5 h-5 mr-2 text-cyan-400" />
              {t('atsCompatibility.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-white/80 mb-2 text-sm sm:text-base">{currentAnalysis.ats_compatibility.assessment}</p>
              <div className={`inline-block px-4 py-2 rounded-lg border ${getAtsChanceColor(currentAnalysis.ats_compatibility.chance)}`}>
                {t('atsCompatibility.chance')}: {currentAnalysis.ats_compatibility.chance}
              </div>
            </div>
            <div>
              <p className="text-white font-semibold mb-2 text-sm sm:text-base">{t('atsCompatibility.recommendations')}:</p>
              <ul className="space-y-2">
                {currentAnalysis.ats_compatibility.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start text-white/80 text-sm">
                    <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mr-2 mt-0.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

