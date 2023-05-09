(() => {
  let deck = [],
    puntosJugador = 0,
    puntosComputadora = 0;
  const tipos = ["C", "D", "H", "S"];
  const tiposEspeciales = ["A", "J", "Q", "K"];

  const mensaje = document.querySelector("#mensaje"),
    btnPedir = document.querySelector("#pedir"),
    btnDetener = document.querySelector("#detener"),
    btnNuevo = document.querySelector("#nuevo"),
    puntajeJugador = document.querySelector("#jugador"),
    puntajeComputadora = document.querySelector("#computadora"),
    divisorJugador = document.querySelector("#cartas-jugador"),
    divisorComputadora = document.querySelector("#cartas-computadora");

  btnNuevo.style.display = "none";
  btnDetener.style.display = "none";
  /*Crear el deck*/
  (() => {
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    for (let tipo of tipos) {
      for (let esp of tiposEspeciales) {
        deck.push(esp + tipo);
      }
    }
    deck = _.shuffle(deck);
  })();

  /*Pedir Carta */
  const pedirCarta = () => {
    if (deck.length <= 0) {
      throw "No hay mas cartas en el mazo";
    }
    return deck.splice(0, 1)[0];
  };

  const valorCarta = (carta) => {
    const cartaFinal = carta.substring(0, carta.length - 1);
    let puntos = 0;
    isNaN(cartaFinal)
      ? cartaFinal === "A"
        ? (puntos = 11)
        : (puntos = 10)
      : (puntos = cartaFinal * 1);
    return puntos;
  };

  const turnoComputadora = (puntosJugadorConseguidos) => {
    btnNuevo.style.display = "inline-block";
    btnDetener.style.display = "none";
    btnPedir.style.display = "none";
    do {
      const carta = pedirCarta();
      const valor = valorCarta(carta);
      puntosComputadora += valor;
      puntajeComputadora.innerText = puntosComputadora;
      const imgCarta = document.createElement("img");
      imgCarta.classList.add("carta");
      imgCarta.src = `assets/cartas/${carta}.png`;
      divisorComputadora.append(imgCarta);

      if (puntosJugadorConseguidos > 21) {
        break;
      }
    } while (
      puntosComputadora < puntosJugadorConseguidos &&
      puntosComputadora <= 21
    );

    if (
      (puntosJugadorConseguidos > puntosComputadora &&
        puntosJugadorConseguidos <= 21) ||
      puntosComputadora > 21
    ) {
      mensaje.style.display = "block";
    } else if (
      (puntosComputadora > puntosJugadorConseguidos &&
        puntosComputadora <= 21) ||
      puntosJugadorConseguidos > 21
    ) {
      mensaje.textContent = "Perdiste!";
      mensaje.style.color = "red";
      mensaje.style.display = "block";
    } else if (puntosComputadora === puntosJugadorConseguidos) {
      mensaje.textContent = "Empate!";
      mensaje.style.color = "black";
      mensaje.style.textShadow = "4px 4px 1px white";
      mensaje.style.display = "block";
    }
  };

  btnPedir.addEventListener("click", () => {
    btnDetener.style.display = "inline-block";
    btnNuevo.style.display = "none";
    const carta = pedirCarta();
    const valor = valorCarta(carta);
    puntosJugador += valor;
    puntajeJugador.innerText = puntosJugador;
    const imgCarta = document.createElement("img");
    imgCarta.classList.add("carta");
    imgCarta.src = `assets/cartas/${carta}.png`;
    divisorJugador.append(imgCarta);

    if (puntosJugador >= 21) {
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener("click", () => {
    turnoComputadora(puntosJugador);
  });

  btnNuevo.addEventListener("click", () => {
    location.reload();
    btnNuevo.style.display = "inline-block";
  });
})();
