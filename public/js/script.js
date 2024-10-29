const video = document.getElementById("video");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const options = document.querySelectorAll(".option");

let resultados = {
    logica: 0,
    espacial: 0,
    musical: 0,
    corporal: 0,
    intrapersonal: 0,
    naturalista: 0,
    linguistica: 0,
    interpersonal: 0
};

const guion = [
    {
        tiempo: 10,
        pregunta: "¿Qué haces para encontrar el camino correcto?",
        opciones: [
            { texto: "Seguir las estrellas en línea recta", inteligencia: "logica", puntos: 10 },
            { texto: "Dibujar el patrón en el aire", inteligencia: "espacial", puntos: 10 },
            { texto: "Cantar una melodía que coincide con el patrón", inteligencia: "musical", puntos: 10 }
        ]
    },
    {
        tiempo: 30,
        pregunta: "¿Cuál eliges para cruzar el río de los colores?",
        opciones: [
            { texto: "Elijo el rojo para avanzar con valentía", inteligencia: "corporal", puntos: 10 },
            { texto: "Elijo el azul para cruzar con tranquilidad", inteligencia: "intrapersonal", puntos: 10 },
            { texto: "Elijo el verde porque confío en la naturaleza", inteligencia: "naturalista", puntos: 10 }
        ]
    },
    {
        tiempo: 50,
        pregunta: "Para salir del laberinto, ¿qué haces?",
        opciones: [
            { texto: "Toco las notas siguiendo una escala musical básica", inteligencia: "logica", puntos: 10 },
            { texto: "Escucho atentamente las melodías y las reproduzco", inteligencia: "musical", puntos: 10 },
            { texto: "Uso las melodías como guía y las mezclo con movimientos", inteligencia: "corporal", puntos: 10 }
        ]
    },
    {
        tiempo: 70,
        pregunta: "¿Cuántos palos debes colocar para tener una barricada de 13 palos si ya tienes ocho?",
        opciones: [
            { texto: "Colocar cinco palos más", inteligencia: "logica", puntos: 10 },
            { texto: "Colocar seis palos más", inteligencia: "logica", puntos: 5 },
            { texto: "Colocar cuatro palos más", inteligencia: "logica", puntos: 5 }
        ]
    },
    {
        tiempo: 90,
        pregunta: "¿Cuántos palos debes colocar para tener una barricada de 57 palos si tienes 30?",
        opciones: [
            { texto: "Colocar 27 palos más", inteligencia: "logica", puntos: 10 },
            { texto: "Colocar 25 palos más", inteligencia: "logica", puntos: 5 },
            { texto: "Colocar 28 palos más", inteligencia: "logica", puntos: 5 }
        ]
    },
    {
        tiempo: 110,
        pregunta: "¿Cuántos palos debes colocar para alcanzar una barricada de 63 palos si tienes 89 disponibles?",
        opciones: [
            { texto: "Colocar 63 palos directamente", inteligencia: "logica", puntos: 10 },
            { texto: "Colocar 30 palos", inteligencia: "logica", puntos: 5 },
            { texto: "Colocar 50 palos", inteligencia: "logica", puntos: 5 }
        ]
    },
    {
        tiempo: 130,
        pregunta: "El árbol de los sueños te cuenta una historia sobre un niño que desea ayudar a sus amigos, pero no sabe cómo. ¿Qué consejo le darías?",
        opciones: [
            { texto: "Escuchar a sus amigos primero", inteligencia: "interpersonal", puntos: 10 },
            { texto: "Observar cómo actúan para ayudarlos mejor", inteligencia: "intrapersonal", puntos: 10 },
            { texto: "Enseñarles una canción para alegrarles el día", inteligencia: "musical", puntos: 10 }
        ]
    },
    {
        tiempo: 150,
        pregunta: "El árbol de los sueños te presenta un enigma: 'Tengo ciudades, pero no casas. Tengo montañas, pero no árboles. Tengo agua, pero no peces. ¿Qué soy?'",
        opciones: [
            { texto: "Un mapa", inteligencia: "logica", puntos: 10 },
            { texto: "Un sueño", inteligencia: "intrapersonal", puntos: 5 },
            { texto: "Un libro", inteligencia: "linguistica", puntos: 5 }
        ]
    }
];

let currentScene = 0;

video.addEventListener("timeupdate", () => {
    if (currentScene < guion.length && video.currentTime >= guion[currentScene].tiempo) {
        mostrarPregunta(guion[currentScene]);
        video.pause();
    }
});

function mostrarPregunta(escena) {
    questionText.innerText = escena.pregunta;
    escena.opciones.forEach((opcion, index) => {
        options[index].innerText = opcion.texto;
        options[index].onclick = () => chooseOption(index);
    });
    questionContainer.classList.remove("hidden");
}

function chooseOptiuon(opcionIndex) {
    const escena = gion[currentScene];
    const opcionSeleccionada = escena.opciones[opcionIndex];

    // Sumar puntos a la inteligencia seleccionada
    resultados[opcionSeleccionada.inteligencia] += opcionSeleccionada.puntos;

    // Ocultar pregunta y reanudar video
    questionContainer.classList.add("hidden");
    currentScene++;
    video.play();

    // Si es la última escena, mostrar resultados al final
    if (currentScene >= guion.length) {
        video.addEventListener("ended", mostrarResultados);
    }
}

function mostrarResultados() {
    alert(`Resultados: ${JSON.stringify(resultados, null, 2)}`);
    // Puedes enviar los resultados al servidor aquí
}
