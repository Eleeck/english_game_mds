// navigator_matching.js
const navigators = [
    { name: "Mosaic", year: "1993", icon: "bi-arrow-repeat" },
    { name: "Netscape", year: "1994", icon: "bi-globe" },
    { name: "Internet Explorer", year: "1995", icon: "bi-hourglass-top" },
    { name: "Firefox", year: "2002", icon: "bi-browser-firefox" },
    { name: "Chrome", year: "2008", icon: "bi-browser-chrome" },
    { name: "Bing", year: "2009", icon: "bi-bing" }, 
    { name: "Safari", year: "2003", icon: "bi-browser-safari" }, 
    { name: "Edge", year: "2015", icon: "bi-browser-edge" }
];

let score = 0;

// Shuffle array utility function
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    const gameContainer = document.getElementById("game");
    gameContainer.innerHTML = "";
    score = 0;

    const shuffledNavigators = shuffleArray([...navigators]);
    const shuffledYears = shuffleArray([...navigators.map(nav => nav.year)]);

    shuffledNavigators.forEach((navigator, index) => {
        // Container for each navigator
        const navContainer = document.createElement("div");
        navContainer.className = "col-md-3 text-center mb-4";

        // Navigator name
        const navName = document.createElement("p");
        navName.className = "fw-bold mb-2";
        navName.textContent = navigator.name;

        // Draggable icon box
        const navBox = document.createElement("div");
        navBox.className = "nav-box";
        navBox.id = `nav-${index}`;
        navBox.dataset.year = navigator.year; // Attach correct year
        navBox.dataset.name = navigator.name; // Attach name for debugging
        navBox.innerHTML = `<i class="bi ${navigator.icon}"></i>`;
        navBox.draggable = true;
        navBox.ondragstart = (event) => drag(event);

        // Add name and box
        navContainer.appendChild(navName);
        navContainer.appendChild(navBox);

        // Drop zone
        const dropZone = document.createElement("div");
        dropZone.className = "drop-zone";
        dropZone.id = `dropzone-${index}`;
        dropZone.ondragover = (event) => allowDrop(event);
        dropZone.ondrop = (event) => drop(event, index);

        // Dropdown menu
        const dropdown = document.createElement("select");
        dropdown.className = "form-select mt-2";
        dropdown.id = `select-${index}`;
        dropdown.innerHTML = `
            <option value="" disabled selected>Choose the year</option>
            ${shuffledYears.map((year) => `<option value="${year}">${year}</option>`).join("")}
        `;

        dropZone.appendChild(dropdown);
        gameContainer.appendChild(navContainer);
        gameContainer.appendChild(dropZone);
    });

    updateScore();
}


function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event, index) {
    event.preventDefault();
    const navId = event.dataTransfer.getData("text");
    const dropZone = document.getElementById(`dropzone-${index}`);
    const navBox = document.getElementById(navId);

    if (!dropZone.contains(navBox)) {
        dropZone.appendChild(navBox);
    }
}

function verify() {
    score = 0; // Reset score
    let correct = true;

    navigators.forEach((navigator, index) => {
        const dropZone = document.getElementById(`dropzone-${index}`);
        const dropdown = document.getElementById(`select-${index}`);
        const navBox = dropZone.querySelector(".nav-box");

        // Reset styles
        dropZone.classList.remove("correct", "wrong");

        if (navBox && navBox.dataset.year === dropdown.value) {
            dropZone.classList.add("correct");
            score += 10;
        } else {
            dropZone.classList.add("wrong");
            correct = false;
        }
    });

    const message = correct
        ? "Well done! All matches are correct."
        : "Some matches are incorrect. Try again!";
    const resultMessageElement = document.getElementById("resultMessage");
    resultMessageElement.textContent = message;
    resultMessageElement.style.color = correct ? "green" : "red";

    new bootstrap.Modal(document.getElementById("resultModal")).show();
    updateScore();
}

function updateScore() {
    document.getElementById("score").textContent = `Score: ${score}`;
}
