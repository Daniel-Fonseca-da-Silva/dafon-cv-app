/**
 * Helper functions para manipulação e validação de URLs
 */

/**
 * Valida e normaliza a URL base (NEXTAUTH_URL)
 * Garante que a URL tenha protocolo e não termine com barra
 * 
 * @param url - URL a ser validada
 * @returns URL normalizada ou null se inválida
 */
export function normalizeBaseUrl(url: string | undefined): string | null {
  if (!url) {
    return null
  }

  // Remove espaços e barras finais
  let normalized = url.trim().replace(/\/+$/, '')

  // Se não tiver protocolo, adiciona https:// (assumindo produção)
  if (!normalized.match(/^https?:\/\//i)) {
    // Em produção, sempre usar HTTPS
    if (process.env.NODE_ENV === 'production') {
      normalized = `https://${normalized}`
    } else {
      normalized = `http://${normalized}`
    }
  }

  // Validação básica de URL
  try {
    const urlObj = new URL(normalized)
    // Garante HTTPS em produção
    if (process.env.NODE_ENV === 'production' && urlObj.protocol !== 'https:') {
      normalized = normalized.replace(/^http:/i, 'https:')
    }
    return normalized
  } catch (error) {
    console.error('Invalid URL format:', url, error)
    return null
  }
}

/**
 * Obtém a URL base validada do ambiente
 * @returns URL base ou lança erro se não estiver configurada
 */
export function getBaseUrl(): string {
  const baseUrl = normalizeBaseUrl(process.env.NEXTAUTH_URL)
  
  if (!baseUrl) {
    const errorMessage = 
      process.env.NODE_ENV === 'production'
        ? 'NEXTAUTH_URL Not configured on Vercel. Configure as: https://www.site.com'
        : 'NEXTAUTH_URL Not configured on environment. Configure on .env.local file'
    
    console.error(errorMessage)
    throw new Error(errorMessage)
  }

  return baseUrl
}

