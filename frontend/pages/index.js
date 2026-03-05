import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const { url } = await res.json();
      window.location.href = url;
    } catch (e) {
      alert('Erro: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>🚀 Boost Negócios</h1>
      <p>Trading Bot SaaS - R$49/mês</p>
      <button 
        onClick={handleCheckout} 
        disabled={loading}
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          background: '#635BFF',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Carregando...' : '💳 Comprar Agora R$49/mês'}
      </button>
    </div>
  );
}
