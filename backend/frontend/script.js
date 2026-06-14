// 1. Données de ton parcours
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

// État du défilement manuel
let currentIndex = 0;

// 2. Fonction principale de navigation (Onglets)
function loadSection(sectionId) {
    const sections = document.querySelectorAll('.tab-content');
    sections.forEach(sec => sec.style.display = 'none');

    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
    }

    // Si on clique sur parcours, on initialise l'affichage manuel
    if (sectionId === 'parcours') {
        currentIndex = 0; // On recommence au début
        updateParcoursView();
    }
}

// 3. Mise à jour de l'affichage du parcours (Défilement manuel)
function updateParcoursView() {
    const parcoursContainer = document.getElementById('parcours');
    const item = monParcours[currentIndex];
    
    parcoursContainer.innerHTML = `
        <div class="parcours-card">
            <span class="badge">Niveau ${item.id}</span>
            <h2>${item.title}</h2>
            <p>${item.desc}</p>
        </div>
        <div class="counter">${currentIndex + 1} / ${monParcours.length}</div>
    `;
}

// 4. Fonctions de contrôle de la console
function prev() { 
    if (currentIndex > 0) {
        currentIndex--;
        updateParcoursView();
    }
}

function next() { 
    if (currentIndex < monParcours.length - 1) {
        currentIndex++;
        updateParcoursView();
    }
}

function playPause() { 
    console.log("Lecture/Pause de la bande son"); 
}