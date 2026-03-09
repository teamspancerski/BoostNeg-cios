import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(req: any) {
  const token = req.cookies.get('boosttoken')?.value
  
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  
  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/', req.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*']
}

