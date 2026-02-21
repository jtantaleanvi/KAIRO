/* =========================================
   KAIRO — CORE ENGINE (v3.0)
   ========================================= */

// 1. BASE DE DATOS: 80 Frases Filosóficas KAIRO
const kairoPhrases = [
    "Ignorar el ruido no es lo mismo que el silencio.", "La resistencia es una forma de crecimiento.",
    "Lo que evitas te domina.", "Tu atención es el único recurso que no recuperas.",
    "El flujo requiere que dejes de luchar contra la corriente.", "La repetición es la tumba de la consciencia.",
    "¿Estás presente o solo ocupas espacio?", "Cada distracción es una decisión.",
    "La calma es un músculo. Ejercítalo.", "No confundas velocidad con progreso.",
    "La pantalla es un espejo oscuro.", "El vacío no siempre es ausencia; es claridad.",
    "Acepta el error como una coordenada, no como un destino.", "Tu mente es un jardín, no un vertedero.",
    "Observa el impulso antes de actuar sobre él.", "La simplicidad es la máxima sofisticación.",
    "El control comienza con la respiración.", "Deja de buscar la salida; busca la entrada.",
    "Lo que consumes te consume a ti.", "Solo en la quietud ves el fondo del estanque.",
    "Ver el jardín crecer... eso te llena de determinación.", "Alguien recuerda por qué empezaste esto.",
    "Las sombras solo existen donde hay luz.", "No es necesario ser útil para tener valor.",
    "¿Has sido amable contigo mismo hoy?", "Tus errores son abono para este presente.",
    "A veces, no hacer nada es lo más valiente.", "El mañana será diferente si el hoy termina aquí.",
    "Tu paciencia ha dado sus frutos.", "¿Qué queda de ti cuando apagas las luces?",
    "La memoria es un hilo que nos une a quienes fuimos.", "No tengas miedo de florecer en la oscuridad.",
    "Incluso en un mundo de datos, tus sentimientos son reales.", "Alguien está agradecido de que existas.",
    "Un pequeño brote es una gran victoria sobre la nada.", "Escucha tus pensamientos sin interrumpirlos.",
    "No todos los caminos llevan a una pantalla.", "La belleza requiere tiempo. No la apresures.",
    "Sanar es un proceso lento, como una raíz buscando agua.", "Quédate un rato más. El mundo puede esperar.",
    "¿Cuántas vidas has vivido hoy a través de otros?", "La dopamina es una mentira conveniente.",
    "¿Esclavo de la herramienta o dueño de la obra?", "Si el servicio es gratis, el precio eres tú.",
    "El algoritmo no sabe quién eres, solo qué deseas.", "¿Cuándo fue la última vez que te aburriste?",
    "Buscas respuestas en lugares que no tienen tus preguntas.", "La conexión digital suele ser desconexión humana.",
    "Estás aquí. ¿Pero dónde está tu mente?", "Un scroll infinito no llena un vacío infinito.",
    "Mira hacia arriba. El cielo no tiene pílexes.", "Tu vida ocurre fuera de este marco.",
    "¿Qué estás evitando mirar ahora mismo?", "La notificación es el grito de un extraño.",
    "No eres un usuario, eres un ser humano.", "El mundo es más grande que 6 pulgadas.",
    "¿Cuántos momentos perdiste por intentar capturarlos?", "La productividad es una trampa sin propósito.",
    "Tu valor no se mide en clics.", "Recupera tu derecho al silencio.",
    "El orden es un sueño del caos.", "Fragmentos de estrellas tratando de brillar.",
    "La entropía gana, pero el jardín sigue luchando.", "Un punto en el espacio, un momento en el tiempo.",
    "La realidad no tiene botón de reinicio.", "¿Eres el narrador o un personaje?",
    "Las raíces no se ven, pero lo sostienen todo.", "El viento no tiene dirección hasta que pones una vela.",
    "La fragilidad es una forma de fuerza.", "Todo se volverá ceniza, pero hoy es fuego.",
    "El lenguaje es una barrera hacia la verdad.", "¿Qué canción suena en tu cabeza en silencio?",
    "La soledad es donde te encuentras contigo mismo.", "Somos arquitectos de nuestras propias prisiones.",
    "El tiempo es una ilusión muy persistente.", "Nada es permanente, ni siquiera este jardín.",
    "La oscuridad es luz esperando su turno.", "Tu historia todavía se está escribiendo.",
    "Deja que las hojas caigan. Es parte del ciclo.", "Bienvenido a Kairo. Aquí, tú eres el centro."
];

// 2. BIBLIOTECA BOTÁNICA (Especies, Leyendas y Dibujos)
const botanicalLibrary = {
    sunflower: {
        name: "Girasol de Kairo",
        legend: "Busca la luz incluso en los días más cortos.",
        svg: `<svg viewBox="0 0 80 80"><line x1="40" y1="70" x2="40" y2="35" stroke="white" stroke-width="1.5" /><circle cx="40" cy="30" r="12" stroke="white" fill="none" stroke-dasharray="3 2" /><circle cx="40" cy="30" r="5" fill="white" /><path d="M40 55 Q30 45 40 45" stroke="white" fill="none" /><path d="M40 55 Q50 45 40 45" stroke="white" fill="none" /></svg>`
    },
    lotus: {
        name: "Loto Zen",
        legend: "La pureza que emerge del caos cotidiano.",
        svg: `<svg viewBox="0 0 80 80"><path d="M40 70 L40 50 M40 50 Q20 50 40 25 Q60 50 40 50" stroke="white" fill="none" /><path d="M40 50 Q10 60 30 35 Q40 50 40 50" stroke="white" fill="none" /><path d="M40 50 Q70 60 50 35 Q40 50 40 50" stroke="white" fill="none" /></svg>`
    },
    reed: {
        name: "Junco de Laguna",
        legend: "Se dobla ante el tiempo, pero nunca se quiebra.",
        svg: `<svg viewBox="0 0 80 80"><line x1="40" y1="70" x2="38" y2="20" stroke="white" stroke-width="1.5" /><ellipse cx="38" cy="20" rx="4" ry="10" stroke="white" fill="none" /></svg>`
    },
    grass: {
        name: "Césped de Seda",
        legend: "La fuerza de lo pequeño cuando crece en comunidad.",
        svg: `<svg viewBox="0 0 80 80"><path d="M20 70 Q35 30 40 70" stroke="white" fill="none" /><path d="M40 70 Q45 20 60 70" stroke="white" fill="none" /></svg>`
    },
    sprout: {
        name: "Brote Primario",
        legend: "Todo gran cambio comienza con un impulso invisible.",
        svg: `<svg viewBox="0 0 80 80"><line x1="40" y1="70" x2="40" y2="40" stroke="white" stroke-width="1.5" /><path d="M40 45 C25 35, 20 45, 40 55" stroke="white" fill="none" /></svg>`
    }
};

// 3. ESTADO Y SELECTORES
let kairoData = { plants: [] };
let selectedMood = null;

const garden = document.getElementById("garden");
const wrapper = document.getElementById("garden-wrapper");
const hoursInput = document.getElementById("hours-input");

// 4. MOTOR DE RENDERIZADO
function createPlantElement(p) {
    const plantDiv = document.createElement("div");
    plantDiv.classList.add("plant");
    plantDiv.style.left = `${p.x}px`;
    plantDiv.style.top = `${p.y}px`;
    plantDiv.style.transform = `scale(${p.scale})`;
    
    const species = botanicalLibrary[p.type] || botanicalLibrary.sprout;
    
    plantDiv.innerHTML = `
        <div class="plant-message">
            <strong>${species.name}</strong>
            <span class="plant-legend">${species.legend}</span>
            <p>"${p.phrase}"</p>
        </div>
        ${species.svg}
    `;
    
    garden.appendChild(plantDiv);
    setTimeout(() => plantDiv.classList.add("visible"), 100);
}

function renderPlants() {
    garden.innerHTML = "";
    kairoData.plants.forEach(createPlantElement);
}

// 5. LÓGICA DE CRECIMIENTO
function addRandomPlant(mood) {
    const marginX = 200;
    const x = Math.random() * (4600) + marginX;
    // Posición Y en la zona de "suelo"
    const y = (window.innerHeight * 0.75) + (Math.random() * 80);
    const scale = 0.8 + Math.random() * 0.6;
    
    let type = "sprout";
    if (mood === "good") type = Math.random() > 0.5 ? "sunflower" : "lotus";
    if (mood === "neutral") type = "reed";
    if (mood === "bad") type = "grass";

    const phrase = kairoPhrases[Math.floor(Math.random() * kairoPhrases.length)];

    const newPlant = { x, y, scale, type, phrase };
    kairoData.plants.push(newPlant);
    
    saveData();
    renderPlants();

    wrapper.scrollTo({ left: x - (window.innerWidth / 2), behavior: 'smooth' });
}

// 6. GESTIÓN DE DATOS
function saveData() { localStorage.setItem("kairoData", JSON.stringify(kairoData)); }
function loadData() {
    const stored = localStorage.getItem("kairoData");
    if (stored) {
        kairoData = JSON.parse(stored);
        renderPlants();
    }
}

// 7. EVENTOS DE INTERFAZ
document.querySelectorAll("#mood-buttons button").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll("#mood-buttons button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedMood = btn.dataset.mood;
    };
});

document.getElementById("save-day").onclick = () => {
    const hours = parseFloat(hoursInput.value);
    if (!hours || !selectedMood) return alert("Por favor, indica las horas y tu estado de ánimo.");

    // Una planta por cada 2 horas (mínimo 1)
    const count = Math.max(1, Math.round(hours / 2));
    for(let i=0; i<count; i++) {
        setTimeout(() => addRandomPlant(selectedMood), i * 300);
    }

    // Reset Interfaz
    hoursInput.value = "";
    document.querySelectorAll("#mood-buttons button").forEach(b => b.classList.remove("active"));
    selectedMood = null;
};

// Configuración y Reset
document.getElementById("settings-button").onclick = () => document.getElementById("settings-panel").classList.toggle("hidden");
document.getElementById("reset-btn").onclick = () => {
    if(confirm("¿Estás seguro de reiniciar tu jardín? Esta acción no se puede deshacer.")) {
        kairoData = { plants: [] };
        saveData();
        renderPlants();
    }
};

// Inicialización
window.onload = loadData;
