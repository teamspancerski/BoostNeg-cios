'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout/route', { method: 'POST' })
      const { url } = await res.json()
      window.location.href = url
    } catch (e) {
      alert('Erro: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-black">
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Boost Command Center
        </h1>
      </nav>

      <div className="container mx-auto px-6 pb-20 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center py-20">
          {/* CTA */}
          <div className="space-y-8">
            <div className="inline-flex px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-white">
              🚀 Trading Dashboard IA - Lançamento
            </div>
            
            <div>
              <h1 className="text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-6">
                Command Center
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                  Trading Automatizado
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-md leading-relaxed">
                Dashboard completo IA Trading. 36 telas profissionais.
              </p>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="group relative w-full lg:w-auto px-12 py-6 text-xl font-bold rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0"
            >
              💳 ACESSAR R$49/mês
            </button>
            
            <div className="flex items-center gap-8 pt-8 text-white/70 text-sm">
              <span>✅ 36 Dashboards Profissionais</span>
              <span>•</span>
              <span>⚡ Execução Instantânea</span>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <Image
              src="/hero-dashboard.png"
              alt="Command Center Dashboard"
              width={800}
              height={600}
              className="rounded-3xl shadow-2xl border-4 border-white/10 backdrop-blur-xl"
            />
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur -z-10"></div>
          </div>
        </div>

        {/* Gallery Preview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {[
            'screen.png', 'stratifyx_command_center_dashboard/screen.png',
            'rosie_agent_profile_details/screen.png',
            'system_logs_stealth/screen.png',
            'marketplace_stealth/screen.png'
          ].map((img, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Image
                src={`/dashboard/${img}`}
                alt={`Dashboard ${i}`}
                width={200}
                height={150}
                className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
