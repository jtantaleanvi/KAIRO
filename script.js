/* ===============================
   KAIRO — Script Base
   =============================== */
window.addEventListener("load", () => {
    document.body.style.opacity = 0;

    setTimeout(() => {
        document.body.style.transition = "opacity 2s ease";
        document.body.style.opacity = 1;
    }, 200);
});
const garden = document.getElementById("garden");
const wrapper = document.getElementById("garden-wrapper");
const settingsBtn = document.getElementById("settings-button");
const settingsPanel = document.getElementById("settings-panel");
const backupBtn = document.getElementById("backup-btn");
const restoreBtn = document.getElementById("restore-btn");
const resetBtn = document.getElementById("reset-btn");
const fileInput = document.getElementById("file-input");

let kairoData = {
    plants: []
};

/* ===============================
   Scroll Horizontal Suave
   =============================== */

gardenWrapper.addEventListener("dblclick", (e) => {
    const plant = document.createElement("div");
    plant.classList.add("plant");

    plant.style.left = e.offsetX + "px";
    plant.style.top = e.offsetY + "px";

    gardenWrapper.appendChild(plant);
});

wrapper.addEventListener("wheel", (e) => {
    e.preventDefault();
    wrapper.scrollLeft += e.deltaY * 0.6;
});

/* ===============================
   Guardado y Carga
   =============================== */

function saveData() {
    localStorage.setItem("kairoData", JSON.stringify(kairoData));
}

function loadData() {
    const stored = localStorage.getItem("kairoData");
    if (stored) {
        kairoData = JSON.parse(stored);
        renderPlants();
    }
}

/* ===============================
   Plantas
   =============================== */

function createPlant(x, y, scale = 1, type = "sprout") {

    const plant = document.createElement("div");
    plant.classList.add("plant");
    plant.style.left = x + "px";
    plant.style.top = y + "px";
    plant.style.transform = `scale(${scale})`;
    plant.innerHTML = getPlantSVG(type);
    garden.appendChild(plant);
    setTimeout(() => {
        plant.classList.add("visible");
    }, 100);
    return plant;
}
function addRandomPlant() {
    const x = Math.random() * 4800 + 100;
    const y = Math.random() * (window.innerHeight - 200) + 100;
    const scale = 0.8 + Math.random() * 0.6;

    kairoData.plants.push({ x, y, scale });
    saveData();
    renderPlants();
}

function renderPlants() {
    garden.innerHTML = "";
    kairoData.plants.forEach(p => {
        createPlant(p.x, p.y, p.scale, p.type);
    });
}
function getPlantSVG(type) {
    const plants = {
        sprout: `
        <svg width="80" height="80" viewBox="0 0 80 80">
            <line x1="40" y1="70" x2="40" y2="40" stroke="white" stroke-width="2"/>
            <path d="M40 45 C30 35, 20 40, 40 55" stroke="white" fill="none"/>
            <path d="M40 45 C50 35, 60 40, 40 55" stroke="white" fill="none"/>
        </svg>
        `,
        grass: `
        <svg width="80" height="80" viewBox="0 0 80 80">
            <path d="M20 70 Q30 40 40 70" stroke="white" fill="none"/>
            <path d="M40 70 Q50 35 60 70" stroke="white" fill="none"/>
            <path d="M30 70 Q35 45 45 70" stroke="white" fill="none"/>
        </svg>
        `,
        flower: `
        <svg width="80" height="80" viewBox="0 0 80 80">
            <line x1="40" y1="70" x2="40" y2="40" stroke="white"/>
            <circle cx="40" cy="35" r="6" stroke="white" fill="none"/>
            <circle cx="40" cy="35" r="2" fill="white"/>
        </svg>
        `,
        reed: `
        <svg width="80" height="80" viewBox="0 0 80 80">
            <line x1="40" y1="70" x2="38" y2="20" stroke="white"/>
            <ellipse cx="38" cy="20" rx="4" ry="8" stroke="white" fill="none"/>
        </svg>
        `
    };

    return plants[type];
}
/* ===============================
   Configuración
   =============================== */

settingsBtn.addEventListener("click", () => {
    settingsPanel.classList.toggle("hidden");
});

/* ===============================
   Respaldo JSON
   =============================== */

backupBtn.addEventListener("click", () => {
    const dataStr = JSON.stringify(kairoData);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "kairo_respaldo.json";
    a.click();
});

/* ===============================
   Restaurar JSON
   =============================== */

restoreBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        kairoData = JSON.parse(event.target.result);
        saveData();
        renderPlants();
    };

    reader.readAsText(file);
});

/* ===============================
   Reiniciar
   =============================== */

resetBtn.addEventListener("click", () => {
    if (confirm("Este jardín contiene memoria acumulada. ¿Deseas comenzar un nuevo ecosistema?")) {
        kairoData = { plants: [] };
        saveData();
        renderPlants();
    }
});

/* ===============================
   Inicialización
   =============================== */

loadData();

document.addEventListener("dblclick", addRandomPlant);
