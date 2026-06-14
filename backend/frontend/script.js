const monParcours = [
    { id: 1, title: "CAP Cuisine", img: "cuisine.jpg", desc: "La rigueur du geste..." },
    { id: 2, title: "Transition", img: "code.jpg", desc: "L'apprentissage de la logique..." },
    // ... ajoute tes 15 objets ici
];

function loadSection(section) {
    const screen = document.getElementById('content');
    if(section === 'parcours') {
        screen.innerHTML = `<h2>Mon Parcours</h2>` + 
        monParcours.map(item => `<div class="card">${item.title}</div>`).join('');
    } else {
        screen.innerHTML = `<h2>${section}</h2><p>Contenu à venir...</p>`;
    }
}