/* =========================================
   KAIRO — Lógica del Ecosistema (Versión Completa)
   ========================================= */

// --- 1. Base de Datos: 80 Frases ---
const kairoPhrases = [
    "Tu atención es el único recurso que no recuperas.", "La resistencia es una forma de crecimiento.",
    "Lo que evitas te domina.", "El flujo requiere que dejes de luchar contra la corriente.",
    "La repetición es la tumba de la consciencia.", "¿Estás presente o solo ocupas espacio?",
    "Cada distracción es una decisión.", "La calma es un músculo. Ejercítalo.",
    "No confundas velocidad con progreso.", "La pantalla es un espejo oscuro.",
    "El vacío no siempre es ausencia; es claridad.", "Acepta el error como una coordenada.",
    "Tu mente es un jardín, no un vertedero.", "Observa el impulso antes de actuar.",
    "La simplicidad es la máxima sofisticación.", "El control comienza con la respiración.",
    "Deja de buscar la salida; busca la entrada.", "Lo que consumes te consume a ti.",
    "Solo en la quietud ves el fondo del estanque.", "Ver el jardín crecer te llena de determinación.",
    "Alguien recuerda por qué empezaste esto.", "Las sombras solo existen donde hay luz.",
    "No es necesario ser útil para tener valor.", "¿Has sido amable contigo mismo hoy?",
    "Tus errores son abono para este presente.", "A veces, no hacer nada es lo más valiente.",
    "El mañana será diferente si el hoy termina aquí.", "Tu paciencia ha dado sus frutos.",
    "¿Qué queda de ti cuando apagas las luces?", "La memoria es un hilo que nos une.",
    "No tengas miedo de florecer en la oscuridad.", "Tus sentimientos son reales.",
    "Alguien está agradecido de que existas.", "Un pequeño brote es una victoria.",
    "Escucha tus pensamientos sin interrumpirlos.", "No todos los caminos llevan a una pantalla.",
    "La belleza requiere tiempo.", "Sanar es un proceso lento.",
    "Quédate un rato más. El mundo puede esperar.", "¿Cuántas vidas has vivido hoy en otros?",
    "La dopamina es una mentira conveniente.", "¿Esclavo de la herramienta o dueño de la obra?",
    "Si el servicio es gratis, el precio eres tú.", "El algoritmo no sabe quién eres.",
    "¿Cuándo fue la última vez que te aburriste?", "Buscas respuestas donde no hay tus preguntas.",
    "La conexión digital suele ser desconexión humana.", "Estás aquí. ¿Pero dónde está tu mente?",
    "Un scroll infinito no llena un vacío infinito.", "Mira hacia arriba. El cielo no tiene pílexes.",
    "Tu vida ocurre fuera de este marco.", "¿Qué estás evitando mirar ahora mismo?",
    "La notificación es el grito de un extraño.", "No eres un usuario, eres un ser humano.",
    "El mundo es más grande que 6 pulgadas.", "¿Momentos perdidos por intentar capturarlos?",
    "La productividad es una trampa sin propósito.", "Tu valor no se mide en clics.",
    "Recupera tu derecho al silencio.", "El orden es un sueño del caos.",
    "Fragmentos de estrellas tratando de brillar.", "La entropía gana, pero el jardín lucha.",
    "Un punto en el espacio, un momento en el tiempo.", "La realidad no tiene botón de reinicio.",
    "¿Eres el narrador o un personaje?", "Las raíces no se ven, pero sostienen todo.",
    "El viento no tiene dirección sin velas.", "La fragilidad es una forma de fuerza.",
    "Todo será ceniza, pero hoy es fuego.", "El lenguaje es una barrera hacia la verdad.",
    "¿Qué canción suena en tu cabeza en silencio?", "La soledad es donde te encuentras.",
    "Somos arquitectos de nuestras prisiones.", "El tiempo es una ilusión persistente.",
    "Nada es permanente.", "La oscuridad es luz esperando su turno.",
    "Tu historia todavía se está escribiendo.", "Deja que las hojas caigan.",
    "Bienvenido a Kairo.", "Respira. Estás vivo."
];

// --- 2. Biblioteca Botánica (Nombres y Leyendas) ---
const plantMasterData = {
    flower: { name: "Girasol Áureo", legend: "Orientación hacia lo esencial." },
    reed: { name: "Junco del Olvido", legend: "Flexibilidad ante la carga." },
    grass: { name: "Césped de Seda", legend: "Resiliencia en comunidad." },
    sprout: { name: "Brote Primario", legend: "El inicio de la consciencia." }
};

// --- Variables de Estado ---
let kairoData = { plants: [] };
let selectedMood = null;

const garden = document.getElementById("garden");
const wrapper = document.getElementById("garden-wrapper");
const settingsBtn = document.getElementById("settings-button");
const settingsPanel = document.getElementById("settings-panel");
const saveDayBtn = document.getElementById("save-day");
const hoursInput = document.getElementById("hours-input");
const messageEl = document.getElementById("garden-message");

/* =========================================
   1. Inicialización y Carga
   ========================================= */

window.addEventListener("load", () => {
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = "opacity 2s ease";
        document.body.style.opacity = 1;
    }, 200);

    loadData();
    updateMessage();
});

function loadData() {
    const stored = localStorage.getItem("kairoData");
    if (stored) {
        kairoData = JSON.parse(stored);
        renderPlants();
    }
}

function saveData() {
    localStorage.setItem("kairoData", JSON.stringify(kairoData));
}

/* =========================================
   2. Gestión del Jardín
   ========================================= */

function addRandomPlant(mood) {
    const x = Math.random() * 4600 + 200;
    // Posición Y ajustada para que no tape el HUD inferior
    const y = (window.innerHeight * 0.65) + (Math.random() * 100); 
    const scale = 0.7 + Math.random() * 0.6;
    
    let type = "sprout";
    if (mood === "good") type = "flower";
    if (mood === "neutral") type = "reed";
    if (mood === "bad") type = "grass";

    const phrase = kairoPhrases[Math.floor(Math.random() * kairoPhrases.length)];

    const newPlant = { x, y, scale, type, phrase };
    kairoData.plants.push(newPlant);
    
    saveData();
    renderPlants();
    updateMessage();
}

function renderPlants() {
    garden.innerHTML = ""; 
    kairoData.plants.forEach(p => {
        createPlantElement(p.x, p.y, p.scale, p.type, p.phrase);
    });
}

function createPlantElement(x, y, scale, type, phrase) {
    const plantDiv = document.createElement("div");
    plantDiv.classList.add("plant");
    plantDiv.style.left = `${x}px`;
    plantDiv.style.top = `${y}px`;
    plantDiv.style.transform = `scale(${scale})`;
    
    const info = plantMasterData[type] || plantMasterData.sprout;

    // Estructura con Mensaje (Frase), Tipo (Nombre) y Leyenda
    plantDiv.innerHTML = `
        <div class="plant-message">
            <strong>${info.name}</strong>
            <span style="display:block; font-size:10px; opacity:0.6; margin-bottom:5px;">${info.legend}</span>
            <p>"${phrase || "..."}"</p>
        </div>
        ${getPlantSVG(type)}
    `;
    
    garden.appendChild(plantDiv);

    setTimeout(() => {
        plantDiv.classList.add("visible");
    }, 100);
}

function updateMessage() {
    const count = kairoData.plants.length;
    if (count === 0) messageEl.innerText = "El jardín espera tu primera semilla.";
    else if (count < 10) messageEl.innerText = "La vida comienza a brotar en Kairo.";
    else if (count < 30) messageEl.innerText = "Tu ecosistema de memoria está floreciendo.";
    else messageEl.innerText = "Un bosque de tiempo se extiende ante ti.";
}

/* =========================================
   3. Interacción y Eventos
   ========================================= */

document.querySelectorAll("#mood-buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#mood-buttons button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedMood = btn.dataset.mood;
    });
});

saveDayBtn.addEventListener("click", () => {
    const hours = parseFloat(hoursInput.value);
    
    if (isNaN(hours) || hours < 0) {
        alert("Ingresa un número de horas válido.");
        return;
    }

    if (!selectedMood) {
        alert("Selecciona un estado de ánimo.");
        return;
    }

    let plantCount = Math.max(1, Math.round(hours / 2));

    for (let i = 0; i < plantCount; i++) {
        addRandomPlant(selectedMood);
    }

    hoursInput.value = "";
    document.querySelectorAll("#mood-buttons button").forEach(b => b.classList.remove("active"));
    selectedMood = null;
});

wrapper.addEventListener("wheel", (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        wrapper.scrollLeft += e.deltaY;
    }
}, { passive: false });

/* =========================================
   4. Configuración y Utilidades
   ========================================= */

settingsBtn.addEventListener("click", () => {
    settingsPanel.classList.toggle("hidden");
});

document.getElementById("backup-btn").addEventListener("click", () => {
    const dataStr = JSON.stringify(kairoData);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kairo_backup.json`;
    a.click();
});

document.getElementById("restore-btn").addEventListener("click", () => {
    document.getElementById("file-input").click();
});

document.getElementById("file-input").addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        kairoData = JSON.parse(event.target.result);
        saveData();
        renderPlants();
        updateMessage();
        settingsPanel.classList.add("hidden");
    };
    reader.readAsText(file);
});

document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("¿Reiniciar el ecosistema?")) {
        kairoData = { plants: [] };
        saveData();
        renderPlants();
        updateMessage();
        settingsPanel.classList.add("hidden");
    }
});

/* =========================================
   5. Diccionario de Plantas (SVGs)
   ========================================= */

function getPlantSVG(type) {
    const svgs = {
        flower: `<svg viewBox="0 0 80 80"><line x1="40" y1="70" x2="40" y2="40"/><circle cx="40" cy="35" r="6" stroke="white" fill="none"/><circle cx="40" cy="35" r="2" fill="white"/></svg>`,
        reed: `<svg viewBox="0 0 80 80"><line x1="40" y1="70" x2="38" y2="20"/><ellipse cx="38" cy="20" rx="4" ry="8" stroke="white" fill="none"/></svg>`,
        grass: `<svg viewBox="0 0 80 80"><path d="M20 70 Q30 40 40 70" stroke="white" fill="none"/><path d="M40 70 Q50 35 60 70" stroke="white" fill="none"/><path d="M30 70 Q35 45 45 70" stroke="white" fill="none"/></svg>`,
        sprout: `<svg viewBox="0 0 80 80"><line x1="40" y1="70" x2="40" y2="40"/><path d="M40 45 C30 35, 20 40, 40 55" stroke="white" fill="none"/><path d="M40 45 C50 35, 60 40, 40 55" stroke="white" fill="none"/></svg>`
    };
    return svgs[type] || svgs.sprout;
}
