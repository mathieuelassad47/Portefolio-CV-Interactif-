// --- 1. DONNÉES ---
const monParcours = [
  { "id": 1, "title": "CAP Cuisine", "desc": "La rigueur, l'organisation et la maîtrise des bases culinaires.", "image": "image/Recpetionniste.png" },
  { "id": 2, "title": "Bac Pro Service Accueil", "desc": "Apprentissage du relationnel client et de la gestion de flux.", "image": "image/Recpetionniste.png" },
  { "id": 3, "title": "La Buvette des Montreurs", "desc": "Expérience en gestion de bar et accueil du public.", "image": "image/Recpetionniste.png" },
  { "id": 4, "title": "Déménageur", "desc": "Développement de la force physique et de l'efficacité logistique.", "image": "image/Recpetionniste.png" },
  { "id": 5, "title": "DJ Événementiel", "desc": "Maîtrise de l'ambiance, de la technique sonore et du public.", "image": "image/Evenement Dj .png" },
  { "id": 6, "title": "Transition Numérique", "desc": "Le début de mon virage vers le développement web.", "image": "image/setup dj .png" },
  { "id": 7, "title": "Auto-formation Web", "desc": "Exploration approfondie du HTML, CSS et JS.", "image": "image/setup dj .png" },
  { "id": 8, "title": "Logique de code", "desc": "Développement de ma pensée algorithmique.", "image": "image/setup dj .png" },
  { "id": 9, "title": "Projet Portfolio", "desc": "Création de cette interface immersive.", "image": "image/setup dj .png" },
  { "id": 10, "title": "Maîtrise Git", "desc": "Gestion structurée de mon code.", "image": "image/setup dj .png" },
  { "id": 11, "title": "UI/UX Design", "desc": "Focus sur le ressenti utilisateur.", "image": "image/setup dj .png" },
  { "id": 12, "title": "Intégration", "desc": "Mise en place de systèmes dynamiques.", "image": "image/setup dj .png" },
  { "id": 13, "title": "Veille Technique", "desc": "Suivi des évolutions du monde numérique.", "image": "image/setup dj .png" },
  { "id": 14, "title": "Adaptabilité", "desc": "Capacité à changer d'univers avec succès.", "image": "image/setup dj .png" },
  { "id": 15, "title": "Objectif Développeur", "desc": "Prêt pour de nouveaux défis technologiques.", "image": "image/setup dj .png" }
];

const mesProjets = [
  { "id": 1, "title": "Court Métrage", "desc": "Réalisation vidéo et montage créatif.", "image": "image/projet1.png" },
  { "id": 2, "title": "Mon Mariage", "desc": "Projet personnel : organisation et gestion événementielle.", "image": "image/projet2.png" },
  { "id": 3, "title": "Gameboy Pokédex", "desc": "Interface interactive inspirée du rétro-gaming.", "image": "image/projet3.png" },
  { "id": 4, "title": "L'Algorythm", "desc": "Exploration des structures de données et logique.", "image": "image/projet4.png" },
  { "id": 5, "title": "Dashboard Automatisé", "desc": "Outil de suivi et d'automatisation de données.", "image": "image/projet5.png" },
  { "id": 6, "title": "Gestionnaire de Mots de Passe", "desc": "Application sécurisée de stockage de données.", "image": "image/projet6.png" }
];

// --- 2. ÉTAT & AUDIO ---
let currentIndex = 0;
let currentProjIndex = 0;
let isAutoPlaying = false;
let playInterval = null;

const SoundSystem = {
    library: {
        startup: new Audio('Audio/startup.mp3'),
        click: new Audio('Audio/click.wav'),
        reminder: new Audio('Audio/reminder.mp3'),
        worldCup: new Audio('Audio/Coupe-du-monde-Agen-2026-_.mp3')
    },
    play(name) {
        if (this.library[name]) {
            this.library[name].currentTime = 0; 
            this.library[name].play().catch(e => console.log("Audio bloqué."));
        }
    }
};

// --- 3. RENDU DES DIAPOS ---
function renderStep(index, data, cardId) {
    const card = document.getElementById(cardId);
    const item = data[index];
    if (card && item) {
        card.innerHTML = `
            <div class="badge">${cardId.includes('parcours') ? 'Niveau' : 'Projet'} ${item.id}</div>
            <div class="parcours-image-container">
                <img src="${item.image}" alt="${item.title}" class="gameboy-artwork" />
            </div>
            <h2>${item.title}</h2>
            <p>${item.desc}</p>
            <div class="counter">${index + 1} / ${data.length}</div>
        `;
    }
}

// --- 4. NAVIGATION UNIFIÉE ---
function prev() {
    stopAutoPlay();
    const activeSection = document.querySelector('.tab-content[style*="display: block"]')?.id;
    if (activeSection === 'parcours' && currentIndex > 0) {
        currentIndex--;
        renderStep(currentIndex, monParcours, 'parcours-card');
    } else if (activeSection === 'projets' && currentProjIndex > 0) {
        currentProjIndex--;
        renderStep(currentProjIndex, mesProjets, 'projets-card');
    }
}

function next() {
    stopAutoPlay();
    const activeSection = document.querySelector('.tab-content[style*="display: block"]')?.id;
    if (activeSection === 'parcours' && currentIndex < monParcours.length - 1) {
        currentIndex++;
        renderStep(currentIndex, monParcours, 'parcours-card');
    } else if (activeSection === 'projets' && currentProjIndex < mesProjets.length - 1) {
        currentProjIndex++;
        renderStep(currentProjIndex, mesProjets, 'projets-card');
    }
}

function playPause() {
    isAutoPlaying = !isAutoPlaying;
    const activeSection = document.querySelector('.tab-content[style*="display: block"]')?.id;
    if (isAutoPlaying) {
        playInterval = setInterval(() => {
            if (activeSection === 'parcours') {
                currentIndex = (currentIndex < monParcours.length - 1) ? currentIndex + 1 : 0;
                renderStep(currentIndex, monParcours, 'parcours-card');
            } else if (activeSection === 'projets') {
                currentProjIndex = (currentProjIndex < mesProjets.length - 1) ? currentProjIndex + 1 : 0;
                renderStep(currentProjIndex, mesProjets, 'projets-card');
            }
        }, 1500);
    } else stopAutoPlay();
}

function stopAutoPlay() { isAutoPlaying = false; clearInterval(playInterval); }

// --- 5. CHARGEMENT SECTION ---
function loadSection(sectionId) {
    SoundSystem.play('click');
    document.querySelectorAll('.tab-content').forEach(sec => sec.style.display = 'none');
    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
        if (sectionId === 'parcours') renderStep(currentIndex, monParcours, 'parcours-card');
        if (sectionId === 'projets') renderStep(currentProjIndex, mesProjets, 'projets-card');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderStep(currentIndex, monParcours, 'parcours-card');
    renderStep(currentProjIndex, mesProjets, 'projets-card');
});