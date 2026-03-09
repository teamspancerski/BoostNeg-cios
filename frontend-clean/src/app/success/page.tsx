'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Success() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Pega session_id direto da URL (sem useSearchParams)
    const url = new URL(window.location.href)
    const sessionId = url.searchParams.get('session_id')
    
    if (sessionId) {
      fetch('/api/session', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          fetch('/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: data.token })
          }).then(() => {
            router.push('/dashboard')
          })
        } else {
          router.push('/dashboard')
        }
      })
    } else {
      router.push('/dashboard')
    }
  }, [router])

  return (
    <div style={{ 
      padding: '4rem', 
      textAlign: 'center', 
      fontFamily: 'system-ui'
    }}>
      <h1>✅ Pagamento Confirmado!</h1>
      <p>Conectando ao dashboard...</p>
    </div>
  )
}

