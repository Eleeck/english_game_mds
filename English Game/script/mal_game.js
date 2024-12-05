let attackInterval = 3000; // Temps initial entre les attaques (en ms)
const attackReduction = 115; // Réduction du temps entre chaque attaque
const gameDuration = 45 * 1000; // Durée totale du jeu (40 secondes)
let attackTimer, gameTimer;

// Initialisation des ordinateurs
const computers = [
    document.getElementById('computer1'),
    document.getElementById('computer2'),
    document.getElementById('computer3'),
    document.getElementById('computer4'),
    document.getElementById('computer5'),
    document.getElementById('computer6'),
];

// Écoute des clics pour désactiver les alertes
computers.forEach((computer) => {
    computer.addEventListener('click', () => {
        if (computer.classList.contains('alert')) {
            computer.classList.remove('alert');
        }
    });
});

// Fonction pour déclencher une attaque
function triggerAttack() {
    const availableComputers = computers.filter(
        (computer) => !computer.classList.contains('alert')
    );

    if (availableComputers.length === 0) {
        endGame('Defeat ! All your computers are done...');
        return;
    }

    const randomComputer =
        availableComputers[Math.floor(Math.random() * availableComputers.length)];
    randomComputer.classList.add('alert');

    attackTimer = setTimeout(triggerAttack, attackInterval);
    attackInterval = Math.max(500, attackInterval - attackReduction); // Réduction du temps entre les attaques
}

// Fonction pour démarrer le jeu
function startGame() {
    resetGame();

    // Démarrage du compte à rebours pour la fin du jeu
    gameTimer = setTimeout(() => {
        endGame('Victory ! You protected the server !');
    }, gameDuration);

    // Démarrage des attaques
    triggerAttack();
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    clearTimeout(gameTimer);
    clearTimeout(attackTimer);
    attackInterval = 3000;

    // Réinitialisation des états des ordinateurs
    computers.forEach((computer) => computer.classList.remove('alert'));
}

// Fonction pour terminer le jeu
function endGame(message) {
    clearTimeout(gameTimer);
    clearTimeout(attackTimer);
    showOverlay(message);
}

// Fonction pour afficher un message d'overlay
function showOverlay(message) {
    const overlay = document.getElementById('endGameOverlay');
    const messageElement = document.getElementById('endGameMessage');

    messageElement.textContent = message;
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
}

// Fonction pour fermer l'overlay
function closeOverlay() {
    const overlay = document.getElementById('endGameOverlay');
    overlay.style.visibility = 'hidden';
    overlay.style.opacity = '0';
}
