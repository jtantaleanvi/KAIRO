/* =========================================
   KAIRO — Lógica del Ecosistema
   ========================================= */

// --- Variables de Estado ---
let kairoData = {
    plants: []
};

let selectedMood = null;

// --- Elementos del DOM ---
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
    // Efecto de entrada suave
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
    const x = Math.random() * 4800 + 100;
    const y = Math.random() * (window.innerHeight - 300) + 150;
    const scale = 0.7 + Math.random() * 0.6;
    
    // El ánimo determina la especie (Contexto del Manifiesto)
    let type = "sprout";
    if (mood === "good") type = "flower";
    if (mood === "neutral") type = "reed";
    if (mood === "bad") type = "grass";

    const newPlant = { x, y, scale, type };
    kairoData.plants.push(newPlant);
    
    saveData();
    renderPlants();
    updateMessage();
}

function renderPlants() {
    garden.innerHTML = ""; // Limpiamos para redibujar
    kairoData.plants.forEach(p => {
        createPlantElement(p.x, p.y, p.scale, p.type);
    });
}

function createPlantElement(x, y, scale, type) {
    const plantDiv = document.createElement("div");
    plantDiv.classList.add("plant");
    plantDiv.style.left = `${x}px`;
    plantDiv.style.top = `${y}px`;
    plantDiv.style.transform = `scale(${scale})`;
    
    plantDiv.innerHTML = getPlantSVG(type);
    garden.appendChild(plantDiv);

    // Animación de aparición
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

// Selección de Ánimo
document.querySelectorAll("#mood-buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#mood-buttons button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedMood = btn.dataset.mood;
    });
});

// Registrar Día
saveDayBtn.addEventListener("click", () => {
    const hours = parseFloat(hoursInput.value);
    
    if (isNaN(hours) || hours < 0) {
        alert("Por favor, ingresa un número de horas válido.");
        return;
    }

    if (!selectedMood) {
        alert("¿Cómo te sentiste hoy? Selecciona un estado de ánimo.");
        return;
    }

    // Lógica: 1 planta por cada 2 horas de móvil (mínimo 1)
    let plantCount = Math.max(1, Math.round(hours / 2));

    for (let i = 0; i < plantCount; i++) {
        addRandomPlant(selectedMood);
    }

    // Feedback visual: Limpiar input
    hoursInput.value = "";
    document.querySelectorAll("#mood-buttons button").forEach(b => b.classList.remove("active"));
    selectedMood = null;
});

// Scroll Horizontal Suave
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
    a.download = `kairo_jardin_${new Date().toLocaleDateString()}.json`;
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
    if (confirm("¿Seguro? Este jardín es tu memoria. Si reinicias, todo volverá al vacío.")) {
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
        flower: `<svg viewBox="0 0 80 80"><line x1="40" y1="70" x2="40" y2="40"/><circle cx="40" cy="35" r="6"/><circle cx="40" cy="35" r="2" fill="white"/></svg>`,
        reed: `<svg viewBox="0 0 80 80"><line x1="40" y1="70" x2="38" y2="20"/><ellipse cx="38" cy="20" rx="4" ry="8"/></svg>`,
        grass: `<svg viewBox="0 0 80 80"><path d="M20 70 Q30 40 40 70"/><path d="M40 70 Q50 35 60 70"/><path d="M30 70 Q35 45 45 70"/></svg>`,
        sprout: `<svg viewBox="0 0 80 80"><line x1="40" y1="70" x2="40" y2="40"/><path d="M40 45 C30 35, 20 40, 40 55"/><path d="M40 45 C50 35, 60 40, 40 55"/></svg>`
    };
    return svgs[type] || svgs.sprout;
}
