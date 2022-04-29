const pergunta = document.getElementsByClassName("box__title");
const btns = [...document.querySelectorAll(".box__btn-resp")];
const btnAvançar = document.getElementsByClassName("box__control-btn")[0];
const btnReiniciar = document.getElementsByClassName("box__control-btn")[1];
let acerto = 0;

/* Estarei usando esse array, para reprensentar os index em que estão os objetos no array de objetos, 
 e assim conseguir randomizar a ordem com que aparecem no quiz.*/
const indexRandom = [0, 1, 2, 3, 4, 5, 6];

const quiz = [
  {
    q: "Qual time foi Campeão da UEFA Champions League de 2003?",
    a: [
      { text: "Barcelona", soluçao: false },
      { text: "Real Madrid", soluçao: false },
      { text: "Milan", soluçao: true },
      { text: "Porto", soluçao: false },
    ],
  },
  {
    q: "Quem foi eleito o melhor jogador do mundo em 2018?",
    a: [
      { text: "Messi", soluçao: false },
      { text: "Cristiano Ronaldo", soluçao: false },
      { text: "Mbappe", soluçao: false },
      { text: "Luka Modric", soluçao: true },
    ],
  },
  {
    q: "Quem foi eleito o melhor jogador do mundo em 1999?",
    a: [
      { text: "Rivaldo", soluçao: true },
      { text: "Ronaldo", soluçao: false },
      { text: "Zidane", soluçao: false },
      { text: "Romário", soluçao: false },
    ],
  },
  {
    q: "Qual a data prevista para o primeiro jogo da Copa do Mundo do Catar?",
    a: [
      { text: "11/11", soluçao: false },
      { text: "15/11", soluçao: false },
      { text: "21/11", soluçao: true },
      { text: "5/11", soluçao: false },
    ],
  },
  {
    q: "Qual seleção foi campeã da Copa do Mundo de 2006, sediada na Alemanha?",
    a: [
      { text: "Itália", soluçao: true },
      { text: "França", soluçao: false },
      { text: "Holanda", soluçao: false },
      { text: "Espanha", soluçao: false },
    ],
  },
  {
    q: "Qual time venceu a Libertadores da América, no ano de 2011?",
    a: [
      { text: "Santos", soluçao: true },
      { text: "River Plate", soluçao: false },
      { text: "Boca Juniors", soluçao: false },
      { text: "Corinthians", soluçao: false },
    ],
  },
  {
    q: "Qual time venceu a Copa do Brasil, no ano de 2012?",
    a: [
      { text: "Corinthians", soluçao: false },
      { text: "Santos", soluçao: false },
      { text: "Cruzeiro", soluçao: false },
      { text: "Palmeiras", soluçao: true },
    ],
  },
];

function questions(x) {
  pergunta[0].textContent = quiz[x].q;

  btns[0].textContent = quiz[x].a[0].text;
  btns[1].textContent = quiz[x].a[1].text;
  btns[2].textContent = quiz[x].a[2].text;
  btns[3].textContent = quiz[x].a[3].text;

  btns[0].value = quiz[x].a[0].soluçao;
  btns[1].value = quiz[x].a[1].soluçao;
  btns[2].value = quiz[x].a[2].soluçao;
  btns[3].value = quiz[x].a[3].soluçao;
}

function obtendoResultado() {
  {
    btns.forEach(
      (btn) =>
        (btn.onclick = (e) => {
          btns.forEach((_btn) =>
            _btn.value == "false"
              ? (_btn.style.background = "rgba(255, 50, 50, 0.9)")
              : (_btn.style.background = "rgba(61, 211, 71")
          );
          e.target.value == "false"
            ? (e.target.style.background = "rgba(255, 50, 50, 0.9)") &&
              (e.target.style.borderBottom = "thick solid #2b2930") &&
              acertos(0)
            : (e.target.style.background = "rgba(61, 211, 71)") &&
              (e.target.style.borderBottom = "thick solid #2b2930") &&
              acertos(1);
        })
    );
  }
}

function obtendoIdAleatorio() {
  for (let i = indexRandom.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = indexRandom[i];
    indexRandom[i] = indexRandom[j];
    indexRandom[j] = temp;
  }
  const id = indexRandom.shift();

  questions(id);
}

btnAvançar.addEventListener("click", function () {
  obtendoIdAleatorio();
  btns.forEach((btn) => {
    btn.style.backgroundColor = "rgba(41, 16, 88, 0.5)";
    btn.style.borderBottom = "none";
    btn.disabled = false;
  });
  btns.disabled = false;
});

function acertos(y) {
  acerto = acerto + y;
  if (indexRandom.length == 0) {
    pergunta[0].textContent = `Você acertou ${acerto} de ${7}`;
  }
  /*   Uma vez que essa funçao em ad, irei usá-la para desativar os botões até que se avance para a próxima pergunta ou reinicie o quiz */
  btns.forEach((btn) => {
    btn.disabled = true;
  });
}

btnReiniciar.addEventListener("click", () => {
  const newArray = [0, 1, 2, 3, 4, 5, 6];
  if (indexRandom.length < quiz.length) {
    indexRandom.length = 0;
    if (indexRandom.length == 0) {
      indexRandom.unshift(...newArray);
    }
  }
  obtendoIdAleatorio();
  acerto = 0;
  btns.forEach((btn) => {
    btn.style.backgroundColor = "rgba(41, 16, 88, 0.5)";
    btn.style.borderBottom = "none";
    btn.disabled = false;
  });
});

console.log(obtendoIdAleatorio());

console.log(indexRandom.length);
