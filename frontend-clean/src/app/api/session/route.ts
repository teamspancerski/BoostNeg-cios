import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

export async function GET(req: NextRequest) {
  const sessionId = new URL(req.url).searchParams.get('session_id')
  
  if (!sessionId) {
    return NextResponse.json({ error: 'No session id' })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return NextResponse.json({ email: session.customer_details?.email })
  } catch (error) {
    return NextResponse.json({ error: 'Session not found' })
  }
}

