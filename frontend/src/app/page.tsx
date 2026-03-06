'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout/route', { method: 'POST' })
      const data = await res.json()
      window.location.href = data.url
    } catch (e) {
      alert('Erro: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-black text-white overflow-hidden">
      <header className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
          Boost Command Center
        </h1>
        <p className="text-lg text-purple-200 mt-2">Trading Dashboard IA Profissional</p>
      </header>

      <main className="container mx-auto px-6 pb-20 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <h2 className="text-6xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text">
              Dashboard
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent">Completo IA</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
              36 telas profissionais para trading automatizado. Execução instantânea + estratégias IA testadas.
            </p>
            <button 
              onClick={handleCheckout} 
              disabled={loading}
              className="group relative px-16 py-8 text-2xl font-bold rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-[1.02] transition-all duration-500 w-full lg:w-auto"
            >
              <span className="relative z-10">
                {loading ? '🔄 Processando Pagamento...' : '🚀 ACESSAR R$49/mês'}
              </span>
            </button>
            <div className="flex gap-8 text-sm text-gray-400">
              <span>✅ Pagamento Stripe Seguro</span>
              <span>•</span>
              <span>⚡ Deploy Instantâneo</span>
              <span>•</span>
              <span>📱 Mobile Responsive</span>
            </div>
          </div>

          <div className="relative">
            <Image 
              src="/hero.png" 
              alt="Command Center Dashboard" 
              width={800} 
              height={600}
              className="rounded-3xl shadow-2xl border-4 border-white/20 backdrop-blur-xl w-full max-w-md mx-auto"
              priority 
            />
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur animate-pulse"></div>
          </div>
        </div>

        <section className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Galeria Dashboard</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { src: '/dashboard-rosie.png', label: 'Rosie Profile' },
              { src: '/dashboard-logs.png', label: 'System Logs' },
              { src: '/dashboard-market.png', label: 'Agent Marketplace' },
              { src: '/dashboard-settings.png', label: 'System Settings' },
              { src: '/dashboard/screen.png', label: 'Main Dashboard' }
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/5 backdrop-blur-xl border border-white/10">
                <Image 
                  src={item.src} 
                  alt={item.label} 
                  width={250} 
                  height={180}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="font-semibold text-white">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
// Vercel redeploy Fri Mar  6 05:02:18 UTC 2026
