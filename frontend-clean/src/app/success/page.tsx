'use client'

import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const autoLogin = async () => {
      const sessionId = searchParams.get('session_id')
      if (!sessionId) {
        setLoading(false)
        return
      }

      try {
        const sessionRes = await fetch(`/api/session?session_id=${sessionId}`)
        const sessionData = await sessionRes.json()
        
        if (sessionData.email) {
          const loginRes = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: sessionData.email })
          })

          if (loginRes.ok) {
            router.push('/dashboard')
            return
          }
        }
        setLoading(false)
      } catch (error) {
        console.error('Erro login:', error)
        setLoading(false)
      }
    }

    autoLogin()
  }, [searchParams, router])

  if (loading) return <div>🔄 Finalizando pagamento e login...</div>
  return (
    <div>
      <p>✅ Pagamento confirmado!</p>
      <a href="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded">Entrar no Dashboard</a>
    </div>
  )
}

export default function Success() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SuccessContent />
    </Suspense>
  )
}

