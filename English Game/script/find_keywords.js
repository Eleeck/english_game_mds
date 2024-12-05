const keywords = ["SEO", "SEA", "Keywords", "Balise", "Google", "Ranking", "Backlink", "Crawling"]; 
const distractors = ["Chat", "Solution", "Airplane", "Pizza", "Driver", "Breach", "Shop", "Prime"]; 
const traps = ["SE0", "Gogle", "Key", "Rakning", "Blaklink", "Crawler", "-word"]; 
const allWords = [...keywords, ...distractors, ...traps].sort(() => Math.random() - 0.5); 

let score = 0; let startTime; let timer; const gameDuration = 90000; // Game duration of 90 seconds 
const foundKeywords = new Set(); function setupGame() { const container = document.getElementById("game"); 
    container.innerHTML = "";
    allWords.forEach((word) => { const button = document.createElement("button");
    button.textContent = word; 
    button.className = "btn btn-outline-secondary m-2"; 
    button.onclick = () => checkWord(word, button); 
    container.appendChild(button); }); 
    startTime = Date.now(); 
    timer = setInterval(updateTimer, 1000); 
    setTimeout(() => stopGame("Time's up!"), gameDuration); 
} 
function updateTimer() { 
    const elapsedTime = Date.now() - startTime; 
    const seconds = Math.floor((elapsedTime / 1000) % 60); 
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60); 
    document.getElementById('chrono').textContent = `Time: ${(minutes < 10 ? "0" + minutes : minutes)}:${(seconds < 10 ? "0" + seconds : seconds)}`;
 } 

 function checkWord(word, button) { 
    if (keywords.includes(word)) { 
        score += 10; foundKeywords.add(word); 
        button.className = "btn btn-success"; // Check if all keywords have been found 
        if (foundKeywords.size === keywords.length) { 
            stopGame("Congratulations! You've found all keywords."); 
            return; 
        } 
    } else if (traps.includes(word)) { 
        score -= 10; 
        button.className = "btn btn-warning"; 
    } else { 
        score -= 5; 
        button.className = "btn btn-danger"; 
    } 
    button.disabled = true; 
    document.getElementById("score").textContent = `Score: ${score}`; 
} 


function stopGame(reason) { 
    clearInterval(timer); 
    const resultDiv = document.getElementById("result"); 
    if (reason === "Time's up!" || reason === "The user stopped the game.") { 
        if (score >= 60) { 
            resultDiv.textContent = "Win! Your score is " + score; 
            resultDiv.className = 'alert alert-success'; 
        } else if (score >= 40) { 
            resultDiv.textContent = "Retry! Your score is " + score; 
            resultDiv.className = 'alert alert-warning'; 
        } else { 
            resultDiv.textContent = "Lose! Your score is " + score; 
            resultDiv.className = 'alert alert-danger'; 
        }
     } else { 
        resultDiv.textContent = reason; 
        resultDiv.className = 'alert alert-info'; 
    } document.querySelectorAll("button").forEach(button => button.disabled = true); // Disable all buttons 
}

    
    
    document.addEventListener("DOMContentLoaded", () => { 
        setupGame(); 
        document.getElementById("score").textContent = "Score: 0"; 
        document.getElementById("stopButton").addEventListener('click', () => { 
            stopGame("The user stopped the game."); 
        }); 
    });