const eventsData = [
    { year: 1969, text: "The first ARPANET message is sent." },
    { year: 1983, text: "The Domain Name System (DNS) is introduced." },
    { year: 1989, text: "Tim Berners-Lee invents the World Wide Web." },
    { year: 1998, text: "Google is founded by Larry Page and Sergey Brin." },
    { year: 2004, text: "Facebook is launched by Mark Zuckerberg." },
    { year: 2007, text: "The first iPhone is launched by Apple." },
];

let shuffledEvents = [];

document.addEventListener("DOMContentLoaded", () => {
    shuffleAndCreateList();
    document.getElementById("check-order").addEventListener("click", checkOrder);
    document.getElementById("reset-game").addEventListener("click", shuffleAndCreateList);
});

// Mélanger et créer la liste des événements
function shuffleAndCreateList() {
    shuffledEvents = [...eventsData].sort(() => Math.random() - 0.5);
    createDraggableList();
    resetResult();
}

function createDraggableList() {
    const eventsContainer = document.getElementById("events");
    eventsContainer.innerHTML = "";

    shuffledEvents.forEach((event, index) => {
        const item = document.createElement("div");
        item.classList.add("event", "list-group-item");
        item.textContent = `${event.text}`;
        item.setAttribute("data-year", event.year);
        item.setAttribute("draggable", "true");
        item.setAttribute("id", `event-${index}`);
        eventsContainer.appendChild(item);
    });

    addDragAndDrop();
}

function addDragAndDrop() {
    const events = document.querySelectorAll(".event");
    let draggedItem = null;

    events.forEach((event) => {
        event.addEventListener("dragstart", (e) => {
            draggedItem = event;
            setTimeout(() => {
                event.style.display = "none";
            }, 0);
        });

        event.addEventListener("dragend", () => {
            setTimeout(() => {
                draggedItem.style.display = "block";
                draggedItem = null;
            }, 0);
        });

        event.addEventListener("dragover", (e) => e.preventDefault());

        event.addEventListener("drop", (e) => {
            e.preventDefault();
            if (draggedItem) {
                const target = e.target;
                if (target.classList.contains("event")) {
                    const parent = target.parentNode;
                    parent.insertBefore(draggedItem, target.nextSibling);
                }
            }
        });

        // Support tactile
        event.addEventListener("touchstart", (e) => {
            draggedItem = event;
            e.target.style.opacity = 0.5;
        });

        event.addEventListener("touchend", (e) => {
            e.target.style.opacity = 1;
            draggedItem = null;
        });

        event.addEventListener("touchmove", (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);

            if (target && target.classList.contains("event") && target !== draggedItem) {
                const parent = target.parentNode;
                parent.insertBefore(draggedItem, target.nextSibling);
            }
        });
    });
}

function checkOrder() {
    const events = document.querySelectorAll(".event");
    const years = Array.from(events).map((event) => parseInt(event.getAttribute("data-year")));
    const correctYears = eventsData.map((event) => event.year);

    const resultElement = document.getElementById("result");
    resultElement.classList.remove("text-success", "text-danger");

    if (JSON.stringify(years) === JSON.stringify(correctYears)) {
        resultElement.textContent = "Correct! 🎉 You organized the events in the right order.";
        resultElement.classList.add("text-success");
    } else {
        resultElement.textContent = "Incorrect! Try again. 💡";
        resultElement.classList.add("text-danger");
    }
}

function resetResult() {
    const resultElement = document.getElementById("result");
    resultElement.textContent = "";
    resultElement.classList.remove("text-success", "text-danger");
}
