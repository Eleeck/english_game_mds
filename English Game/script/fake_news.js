const questions = [
    { text: "NASA confirms Earth will go dark for six days due to a massive solar storm.", isTrue: false, link: "https://www.nasa.gov/science-research/heliophysics/nasa-enabled-ai-predictions-may-give-time-to-prepare-for-solar-storms/?form=MG0AV3" },
    { text: "Study shows that eating chocolate every day can help you lose weight.", isTrue: false, link: "https://www.cbsnews.com/news/how-the-chocolate-diet-hoax-fooled-millions/#:~:text=Eating%20chocolate%20every%20day%20can,was%20all%20an%20elaborate%20hoax." },
    { text: "Scientists have discovered a new dinosaur species in Australia.", isTrue: true, link: "https://www.queensland.com/sg/en/plan-your-holiday/news-and-articles/queensland-news/new-dinosaur-species-discovered-in-queensland#:~:text=Dinosaur%20remains%20found%20in%20Outback,the%20largest%20in%20the%20world." },
    { text: "The Eiffel Tower was originally intended for Barcelona.", isTrue: true, link: "https://artsandculture.google.com/story/8-things-you-never-knew-about-the-eiffel-tower/1wUh9aeRGfNFJQ?hl=en" },
    { text: "An ancient city has been discovered on Mars by NASA's rover.", isTrue: false, link: "https://science.nasa.gov/mission/msl-curiosity/" },
    { text: "A man has survived a lightning strike seven times.", isTrue: true, link: "https://www.guinnessworldrecords.com/world-records/most-lightning-strikes-survived" },
    { text: "Robots will soon replace all human jobs.", isTrue: false, link: "https://www.bu.edu/cas/the-big-question-will-robots-take-our-jobs/" },
    { text: "Stars can communicate with each other through light signals.", isTrue: false, link: "https://science.nasa.gov/science-research/planetary-science/listening-stars/" },
    { text: "Aliens have visited Earth and left evidence of their presence.", isTrue: false, link: "https://www.nasa.gov/solar-system/planets/mars/do-aliens-exist-we-asked-a-nasa-scientist-episode-5/" },
    { text: "Scientists have created a time machine.", isTrue: false, link: "https://www.space.com/21675-time-travel.html" },
    { text: "Crows can talk like humans.", isTrue: false, link: "https://birdfact.com/articles/can-crows-talk#:~:text=Crows%20that%20live%20in%20captivity,thoughts%20with%20people%20using%20speech." },
    { text: "Unicorns are real and have been discovered in the Amazon rainforest.", isTrue: true, link: "https://www.nationalgeographic.com/animals/article/unicorn-praying-mantis-discovered-atlantic-forest" },
    { text: "Humans can fly without wings thanks to new technology.", isTrue: false, link: "https://youtu.be/xMHJGd3wwZk?si=96AakEa0ItyeHm_N" },
    { text: "Ghosts can be captured and filmed with a special camera.", isTrue: false, link: "https://youtu.be/xMHJGd3wwZk?si=96AakEa0ItyeHm_N" },
    { text: "Fish can live on land for hours without drowning.", isTrue: false, link: "https://www.nationalgeographic.com/animals/article/fish-air" }
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    const questionElement = document.getElementById('question');
    questionElement.innerHTML = `${questions[currentQuestionIndex].text}`;
}

function captureAnswer(isAnswerTrue) {
    questions[currentQuestionIndex].userAnswer = isAnswerTrue;
}

function checkAnswer(isTrue) {
    captureAnswer(isTrue); // Store the user's answer
    
    if (questions[currentQuestionIndex].isTrue === isTrue) {
        score++;
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const resultElement = document.getElementById('result');
    let resultText = `Your total score is ${score} out of ${questions.length}.<br><br>`;

    // Loop through each question and show whether the answer was correct
    questions.forEach((question, index) => {
        const userAnswer = question.userAnswer; // The user's answer
        const correctAnswerText = question.isTrue ? "TRUE" : "FALSE";
        const userAnswerText = userAnswer ? "TRUE" : "FALSE";
        
        resultText += `Question ${index + 1}: ${question.text} <br>`;
        resultText += `Your answer: ${userAnswerText} <br>`;
        resultText += `Correct answer: ${correctAnswerText} <br>`;
        resultText += `<a href="${question.link}" target="_blank">Read more</a><br><br>`;
    });

    resultElement.innerHTML = resultText;
    document.getElementById('quiz-container').style.display = 'none';
}


document.addEventListener('DOMContentLoaded', () => {
    showQuestion();
});