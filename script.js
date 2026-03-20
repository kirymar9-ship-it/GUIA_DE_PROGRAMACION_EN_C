// -------- NAVEGACIÓN --------
function irANivel(nivel) {
    window.location.href = "nivel" + nivel + ".html";
}

// -------- LECCIONES NIVEL 1 --------
const leccionesNivel1 = [
{
titulo: "¿Qué es C?",
texto: "C es un lenguaje estructurado creado en 1972 por Dennis Ritchie. Permite trabajar directamente con memoria y es base de muchos lenguajes modernos.",
codigo: "#include <stdio.h>\nint main() {\n printf(\"Hola mundo\");\n return 0;\n}"
},
{
titulo: "Variables",
texto: "Una variable es un espacio en memoria que almacena datos. En C se debe declarar el tipo antes de usarla.",
codigo: "int edad = 20;"
}
];

let indice = 0;

function mostrarLeccion() {
    const contenedor = document.getElementById("contenido");
    if (!contenedor) return;

    let leccion = leccionesNivel1[indice];

    contenedor.innerHTML = `
        <h3>${leccion.titulo}</h3>
        <p>${leccion.texto}</p>
        <pre>${leccion.codigo}</pre>
    `;

    if (indice === leccionesNivel1.length - 1) {
        document.getElementById("irQuizBtn").style.display = "inline-block";
    }
}

if (document.getElementById("contenido")) {
    mostrarLeccion();

    document.getElementById("siguienteBtn").onclick = () => {
        if (indice < leccionesNivel1.length - 1) {
            indice++;
            mostrarLeccion();
        }
    };

    document.getElementById("anteriorBtn").onclick = () => {
        if (indice > 0) {
            indice--;
            mostrarLeccion();
        }
    };

    document.getElementById("irQuizBtn").onclick = () => {
        window.location.href = "quiz1.html";
    };
}

// -------- QUIZ NIVEL 1 --------

const preguntasNivel1 = [
{
pregunta: "¿En qué año fue creado C?",
opciones: ["1985", "1972", "1991"],
correcta: 1
},
{
pregunta: "¿Qué indica int en int main()?",
opciones: ["Que devuelve un entero", "Que imprime texto", "Que es un puntero"],
correcta: 0
}
];

let preguntaActual = 0;
let aciertos = 0;
let errores = 0;

function mostrarPregunta() {
    const quiz = document.getElementById("quizContainer");
    if (!quiz) return;

    let p = preguntasNivel1[preguntaActual];

    quiz.innerHTML = `
        <h3>${p.pregunta}</h3>
        ${p.opciones.map((op, i) => 
            `<button onclick="responder(${i})">${op}</button>`
        ).join("<br><br>")}
    `;
}

function responder(indiceSeleccionado) {
    if (indiceSeleccionado === preguntasNivel1[preguntaActual].correcta) {
        aciertos++;
    } else {
        errores++;
    }

    preguntaActual++;

    if (preguntaActual < preguntasNivel1.length) {
        mostrarPregunta();
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {
    let total = preguntasNivel1.length;
    let neta = aciertos - errores;
    let porcentaje = (aciertos / total) * 100;

    let comentario = "";

    if (porcentaje < 50) {
        comentario = "Tu retención necesita más esfuerzo. ¡Repasa lo que fallaste!";
    } else if (porcentaje < 75) {
        comentario = "Tu retención es buena, pero repasar te ayudará a consolidar aún más la información.";
    } else if (porcentaje < 90) {
        comentario = "¡Excelente! Has retenido la mayor parte del material. ¡Sigue así!";
    } else {
        comentario = "¡Retención sobresaliente! Dominas el tema. Puedes empezar a espaciar tus repasos.";
    }

    document.getElementById("quizContainer").innerHTML = `
        <h2>Resultado Final</h2>
        <p>Aciertos: ${aciertos}</p>
        <p>Errores: ${errores}</p>
        <p>Puntuación neta: ${neta}</p>
        <p>Porcentaje: ${porcentaje.toFixed(2)}%</p>
        <p><strong>${comentario}</strong></p>
        <button onclick="window.location.href='index.html'">Volver al inicio</button>
    `;
}

if (document.getElementById("quizContainer")) {
    mostrarPregunta();
}