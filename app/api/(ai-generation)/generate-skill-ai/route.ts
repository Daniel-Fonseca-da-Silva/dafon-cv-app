import { handleGenerateAIRequest } from '@/lib/shared/api-helpers'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  return handleGenerateAIRequest(request, {
    endpoint: '/generate-skill-ai',
    errorMessage: 'Error processing skill content with AI',
    successMessage: 'Skill content processed successfully',
    logContext: 'Generate skill AI API'
  })
}
