const palabras = [
    "algoritmo", "binario", "CPU", "RAM", "ROM", "hardware", "software", "base de datos", "compilador",
    "interfaz", "kernel", "API", "nube", "servidor", "cliente", "firewall", "protocolo", "encriptacion", 
    "red", "router", "switch", "IP", "ethernet", "host", "IPV6", "dominio", "DNS", "gateway", "latencia", "ping", "puerto",
    "JSON", "XML", "HTML", "CSS", "JavaScript", "bash", "Linux", "Windows", "macOS", "Android", "iOS", "archivo", "directorio"
];

let palabraSecreta = '';
let intentosRestantes = 6;
let letrasAdivinadas = [];
let letrasErroneas = [];

function seleccionarPalabra() {
  let indiceAleatorio = Math.floor(Math.random() * palabras.length);
  palabraSecreta = palabras[indiceAleatorio];
}

function mostrarPalabra() {
  let palabraMostrada = '';
  for (let letra of palabraSecreta) {
    palabraMostrada += letrasAdivinadas.includes(letra) ? letra + ' ' : '_ ';
  }
  document.getElementById('palabraSecreta').textContent = palabraMostrada.trim();
}

function adivinarLetra() {
  let inputLetra = document.getElementById('inputLetra').value.toLowerCase();
  document.getElementById('inputLetra').value = '';

  if (inputLetra && !letrasAdivinadas.includes(inputLetra) && !letrasErroneas.includes(inputLetra)) {
    if (palabraSecreta.includes(inputLetra)) {
      letrasAdivinadas.push(inputLetra);
    } else {
      letrasErroneas.push(inputLetra);
      intentosRestantes--;
    }
    actualizarMuñeco();
  }
  mostrarPalabra();
  verificarEstadoJuego();
}

function actualizarMuñeco() {
  let partesMuñeco = ['cabeza', 'cuerpo', 'brazo-izq', 'brazo-der', 'pierna-izq', 'pierna-der'];
  
  partesMuñeco.forEach((parte, index) => {
    let parteElemento = document.querySelector(`.${parte}`);
    if (index < (6 - intentosRestantes)) {
        // Mostrar parte del cuerpo
      parteElemento.style.opacity = '1'; 
    } else {
        // Ocultar parte del cuerpo
      parteElemento.style.opacity = '0.1'; 
    }
  });

  document.getElementById('intentos').textContent = intentosRestantes;
}

function verificarEstadoJuego() {
  if (intentosRestantes === 0) {
    document.getElementById('mensaje').textContent = `¡Has perdido! La palabra era: ${palabraSecreta}`;
    bloquearInput();
  } else if (palabraSecreta.split('').every(letra => letrasAdivinadas.includes(letra))) {
    document.getElementById('mensaje').textContent = '¡Felicidades, has ganado!';
    bloquearInput();
  }
}

function bloquearInput() {
  document.getElementById('inputLetra').disabled = true;
}

function reiniciarJuego() {
  intentosRestantes = 6;
  letrasAdivinadas = [];
  letrasErroneas = [];
  document.getElementById('mensaje').textContent = '';
  document.getElementById('inputLetra').disabled = false;

  let partesMuñeco = document.querySelectorAll('.parte-cuerpo');
  partesMuñeco.forEach(parte => parte.style.opacity = '0.1');

  seleccionarPalabra();
  mostrarPalabra();
  actualizarMuñeco();
}

reiniciarJuego();

