/* =========================================
   KAIRO — EL JARDÍN DE LA INTROSPECCIÓN
   ========================================= */

// 1. BASE DE DATOS FILOSÓFICA (80 Frases)
const kairoPhrases = [
    "Tu atención es el único recurso que no recuperas.", "Lo que evitas te domina.",
    "Ignorar el ruido no es lo mismo que el silencio.", "La resistencia es una forma de crecimiento.",
    "El flujo requiere que dejes de luchar contra la corriente.", "La repetición es la tumba de la consciencia.",
    "¿Estás presente o solo ocupas espacio?", "Cada distracción es una decisión.",
    "La calma es un músculo. Ejercítalo.", "No confundas velocidad con progreso.",
    "La pantalla es un espejo oscuro.", "El vacío no siempre es ausencia; es claridad.",
    "Acepta el error como una coordenada, no como un destino.", "Tu mente es un jardín, no un vertedero.",
    "Observa el impulso antes de actuar sobre él.", "La simplicidad es la máxima sofisticación.",
    "El control comienza con la respiración.", "Deja de buscar la salida; busca la entrada.",
    "Lo que consumes te consume a ti.", "Solo en la quietud ves el fondo del estanque.",
    "Ver el jardín crecer te llena de determinación.", "Alguien recuerda por qué empezaste esto.",
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
    "Mira hacia arriba. El cielo no tiene píxeles.", "Tu vida ocurre fuera de este marco.",
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
    "La soledad es donde te encuentras contigo mismo.", "Somos arquitectos de nuestras prisiones.",
    "El tiempo es una ilusión muy persistente.", "Nada es permanente, ni siquiera este jardín.",
    "La oscuridad es luz esperando su turno.", "Tu historia todavía se está escribiendo.",
    "Deja que las hojas caigan. Es parte del ciclo.", "Bienvenido a Kairo. Aquí, tú eres el centro."
];

// 2. BIBLIOTECA BOTÁNICA (Especies, Leyendas y SVGs Artísticos)
const botanicalLibrary = {
    sunflower: { 
        name: "Girasol de Kairo", 
        legend: "Busca la luz incluso en días cortos.",
        svg: `<svg viewBox="0 0 80 80"><path d="M40 70 V40 M40 40 L30 30 M40 40 L50 30" stroke="white" fill="none"/><circle cx="40" cy="25" r="10" stroke="white" stroke-dasharray="2 1" fill="none"/><circle cx="40" cy="25" r="3" fill="white"/></svg>`
    },
    lotus: { 
        name: "Loto Zen", 
        legend: "Pureza que emerge del caos.",
        svg: `<svg viewBox="0 0 80 80"><path d="M40 70 V55 M20 55 Q40 30 60 55 M30 50 Q40 20 50 50" stroke="white" fill="none"/><circle cx="40" cy="45" r="2" fill="white"/></svg>`
    },
    reed: { 
        name: "Junco de Laguna", 
        legend: "Se dobla, pero nunca se quiebra.",
        svg: `<svg viewBox="0 0 80 80"><path d="M40 70 Q35 40 45 20" stroke="white" fill="none"/><ellipse cx="45" cy="20" rx="3" ry="7" stroke="white" fill="none"/></svg>`
    },
    grass: { 
        name: "Césped de Seda", 
        legend: "Fuerza en la comunidad pequeña.",
        svg: `<svg viewBox="0 0 80 80"><path d="M20 70 Q30 40 40 70 M40 70 Q50 35 60 70" stroke="white" fill="none"/></svg>`
    },
    sprout: { 
        name: "Brote Primario", 
        legend: "Todo gran cambio comienza invisible.",
        svg: `<svg viewBox="0 0 80 80"><line x1="40" y1="70" x2="40" y2="45" stroke="white"/><path d="M40 50 C30 40 20 45 40 55" stroke="white" fill="none"/></svg>`
    }
};

// 3. LÓGICA DE ESTADO Y DATOS
let kairoData = { plants: [] };
const garden = document.getElementById("garden");
const wrapper = document.getElementById("garden-wrapper");

function saveData() { localStorage.setItem("kairoData", JSON.stringify(kairoData)); }

function loadData() {
    const stored = localStorage.getItem("kairoData");
    if (stored) {
        kairoData = JSON.parse(stored);
        renderPlants();
    }
}

// 4. RENDERIZADO
function renderPlants() {
    garden.innerHTML = "";
    kairoData.plants.forEach(p => {
        const species = botanicalLibrary[p.type] || botanicalLibrary.sprout;
        const div = document.createElement("div");
        div.classList.add("plant");
        div.style.left = p.x + "px";
        div.style.top = p.y + "px";
        div.style.transform = `scale(${p.scale})`;
        
        div.innerHTML = `
            <div class="plant-message">
                <strong>${species.name}</strong>
                <span class="plant-legend">${species.legend}</span>
                <p>"${p.phrase}"</p>
            </div>
            ${species.svg}
        `;
        garden.appendChild(div);
        setTimeout(() => div.classList.add("visible"), 100);
    });
}

// 5. EVENTOS E INTERACCIÓN
let selectedMood = null;
document.querySelectorAll("#mood-buttons button").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll("#mood-buttons button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedMood = btn.dataset.mood;
    };
});

document.getElementById("save-day").onclick = () => {
    const hoursInput = document.getElementById("hours-input");
    const hours = parseFloat(hoursInput.value);
    
    if(isNaN(hours) || !selectedMood) {
        alert("Por favor, selecciona un ánimo e indica las horas.");
        return;
    }

    // Selección de especie según ánimo
    let type = "sprout";
    if (selectedMood === "good") type = Math.random() > 0.5 ? "sunflower" : "lotus";
    if (selectedMood === "neutral") type = "reed";
    if (selectedMood === "bad") type = "grass";

    const count = Math.max(1, Math.round(hours / 2));
    for(let i=0; i<count; i++) {
        const x = Math.random() * 4600 + 200;
        const y = (window.innerHeight * 0.7) + (Math.random() * 80); // Posición en "suelo"
        const scale = 0.7 + Math.random() * 0.7;
        const phrase = kairoPhrases[Math.floor(Math.random() * kairoPhrases.length)];
        
        kairoData.plants.push({ x, y, scale, type, phrase });
    }

    saveData();
    renderPlants();
    
    // Reset y Scroll suave a la nueva planta
    hoursInput.value = "";
    wrapper.scrollTo({ left: kairoData.plants[kairoData.plants.length-1].x - (window.innerWidth/2), behavior: 'smooth' });
};

// Panel de configuración
document.getElementById("settings-button").onclick = () => document.getElementById("settings-panel").classList.toggle("hidden");
document.getElementById("reset-btn").onclick = () => {
    if(confirm("¿Estás seguro de reiniciar tu jardín?")) {
        kairoData = { plants: [] };
        saveData();
        renderPlants();
    }
};

loadData();
