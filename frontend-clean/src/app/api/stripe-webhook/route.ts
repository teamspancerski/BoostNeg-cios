import { NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

export const config = {
  api: {
    bodyParser: false,
  },
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(req: Request) {

  try {

    const body = await req.text()

    const signature = req.headers.get("stripe-signature")!

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === "checkout.session.completed") {

      const session = event.data.object as Stripe.Checkout.Session

      const email = session.customer_details?.email
      const stripeCustomerId = session.customer as string

      if (!email) {
        return NextResponse.json({ error: "Email not found" })
      }

      // Verifica se usuário já existe
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email
        }
      })

      // Evita duplicação
      if (!existingUser) {

        await prisma.user.create({
          data: {
            email: email,
            stripeId: stripeCustomerId,

            agents: JSON.stringify([
              "diagnostico-vendas",
              "rosie-suporte",
              "jhow-logistica",
              "dora-growth",
              "orquestrador-full"
            ])
          }
        })

        console.log("Usuário criado:", email)

      } else {

        console.log("Usuário já existe:", email)

      }

    }

    return NextResponse.json({ received: true })

  } catch (error) {

    console.error("Stripe webhook error:", error)

    return NextResponse.json(
      { error: "Webhook error" },
      { status: 400 }
    )

  }

}