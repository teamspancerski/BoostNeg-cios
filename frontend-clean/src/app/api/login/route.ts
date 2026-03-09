import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {

  const { email } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    )
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  )

  const response = NextResponse.json({ success: true })

  response.cookies.set("boost_token", token, {
    httpOnly: true,
    secure: true,
    path: "/"
  })

  return response
}

