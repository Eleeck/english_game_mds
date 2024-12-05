document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ad-quiz-form");
    const endGameOverlay = document.getElementById("endGameOverlay");
    const endGameMessage = document.getElementById("endGameMessage");

    // Liste des IDs des questions
    const questionIds = [
        "title-question",
        "image-question",
        "color-question",
        "cta-question",
        "feature-question",
        "platform-question",
        "duration-question",
        "audience-question",
        "placement-question",
        "timing-question"
    ];

    // Fonction pour mélanger les options dans chaque select
    function shuffleOptions(selectElement) {
        const options = Array.from(selectElement.options);
        const firstOption = options.shift(); // Retirer la première option (texte par défaut)

        // Algorithme de Fisher-Yates pour mélanger
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        // Réajouter la première option en tête
        options.unshift(firstOption);

        // Effacer les options existantes et ajouter les mélangées
        selectElement.innerHTML = "";
        options.forEach(option => selectElement.add(option));
    }

    // Mélanger les options pour chaque question
    questionIds.forEach(questionId => {
        const selectElement = document.getElementById(questionId);
        if (selectElement) {
            shuffleOptions(selectElement);
        }
    });

    // Gestionnaire d'événement pour la soumission du formulaire
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let totalScore = 0; // Initialisation du score total
        let allAnswered = true; // Vérifie si toutes les questions ont été répondues

        questionIds.forEach(questionId => {
            const question = document.getElementById(questionId);
            const selectedOption = question.value;

            if (selectedOption) {
                totalScore += parseInt(selectedOption, 10); // Ajouter le score de l'option sélectionnée
            } else {
                allAnswered = false; // Une question n'a pas été répondue
            }
        });

        // Validation et affichage des résultats
        if (!allAnswered) {
            alert("Please answer all questions before submitting!");
        } else {
            let message;
            if (totalScore >= 230) {
                message = `Excellent! You've mastered ad creation. Your score: ${totalScore} % of interest`;
            } else if (totalScore >= 135) {
                message = `Good job! Your sells are going up. Your score: ${totalScore} % of interest`;
            } else if (totalScore >= 95) {
                message = `You understand! But there's room for improvement. Your score: ${totalScore} % of interest`;
            } else {
                message = `Keep learning to create better ads! Your score: ${totalScore} % of interest`;
            }

            // Afficher le message final
            endGameMessage.textContent = message;
            endGameOverlay.style.visibility = "visible";
        }
    });
});

// Fonction pour fermer la superposition
function closeOverlay() {
    const endGameOverlay = document.getElementById("endGameOverlay");
    endGameOverlay.style.visibility = "hidden";
}
