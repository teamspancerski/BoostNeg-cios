'use client'
import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout/route', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const { url } = await res.json()
      window.location.href = url
    } catch (e) {
      alert('Erro: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'system-ui'
    }}>
      <h1 style={{ color: '#635BFF', fontSize: '3rem' }}>
        🚀 Boost Negócios
      </h1>
      <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
        Plataforma SaaS Trading Bot Automatizado
      </p>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        💳 Assinatura mensal: <strong>R$49</strong>
      </p>
      <button 
        onClick={handleCheckout} 
        disabled={loading}
        style={{
          padding: '20px 40px', 
          fontSize: '1.3rem', 
          background: loading ? '#ccc' : '#635BFF',
          color: 'white', 
          border: 'none', 
          borderRadius: '12px',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 10px 30px rgba(99,91,255,0.3)'
        }}
      >
        {loading ? '🔄 Redirecionando...' : '🚀 COMPRAR AGORA R$49/mês'}
      </button>
      <p style={{ marginTop: '30px', fontSize: '0.9rem', color: '#999' }}>
        ✅ Pagamento seguro Stripe • Cancelar quando quiser
      </p>
    </div>
  )
}
