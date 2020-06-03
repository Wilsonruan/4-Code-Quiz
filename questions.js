var startButton = document.getElementById('start-btn')
startButton.addEventListener('click', startGame)
var questionContainerElements = document.getElementById('question-container')

function startGame() {
  startButton.classList.add('hide')
  questionContainerElements.classList.remove('hide')
}

function setNextQuestion() {

}

function selectAnswer() {

}


var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    }
  ];