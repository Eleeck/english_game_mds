
let gameStarted = false;
let timeLeft = 10;
let timerInterval;
let popupDisplayed = false;
let popup2Displayed = false;

// Démarrage du jeu après le clic sur "Next"
document.getElementById("welcome-next").addEventListener("click", function() {

    console.log("Next button clicked!"); // Pour vérifier si le bouton "Next" est bien cliqué.
    
    // Masque l'écran de bienvenue
    document.getElementById("welcome-screen").classList.add("d-none");
    // Affiche l'écran du formulaire
    document.getElementById("form-screen").classList.remove("d-none");
    document.getElementById("form-screen").classList.add("active");
    // Démarre le timer
    startTimer();
});

// Démarrer le timer
function startTimer() {
    if (!gameStarted) {
        gameStarted = true;
        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById("timer").textContent = timeLeft;

            // Afficher la première popup après 5 secondes
            if (timeLeft === 5 && !popupDisplayed) {
                popupDisplayed = true;
                showPopup("popup");
            }

            // Afficher la deuxième popup après 3 secondes supplémentaires
            if (timeLeft === 2 && !popup2Displayed) {
                popup2Displayed = true;
                showPopup("popup2");
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame("Time's up! You lost 10 Bitcoins!");
            }
        }, 1000);
    }
}

// Afficher la popup
function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.remove("d-none");
    popup.classList.add("active");
}

// Fermeture des popups
document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("popup").classList.remove("active");
    document.getElementById("popup").classList.add("d-none");
});

document.getElementById("close-popup2").addEventListener("click", () => {
    document.getElementById("popup2").classList.remove("active");
    document.getElementById("popup2").classList.add("d-none");
});

// Événements pour les boutons inutiles
document.getElementById("useless-button-1").addEventListener("click", function() {
    alert("You clicked a useless button! But nothing happens.");
});

document.getElementById("useless-button-2").addEventListener("click", function() {
    alert("Clicking this does absolutely nothing. Try something else!");
});

// Soumettre le formulaire
document.getElementById("form-submit").addEventListener("click", function() {
    console.log("Submit button clicked!")
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");

    // Vérification des champs
    if (nameField.value === "" || emailField.value === "") {
        alert("Please complete all fields!"); // Message d'erreur si un champ est vide
    } else {
        // Si tous les champs sont remplis, on peut afficher un message de succès
        endGame("You submitted the form successfully!");
    }
});

// Événement pour le bouton "???"
document.getElementById("rickroll-button").addEventListener("click", function() {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Redirige vers la vidéo Rickroll
});

// Fonction pour terminer le jeu et afficher le message
function endGame(message) {
    // Masquer l'écran du formulaire et afficher l'écran de fin
    document.getElementById("form-screen").classList.remove("active");
    document.getElementById("form-screen").classList.add("d-none");
    
    // Afficher l'écran de fin
    document.getElementById("end-screen").classList.remove("d-none");
    document.getElementById("end-screen").classList.add("active");
    
    // Afficher le message de fin
    document.getElementById("end-message").textContent = message;

    // Ajouter un bouton pour redémarrer le jeu
    document.getElementById("restart-game").classList.remove("d-none");
}

// Recommencer le jeu
document.getElementById("restart-game").addEventListener("click", function() {
    // Recharger la page pour recommencer le jeu
    location.reload();
});
