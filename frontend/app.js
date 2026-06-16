// --- Navigation des sections (Présentation, Personnalité, etc.) ---
function showSection(id) {
    // 1. Cacher toutes les sections principales
    document.querySelectorAll('.content').forEach(s => s.style.display = 'none');
    
    // 2. Afficher la section demandée
    const target = document.getElementById(id);
    if(target) {
        target.style.display = 'block';
    }
}

// --- Navigation des diapositives (Spécifique au Parcours) ---
// On utilise 0 comme index de base (le 1er élément est à l'index 0)
let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    
    // Vérifier s'il y a bien des slides pour éviter les erreurs
    if (slides.length === 0) return;

    // 1. Cacher la slide actuelle
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].style.display = 'none';
    
    // 2. Calculer le nouvel index (avec gestion du retour à zéro)
    // L'opérateur modulo (%) permet de boucler entre 0 et 5 pour vos 6 métiers
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    // 3. Afficher la nouvelle slide
    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.display = 'block';
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    // S'assurer que seule la première slide est affichée au chargement
    const slides = document.querySelectorAll('.slide');
    slides.forEach((s, index) => {
        s.style.display = (index === 0) ? 'block' : 'none';
        if(index === 0) s.classList.add('active');
    });
});