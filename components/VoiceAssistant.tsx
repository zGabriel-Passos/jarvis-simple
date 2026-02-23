'use client'

import { useState, useEffect } from 'react'

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [status, setStatus] = useState('Clique para começar')
  const [recognition, setRecognition] = useState<any>(null)

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
              setStatus(`✅ Comando executado: ${data.command}`)
            } else {
              setStatus('❌ Comando não reconhecido')
            }
          } catch (error) {
            setStatus('⚠️ Erro ao conectar com Python API')
          }
        }
      }
      
      recognitionInstance.onerror = (event: any) => {
        setStatus(`Erro: ${event.error}`)
        setIsListening(false)
      }
      
      setRecognition(recognitionInstance)
    }
  }, [])

  const toggleListening = () => {
    if (!recognition) {
      setStatus('⚠️ Navegador não suporta Web Speech API')
      return
    }

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-purple-500 to-blue-600 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          🎤 Assistente de Voz
        </h1>
        
        <button
          onClick={toggleListening}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isListening ? '🔴 Parar' : '🎙️ Começar'}
        </button>
        
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Status:</p>
          <p className="text-lg font-medium text-gray-800">{status}</p>
        </div>
        
        {transcript && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600 mb-2">Você disse:</p>
            <p className="text-lg text-gray-800">{transcript}</p>
          </div>
        )}
        
        <div className="mt-6 text-sm text-gray-600">
          <p className="font-semibold mb-2">Comandos disponíveis:</p>
          <ul className="space-y-1">
            <li>• "abra o navegador"</li>
            <li>• "nova aba"</li>
            <li>• "feche a aba"</li>
            <li>• "copiar"</li>
            <li>• "escreva [texto]"</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
