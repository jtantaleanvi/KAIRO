/* ===============================
   KAIRO — Script Base
   =============================== */

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

function createPlant(x, y, scale = 1) {
    const plant = document.createElement("div");
    plant.classList.add("plant");
    plant.style.left = x + "px";
    plant.style.top = y + "px";
    plant.style.transform = `scale(${scale})`;
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
        createPlant(p.x, p.y, p.scale);
    });
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

/* Demo temporal: doble click para crear planta */
document.addEventListener("dblclick", addRandomPlant);
