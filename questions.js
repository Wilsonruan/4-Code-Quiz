var startButton = document.getElementById('start-btn')
startButton.addEventListener('click', startGame)

var questionContainerElements = document.getElementById('question-container')
var shuffledQuestions, currentQuestionIndex
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var correctAnswer = document.getElementById('correct-result')
var inCorrectAnswer = document.getElementById('incorrect-result')

// Step 1: After clicking on the start button
function startGame() {
  startButton.classList.add('hide')
  questionContainerElements.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  setNextQuestion()
}

// Step 5: 
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

// Step 2: Shows the Question and Answers. Waiting for user to click.
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

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild
      (answerButtonsElement.firstChild)
  }
}

// Step 3: User selects Answer and determines if answer is correct/incorrect.  If not more question, function will reset.
function selectAnswer(e) {
  var selectedbutton = e.target
  var correct = selectedbutton.dataset.correct
  setStatusClass(document.body, correct)
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++
    setNextQuestion()
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}


// function nextQuestion() {
  
  
// }

// Step 4: Shows users if they are correct/incorrect.
function setStatusClass(element, correct) {
  if (correct) {
    correctAnswer.classList.remove('hide')
    setTimeout(resultsDisappear, 2000)
  } else {
    inCorrectAnswer.classList.remove('hide')
    setTimeout(resultsDisappear, 2000)
  }
}

function resultsDisappear() {
  correctAnswer.classList.add('hide')
  inCorrectAnswer.classList.add('hide')
}

var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: [
      { text: "strings", correct: false },
      { text: "booleans", correct: false },
      { text: "alerts", correct: true },
      { text: "numbers", correct: false },]
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: [
      { text: "quotes", correct: false },
      { text: "curly brackets", correct: false },
      { text: "parentheses", correct: true },
      { text: "nsquare brackets", correct: false },]
  },
  {
    title: "Which of the following will write Hello World in an alert box?",
    choices: [
      { text: "msg('Hello World')", correct: false },
      { text: "alertBox('Hello World')", correct: false },
      { text: "alert('Hello World')", correct: true },
      { text: "msgBox('Hello World')", correct: false },]
  },
  {
    title: "How to call a function named myfunction",
    choices: [
      { text: "call myfunction", correct: false },
      { text: "myfunction call", correct: false },
      { text: "myfunction()", correct: true },
      { text: "()myfunction", correct: false },]
  },
  {
    title: "What does this line mean 'while (exitNow == true)'?",
    choices: [
      { text: "No meaning", correct: false },
      { text: "exit while when exitNow is false", correct: false },
      { text: "exit while when exitNow is true", correct: true },
      { text: "All Above", correct: false },]
  },
];