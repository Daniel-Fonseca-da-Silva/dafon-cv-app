import { NextRequest, NextResponse } from 'next/server'
import { cleanupExpiredTokens, immediateCleanup } from '@/lib/token-cleanup'

/**
 * Endpoint para limpeza manual de tokens expirados
 * Útil para administração e manutenção
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar se é uma requisição autorizada (opcional)
    const authHeader = request.headers.get('authorization')
    const adminKey = process.env.ADMIN_CLEANUP_KEY
    
    if (adminKey && authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Executar limpeza imediata
    const cleanedCount = await immediateCleanup()
    
    return NextResponse.json({
      success: true,
      message: `Cleanup completed successfully`,
      cleanedTokens: cleanedCount,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error cleaning tokens:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Endpoint para verificar status da limpeza
 */
export async function GET(request: NextRequest) {
  try {
    const cleanedCount = await immediateCleanup()
    
    return NextResponse.json({
      success: true,
      message: 'Cleanup status',
      cleanedTokens: cleanedCount,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error checking cleanup status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
