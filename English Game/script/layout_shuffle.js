document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-btn");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const buttonsContainer = document.getElementById("buttons-container");
    const ok_button = document.getElementById("ok");

    let score = 0;
    let timeLeft = 30;
    let gameInterval;

    // List of names for the buttons (now includes web design tools and back-end tools as traps)
    const buttonNames = [
        "Photoshop", "Figma","Illustrator", "Adobe XD",
        "InVision", "Webflow","Canva", 
        "Axure",
        // Back-end tools (traps)
        "Node.js", "Express", "MongoDB", "MySQL", 
         "PHP", "Docker", "Kubernetes"
    ];

    // Function to create buttons dynamically
    function createButtons() {
        // Clear existing buttons
        buttonsContainer.innerHTML = "";

        // Create buttons with random names
        buttonNames.forEach(name => {
            const button = document.createElement("button");
            button.textContent = name;
            button.style.left = Math.random() * 80 + "%";
            button.style.top = Math.random() * 80 + "%";

            // Add click event to update score or penalize if it's a back-end tool
            button.addEventListener("click", () => {
                if (isBackendTool(name)) {
                    // Penalize if it's a back-end tool
                    score--;
                    scoreDisplay.textContent = "Score : " + score;
                } else {
                    // Increase score for web design tools
                    score++;
                    scoreDisplay.textContent = "Score : " + score;
                }
                moveButton(button);
            });

            buttonsContainer.appendChild(button);
        });
    }

    // Function to check if the clicked tool is a back-end tool
    function isBackendTool(name) {
        const backendTools = [
            "Node.js", "Express", "MongoDB", "MySQL", "PostgreSQL",
            "Ruby on Rails", "Java Spring", "PHP", "Docker", "Kubernetes"
        ];
        return backendTools.includes(name);
    }

    // Function to move a button to a random position
    function moveButton(button) {
        const maxWidth = buttonsContainer.offsetWidth - button.offsetWidth;
        const maxHeight = buttonsContainer.offsetHeight - button.offsetHeight;

        const randomX = Math.random() * maxWidth;
        const randomY = Math.random() * maxHeight;

        button.style.left = randomX + "px";
        button.style.top = randomY + "px";
    }

    // Function to start the game
    function startGame() {
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = "Score : " + score;
        timerDisplay.textContent = "Temps : " + timeLeft + "s";
        startButton.classList.add("hidden");

        createButtons();

        // Start the timer
        gameInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = "Time : " + timeLeft + "s";

            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    // Function to end the game
    function endGame() {
        clearInterval(gameInterval);
        message = "Time's Up! Your final score: " + score;
        showOverlay(message);
        startButton.classList.remove("hidden");
        buttonsContainer.innerHTML = ""; // Clear buttons
        
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

    // Start button click event
    startButton.addEventListener("click", startGame);
    ok_button.addEventListener("click", closeOverlay)
});
