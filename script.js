let welcomeScreen = document.querySelector(".welcome")
let quizScreen = document.querySelector(".quiz")
let resultScreen  = document.querySelector(".result")
let startQuizBtn =document.querySelector(".start-quiz-btn")
let answerBtns = document.querySelectorAll(".answer")
let restartQuizBtn = document.querySelector('.restart-quiz-btn')
let quizQuestion = document.querySelector(".quiz_question")
let resultTitle = document.querySelector(".result_title")
let quizCounter = document.querySelector(".quiz_counter span")
let timerElement = document.querySelector(".timer")
let interval
let startTimerValue = 10

function startTimer() {
    timerElement.innerHTML = startTimerValue

    interval = setInterval(function () {
        if (startTimerValue == 1) {
            timerElement.innerHTML = 0
            clearInterval(interval)
            showQuestionResult("red")
            showNextQuestion()
        } else {
            startTimerValue--
            timerElement.innerHTML = startTimerValue
        }
    },1000)
}

let allQuestion = [
    { 
        question: "В якому році Україна получила незалежність?",
        answers: [2000,1991,1986,1998,2004],
        correctAnswer: 1991
    },
    {
        question: "Яке місце Україна посідає за рейтингом народних пісень?",
        answers: [100,54,16,1,3],
        correctAnswer: 1
    },
    {
        question: "Перший президент незалежної України?",
        answers: ["Кучма","Янукович","Ющенко","Кравчук","Порошенко","Зеленський"],
        correctAnswer:"Кравчук"
    },
    {
    question: "Найбільша гора України?",
        answers: ["гора Петрос","гора Піп Іван","гора Говерла","гора Висока","гора Шпиці"],
        correctAnswer:"гора Говерла"
    },
     {
    question: "Коли розпочалась повномасштабна війна?",
        answers: [2022,2014,2010,2020,2017],
        correctAnswer:2022
    },
    {
    question: "Хто надрукованний на 1 гривні?",
        answers: ["П.Скоропадський","В.Великий","М.Грушевський","Л.Українка","Т.Шевченко"],
        correctAnswer:"В.Великий"
    },
      {
    question: "Скільки областей в Україні?",
        answers: [20,24,19,31,28],
        correctAnswer:24
    },
]
let userPoint = 0
let currQuestionNumber = 0

function renderQuestion(quest) {
    quizQuestion.innerHTML = quest.question
    answerBtns.forEach((btn, i) => btn.innerHTML = quest.answers[i])
    startTimer()
}
function showQuestionResult(color) {
    quizScreen.style.background = color

    setTimeout(() => {
        quizScreen.style.background = "#00aef9"
    },600)
}

function disabledButton(option) {
    answerBtns.forEach(btn => btn.disabled = option)
}

function runQuiz() {
    deleteActiveScreen()
    quizScreen.classList.add("active")
    currQuestionNumber = 0
    userPoint = 0
    renderQuestion(allQuestion[currQuestionNumber])
    quizCounter.innerHTML = currQuestionNumber +1
}

function showNextQuestion() {
    disabledButton(true)

    startTimerValue = 10
    setTimeout(() => {
        if(currQuestionNumber == allQuestion.length - 1) {
            finishQuiz()
        } else{
            currQuestionNumber++
            renderQuestion(allQuestion[currQuestionNumber])
            quizCounter.innerHTML = currQuestionNumber
        }
        disabledButton(false)
    },800)
}

function deleteActiveScreen() {
    welcomeScreen.classList.remove("active")
    quizScreen.classList.remove("active")
    resultScreen.classList.remove("active")
}

function finishQuiz() {
    deleteActiveScreen()
    resultScreen.classList.add("active")
    resultTitle.innerHTML = `Молодець, ти пройшов опитування і отримав(ла) ${userPoint} з ${allQuestion.length}`
}

startQuizBtn.addEventListener("click", runQuiz)
restartQuizBtn.addEventListener("click", runQuiz)

answerBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        clearInterval(interval)
      

       if(btn.innerHTML == allQuestion[currQuestionNumber].correctAnswer) {
        userPoint++
        showQuestionResult("lightgreen")
       } else {
        showQuestionResult("red")
       }

       showNextQuestion()
    })   
})       
function shuffle(array)  {
  array.sort(() => Math.random() - 0.5);
}
