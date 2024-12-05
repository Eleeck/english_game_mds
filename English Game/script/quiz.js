const correctAnswers = {
    question1: "a",
    question2: "a",
    question3: "a",
    question4: "a",
    question5: "a",
    question6: "a",
    question7: "c",
    question8: "a",
    question9: "a",
    question10: "a"
};

document.getElementById("quiz-form").addEventListener("submit", function(e) {
    e.preventDefault();

    let score = 0;

    for (let question in correctAnswers) {
        const selectedAnswer = document.getElementById(question).value;
        if (selectedAnswer === correctAnswers[question]) {
            score++;
        }
    }

    const result = document.getElementById("result");
    result.innerHTML = `Your score is ${score} out of 10.`;

    if (score === 10) {
        result.style.color = "green";
    } else if (score >= 7) {
        result.style.color = "orange";
    } else {
        result.style.color = "red";
    }
});
