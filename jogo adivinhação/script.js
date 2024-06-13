document.addEventListener("DOMContentLoaded", function() {
    const telaBoasVindas = document.getElementById('tela-boas-vindas');
    const telaJogo = document.getElementById('tela-jogo');
    const telaResultado = document.getElementById('tela-resultado');
    const formNome = document.getElementById('form-nome');
    const inputNome = document.getElementById('input-nome');
    const btnJogar = document.getElementById('btn-jogar');
    const nomeJogador = document.getElementById('nome-jogador');
    const inputPalpite = document.getElementById('input-palpite');
    const btnAdivinhar = document.getElementById('btn-adivinhar');
    const feedback = document.getElementById('feedback');
    const nomeVencedor = document.getElementById('nome-vencedor');
    const numeroCorreto = document.getElementById('numero-correto');
    const tentativas = document.getElementById('tentativas');
    const btnJogarNovamente = document.getElementById('btn-jogar-novamente');

    let numeroAleatorio;
    let numeroTentativas;

    // Função para gerar um número aleatório entre 1 e 100
    function gerarNumeroAleatorio() {
        numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    }

    // Função para mostrar uma tela específica e ocultar as outras
    function mostrarTela(tela) {
        const telas = [telaBoasVindas, telaJogo, telaResultado];
        telas.forEach(t => {
            if (t === tela) {
                t.classList.add('ativa');
            } else {
                t.classList.remove('ativa');
            }
        });
    }

    // Evento de envio do formulário de nome
    formNome.addEventListener('submit', function(event) {
        event.preventDefault();
        if (inputNome.value.trim() !== '') {
            nomeJogador.textContent = inputNome.value.trim();
            gerarNumeroAleatorio();
            numeroTentativas = 0;
            mostrarTela(telaJogo);
        } else {
            alert('Por favor, digite seu nome.');
        }
    });

    // Evento de clique no botão "Adivinhar"
    btnAdivinhar.addEventListener('click', function() {
        const palpite = parseInt(inputPalpite.value);
        if (palpite >= 1 && palpite <= 100) {
            numeroTentativas++;
            if (palpite === numeroAleatorio) {
                mostrarTela(telaResultado);
                nomeVencedor.textContent = inputNome.value.trim();
                numeroCorreto.textContent = numeroAleatorio;
                tentativas.textContent = numeroTentativas;FF
            } else if (palpite < numeroAleatorio) {
                feedback.textContent = "Tente um número maior.";
            } else {
                feedback.textContent = "Tente um número menor.";
            }
        } else {
            alert('Por favor, digite um número entre 1 e 100.');
        }
    });

    // Evento de clique no botão "Jogar Novamente"
    btnJogarNovamente.addEventListener('click', function() {
        mostrarTela(telaBoasVindas);
        inputNome.value = '';
        feedback.textContent = '';
    });
});