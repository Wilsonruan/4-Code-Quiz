var startButton = document.getElementById('start-btn')
startButton.addEventListener('click', startGame)
var questionContainerElements = document.getElementById('question-container')
var shuffledQuestions, currentQuestionIndex
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')

function startGame() {
  startButton.classList.add('hide')
  questionContainerElements.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  setNextQuestion()
}

function setNextQuestion() {
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(title) {
  questionElement.innerText = (title.title)
  title.choices.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn-primary')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function selectAnswer() {

}


var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: [
        {text: "strings", correct: false}, 
        {text: "booleans", correct: false},
        {text: "alerts", correct: true},
        {text: "numbers", correct: false},]
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: [
        {text: "quotes", correct: false}, 
        {text: "curly brackets", correct: false},
        {text: "parentheses", correct: true},
        {text: "nsquare brackets", correct: false},]
    }
  ];