import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .pipe(z.email('Formato de email inválido'))
})

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .pipe(z.email('Formato de email inválido'))
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'NAME_REQUIRED')
    .min(15, 'NAME_MIN_LENGTH')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .pipe(z.email('Formato de email inválido'))
})

export type LoginFormData = z.infer<typeof loginSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
