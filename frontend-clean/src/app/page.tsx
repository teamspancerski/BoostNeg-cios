'use client'

import {
  Zap,
  BarChart3,
  Cpu,
  ArrowRight,
  Globe,
  Lock
} from 'lucide-react'

export default function LandingPage() {

  async function startCheckout() {
    const res = await fetch('/api/checkout', {
      method: 'POST'
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      alert('Erro ao iniciar checkout')
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">

      {/* background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* NAV */}
      <nav className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap size={18} fill="white" />
            </div>
            <span className="text-xl font-bold tracking-tight">BOOST</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Funcionalidades</a>
            <a href="#pricing" className="hover:text-white transition-colors">Preços</a>

            <a
              href="/dashboard"
              className="px-5 py-2.5 bg-white text-black rounded-full hover:bg-gray-200 transition-all font-bold"
            >
              Entrar
            </a>

          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8">
            IA DE ÚLTIMA GERAÇÃO PARA NEGÓCIOS
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent leading-[1.1]">
            Automatize sua empresa <br className="hidden md:block" /> com inteligência real.
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Diagnósticos, suporte, logística e crescimento. Tudo orquestrado por uma rede neural dedicada ao seu faturamento.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <button
              onClick={startCheckout}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/20"
            >
              Começar Agora
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-lg transition-all">
              Ver Demo
            </button>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            O Ecossistema Boost
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              { icon: BarChart3, title: 'Diagnóstico', desc: 'Análise profunda de funil e gargalos de vendas.' },
              { icon: Cpu, title: 'Orquestrador', desc: 'O cérebro que conecta todos os processos.' },
              { icon: Globe, title: 'Growth', desc: 'Estratégias de escala e ROI exponencial.' },
              { icon: Lock, title: 'Segurança', desc: 'Seus dados protegidos com criptografia militar.' },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group">

                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                  <f.icon className="text-blue-500" size={24} />
                </div>

                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 px-6">

        <div className="max-w-3xl mx-auto p-12 rounded-[40px] bg-gradient-to-br from-blue-600 to-purple-700 text-center shadow-2xl">

          <h2 className="text-4xl font-extrabold mb-6">Plano Pro</h2>

          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-7xl font-black">49</span>
            <span className="text-xl">/mês</span>
          </div>

          <button
            onClick={startCheckout}
            className="block w-full py-5 bg-white text-blue-700 rounded-2xl font-black text-xl hover:scale-[1.02] transition-all"
          >
            ASSINAR AGORA
          </button>

        </div>

      </section>

    </div>
  )
}
