import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { AUTH_CONFIG, isTokenExpired } from '@/lib/auth-config'
import { prisma } from '@/lib/database'
import { sessionCache } from '@/lib/session-cache'

async function getSession(request: NextRequest) {
  const sessionToken = request.cookies.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value

  if (!sessionToken) {
    return null
  }

  let session = sessionCache.get(sessionToken)
  
  if (!session) {
    const dbSession = await prisma.sessions.findUnique({
      where: { token: sessionToken },
      include: { users: true }
    })

    if (!dbSession || isTokenExpired(dbSession.expires_at)) {
      return null
    }

    session = {
      token: dbSession.token,
      userId: dbSession.user_id,
      expiresAt: dbSession.expires_at,
      user: {
        id: dbSession.users.id,
        name: dbSession.users.name,
        email: dbSession.users.email
      }
    }
    
    sessionCache.set(sessionToken, session)
  }

  if (isTokenExpired(session.expiresAt)) {
    return null
  }

  return session
}

export async function POST(request: NextRequest) {
  // verify authentication
  const session = await getSession(request)
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    )
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '')

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: session.user.email,
      return_url: `${request.headers.get('origin')}/dashboard?premium_activated=true`,
    })

    return NextResponse.json({
      id: checkoutSession.id,
      client_secret: checkoutSession.client_secret,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
