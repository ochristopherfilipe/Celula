import random
import tkinter as tk
from datetime import datetime, timedelta
import calendar

def fazer_designacoes():
    tarefas = ["Quebra-gelo", "Louvores", "Edificação", "Cadeira da benção", "Compartilhando a Visão", "Lanche"]
    pessoas = input_pessoas.get().split(",")
    lideres_edificacao = input_lideres.get().split(",")
    pessoas = [p.strip() for p in pessoas]
    lideres_edificacao = [l.strip() for l in lideres_edificacao]
    designacoes = {}
    
    # Obter as próximas 4 datas de sábado a partir do sábado atual
    hoje = datetime.now()
    sabados = [hoje + timedelta(days=(5 - hoje.weekday()) % 7 + i*7) for i in range(4)]
    
    for sabado in sabados:
        designacoes[sabado.date()] = {}
        pessoas_designadas = set()
        for tarefa in tarefas:
            designacoes[sabado.date()][tarefa] = None
            if tarefa == "Edificação":
                pessoa = random.choice(lideres_edificacao)
                designacoes[sabado.date()][tarefa] = pessoa
                pessoas_designadas.add(pessoa)
            else:
                pessoa_disponivel = False
                while not pessoa_disponivel:
                    pessoa = random.choice(pessoas)
                    if pessoa not in pessoas_designadas:
                        designacoes[sabado.date()][tarefa] = pessoa
                        pessoas_designadas.add(pessoa)
                        pessoa_disponivel = True
    
    resultado.config(state=tk.NORMAL)
    resultado.delete('1.0', tk.END)
    for sabado, designacao in designacoes.items():
        resultado.insert(tk.END, f"{sabado.strftime('%d/%m/%Y')}:\n")
        for tarefa, pessoa in designacao.items():
            resultado.insert(tk.END, f"{tarefa}: {pessoa}\n")
        resultado.insert(tk.END, "\n")
    resultado.config(state=tk.DISABLED)

janela = tk.Tk()
janela.title("Designação de tarefas")
janela.geometry("430x700")

titulo = tk.Label(janela, text="Designação de tarefas", font=("Arial", 14))
titulo.pack(pady=10)

input_pessoas = tk.Entry(janela, width=30)
input_pessoas.pack(pady=5)
label_pessoas = tk.Label(janela, text="Digite os nomes dos membros, separados por vírgula")
label_pessoas.pack()

input_lideres = tk.Entry(janela, width=30)
input_lideres.pack(pady=5)
label_lideres = tk.Label(janela, text="Digite os nomes dos líderes e auxiliares, separados por vírgula")
label_lideres.pack()

botao = tk.Button(janela, text="Designar tarefas", command=fazer_designacoes)
botao.pack(pady=10)

resultado = tk.Text(janela, state=tk.DISABLED)
resultado.pack(pady=10)

janela.mainloop()
