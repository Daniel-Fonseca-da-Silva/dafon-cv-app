import { handleGenerateAIRequest } from '@/lib/shared/api-helpers'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  return handleGenerateAIRequest(request, {
    endpoint: '/generate-intro-ai',
    errorMessage: 'Error processing text with AI',
    successMessage: 'Text processed successfully',
    logContext: 'Generate intro AI API'
  })
}
