import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SignJWT } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function POST(req: Request) {

  const { email } = await req.json()

  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const token = await new SignJWT({
    email: user.email
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)

  const res = NextResponse.json({ success: true })

  res.cookies.set('token', token, {
    httpOnly: true,
    path: '/'
  })

  return res
}
