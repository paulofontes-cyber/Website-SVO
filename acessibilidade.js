// Funções para controlar o tamanho do texto do site
function aumentarTexto() {
  // Obter o tamanho atual do texto do documento (ou usar padrão)
  let currentSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
  
  // Aumentar em 2px, até um limite máximo (por exemplo, 24px)
  if (currentSize < 24) {
    let newSize = currentSize + 2;
    document.documentElement.style.fontSize = newSize + "px";
    
    // Salvar a preferência do usuário no localStorage
    localStorage.setItem('tamanhoFonte', newSize);
    
    // Atualizar o indicador visual
    atualizarIndicadorTamanhoFonte(newSize);
  }
}

function diminuirTexto() {
  // Obter o tamanho atual do texto do documento
  let currentSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
  
  // Diminuir em 2px, até um limite mínimo (por exemplo, 12px)
  if (currentSize > 12) {
    let newSize = currentSize - 2;
    document.documentElement.style.fontSize = newSize + "px";
    
    // Salvar a preferência do usuário no localStorage
    localStorage.setItem('tamanhoFonte', newSize);
    
    // Atualizar o indicador visual
    atualizarIndicadorTamanhoFonte(newSize);
  }
}

function resetarTexto() {
  // Restaurar para o tamanho padrão (16px)
  document.documentElement.style.fontSize = "16px";
  
  // Remover a preferência do localStorage
  localStorage.removeItem('tamanhoFonte');
  
  // Atualizar o indicador visual
  atualizarIndicadorTamanhoFonte(16);
}

function atualizarIndicadorTamanhoFonte(tamanho) {
  // Atualizar o texto do indicador de tamanho da fonte
  const indicador = document.getElementById('tamanho-fonte-atual');
  if (indicador) {
    indicador.textContent = tamanho + 'px';
  }
}

// Função para aplicar o tamanho de fonte salvo quando a página carrega
function aplicarTamanhoFonteSalvo() {
  const tamanhoSalvo = localStorage.getItem('tamanhoFonte');
  if (tamanhoSalvo) {
    document.documentElement.style.fontSize = tamanhoSalvo + "px";
    atualizarIndicadorTamanhoFonte(tamanhoSalvo);
  }
}

// Função para mostrar/ocultar o controle de acessibilidade
function toggleControlesFonte() {
  const controles = document.getElementById('controles-acessibilidade');
  controles.classList.toggle('mostrar');
}

// Adicionar os event listeners quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
  // Aplicar o tamanho de fonte salvo
  aplicarTamanhoFonteSalvo();
  
  // Adicionar listeners para os botões
  document.getElementById('btn-aumentar-fonte').addEventListener('click', aumentarTexto);
  document.getElementById('btn-diminuir-fonte').addEventListener('click', diminuirTexto);
  document.getElementById('btn-resetar-fonte').addEventListener('click', resetarTexto);
  document.getElementById('toggle-acessibilidade').addEventListener('click', toggleControlesFonte);
});