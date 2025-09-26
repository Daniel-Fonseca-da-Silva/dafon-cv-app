const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function loginWithEmail(email: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.message || 'Error when sending login code',
        response.status,
        response
      )
    }

    const data = await response.json()
    return {
      success: true,
      data,
      message: 'Login code sent successfully'
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    throw new ApiError(
      'Connection error. Check your internet and try again.',
      0
    )
  }
}
