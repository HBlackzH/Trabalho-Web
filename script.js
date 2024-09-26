var personagens = {
    Zeus: {
        descricao: "Zeus é o deus do trovão, conhecido por sua força e sabedoria.",
        imagem: "img/zeus.jpg"
    },
    Poseidon: {
        descricao: "Poseidon é o deus do mar, famoso por sua bravura e domínio sobre as águas.",
        imagem: "img/poseidon.jpg"
    }
};

var perguntas = [
    {
        pergunta: "Qual é o seu passatempo favorito?",
        opcoes: [
            { texto: "Ler Livros", pontos: { Zeus: 3, Poseidon: 1 } },
            { texto: "Treinar", pontos: { Zeus: 1, Poseidon: 3 } }
        ]
    },
    {
        pergunta: "Como você reage diante de um desafio?",
        opcoes: [
            { texto: "Refletir e encontrar uma solução inteligente", pontos: { Zeus: 3, Poseidon: 1 } },
            { texto: "Agir rapidamente e enfrentar o desafio de frente", pontos: { Zeus: 1, Poseidon: 3 } }
        ]
    },
    {
        pergunta: "Qual tipo de lugar você prefere para relaxar?",
        opcoes: [
            { texto: "No seu Quarto", pontos: { Zeus: 3, Poseidon: 1 } },
            { texto: "Uma praia", pontos: { Zeus: 1, Poseidon: 3 } }
        ]
    },
    {
        pergunta: "Como você se descreveria?",
        opcoes: [
            { texto: "Inteligente e pesativo", pontos: { Zeus: 3, Poseidon: 1 } },
            { texto: "Corajoso e Ousado", pontos: { Zeus: 1, Poseidon: 3 } }
        ]
    },
    {
        pergunta: "Qual é o seu tipo de comida favorita?",
        opcoes: [
            { texto: "Comidas ricas", pontos: { Zeus: 3, Poseidon: 1 } },
            { texto: "Pratos frescos", pontos: { Zeus: 1, Poseidon: 3 } }
        ]
    },
    {
        pergunta: "O que você faz quando tem tempo livre?",
        opcoes: [
            { texto: "Estudo ou leio", pontos: { Zeus: 3, Poseidon: 1 } },
            { texto: "Gosto de sair", pontos: { Zeus: 1, Poseidon: 3 } }
        ]
    },
    {
        pergunta: "Qual é o seu animal de estimação ideal?",
        opcoes: [
            { texto: "Uma Ave", pontos: { Zeus: 3, Poseidon: 1 } },
            { texto: "Um Peixe", pontos: { Zeus: 1, Poseidon: 3 } }
        ]
    },
    {
        pergunta: "Qual é a sua abordagem em um conflito?",
        opcoes: [
            { texto: "Tentar negociar e encontrar uma solução pacífica", pontos: { Zeus: 3, Poseidon: 1 } },
            { texto: "Enfrentar o problema diretamente", pontos: { Zeus: 1, Poseidon: 3 } }
        ]
    },
    {
        pergunta: "Qual é o seu elemento favorito?",
        opcoes: [
            { texto: "Fogo", pontos: { Zeus: 3, Poseidon: 1 } },
            { texto: "Água", pontos: { Zeus: 1, Poseidon: 3 } }
        ]
    },
    {
        pergunta: "Qual é o seu objetivo de vida?",
        opcoes: [
            { texto: "Ser Rico", pontos: { Zeus: 3, Poseidon: 1 } },
            { texto: "Viajar pelo Mundo", pontos: { Zeus: 1, Poseidon: 3 } }
        ]
    }
];

var perguntaAtual = 0;
var pontuacoes = { Zeus: 0, Poseidon: 0 };

document.getElementById("botao-iniciar").onclick = function() {
    document.getElementById("inicio-quiz").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    exibirPergunta();
};

function exibirPergunta() {
    var elementoPergunta = document.getElementById("pergunta");
    var elementoOpcoes = document.getElementById("opcoes");

    var atual = perguntas[perguntaAtual];
    elementoPergunta.textContent = atual.pergunta;
    elementoOpcoes.innerHTML = "";

    for (var i = 0; i < atual.opcoes.length; i++) {
        var botao = document.createElement("button");
        botao.textContent = atual.opcoes[i].texto;
        botao.setAttribute('data-zeus', atual.opcoes[i].pontos.Zeus);
        botao.setAttribute('data-poseidon', atual.opcoes[i].pontos.Poseidon);

        botao.onclick = function() {
            lidarComResposta(this);
        };
        elementoOpcoes.appendChild(botao);
    }

    document.getElementById("botao-proximo").style.display = "none";
}

function lidarComResposta(botao) {
    pontuacoes.Zeus += parseInt(botao.getAttribute('data-zeus'));
    pontuacoes.Poseidon += parseInt(botao.getAttribute('data-poseidon'));

    document.getElementById("botao-proximo").style.display = "block";
    document.getElementById("botao-proximo").onclick = proximaPergunta;
}

function proximaPergunta() {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        exibirPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    document.getElementById("quiz-container").style.display = "none";
    var elementoResultado = document.getElementById("resultado");
    elementoResultado.style.display = "block";

    var personagem;
    if (pontuacoes.Zeus > pontuacoes.Poseidon) {
        personagem = "Zeus";
    } else if (pontuacoes.Poseidon > pontuacoes.Zeus) {
        personagem = "Poseidon";
    } else {
        elementoResultado.innerHTML = "Você é equilibrado entre os dois personagens!";
        return;
    }

    var infoPersonagem = personagens[personagem];
    elementoResultado.innerHTML = `
        <h2>Você seria ${personagem}!</h2>
        <img src="${infoPersonagem.imagem}" alt="${personagem}" class="imagem-personagem">
        <p><strong>Pontuação:</strong> ${pontuacoes[personagem]}</p>
        <p>${infoPersonagem.descricao}</p>
        <button id="botao-reiniciar">Redefinir Respostas</button>
    `;

    document.getElementById("botao-reiniciar").onclick = reiniciarQuiz;
}

function reiniciarQuiz() {
    perguntaAtual = 0;
    pontuacoes = { Zeus: 0, Poseidon: 0 };
    document.getElementById("resultado").style.display = "none";
    document.getElementById("inicio-quiz").style.display = "block";
}
