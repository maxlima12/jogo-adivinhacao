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
    const leaderboardElement = document.getElementById('leaderboard'); // Elemento HTML onde o leaderboard será exibido
    const btnZerarClassificacao = document.getElementById('btn-zerar-classificacao'); // Botão para zerar a classificação

    let numeroAleatorio;
    let numeroTentativas;
    let players = []; // Array para armazenar os dados dos jogadores

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
                tentativas.textContent = numeroTentativas;
                savePlayer(nomeJogador.textContent, numeroTentativas); // Salva o jogador no leaderboard
                updateLeaderboard(); // Atualiza o leaderboard na interface
            } else if (palpite < numeroAleatorio) {
                feedback.textContent = "Tente um número maior.";
            } else {
                feedback.textContent = "Tente um número menor.";
            }
        } else {
            alert('Por favor, digite um número entre 1 e 100.');
        }
        inputPalpite.value = '';
    });

    // Função para salvar jogador no leaderboard
    function savePlayer(name, score) {
        players.push({ name, score });
        players.sort((a, b) => a.score - b.score); // Ordena do menor para o maior número de tentativas
        localStorage.setItem('players', JSON.stringify(players));
    }

    // Função para carregar jogadores do armazenamento local
    function loadPlayers() {
        let playersData = localStorage.getItem('players');
        if (playersData) {
            players = JSON.parse(playersData);
        }
    }

    // Função para atualizar o leaderboard na interface
    function updateLeaderboard() {
        loadPlayers();
        leaderboardElement.innerHTML = '';
        players.forEach((player, index) => {
            let listItem = document.createElement('li');
            listItem.innerHTML = `<span>${index + 1}.</span> ${player.name} - ${player.score} tentativas`;
            leaderboardElement.appendChild(listItem);
        });
    }

    // Evento de clique no botão "Jogar Novamente"
    btnJogarNovamente.addEventListener('click', function() {
        mostrarTela(telaBoasVindas);
        inputNome.value = '';
        feedback.textContent = '';
    });

    // Evento de clique no botão "Zerar Classificação"
    btnZerarClassificacao.addEventListener('click', function() {
        localStorage.removeItem('players'); // Remove os dados do leaderboard do armazenamento local
        players = []; // Limpa a variável players
        updateLeaderboard(); // Atualiza o leaderboard na interface (agora vazio)
    });
});
