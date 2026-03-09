'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Success() {
  const router = useRouter()

  useEffect(() => {
    // User já criado pelo webhook. Direto dashboard!
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  }, [router])

  return (
    <div style={{ 
      padding: '4rem', 
      textAlign: 'center', 
      fontFamily: 'system-ui',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#10b981', fontSize: '2.5rem' }}>Pagamento Confirmado!</h1>
      <p style={{ fontSize: '1.2rem', margin: '2rem 0' }}>
        Acesso liberado! Carregando dashboard...
      </p>
    </div>
  )
}

