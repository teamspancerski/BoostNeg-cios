export default function Success() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-12 text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Assinatura Confirmada!
        </h1>
        <p className="text-xl text-slate-300 mb-8">
          Boost Negocios IA esta ativo. Agentes em operacao.
        </p>
        <a href="/dashboard" className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all">
          Acessar Plataforma
        </a>
      </div>
    </div>
  )
}

