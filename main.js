function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function fazerDesignacoes() {
  const tarefas = ["Quebra-gelo", "Louvores", "Edificação", "Cadeira da benção", "Compartilhando a Visão"];
  const pessoas = new Set(document.getElementById("input_pessoas").value.split(/[,\n]| e /).map(p => p.trim()));
  const lideresEdificacao = new Set(document.getElementById("input_lideres").value.split(/[,\n]| e /).map(l => l.trim()));
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "";

  const todasAsPessoas = new Set([...pessoas, ...lideresEdificacao]);
  const pessoasArray = [...todasAsPessoas];
  shuffleArray(pessoasArray);

  const designacoes = {};

  for (const tarefa of tarefas) {
    designacoes[tarefa] = null;
    if (tarefa === "Edificação") {
      while (true) {
        const pessoa = pessoasArray.pop();
        if (lideresEdificacao.has(pessoa)) {
          designacoes[tarefa] = pessoa;
          break;
        }
      }
    } else {
      while (true) {
        const pessoa = pessoasArray.pop();
        if (pessoas.has(pessoa)) {
          designacoes[tarefa] = pessoa;
          break;
        }
      }
    }
  }

  const resultado = document.createElement("p");

  for (const tarefa in designacoes) {
    resultado.innerHTML += `${tarefa}: ${designacoes[tarefa]}<br>`;
  }

  resultadoDiv.appendChild(resultado);
}