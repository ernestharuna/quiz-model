import { questions } from "./questions";

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

// Access Question Index, Score, and Questions Pagination
let currentQuestionIndex = 0;
let score = 0;
let travel = document.getElementsByTagName("small")[0];
travel.innerHTML = `${currentQuestionIndex + 1} out of ${questions.length}`;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    nextBtn.innerHTML = "Next";

    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = `${index + 1}. ${answer.text}`;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(params) {
    const selectBtn = params.target;
    const isCorrect = selectBtn.dataset.correct === "true";

    isCorrect ? (selectBtn.classList.add("correct"), score++) : selectBtn.classList.add("incorrect");

    Array.from(answerBtns.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }

    currentQuestionIndex == questions.length ? travel.innerHTML = "Done" : travel.innerHTML = `${currentQuestionIndex + 1} out of ${questions.length}`;
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
})

startQuiz();

console.log(questionElement)
console.log(questions[0].answers[1].text)