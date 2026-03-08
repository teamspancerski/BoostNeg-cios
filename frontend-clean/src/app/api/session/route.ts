import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
})

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const session_id = searchParams.get("session_id")

  if (!session_id) {
    return NextResponse.json({ error: "No session id" })
  }

  const session = await stripe.checkout.sessions.retrieve(session_id)

  return NextResponse.json({
    email: session.customer_details?.email
  })

}
