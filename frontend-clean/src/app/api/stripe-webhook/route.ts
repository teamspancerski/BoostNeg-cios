import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')!

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any
      const email = session.customer_details?.email
      const stripeId = session.customer as string

      if (!email) return NextResponse.json({ error: 'No email' })

      const existing = await prisma.user.findUnique({ where: { email } })
      if (!existing) {
        await prisma.user.create({
          data: {
            email,
            stripeId,
            agents: JSON.stringify([
              'diagnostico-vendas', 'rosie-suporte', 'jhow-logistica', 
              'dora-growth', 'orquestrador-full'
            ])
          }
        })
        console.log('✅ User criado:', email)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook erro:', error)
    return NextResponse.json({ error: 'Webhook fail' }, { status: 400 })
  }
}

