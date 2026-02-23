'use client';

export default function ComandosPage() {
  const comandos = {
    conversa: [
      { cmd: ['oi', 'olá', 'hey'], resposta: 'Olá! Sou o Jarvis, seu assistente de voz.' },
      { cmd: ['como você está', 'tudo bem'], resposta: 'Estou ótimo! Pronto para executar seus comandos.' },
      { cmd: ['obrigado', 'valeu'], resposta: 'Por nada! Estou aqui para ajudar.' },
      { cmd: ['averiguar resenha'], resposta: 'Resenha confirmada, bora comer o Thiago! 😂' }
    ],
    aplicativos: [
      { cmd: ['abra o whatsapp', 'open whatsapp'], acao: 'Abre WhatsApp', atalho: 'Win + whatsapp' },
      { cmd: ['abra o navegador', 'open browser'], acao: 'Abre Edge', atalho: 'Win + edge' }
    ],
    janelas: [
      { cmd: ['feche a janela', 'close window'], acao: 'Fecha janela ativa', atalho: 'Alt + F4' },
      { cmd: ['minimizar', 'minimize'], acao: 'Minimiza janela', atalho: 'Win + ↓' },
      { cmd: ['maximizar', 'maximize'], acao: 'Maximiza janela', atalho: 'Win + ↑' }
    ],
    navegador: [
      { cmd: ['nova aba', 'new tab'], acao: 'Abre nova aba', atalho: 'Ctrl + T' },
      { cmd: ['feche a aba', 'close tab'], acao: 'Fecha aba atual', atalho: 'Ctrl + W' },
      { cmd: ['atualize a página', 'refresh'], acao: 'Recarrega página', atalho: 'F5' }
    ],
    clipboard: [
      { cmd: ['copiar', 'copy'], acao: 'Copia seleção', atalho: 'Ctrl + C' },
      { cmd: ['colar', 'paste'], acao: 'Cola conteúdo', atalho: 'Ctrl + V' }
    ],
    arquivos: [
      { cmd: ['salvar', 'save'], acao: 'Salva arquivo', atalho: 'Ctrl + S' }
    ],
    dinamicos: [
      { cmd: ['escreva [texto]', 'write [text]'], exemplo: 'escreva olá mundo', resultado: 'Digita: olá mundo' },
      { cmd: ['pressione [tecla]', 'press [key]'], exemplo: 'pressione enter', resultado: 'Pressiona Enter' }
    ]
  };

  return (
    <div className="min-h-screen bg-[#1a1614] text-[#f0ebe4]">
      {/* Header */}
      <header className="border-b border-white/5 sticky top-0 bg-[#1a1614]/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-[#d4724a] to-[#b85a35] rounded-full flex items-center justify-center">
              <span className="text-xl">🎤</span>
            </div>
            <span className="text-xl font-bold">Jarvis</span>
          </a>
          <a href="/" className="text-[#a09080] hover:text-[#d4724a] transition-colors">← Voltar</a>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 text-center border-b border-white/5">
        <h1 className="text-5xl md:text-6xl font-bold text-[#d4724a] mb-4">🎤 Comandos Disponíveis</h1>
        <p className="text-[#a09080] text-lg max-w-2xl mx-auto">
          Todos os comandos que você pode usar com o Jarvis. Fale claramente e veja a mágica acontecer!
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Conversa */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#d4724a] mb-8 flex items-center gap-3">
            <span>💬</span> Comandos de Conversa
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {comandos.conversa.map((item, i) => (
              <div key={i} className="bg-[#2a2520] border border-white/5 rounded-xl p-6 hover:border-[#d4724a]/30 transition-all">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.cmd.map((c, j) => (
                    <span key={j} className="bg-[#d4724a]/20 text-[#d4724a] px-3 py-1 rounded-full text-sm font-medium">
                      "{c}"
                    </span>
                  ))}
                </div>
                <p className="text-[#a09080]">→ {item.resposta}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Aplicativos */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#d4724a] mb-8 flex items-center gap-3">
            <span>🚀</span> Abrir Aplicativos
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {comandos.aplicativos.map((item, i) => (
              <div key={i} className="bg-[#2a2520] border border-white/5 rounded-xl p-6 hover:border-[#d4724a]/30 transition-all">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.cmd.map((c, j) => (
                    <span key={j} className="bg-[#d4724a]/20 text-[#d4724a] px-3 py-1 rounded-full text-sm font-medium">
                      "{c}"
                    </span>
                  ))}
                </div>
                <p className="text-[#f0ebe4] mb-1">{item.acao}</p>
                <p className="text-[#a09080] text-sm">{item.atalho}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Janelas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#d4724a] mb-8 flex items-center gap-3">
            <span>🪟</span> Gerenciar Janelas
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {comandos.janelas.map((item, i) => (
              <div key={i} className="bg-[#2a2520] border border-white/5 rounded-xl p-6 hover:border-[#d4724a]/30 transition-all">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.cmd.map((c, j) => (
                    <span key={j} className="bg-[#d4724a]/20 text-[#d4724a] px-3 py-1 rounded-full text-sm font-medium">
                      "{c}"
                    </span>
                  ))}
                </div>
                <p className="text-[#f0ebe4] mb-1">{item.acao}</p>
                <p className="text-[#a09080] text-sm">{item.atalho}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navegador */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#d4724a] mb-8 flex items-center gap-3">
            <span>🌐</span> Navegador
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {comandos.navegador.map((item, i) => (
              <div key={i} className="bg-[#2a2520] border border-white/5 rounded-xl p-6 hover:border-[#d4724a]/30 transition-all">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.cmd.map((c, j) => (
                    <span key={j} className="bg-[#d4724a]/20 text-[#d4724a] px-3 py-1 rounded-full text-sm font-medium">
                      "{c}"
                    </span>
                  ))}
                </div>
                <p className="text-[#f0ebe4] mb-1">{item.acao}</p>
                <p className="text-[#a09080] text-sm">{item.atalho}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Clipboard */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#d4724a] mb-8 flex items-center gap-3">
            <span>✂️</span> Área de Transferência
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {comandos.clipboard.map((item, i) => (
              <div key={i} className="bg-[#2a2520] border border-white/5 rounded-xl p-6 hover:border-[#d4724a]/30 transition-all">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.cmd.map((c, j) => (
                    <span key={j} className="bg-[#d4724a]/20 text-[#d4724a] px-3 py-1 rounded-full text-sm font-medium">
                      "{c}"
                    </span>
                  ))}
                </div>
                <p className="text-[#f0ebe4] mb-1">{item.acao}</p>
                <p className="text-[#a09080] text-sm">{item.atalho}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Arquivos */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#d4724a] mb-8 flex items-center gap-3">
            <span>💾</span> Arquivos
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {comandos.arquivos.map((item, i) => (
              <div key={i} className="bg-[#2a2520] border border-white/5 rounded-xl p-6 hover:border-[#d4724a]/30 transition-all">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.cmd.map((c, j) => (
                    <span key={j} className="bg-[#d4724a]/20 text-[#d4724a] px-3 py-1 rounded-full text-sm font-medium">
                      "{c}"
                    </span>
                  ))}
                </div>
                <p className="text-[#f0ebe4] mb-1">{item.acao}</p>
                <p className="text-[#a09080] text-sm">{item.atalho}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dinâmicos */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#d4724a] mb-8 flex items-center gap-3">
            <span>⌨️</span> Comandos Dinâmicos
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {comandos.dinamicos.map((item, i) => (
              <div key={i} className="bg-[#2a2520] border border-white/5 rounded-xl p-6 hover:border-[#d4724a]/30 transition-all">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.cmd.map((c, j) => (
                    <span key={j} className="bg-[#d4724a]/20 text-[#d4724a] px-3 py-1 rounded-full text-sm font-medium">
                      "{c}"
                    </span>
                  ))}
                </div>
                <p className="text-[#f0ebe4] mb-2">Exemplo: <span className="text-[#d4724a]">"{item.exemplo}"</span></p>
                <p className="text-[#a09080]">→ {item.resultado}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dicas */}
        <section className="bg-gradient-to-br from-[#2a2520] to-[#1a1614] border-2 border-[#d4724a]/30 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-[#d4724a] mb-8 text-center">💡 Dicas de Uso</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#f0ebe4] mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span> Boas Práticas
              </h3>
              <ul className="space-y-2 text-[#a09080]">
                <li>• Fale claramente e naturalmente</li>
                <li>• Aguarde o feedback do assistente</li>
                <li>• Use variações em PT-BR ou EN</li>
                <li>• Seja específico nos comandos dinâmicos</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#f0ebe4] mb-4 flex items-center gap-2">
                <span className="text-2xl">❌</span> Evite
              </h3>
              <ul className="space-y-2 text-[#a09080]">
                <li>• Falar muito rápido ou devagar</li>
                <li>• Ruído de fundo excessivo</li>
                <li>• Comandos muito longos</li>
                <li>• Falar antes do assistente terminar</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-[#a09080]">
          Desenvolvido com ❤️ usando Next.js e Python
        </p>
      </footer>
    </div>
  );
}
