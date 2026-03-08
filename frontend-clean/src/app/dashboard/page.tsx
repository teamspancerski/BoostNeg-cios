'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import {
  BarChart3,
  Truck,
  TrendingUp,
  MessageSquare,
  Cpu,
  LogOut,
  Play,
  Pause
} from 'lucide-react';

type Log = {
  timestamp: string;
  sender: string;
  message: string;
  type: string;
};

type Agent = {
  id: string;
  name: string;
  icon: any;
  active: boolean;
};

export default function DashboardV2() {

  const [logs, setLogs] = useState<Log[]>([
    {
      timestamp: new Date().toLocaleTimeString(),
      sender: 'SISTEMA',
      message: 'Sistema Boost Negócios IA inicializado.',
      type: 'system'
    },
    {
      timestamp: new Date().toLocaleTimeString(),
      sender: 'SISTEMA',
      message: 'Conectado ao cluster neural.',
      type: 'system'
    }
  ]);

  const [input, setInput] = useState('');

  const [agents, setAgents] = useState<Agent[]>([
    { id: 'diagnostico-vendas', name: 'Diagnóstico Vendas', icon: BarChart3, active: false },
    { id: 'rosie-suporte', name: 'Rosie (Suporte)', icon: MessageSquare, active: true },
    { id: 'jhow-logistica', name: 'Jhow (Logística)', icon: Truck, active: false },
    { id: 'dora-growth', name: 'Dora (Growth)', icon: TrendingUp, active: false },
    { id: 'orquestrador-full', name: 'Orquestrador Full', icon: Cpu, active: true },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (sender: string, message: string, type: string = 'agent') => {
    setLogs(prev => [
      ...prev,
      {
        timestamp: new Date().toLocaleTimeString(),
        sender,
        message,
        type
      }
    ]);
  };

  const handleCommand = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    addLog('USER', input, 'user');

    const command = input.toLowerCase();

    setInput('');

    setTimeout(() => {
      if (command.includes('diagnostico')) {
        addLog('DIAGNOSTICO', 'Funil com conversão de 23%. Sugestão: otimizar checkout.', 'agent');
      } else if (command.includes('suporte')) {
        addLog('ROSIE', 'Ticket #123 resolvido automaticamente.', 'agent');
      } else if (command.includes('logistica')) {
        addLog('JHOW', 'Rotas otimizadas. Economia estimada de 18%.', 'agent');
      } else if (command.includes('growth')) {
        addLog('DORA', 'Plano sugerido: campanhas Instagram Ads com ROI estimado 7x.', 'agent');
      } else {
        addLog('ORQUESTRADOR', 'Processando requisição no cluster 7b-turbo...', 'agent');
      }
    }, 500);
  };

  const toggleAgent = (id: string) => {
    setAgents(prev =>
      prev.map(a =>
        a.id === id ? { ...a, active: !a.active } : a
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-mono p-8">

      <header className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Boost Negócios IA
          </h1>
          <div className="text-xs text-gray-500">
            Bem-vindo ao painel de controle
          </div>
        </div>

        <div className="flex items-center gap-4">

          <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs uppercase tracking-wider">
            {agents.filter(a => a.active).length}/5 AGENTES ATIVOS
          </div>

          <button className="p-2 hover:text-red-500 transition-all">
            <LogOut size={20} />
          </button>

        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* SIDEBAR AGENTES */}

        <div className="lg:col-span-3 space-y-6">

          <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5">

            <h2 className="text-xs font-bold uppercase mb-6 text-gray-500">
              Gestão de IA
            </h2>

            <div className="space-y-3">

              {agents.map((agent) => {

                const Icon = agent.icon;

                return (
                  <div
                    key={agent.id}
                    onClick={() => toggleAgent(agent.id)}
                    className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${
                      agent.active
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-white/[0.02] border-white/10'
                    }`}
                  >

                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span>{agent.name}</span>
                    </div>

                    {agent.active ? <Pause size={12} /> : <Play size={12} />}

                  </div>
                );

              })}

            </div>

          </div>

        </div>

        {/* TERMINAL */}

        <div className="lg:col-span-9 flex flex-col bg-white/[0.02] rounded-2xl border border-white/10 overflow-hidden">

          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.03] text-xs text-gray-500">
            boost-terminal
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 text-sm"
          >

            {logs.map((log, i) => (

              <div key={i} className="flex gap-3">

                <span className="text-gray-600">
                  [{log.timestamp}]
                </span>

                <span className="font-bold text-purple-400">
                  {log.sender}:
                </span>

                <span className="text-gray-300">
                  {log.message}
                </span>

              </div>

            ))}

          </div>

          <form onSubmit={handleCommand} className="p-6 pt-0">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite um comando..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
            />

          </form>

        </div>

      </div>

    </div>
  );
}
