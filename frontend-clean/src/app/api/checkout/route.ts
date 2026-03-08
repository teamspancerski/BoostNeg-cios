import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST() {

  try {

    const session = await stripe.checkout.sessions.create({

      payment_method_types: ['card'],

      mode: 'subscription',

      line_items: [
        {
          price: 'price_1T7VhpBk95yQtnPlhiKDQJFh',
          quantity: 1
        }
      ],

      success_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`

    })

    return NextResponse.json({
      url: session.url
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: 'Stripe error' },
      { status: 500 }
    )

  }

}
