import { registerSchema, type RegisterFormData } from './validations'

export interface ApiResponse<T = unknown> {
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
    const response = await fetch('/api/auth/login', {
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

export async function forgotPasswordWithEmail(email: string): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.message || 'Error when sending password reset code',
        response.status,
        response
      )
    }

    const data = await response.json()
    return {
      success: true,
      data,
      message: 'Password reset code sent successfully'
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

export async function registerUser(userData: RegisterFormData): Promise<ApiResponse> {
  try {
    // Validar dados com Zod
    const validatedData = registerSchema.parse(userData)

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.message || 'Error when registering user',
        response.status,
        response
      )
    }

    const data = await response.json()
    return {
      success: true,
      data,
      message: 'User registered successfully'
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    // Se for erro de validação do Zod
    if (error instanceof Error && error.name === 'ZodError') {
      throw new ApiError(
        'Dados inválidos. Verifique os campos e tente novamente.',
        400
      )
    }
    
    throw new ApiError(
      'Connection error. Check your internet and try again.',
      0
    )
  }
}
