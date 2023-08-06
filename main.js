const btnDesignarTarefas = document.getElementById("btnDesignarTarefas");

    btnDesignarTarefas.addEventListener("click", function() {
      fazerDesignacoes()
    })

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function fazerDesignacoes() {
  const tarefas = ["Quebra-gelo", "Louvores", "Edificação", "Cadeira da benção", "Compartilhando a Visão"];
  const lideresInput = document.getElementById("input_lideres").value.trim();
  const pessoasInput = document.getElementById("input_pessoas").value.trim();


  // Verifica se os campos estão preenchidos
  if (pessoasInput === "" || lideresInput === "") {
    alert("Por favor, preencha os campos com os nomes das pessoas e dos líderes de edificação.");
    return;
  }

  const pessoas = pessoasInput.split(/[,\n]| e /).map(p => p.trim());
  const lideresEdificacao = lideresInput.split(/[,\n]| e /).map(l => l.trim());

  shuffleArray(pessoas);
  shuffleArray(lideresEdificacao);

  const designacoes = {};

  for (const tarefa of tarefas) {
    if (pessoas.length > 0){
      if (tarefa === "Edificação") {
        if (lideresEdificacao.length > 0) {
          designacoes[tarefa] = lideresEdificacao.pop();
        } else {
          designacoes[tarefa] = pessoas.pop();
        }
      } else {
        designacoes[tarefa] = pessoas.pop();
      }
    } else {
      designacoes[tarefa] = lideresEdificacao.pop();
    }
}
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "";

  const resultado = document.createElement("p");

  for (const tarefa in designacoes) {
    resultado.innerHTML += `${tarefa}: ${designacoes[tarefa]}<br>`;
  }

  resultadoDiv.appendChild(resultado);
}
