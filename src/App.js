import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [numeroAtual, setNumeroAtual] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);


  //função para pegar o número aleatório gerado do php e atualizar o estado do
  //número aleatório e inicar a animação desse número
  const gerarNumeroAleatorio = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const response = await fetch('http://localhost/numero-aleatorio/src/back/index.php');
    const data = await response.json();
    setNumeroAtual(data.numero);
    animateNumber(data.numero);
  };


  //função para animação gradual como transição do 0 até o numero aleatório
  const animateNumber = (numero) => {
    const duracaoAnimacao = 700;
    const intervalo = 10;
    const etapas = duracaoAnimacao / intervalo;
    const valorEtapas = numero / etapas;
    let contador = 0;

    const animationInterval = setInterval(() => {
      contador++;
      setNumeroAtual(Math.floor(valorEtapas * contador));

      if (contador >= etapas) {
        clearInterval(animationInterval);
        setNumeroAtual(numero);
        setIsAnimating(false);
      }
    }, intervalo);
  };


  //função para enviar pro salvar_numero.php pra la ele salvar o número no arquivo
  //numeros_salvos.txt
  const salvarNumero = async () => {
    if (numeroAtual !== null) {
      await fetch('http://localhost/numero-aleatorio/src/back/salvar_numero.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numero: numeroAtual })
      });
    }
  };


  //função para mudar a classe da div numberContainer para mudar a cor do texto dentro dele
  //COM BASE NO NÚMERO ATUAL, pq se fizer com base no número aleatório da um bug sincero
  //nas cores
  useEffect(() => {
    if (numeroAtual !== null) {
      const numeroClasse =
        numeroAtual < 51 ? 'numero-verde' :
        numeroAtual > 50 && numeroAtual <= 70 ? 'numero-amarelo' :
        'numero-vermelho';

      const numberContainer = document.getElementById('numberContainer');
      numberContainer.className = numeroClasse;
    }
  }, [numeroAtual]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Geração de Número Aleatório:</h2>
        <button onClick={gerarNumeroAleatorio} className='btn1' disabled={isAnimating}>
          {isAnimating ? 'Gerando...' : 'Gerar Número Aleatório'}
        </button>
        <div id='numberContainer'>
         <p>{numeroAtual !== null ? numeroAtual : 'Clique no botão para gerar'}</p>
        </div>
        <button onClick={salvarNumero} disabled={isAnimating} className='btn2'>Salvar Número</button>
      </header>
    </div>
  );
}

export default App;
