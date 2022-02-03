var prompt = require("prompt-sync")();

// ASCII 
const jokenpo = ` 
     _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)    

    _______
---'   ____)____
          ______)
          _______)
         _______)
---.__________)

    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
                                 `;

// vetor com opções para a escolha aleatória do pc e também para validação de entradas
const escolhas = ["pedra", "papel", "tesoura"];
// objeto com o placar
let respostas = {
	usuario: 0,
	software: 0,
};
// função que permite o pc escolher de forma aleatória um elemento do array escolhas
function escolhaPc(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
// função que verifica o resultado das escolhas
function verificaResultado(usuario, pc, placar) {
	let score = `Você escolheu ${usuario} e o software escolheu ${pc}.
    Você ganhou!`;
	if (usuario === pc) {
		console.log(`Você escolheu ${usuario} e o software escolheu ${pc}.
        Empate!`);
	} else if (usuario === "pedra" && pc === "tesoura") {
		console.log(score);
		placar.usuario += 1;
	} else if (usuario === "tesoura" && pc === "papel") {
		console.log(score);
		placar.usuario += 1;
	} else if (usuario === "papel" && pc === "pedra") {
		console.log(score);
		placar.usuario += 1;
	} else {
		console.log(`Você escolheu ${usuario} e o software escolheu ${pc}.
        Você perdeu!`);
		placar.software += 1;
	}
}
// função que pede o número de rodadas, valida a entrada do usuário e mostra quantos pontos cada um marcou 
function rodadas() {
	console.clear();
    console.log("Bem-Vindos ao Jogo Jokenpô!");
    console.log(jokenpo);
    prompt ("Pressione 'ENTER' para a continuar")
    console.clear();
	let rodadas = +prompt("Entre a quantidade de turnos você deseja jogar: ");
    while(isNaN(rodadas) || rodadas < 1){
        console.log("Entrada Inválida!");
        rodadas = +prompt("Entre um número para determinar a quantidade de rodadas que deseja jogar: ");
    };

	console.clear();
	for (let i = 0; i < rodadas; i++) {
		let escolhaUsuario = prompt(
			`${
				i + 1
			}ª Pergunta: Entre a sua escolha: 'pedra', 'papel' ou 'tesoura': `
		).toLowerCase();
		if (!escolhas.includes(escolhaUsuario)) {
			console.clear();
			console.log("Entrada Inválida!");
			escolhaUsuario = prompt(
				`${
					i + 1
				}ª Pergunta: Entre a sua escolha: 'pedra', 'papel' ou 'tesoura': `
			).toLowerCase();
			console.clear();
			while (!escolhas.includes(escolhaUsuario)) {
				console.clear();
				console.log("Entrada Inválida!");
				escolhaUsuario = prompt(
					`${
						i + 1
					}ª Pergunta: Entre a sua escolha: 'pedra', 'papel' ou 'tesoura': `
				).toLowerCase();
				console.clear();
			}
		}

		let pc = escolhaPc(escolhas);
		verificaResultado(escolhaUsuario, pc, respostas);
		console.log(
			`Você tem ${respostas.usuario} e o software tem ${respostas.software}`
		);
        prompt ("Pressione 'ENTER' para a continuar")
		console.clear();
	}
}
// função determina quem fez mais pontos e portanto foi o campeão do jogo
function resultadoFinal(placar) {
	if (placar.usuario === placar.software) {
		console.log(`Empate em ${placar.usuario} x ${placar.software}`);
	} else if (placar.usuario > placar.software) {
		console.log(
			`Parabéns! Você venceu de ${placar.usuario} x ${placar.software}`
		);
	} else {
		console.log(
			`Sinto muito! Você perdeu para o software de ${placar.usuario} x ${placar.software}`
		);
	}
}
// função que perguntar se o usuário quer jogar de novo e criar um laço que repete o programa caso 'sim'
function jogarNovamente() {
	let seguir = +prompt(
		"Você desejar continuar jogando? Digite 1 = Sim ou 2 = Não: "
	);
	if (seguir === 1) {
		respostas = {
			usuario: 0,
			software: 0,
		};
	} else {
		if (seguir === 2) {
			return;
		}
		while (seguir !== 2 && seguir !== 1) {
			console.log("Entrada Inválida!");
			seguir = +prompt(
				"Você desejar continuar jogando? Digite 1 = Sim ou 2 = Não: "
			);
		}
		if (seguir === 1) {
			rodadas();
			resultadoFinal(respostas);
			jogarNovamente();
		}
		return;
	}
	rodadas();
	resultadoFinal(respostas);
	jogarNovamente();
}
// chamando as funções
rodadas();
resultadoFinal(respostas);
jogarNovamente();
