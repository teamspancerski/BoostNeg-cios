'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Success() {
  const router = useRouter()
  const [status, setStatus] = useState('Iniciando...')

  useEffect(() => {
    const url = new URL(window.location.href)
    const sessionId = url.searchParams.get('session_id')
    
    console.log('🔍 SESSION_ID:', sessionId)
    
    if (sessionId) {
      setStatus('Chamando /api/session...')
      fetch('/api/session', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      .then(res => {
        console.log('📡 /api/session STATUS:', res.status)
        return res.json()
      })
      .then(data => {
        console.log('📦 /api/session DATA:', data)
        setStatus('API session OK')
        
        if (data.token) {
          setStatus('Fazendo login...')
          return fetch('/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: data.token })
          })
        } else {
          console.log('⚠️ Sem token, indo direto dashboard')
          router.push('/dashboard')
        }
      })
      .then(res => {
        if (res) {
          console.log('📡 /api/login STATUS:', res.status)
          router.push('/dashboard')
        }
      })
      .catch(err => {
        console.error('❌ ERRO:', err)
        setStatus('Erro API, indo dashboard...')
        setTimeout(() => router.push('/dashboard'), 2000)
      })
    } else {
      console.log('⚠️ Sem session_id, indo dashboard')
      router.push('/dashboard')
    }
  }, [router])

  return (
    <div style={{ 
      padding: '4rem', 
      textAlign: 'center', 
      fontFamily: 'system-ui',
      fontSize: '18px'
    }}>
      <h1>Pagamento Confirmado!</h1>
      <p>{status}</p>
      <p><small>Abra F12 → Console para debug</small></p>
    </div>
  )
}

