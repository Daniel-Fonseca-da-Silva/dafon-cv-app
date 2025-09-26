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

export type LoginFormData = z.infer<typeof loginSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
