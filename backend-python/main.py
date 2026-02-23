from flask import Flask, request, jsonify
from flask_cors import CORS
import pyautogui as py
import json
import unicodedata
import re

app = Flask(__name__)
CORS(app)

def normalize_text(text):
    text = unicodedata.normalize('NFD', text)
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    text = re.sub(r'[^\w\s]', '', text)
    return ' '.join(text.split()).lower()

def load_commands():
    with open('voice_commands.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def execute_command(keys, delay=0.2):
    import time
    if len(keys) == 1:
        py.press(keys[0])
    elif len(keys) == 2:
        if keys[0] == 'win':
            # Se o segundo elemento for uma seta, usa hotkey
            if keys[1] in ['up', 'down', 'left', 'right']:
                py.hotkey('win', keys[1])
            # Caso contrário, abre app
            else:
                py.press('win')
                time.sleep(delay)
                py.write(keys[1])
                time.sleep(delay)
                py.press('enter')
        else:
            py.hotkey(*keys)
    else:
        py.hotkey(*keys)
    time.sleep(0.1)

@app.route("/execute", methods=["POST"])
def execute():
    data = request.json
    text = normalize_text(data.get('text', ''))
    config = load_commands()
    
    wake_word = normalize_text(config['wake_word'])
    
    # Se não há wake word, processa diretamente
    if not wake_word or wake_word in text or wake_word == "":
        for cmd in config['commands']:
            sentences = cmd['sentence'] if isinstance(cmd['sentence'], list) else [cmd['sentence']]
            for sentence in sentences:
                cmd_normalized = normalize_text(sentence)
                
                if cmd.get('type') == 'dynamic' and cmd_normalized in text:
                    text_to_process = text.split(cmd_normalized, 1)[1].strip()
                    if text_to_process:
                        # Se for comando de pressionar tecla
                        if cmd['action'] == 'press_key':
                            py.press(text_to_process)
                        # Se for comando de escrever
                        else:
                            py.write(text_to_process)
                        return jsonify({"status": "executed", "command": cmd['action'], "speech": cmd.get('speak', '')})
                
                elif cmd_normalized in text:
                    # Se for comando sem execução (apenas fala)
                    if cmd.get('no_execute'):
                        return jsonify({"status": "executed", "command": cmd['action'], "speech": cmd.get('speak', '')})
                    
                    execute_command(cmd['keys'], cmd.get('delay', 0.2))
                    return jsonify({"status": "executed", "command": cmd['action'], "speech": cmd.get('speak', '')})
        
        return jsonify({"status": "no_command"})
    
    return jsonify({"status": "no_wake_word"})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
