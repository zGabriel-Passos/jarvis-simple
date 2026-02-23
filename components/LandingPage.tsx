'use client'

import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [status, setStatus] = useState('Pronto para ouvir')
  const [recognition, setRecognition] = useState<any>(null)

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'pt-BR'
    utterance.rate = 1.1
    utterance.pitch = 1.0
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = 'pt-BR'

      recognitionInstance.onresult = async (event: any) => {
        const current = event.resultIndex
        const transcriptText = event.results[current][0].transcript
        setTranscript(transcriptText)

        if (event.results[current].isFinal) {
          try {
            const response = await fetch('http://localhost:5000/execute', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: transcriptText })
            })
            const data = await response.json()

            if (data.status === 'executed') {
              if (data.speech) speak(data.speech)
              setStatus(`✅ ${data.command}`)
            } else {
              setStatus('❌ Comando não reconhecido')
            }
          } catch (error) {
            setStatus('⚠️ Erro ao conectar')
          }
        }
      }

      recognitionInstance.onerror = () => {
        setIsListening(false)
        setStatus('Erro no microfone')
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  const toggleListening = () => {
    if (!recognition) return

    if (isListening) {
      recognition.stop()
      setIsListening(false)
      setStatus('Parado')
    } else {
      recognition.start()
      setIsListening(true)
      setStatus('🎤 Ouvindo...')
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1614]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[#1a1614]/80 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-[#d4724a] to-[#b85a35] rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <span className="text-[#f0ebe4] font-bold text-xl">Jarvis</span>
          </div>
          <button className="bg-[#d4724a] hover:bg-[#c26640] text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-[#d4724a]/30">
            Começar Agora
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4724a]/10 border border-[#d4724a]/20 rounded-full mb-8">
            <div className="w-2 h-2 bg-[#d4724a] rounded-full animate-pulse"></div>
            <span className="text-[#d4724a] text-sm font-medium">Controle por Voz Inteligente</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-[#f0ebe4] mb-6 leading-[1.1] font-(family-name:--font-caveat)">
            Seu PC obedece<br />sua voz
          </h1>

          <p className="text-xl text-[#a09080] mb-12 max-w-2xl mx-auto leading-relaxed">
            Assistente de voz que executa comandos no seu computador. Crie seus comandos personalizados, abra apps, controle janelas e digite textos sem tocar no teclado.
          </p>

          {/* Mic Control */}
          <div className="max-w-lg mx-auto mb-12">
            <div className="bg-[#2a2520] border border-white/5 rounded-3xl p-10 shadow-2xl">
              <button
                onClick={toggleListening}
                className={`w-40 h-40 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${isListening
                  ? 'bg-linear-to-br from-red-500 to-red-600 animate-pulse shadow-2xl shadow-red-500/40 scale-105'
                  : 'bg-linear-to-br from-[#d4724a] to-[#b85a35] hover:scale-110 shadow-2xl shadow-[#d4724a]/40'
                  }`}
              >
                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>

              <div className="mt-8 text-center">
                <p className="text-[#a09080] text-sm mb-2">Status</p>
                <p className="text-[#f0ebe4] font-semibold text-lg">{status}</p>
              </div>

              {transcript && (
                <div className="mt-6 p-4 bg-[#d4724a]/10 border border-[#d4724a]/20 rounded-2xl">
                  <p className="text-[#d4724a] text-sm mb-1 font-medium">Você disse:</p>
                  <p className="text-[#f0ebe4]">{transcript}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-6 justify-center text-[#a09080] text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#d4724a]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Sem instalação</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#d4724a]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Grátis</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#d4724a]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Privacidade total</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-[#2a2520]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#d4724a] text-center mb-20 font-(family-name:--font-caveat)">Como Funciona</h2>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-linear-to-r from-transparent via-[#d4724a]/30 to-transparent"></div>

            {[
              { num: '1', title: 'Ative o Microfone', desc: 'Clique no botão laranja e permita acesso ao microfone' },
              { num: '2', title: 'Fale o Comando', desc: 'Diga naturalmente o que quer fazer: "nova aba", "copiar"' },
              { num: '3', title: 'Veja Acontecer', desc: 'O comando é executado instantaneamente no seu PC' }
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-20 h-20 bg-linear-to-br from-[#d4724a] to-[#b85a35] rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-6 shadow-lg shadow-[#d4724a]/30 relative z-10">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-[#f0ebe4] mb-3">{step.title}</h3>
                <p className="text-[#a09080] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#d4724a] text-center mb-20 font-(family-name:--font-caveat)">Por Que Jarvis</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Reconhecimento Preciso', desc: 'Usa a Web Speech API do navegador para reconhecimento de voz de alta qualidade, entendendo comandos em português e inglês.' },
              { title: 'Execução Instantânea', desc: 'Comandos são processados e executados em milissegundos. Sem delay, sem espera. Sua voz vira ação imediatamente.' },
              { title: 'Feedback por Voz', desc: 'O assistente confirma cada ação com voz natural e humana. Você sempre sabe o que está acontecendo.' },
              { title: 'Privacidade Garantida', desc: 'Tudo roda localmente no seu computador. Nenhum dado é enviado para servidores externos. Seu controle, suas regras.' }
            ].map((feature, i) => (
              <div key={i} className="bg-[#2a2520] border border-white/5 rounded-2xl p-8 hover:border-[#d4724a]/30 transition-all">
                <h3 className="text-xl font-bold text-[#f0ebe4] mb-3">{feature.title}</h3>
                <p className="text-[#a09080] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commands Preview */}
      <section className="py-24 px-6 bg-[#2a2520]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#d4724a] text-center mb-20">Comandos Disponíveis</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { cmd: 'abra o whatsapp', icon: '💬' },
              { cmd: 'nova aba', icon: '🌐' },
              { cmd: 'copiar', icon: '📋' },
              { cmd: 'colar', icon: '📌' },
              { cmd: 'salvar', icon: '💾' },
              { cmd: 'minimizar', icon: '🔽' },
              { cmd: 'escreva [texto]', icon: '✍️' },
              { cmd: 'pressione [tecla]', icon: '⌨️' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#1a1614] border border-white/5 rounded-xl p-4 hover:border-[#d4724a]/30 transition-all">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-[#f0ebe4] font-medium">{item.cmd}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/comandos" className="text-[#d4724a] hover:text-[#c26640] font-semibold inline-flex items-center gap-2">
              Ver todos os comandos
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-linear-to-br from-[#2a2520] to-[#1a1614] border-2 border-[#d4724a]/30 rounded-3xl p-12 text-center shadow-2xl shadow-[#d4724a]/20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#f0ebe4] mb-4">Pronto para começar?</h2>
            <p className="text-[#a09080] text-lg mb-8 max-w-2xl mx-auto">
              Ative o microfone agora e comece a controlar seu PC com sua voz. É grátis, rápido e funciona no navegador.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#d4724a] hover:bg-[#c26640] text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:shadow-xl hover:shadow-[#d4724a]/40 hover:-translate-y-1"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-linear-to-br from-[#d4724a] to-[#b85a35] rounded-lg"></div>
            <span className="text-[#f0ebe4] font-bold">Jarvis</span>
          </div>
          <p className="text-[#a09080] text-sm">© 2024 Jarvis. Controle por voz para seu PC.</p>
        </div>
      </footer>
    </div>
  )
}
