# 🎤 Lista Completa de Comandos

Todos os comandos que você pode usar com o Jarvis.

## 📋 Como Usar

1. Ative o microfone clicando no botão laranja
2. Fale claramente um dos comandos abaixo
3. O Jarvis responderá e executará a ação

---

## 💬 Comandos de Conversa

| Comando | Resposta do Jarvis |
|---------|--------------------|
| **"oi"** / **"olá"** / **"hey"** | "Olá! Sou o Jarvis, seu assistente de voz. Como posso ajudar?" |
| **"como você está"** / **"tudo bem"** | "Estou ótimo! Pronto para executar seus comandos." |
| **"obrigado"** / **"valeu"** | "Por nada! Estou aqui para ajudar." |
| **"averiguar resenha"** | "Resenha confirmada, bora comer o Thiago!" 😂 |

---

## 🌐 Navegação e Aplicativos

### Abrir Aplicativos

| Comando | Ação | Descrição |
|---------|------|-----------|
| **"abra o whatsapp"** | Abre WhatsApp | Pressiona Win e digita "whatsapp" |
| **"abra o navegador"** | Abre Edge | Pressiona Win e digita "edge" |
| **"open whatsapp"** | Abre WhatsApp | Versão em inglês |
| **"open browser"** | Abre Edge | Versão em inglês |

### Gerenciar Janelas

| Comando | Ação | Atalho |
|---------|------|--------|
| **"feche a janela"** | Fecha janela ativa | Alt + F4 |
| **"close window"** | Fecha janela ativa | Alt + F4 |
| **"minimizar"** | Minimiza janela | Win + ↓ |
| **"minimize"** | Minimiza janela | Win + ↓ |
| **"maximizar"** | Maximiza janela | Win + ↑ |
| **"maximize"** | Maximiza janela | Win + ↑ |

---

## 🌍 Navegador

### Gerenciar Abas

| Comando | Ação | Atalho |
|---------|------|--------|
| **"nova aba"** | Abre nova aba | Ctrl + T |
| **"new tab"** | Abre nova aba | Ctrl + T |
| **"feche a aba"** | Fecha aba atual | Ctrl + W |
| **"close tab"** | Fecha aba atual | Ctrl + W |

### Atualizar Página

| Comando | Ação | Atalho |
|---------|------|--------|
| **"atualize a página"** | Recarrega página | F5 |
| **"refresh page"** | Recarrega página | F5 |
| **"refresh"** | Recarrega página | F5 |

---

## ✂️ Área de Transferência

| Comando | Ação | Atalho |
|---------|------|--------|
| **"copiar"** | Copia seleção | Ctrl + C |
| **"copy"** | Copia seleção | Ctrl + C |
| **"colar"** | Cola conteúdo | Ctrl + V |
| **"paste"** | Cola conteúdo | Ctrl + V |

---

## 💾 Arquivos

| Comando | Ação | Atalho |
|---------|------|--------|
| **"salvar"** | Salva arquivo | Ctrl + S |
| **"save"** | Salva arquivo | Ctrl + S |

---

## ⌨️ Comandos Dinâmicos

### Escrever Texto

Use o comando **"escreva"** seguido do texto que deseja digitar.

**Exemplos:**
- "escreva olá mundo" → Digita: `olá mundo`
- "escreva meu email é teste@email.com" → Digita: `meu email é teste@email.com`
- "write hello world" → Digita: `hello world`

### Pressionar Teclas

Use o comando **"pressione"** seguido do nome da tecla.

**Exemplos:**
- "pressione enter" → Pressiona Enter
- "pressione tab" → Pressiona Tab
- "pressione escape" → Pressiona Esc
- "pressione f11" → Pressiona F11 (tela cheia)
- "pressione space" → Pressiona Espaço
- "press enter" → Pressiona Enter (inglês)

#### Teclas Suportadas:

**Letras:** a-z
**Números:** 0-9
**Funções:** f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12
**Navegação:** up, down, left, right, home, end, pageup, pagedown
**Edição:** enter, tab, space, backspace, delete, insert
**Especiais:** escape, printscreen, scrolllock, pause
**Modificadores:** shift, ctrl, alt, win

---

## 🎯 Dicas de Uso

### ✅ Boas Práticas

1. **Fale claramente** - Pronuncie as palavras de forma natural
2. **Aguarde o feedback** - O assistente confirmará cada comando
3. **Use variações** - Muitos comandos têm versões em PT-BR e EN
4. **Seja específico** - Para comandos dinâmicos, fale pausadamente

### ❌ Evite

1. Falar muito rápido ou muito devagar
2. Ruído de fundo excessivo
3. Comandos muito longos (para "escreva", divida em partes)
4. Falar antes do assistente terminar de responder

---

## 🔧 Personalizando Comandos

Você pode adicionar seus próprios comandos editando o arquivo:
```
backend-python/voice_commands.json
```

### Exemplo de Comando de Conversa:

```json
{
  "sentence": ["bom dia", "good morning"],
  "action": "good_morning",
  "keys": [],
  "delay": 0,
  "speak": "Bom dia! Como posso ajudar hoje?",
  "no_execute": true
}
```

### Exemplo de Comando Simples:

```json
{
  "sentence": ["abra o spotify", "open spotify"],
  "action": "open_spotify",
  "keys": ["win", "spotify"],
  "delay": 0.5,
  "speak": "Abrindo Spotify"
}
```

### Exemplo de Comando Dinâmico:

```json
{
  "sentence": ["pesquise", "search"],
  "action": "search_text",
  "type": "dynamic",
  "delay": 0.1,
  "speak": "Pesquisando"
}
```

---

## 📊 Resumo Rápido

| Categoria | Quantidade | Exemplos |
|-----------|------------|----------|
| Conversa | 4 | Oi, Obrigado, Como você está |
| Aplicativos | 2 | WhatsApp, Edge |
| Janelas | 3 | Fechar, Minimizar, Maximizar |
| Navegador | 3 | Nova aba, Fechar aba, Atualizar |
| Clipboard | 2 | Copiar, Colar |
| Arquivos | 1 | Salvar |
| Dinâmicos | 2 | Escrever, Pressionar |
| **Total** | **17+** | Comandos base + infinitas variações |

---

## 🌍 Suporte Bilíngue

Todos os comandos principais funcionam em:
- 🇧🇷 **Português (PT-BR)**
- 🇺🇸 **Inglês (EN)**

Você pode alternar entre idiomas naturalmente durante o uso!

---

## 🆘 Problemas Comuns

### "Comando não reconhecido"
- Verifique se falou exatamente como na lista
- Tente a variação em inglês
- Fale mais devagar e claramente

### "Erro ao conectar"
- Certifique-se que o backend Python está rodando
- Verifique se está na porta 5000

### Microfone não funciona
- Permita acesso ao microfone no navegador
- Use Chrome ou Edge para melhor compatibilidade

---

**Última atualização:** 2024
**Versão:** 2.0 - Agora com Jarvis! 🤖