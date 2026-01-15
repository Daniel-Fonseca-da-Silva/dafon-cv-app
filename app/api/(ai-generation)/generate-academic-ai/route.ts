import { handleGenerateAIRequest } from '@/lib/shared/api-helpers'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  return handleGenerateAIRequest(request, {
    endpoint: '/generate-academic-ai',
    errorMessage: 'Error processing academic content with AI',
    successMessage: 'Academic content processed successfully',
    logContext: 'Generate academic AI API'
  })
}
