// --- 1. MOTEUR AUDIO ---
const SoundSystem = {
    library: {
        startup: new Audio('startup.mp3'),
        click: new Audio('sounds/click.wav'),
        reminder: new Audio('sounds/reminder.mp3'),
        worldCup: new Audio('Coupe-du-monde-Agen-2026-_.mp3')
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

// --- 3. ÉTAT ET DONNÉES ---
let currentIndex = 0;
let isAutoPlaying = false;
let playInterval = null;

const monParcours = [
    { id: 1, title: "CAP Cuisine", desc: "La rigueur, l'organisation et la maîtrise des bases culinaires." },
    { id: 2, title: "Bac Pro Service Accueil", desc: "Apprentissage du relationnel client et de la gestion de flux." },
    { id: 3, title: "La Buvette des Montreurs", desc: "Expérience en gestion de bar et accueil du public." },
    { id: 4, title: "Déménageur", desc: "Développement de la force physique et de l'efficacité logistique." },
    { id: 5, title: "DJ Événementiel", desc: "Maîtrise de l'ambiance, de la technique sonore et du public." },
    { id: 6, title: "Transition Numérique", desc: "Le début de mon virage vers le développement web." },
    { id: 7, title: "Auto-formation Web", desc: "Exploration approfondie du HTML, CSS et JS." },
    { id: 8, title: "Logique de code", desc: "Développement de ma pensée algorithmique." },
    { id: 9, title: "Projet Portfolio", desc: "Création de cette interface immersive." },
    { id: 10, title: "Maîtrise Git", desc: "Gestion structurée de mon code." },
    { id: 11, title: "UI/UX Design", desc: "Focus sur le ressenti utilisateur." },
    { id: 12, title: "Intégration", desc: "Mise en place de systèmes dynamiques." },
    { id: 13, title: "Veille Technique", desc: "Suivi des évolutions du monde numérique." },
    { id: 14, title: "Adaptabilité", desc: "Capacité à changer d'univers avec succès." },
    { id: 15, title: "Objectif Développeur", desc: "Prêt pour de nouveaux défis technologiques." }
];

// --- 4. FONCTIONS DE NAVIGATION ET RENDU ---
function renderParcoursStep(index) {
    const card = document.getElementById('parcours-card');
    const item = monParcours[index];
    if (card) {
        card.innerHTML = `
            <div class="badge">Niveau ${item.id}</div>
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
        // Lecture auto à 1.5s
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
function startPortfolio() {
    SoundSystem.play('startup');
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('main-portfolio').style.display = 'flex';
    document.getElementById('screen-display').classList.add('boot-sequence');
    setTimeout(() => {
        document.getElementById('screen-content').style.opacity = '1';
        loadSection('presentation');
    }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
    renderParcoursStep(currentIndex);
    document.addEventListener('click', resetInactivityTimer);
    document.addEventListener('keydown', resetInactivityTimer);
});