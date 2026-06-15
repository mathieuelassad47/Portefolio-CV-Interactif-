// --- 1. Gestion de la Transition et Allumage ---
function startPortfolio() {
    // Jouer le son de démarrage
    const audio = new Audio('startup.mp3'); 
    audio.play().catch(e => console.log("Lecture audio bloquée : interaction requise."));
    
    // Récupération des éléments DOM
    const intro = document.getElementById('intro-screen');
    const main = document.getElementById('main-portfolio');
    const screen = document.getElementById('screen-display');
    const content = document.getElementById('screen-content');
    
    // 1. Masquer l'intro et afficher le conteneur principal
    intro.style.display = 'none';
    main.style.display = 'flex';

    // 2. Lancer l'effet visuel sur l'écran (animation CSS)
    screen.classList.add('boot-sequence');

    // 3. Charger le texte et le rendre visible après le "flash" d'allumage (400ms)
    setTimeout(() => {
        content.style.opacity = '1'; 
        loadSection('presentation');
        screen.classList.remove('boot-sequence');
    }, 400); 
}

// --- 2. Données du parcours ---
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

// --- 3. État de l'application ---
let currentIndex = 0;
let isAutoPlaying = false;
let playInterval = null;

// --- 4. Fonction de rendu du parcours ---
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

// --- 5. Navigation des sections ---
function loadSection(sectionId) {
    document.querySelectorAll('.tab-content').forEach(sec => sec.style.display = 'none');
    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
        if (sectionId === 'parcours') renderParcoursStep(currentIndex);
    }
}

// --- 6. Navigation interactive (Slider et Boutons) ---
function updateParcoursFromSlider(value) {
    currentIndex = parseInt(value) - 1;
    isAutoPlaying = false;
    clearInterval(playInterval);
    renderParcoursStep(currentIndex);
}

function prev() {
    if (currentIndex > 0) {
        currentIndex--;
        renderParcoursStep(currentIndex);
    }
}

function next() {
    if (currentIndex < monParcours.length - 1) {
        currentIndex++;
        renderParcoursStep(currentIndex);
    }
}

// --- 7. Lecture automatique ---
function playPause() {
    isAutoPlaying = !isAutoPlaying;
    
    if (isAutoPlaying) {
        playInterval = setInterval(() => {
            if (currentIndex < monParcours.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; 
            }
            renderParcoursStep(currentIndex);
        }, 2000);
    } else {
        clearInterval(playInterval);
    }
}

// --- 8. Initialisation et Détection Pokédex ---
document.addEventListener('DOMContentLoaded', () => {
    renderParcoursStep(currentIndex);

    // Initialisation des éléments pour le Pokédex
    const display = document.getElementById('screen-display');
    const redLight = document.getElementById('red-light');
    const yellowLight = document.getElementById('yellow-light');
    const greenLight = document.getElementById('green-light');

    if (display) {
        display.addEventListener('scroll', () => {
            // Calcul du pourcentage de défilement
            const scrollPercent = (display.scrollTop / (display.scrollHeight - display.clientHeight)) * 100;

            // Logique sensorielle Pokédex
            if (redLight && scrollPercent >= 10) redLight.classList.add('red-on');
            if (yellowLight && scrollPercent >= 50) yellowLight.classList.add('yellow-on');
            if (greenLight && scrollPercent >= 95) greenLight.classList.add('green-on');
        });
    }
});