# 🏗️ Estrutura do Projeto Jarvis

Documentação completa da arquitetura e organização do assistente de voz Jarvis.

---

## 📂 Estrutura de Diretórios

```
jarvis-simple/
│
├── 📁 app/                          # Next.js App Router
│   ├── 📁 comandos/                 # Rota /comandos
│   ├── 📄 favicon.ico               # Ícone do site
│   ├── 📄 globals.css               # Estilos globais + Tailwind
│   ├── 📄 layout.tsx                # Layout raiz (DM Sans + Caveat)
│   └── 📄 page.tsx                  # Página inicial (/)
│
├── 📁 components/                   # Componentes React
│   ├── 📄 LandingPage.tsx           # Landing page principal
│   └── 📄 VoiceAssistant.tsx        # Componente do assistente (legado)
│
├── 📁 backend-python/               # API Python Flask
│   ├── 📄 main.py                   # Servidor Flask + lógica
│   ├── 📄 voice_commands.json       # Configuração de comandos
│   └── 📄 requirements.txt          # Dependências Python
│
├── 📁 public/                       # Arquivos estáticos
│   └── 📄 screenshot-*.png          # Screenshot do projeto
│
├── 📁 .next/                        # Build do Next.js (gerado)
│
├── 📄 package.json                  # Dependências Node.js
├── 📄 tsconfig.json                 # Configuração TypeScript
├── 📄 next.config.ts                # Configuração Next.js
├── 📄 postcss.config.mjs            # Configuração Tailwind
├── 📄 eslint.config.mjs             # Configuração ESLint
│
├── 📄 README.md                     # Documentação principal
├── 📄 COMANDOS.md                   # Lista de comandos
├── 📄 SETUP.md                      # Guia de instalação
└── 📄 ESTRUTURA.md                  # Este arquivo
```

---

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUÁRIO                                 │
│                    (Fala no microfone)                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NAVEGADOR (Chrome/Edge)                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Web Speech API                              │  │
│  │  - Captura áudio do microfone                            │  │
│  │  - Converte voz → texto (pt-BR)                          │  │
│  │  - Retorna transcrição                                   │  │
│  └────────────────────────┬─────────────────────────────────┘  │
└────────────────────────────┼────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              FRONTEND (Next.js - localhost:3000)                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  LandingPage.tsx                                         │  │
│  │  - Recebe transcrição                                    │  │
│  │  - Envia POST /execute                                   │  │
│  │  - Exibe status visual                                   │  │
│  └────────────────────────┬─────────────────────────────────┘  │
└────────────────────────────┼────────────────────────────────────┘
                             │ HTTP POST
                             │ { "text": "nova aba" }
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND (Flask - localhost:5000)                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  main.py                                                 │  │
│  │  1. Normaliza texto (remove acentos)                     │  │
│  │  2. Busca comando em voice_commands.json                 │  │
│  │  3. Executa via pyautogui                                │  │
│  │  4. Retorna status + speech                              │  │
│  └────────────────────────┬─────────────────────────────────┘  │
└────────────────────────────┼────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SISTEMA OPERACIONAL                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  pyautogui                                               │  │
│  │  - Pressiona teclas (Ctrl+C, Ctrl+V)                     │  │
│  │  - Abre aplicativos (Win + nome)                         │  │
│  │  - Escreve texto                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
                    ✅ Comando Executado!
```

---

## 🎯 Componentes Principais

### 1️⃣ Frontend (Next.js)

```
app/
├── layout.tsx
│   └── Importa fontes: DM Sans (body) + Caveat (display)
│
└── page.tsx
    └── Renderiza <LandingPage />

components/
└── LandingPage.tsx
    ├── useState: isListening, transcript, status
    ├── useEffect: Inicializa Web Speech API
    ├── speak(): Síntese de voz (resposta)
    ├── toggleListening(): Liga/desliga microfone
    └── fetch(): Envia comando para backend
```

**Tecnologias:**
- React 18 + TypeScript
- Tailwind CSS v4
- Web Speech API (nativa do navegador)
- Speech Synthesis API (voz de resposta)

---

### 2️⃣ Backend (Python Flask)

```
backend-python/
├── main.py
│   ├── normalize_text(): Remove acentos e pontuação
│   ├── load_commands(): Carrega voice_commands.json
│   ├── execute_command(): Executa teclas via pyautogui
│   └── /execute (POST): Endpoint principal
│
├── voice_commands.json
│   └── Array de comandos:
│       ├── sentence: ["copiar", "copy"]
│       ├── action: "copy"
│       ├── keys: ["ctrl", "c"]
│       ├── delay: 0.1
│       └── speak: "Copiando"
│
└── requirements.txt
    ├── flask
    ├── flask-cors
    └── pyautogui
```

**Fluxo de Execução:**
1. Recebe `{ "text": "nova aba" }`
2. Normaliza: `"nova aba"` → `"nova aba"`
3. Busca no JSON: encontra `["nova aba", "new tab"]`
4. Executa: `pyautogui.hotkey('ctrl', 't')`
5. Retorna: `{ "status": "executed", "command": "new_tab", "speech": "Abrindo nova aba" }`

---

## 🔐 Tipos de Comandos

### Comando Simples (Atalho de Teclado)
```json
{
  "sentence": ["copiar", "copy"],
  "action": "copy",
  "keys": ["ctrl", "c"],
  "delay": 0.1,
  "speak": "Copiando"
}
```
**Execução:** `pyautogui.hotkey('ctrl', 'c')`

---

### Comando de Aplicativo (Win + Nome)
```json
{
  "sentence": ["abra o whatsapp"],
  "action": "open_whatsapp",
  "keys": ["win", "whatsapp"],
  "delay": 0.5,
  "speak": "Abrindo WhatsApp"
}
```
**Execução:**
1. `pyautogui.press('win')`
2. `pyautogui.write('whatsapp')`
3. `pyautogui.press('enter')`

---

### Comando Dinâmico (Captura Texto)
```json
{
  "sentence": ["escreva", "write"],
  "action": "write_text",
  "type": "dynamic",
  "delay": 0.1,
  "speak": "Escrevendo"
}
```
**Execução:**
- Usuário: "escreva olá mundo"
- Sistema extrai: "olá mundo"
- `pyautogui.write('olá mundo')`

---

### Comando de Conversa (Sem Execução)
```json
{
  "sentence": ["oi", "olá"],
  "action": "greeting",
  "keys": [],
  "delay": 0,
  "speak": "Olá! Sou o Jarvis",
  "no_execute": true
}
```
**Execução:** Apenas fala, não executa ação

---

## 🎨 Design System

### Paleta de Cores
```css
--color-bg:        #1a1614  /* Fundo escuro quente */
--color-bg-card:   #2a2520  /* Cards */
--color-accent:    #d4724a  /* Laranja terracota */
--color-text:      #f0ebe4  /* Texto principal */
--color-text-muted:#a09080  /* Texto secundário */
```

### Tipografia
```
Títulos (Hero, Seções):
  → Caveat (Google Fonts)
  → Manuscrito, orgânico
  → 4.5-6rem (hero), 2.5-3rem (seções)

Corpo (Parágrafos, Botões):
  → DM Sans (Google Fonts)
  → Clean, legível
  → 1rem (base), 600 (bold)
```

---

## 🔌 API Endpoints

### POST /execute
**Request:**
```json
{
  "text": "nova aba"
}
```

**Response (Sucesso):**
```json
{
  "status": "executed",
  "command": "new_tab",
  "speech": "Abrindo nova aba"
}
```

**Response (Comando não encontrado):**
```json
{
  "status": "no_command"
}
```

---

## 🚀 Fluxo de Inicialização

```
1. Terminal 1: cd backend-python && python main.py
   └─> Flask inicia na porta 5000
   └─> Carrega voice_commands.json
   └─> Aguarda requisições

2. Terminal 2: npm run dev
   └─> Next.js inicia na porta 3000
   └─> Compila TypeScript + Tailwind
   └─> Abre navegador

3. Usuário: Acessa localhost:3000
   └─> Clica no botão do microfone
   └─> Permite acesso ao microfone
   └─> Web Speech API ativa

4. Usuário: Fala "nova aba"
   └─> Web Speech API transcreve
   └─> Frontend envia POST /execute
   └─> Backend executa Ctrl+T
   └─> Frontend fala "Abrindo nova aba"
   └─> Nova aba abre no navegador
```

---

## 📊 Estatísticas do Projeto

| Métrica | Valor |
|---------|-------|
| Linhas de código (Frontend) | ~300 |
| Linhas de código (Backend) | ~80 |
| Comandos pré-configurados | 17 |
| Dependências Node.js | ~15 |
| Dependências Python | 3 |
| Tempo de resposta | <100ms |
| Suporte de idiomas | 2 (PT-BR, EN) |

---

## 🔄 Ciclo de Vida de um Comando

```
┌─────────────────────────────────────────────────────────────┐
│ 1. CAPTURA                                                  │
│    Usuário fala → Microfone → Web Speech API               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. TRANSCRIÇÃO                                              │
│    Áudio → Texto: "nova aba"                                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. ENVIO                                                    │
│    POST localhost:5000/execute                              │
│    Body: { "text": "nova aba" }                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. PROCESSAMENTO                                            │
│    - Normaliza: "nova aba" → "nova aba"                     │
│    - Busca em voice_commands.json                           │
│    - Encontra: keys: ["ctrl", "t"]                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. EXECUÇÃO                                                 │
│    pyautogui.hotkey('ctrl', 't')                            │
│    → Sistema operacional recebe comando                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. RESPOSTA                                                 │
│    Backend → Frontend:                                      │
│    { "status": "executed", "speech": "Abrindo nova aba" }   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. FEEDBACK                                                 │
│    - Visual: "✅ new_tab"                                   │
│    - Áudio: Speech Synthesis fala "Abrindo nova aba"        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛡️ Segurança e Limitações

### ✅ Seguro
- Roda 100% localmente
- Sem envio de dados externos
- Sem armazenamento de áudio
- Código open source

### ⚠️ Limitações
- Requer 2 servidores ativos
- Funciona apenas localmente
- pyautogui precisa de interface gráfica
- Não funciona em hosting tradicional

---

## 📚 Dependências

### Frontend (package.json)
```json
{
  "next": "^16.1.6",
  "react": "^19.0.0",
  "typescript": "^5",
  "tailwindcss": "^4.0.0"
}
```

### Backend (requirements.txt)
```
flask==3.1.0
flask-cors==5.0.0
pyautogui==0.9.54
```

---

## 🎯 Próximos Passos

1. **Adicionar mais comandos** - Expandir voice_commands.json
2. **Interface de configuração** - UI para criar comandos
3. **Histórico** - Salvar comandos executados
4. **Macros** - Sequências de comandos
5. **Modo background** - Sempre ouvindo
6. **Multi-plataforma** - Linux e macOS

---

**Versão:** 1.0  
**Última atualização:** 2024  
**Autor:** Desenvolvido com ❤️ usando Next.js e Python
