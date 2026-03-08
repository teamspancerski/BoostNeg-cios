import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req:Request){

  const {email} = await req.json()

  const user = await prisma.user.create({
    data:{
      email,
      stripeId:"pending",
      agents:"[]"
    }
  })

  return NextResponse.json(user)

}
