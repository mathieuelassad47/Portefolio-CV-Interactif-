// --- 1. MOTEUR AUDIO ---
const SoundSystem = {
    library: {
        startup: new Audio('Audio/startup.mp3'),
        click: new Audio('Audio/sounds/click.wav'),
        reminder: new Audio('Audio/sounds/reminder.mp3'),
        worldCup: new Audio('Audio/Coupe-du-monde-Agen-2026-_.mp3')
    },
    play(name) {
        if (this.library[name]) {
            this.library[name].currentTime = 0; 
            this.library[name].play().catch(e => console.log("Audio bloqué : interaction requise."));
        }
    }
};

// --- 2. GESTION DE L'INACTIVITÉ ---
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        SoundSystem.play('worldCup');
    }, 60000); 
}

// --- 3. ÉTAT ---
let monParcours = []; 
let currentIndex = 0;
let isAutoPlaying = false;
let playInterval = null;

// --- 4. FONCTIONS DE NAVIGATION ET RENDU ---
function renderParcoursStep(index) {
    const card = document.getElementById('parcours-card');
    const item = monParcours[index];
    
    if (card && item) {
        card.innerHTML = `
            <div class="badge">Niveau ${item.id}</div>
            <div class="parcours-image-container">
                <img src="${item.image}" alt="${item.title}" class="gameboy-artwork" />
            </div>
            <h2>${item.title}</h2>
            <p>${item.desc}</p>
            <div class="counter">${index + 1} / ${monParcours.length}</div>
        `;
    }
    const slider = document.getElementById('parcours-slider');
    if (slider) slider.value = index + 1;
}

function stopAutoPlay() {
    isAutoPlaying = false;
    clearInterval(playInterval);
}

function prev() {
    stopAutoPlay();
    if (currentIndex > 0) {
        currentIndex--;
        renderParcoursStep(currentIndex);
    }
}

function next() {
    stopAutoPlay();
    if (currentIndex < monParcours.length - 1) {
        currentIndex++;
        renderParcoursStep(currentIndex);
    }
}

function playPause() {
    isAutoPlaying = !isAutoPlaying;
    if (isAutoPlaying) {
        playInterval = setInterval(() => {
            currentIndex = (currentIndex < monParcours.length - 1) ? currentIndex + 1 : 0;
            renderParcoursStep(currentIndex);
        }, 1500);
    } else {
        stopAutoPlay();
    }
}

function loadSection(sectionId) {
    SoundSystem.play('click');
    document.querySelectorAll('.tab-content').forEach(sec => sec.style.display = 'none');
    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
        if (sectionId === 'parcours') renderParcoursStep(currentIndex);
    }
    resetInactivityTimer();
}

// --- 5. INITIALISATION ---
function initApp() {
    // Si data.json est bien dans le dossier frontend
    fetch('data.json') 
        .then(response => {
            if (!response.ok) throw new Error("Fichier JSON non trouvé");
            return response.json();
        })
        .then(data => {
            monParcours = data;
            renderParcoursStep(currentIndex);
        })
        .catch(err => console.error("Erreur chargement données :", err));
}

function startPortfolio() {
    SoundSystem.play('startup');
    const intro = document.getElementById('intro-screen');
    const main = document.getElementById('main-portfolio');
    const screen = document.getElementById('screen-display');
    const content = document.getElementById('screen-content');
    
    if(intro) intro.style.display = 'none';
    if(main) main.style.display = 'flex';
    if(screen) screen.classList.add('boot-sequence');
    
    setTimeout(() => {
        if(content) content.style.opacity = '1';
        loadSection('presentation');
    }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    document.addEventListener('click', resetInactivityTimer);
    document.addEventListener('keydown', resetInactivityTimer);
    resetInactivityTimer();
});