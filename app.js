const difficulties = {
    easy: [1, 50],
    medium: [1, 100],
    hard: [1, 200]
}

const difficultyNums = {
    easy: 0,
    medium: 1,
    hard: 2,
}

let difficultyChosen = "easy";

let currentAnswer = 0;

function randomNumber(min, max = 100, canBeNegative = false, alwaysNegative = false) {
    // 1 is negative
    const isNegative = canBeNegative && Math.floor(Math.random() * 2) > 0 || alwaysNegative;
    const answer = min + Math.floor(Math.random() * (max - min));

    return isNegative ? -answer : answer;
}

function formatQuestion(first, second) {
    const firstSign = first < 0 ? "-" : "+";
    const secondSign = second < 0 ? "-" : "+";

    let formated = `${first} ${secondSign} ${secondSign === "-" ? -second : second}`;
    return formated;
}

function getQuestion(difficulty, canBeNegative = false) {
    const [min, max] = difficulties[difficulty];
    const firstNum = randomNumber(min, max, true, true);
    const secondNum = randomNumber(min, max, true);
    const question = {
        question: formatQuestion(firstNum, secondNum),
        answer: firstNum + secondNum,
    };
    return question;
}

function highlightSelected() {
    difficultyButtons.forEach((btn) => {
        btn.classList.remove("selected");
    });
    difficultyButtons[difficultyNums[difficultyChosen]].classList.add("selected");
}

function fillQuestion() {
    let thisQuestion = getQuestion(difficultyChosen);
    question.innerText = thisQuestion.question;
    currentAnswer = thisQuestion.answer;

}

function isCorrect(submittedAnswer) {
    if (submittedAnswer === currentAnswer) {
        tryAgain.style.display = "none";
        fillQuestion();
        inputBox.value = "";
    } else {
        tryAgain.style.display = "block";
        tryAgain.classList.add("shake");
    }
    setTimeout(function() {
        tryAgain.classList.remove("shake");
    }, 250)
}

const difficultyButtons = document.querySelectorAll("#difficulty button");
const inputBox = document.querySelector("input");
const question = document.querySelector("#question");
const submit = document.querySelector("#submit");
const tryAgain = document.querySelector("#try-again");


// init
fillQuestion();


difficultyButtons.forEach((bob) => {
    bob.addEventListener("click", () => {
        difficultyChosen = bob.innerText.toLowerCase();
        highlightSelected();
        fillQuestion();
    })
})

submit.addEventListener("click", function() {
    let submittedAnswer = parseInt(inputBox.value);
    isCorrect(submittedAnswer);
});
inputBox.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        let submittedAnswer = parseInt(inputBox.value);
        isCorrect(submittedAnswer);
    }
});

