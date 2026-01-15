import { handleGenerateAIRequest } from '@/lib/shared/api-helpers'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  return handleGenerateAIRequest(request, {
    endpoint: '/generate-courses-ai',
    errorMessage: 'Error processing courses content with AI',
    successMessage: 'Courses content processed successfully',
    logContext: 'Generate courses AI API'
  })
}
