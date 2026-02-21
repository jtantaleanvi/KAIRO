const kairoPhrases = [
    "Tu atención es tu recurso más valioso.", "Lo que evitas te domina.",
    "Un brote hoy, un bosque mañana.", "El silencio también es una respuesta.",
    "¿Quién eres cuando nadie te da 'like'?", "La calma es una forma de rebeldía."
]; // Añade aquí las 80 frases que quieras

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

function getPlantSVG(type) {
    const svgs = {
        sprout: `<svg width="60" height="60" viewBox="0 0 80 80"><line x1="40" y1="70" x2="40" y2="40" stroke="white" stroke-width="2"/><path d="M40 45 C30 35, 20 40, 40 55" stroke="white" fill="none"/></svg>`,
        grass: `<svg width="60" height="60" viewBox="0 0 80 80"><path d="M20 70 Q30 40 40 70" stroke="white" fill="none"/><path d="M40 70 Q50 35 60 70" stroke="white" fill="none"/></svg>`,
        flower: `<svg width="60" height="60" viewBox="0 0 80 80"><line x1="40" y1="70" x2="40" y2="40" stroke="white"/><circle cx="40" cy="35" r="6" stroke="white" fill="none"/><circle cx="40" cy="35" r="2" fill="white"/></svg>`,
        reed: `<svg width="60" height="60" viewBox="0 0 80 80"><line x1="40" y1="70" x2="38" y2="20" stroke="white"/><ellipse cx="38" cy="20" rx="4" ry="8" stroke="white" fill="none"/></svg>`
    };
    return svgs[type] || svgs.sprout;
}

function renderPlants() {
    garden.innerHTML = "";
    kairoData.plants.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("plant");
        div.style.left = p.x + "px";
        div.style.top = p.y + "px";
        div.style.transform = `scale(${p.scale})`;
        div.innerHTML = `
            <div class="plant-message">${p.phrase || "..."}</div>
            ${getPlantSVG(p.type)}
        `;
        garden.appendChild(div);
        setTimeout(() => div.classList.add("visible"), 100);
    });
}

let selectedMood = null;
document.querySelectorAll("#mood-buttons button").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll("#mood-buttons button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedMood = btn.dataset.mood;
    };
});

document.getElementById("save-day").onclick = () => {
    const hours = parseFloat(document.getElementById("hours-input").value);
    if(isNaN(hours) || !selectedMood) return;

    let type = "sprout";
    if (selectedMood === "good") type = "flower";
    if (selectedMood === "neutral") type = "reed";
    if (selectedMood === "bad") type = "grass";

    const count = Math.max(1, Math.round(hours / 2));
    for(let i=0; i<count; i++) {
        const x = Math.random() * 4800 + 100;
        const y = (window.innerHeight * 0.6) + (Math.random() * 100); // En el suelo
        const phrase = kairoPhrases[Math.floor(Math.random() * kairoPhrases.length)];
        kairoData.plants.push({ x, y, scale: 0.8 + Math.random()*0.5, type, phrase });
    }
    saveData();
    renderPlants();
};

// Configuración básica
document.getElementById("settings-button").onclick = () => document.getElementById("settings-panel").classList.toggle("hidden");
document.getElementById("reset-btn").onclick = () => { if(confirm("¿Reiniciar?")) { kairoData={plants:[]}; saveData(); renderPlants(); } };

loadData();
