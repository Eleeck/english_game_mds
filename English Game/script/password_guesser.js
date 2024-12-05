const passwords = {
    simple: { password: "123456", hints: ["Hint 1: It only contains numbers: 6 numbers.", "Hint 2: It is very simple and short.", "Hint 3: 'Start to count from 1 to 6'"] },
    common: { password: "password123", hints: ["Hint 1: It is a word.", "Hint 2: It contains letters and numbers : length : 11.", "Hint 3: It starts with 'p' and end with '3'."] },
    secure: { password: "Secure123!", hints: ["Hint 1: It contains a special character : '!' .", "Hint 2: It contains numbers and letters too.", "Hint 3: It starts with 'S' and is secured."] },
    complex: { password: "Complex#2024", hints: ["Hint 1: It contains a special character : '#' .", "Hint 2: It contains numbers and uppercase letters.", "Hint 3: It starts with 'C' and is complex."] },
    impossible: { password: "Cf%m5?2Oxbz", hints: ["Hint 1: The user used an app to create this password.", "Hint 2: It contains numbers,uppercase letters, lower ones and special characters.", "Hint 3: This is a real secure password : ''Cf%m5?2Oxbz'' :-) ."] }

};

let attempts = 0;
let time = 0;
let timer; let

function checkPassword() {
    const difficulty = document.getElementById('difficultySelect').value;
    const passwordInput = document.getElementById('passwordInput').value;
    const resultDiv = document.getElementById('result');
    const hintsDiv = document.getElementById('hints');

    if (!difficulty) {
        resultDiv.textContent = 'Please select a difficulty level.';
        resultDiv.className = 'alert alert-warning mt-3';
        return;
    }

    const selectedPassword = passwords[difficulty];
    attempts++;
    
    if (passwordInput === selectedPassword.password) {
        clearInterval(timer); // Stop the timer if the password is correct
        const elapsedTime = Date.now() - startTime; const seconds = Math.floor((elapsedTime / 1000) % 60); 
        const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60); 
        const timeString = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        resultDiv.textContent = `Congratulations! You guessed the password in ${attempts} attempts and in ${timeString} sec.`;
        resultDiv.className = 'alert alert-success mt-3';
        hintsDiv.textContent = '';

    } else {
        resultDiv.textContent = 'Incorrect password.';
        resultDiv.className = 'alert alert-danger mt-3';
        
        // Provide hint
        let hint = '';
        if (attempts <= selectedPassword.hints.length) {
            hint = selectedPassword.hints[attempts - 1];
        } else {
            hint = 'Try again, you are getting closer!';
        }
        hintsDiv.textContent = hint;
    }
}



function startGame() { 
    startTime = Date.now(); timer = setInterval(updateTimer, 1000); setTimeout(stopGame, 150000); // 2 minutes 30 seconds = 150000 milliseconds 
    } 
    function updateTimer() { 
        const elapsedTime = Date.now() - startTime; 
        const seconds = Math.floor((elapsedTime / 1000) % 60); 
        const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60); 
        document.getElementById('chrono').textContent = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds); 
    } 
    function stopGame() { 

        clearInterval(timer); 
        resultDiv.textContent =  `The user changed his password. You failed to break in.`; 
    }

