import { handleGenerateAIRequest } from '@/lib/shared/api-helpers'
import { NextRequest } from 'next/server'


export async function POST(request: NextRequest) {
  return handleGenerateAIRequest(request, {
    endpoint: '/generate-task-ai',
    errorMessage: 'Error processing task content with AI',
    successMessage: 'Task content processed successfully',
    logContext: 'Generate task AI API'
  })
}
