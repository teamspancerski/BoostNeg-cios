export default function Cancel() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-12 text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent">
          Cancelado
        </h1>
        <p className="text-xl text-slate-300 mb-8">
          Sem problemas. Volte quando quiser.
        </p>
        <a href="/" className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all">
          Tentar Novamente
        </a>
      </div>
    </div>
  )
}
