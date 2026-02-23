# 🎤 Assistente de Voz - Next.js + Python

Assistente de voz que usa Web Speech API (Next.js) para reconhecimento e Python (pyautogui) para executar comandos no sistema.

## 🚀 Como Usar

### 1. Instalar dependências Python
```bash
cd backend-python
pip install -r requirements.txt
```

### 2. Iniciar API Python
```bash
cd backend-python
python main.py
```
A API rodará em `http://localhost:5000`

### 3. Iniciar Next.js (em outro terminal)
```bash
npm run dev
```
O frontend rodará em `http://localhost:3000`

### 4. Testar
1. Abra http://localhost:3000
2. Clique em "🎙️ Começar"
3. Fale: "edge abra o navegador"
4. O comando será executado!

## 📝 Comandos Disponíveis

- "edge abra o navegador" - Abre o Edge
- "edge nova aba" - Ctrl+T
- "edge feche a aba" - Ctrl+W
- "edge copiar" - Ctrl+C
- "edge colar" - Ctrl+V
- "edge salvar" - Ctrl+S
- "edge escreva [texto]" - Escreve o texto
- "edge minimizar" - Win+Down
- "edge maximizar" - Win+Up

## 🔧 Arquitetura

- **Frontend (Next.js)**: Web Speech API para reconhecimento de voz
- **Backend (Python)**: Flask API + pyautogui para executar comandos

## ⚙️ Configuração

Edite `backend-python/voice_commands.json` para adicionar novos comandos.
