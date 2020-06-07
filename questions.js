var startButton = document.getElementById('start-btn')
startButton.addEventListener('click', startGame)

var questionContainerElements = document.getElementById('question-container')
var shuffledQuestions, currentQuestionIndex
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var correctAnswer = document.getElementById('correct-result')
// Timer variables
var countDown = 75
var stopQuiz = false
// High Score variables
var inputBoxPlayerName = document.getElementById('input-box-name')
var navBar = document.getElementById('nav-bar');
navBar.children[0].addEventListener('click', viewHighScore)
var viewAllHighScoresList = document.getElementById('view-high-score')
// Get player information
var nameInput = document.getElementById("input-name")
var getSumbitInfo = document.getElementById("submit-button")
var submissionResponse = document.getElementById("show-results");
var eachGameCount = 0;
var response = [];

function timer() {
  var timerInterval = setInterval(() => {
    if (countDown <= 0 || stopQuiz) {
      clearTimeout(timerInterval);
    } else {
      countDown--
    }
    navBar.children[1].textContent = "Timer: " + countDown
  }, 1000)
}

// Step 1: After clicking on the start button
function startGame() {
  pushFunction ();
  navBar.children[0].classList.add('disabled')
  countDown = 75
  stopQuiz = false
  timer()
  questionContainerElements.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  setNextQuestion()
  clearTimeout()
}

// Step 2: 
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

// Step 2.5: 
function resetState() {
  startButton.classList.add('hide')
  viewAllHighScoresList.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild
      (answerButtonsElement.firstChild)
  }
}

// Step 3: Shows the Question and Answers. Waiting for user to click.
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

// Step 4: User selects Answer and determines if answer is correct/incorrect.  If not more question, function will reset.
function selectAnswer(e) {
  var selectedbutton = e.target
  var correct = selectedbutton.dataset.correct
  setStatusClass(document.body, correct)
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++
    setNextQuestion()
  } else {
    getPlayerName()
    stopQuiz = true
  }
}

// Step 5: Shows users if they are correct/incorrect.
function setStatusClass(element, correct) {
  if (correct) {
    correctAnswer.innerText = "Correct"
  } else {
    correctAnswer.innerText = "Incorrect"
    countDown = countDown - 15;
  }
  setTimeout(() => {
    correctAnswer.innerText = ''
  }, 500)
}

var arrayHighScores = []; //Need to more back up


//Step 6: Get player's name.
function getPlayerName() {
  inputBoxPlayerName.classList.remove('hide')
  questionContainerElements.classList.add('hide');
  if (countDown < 0) {
    countDown = 0
  }
  document.getElementById('show-me-score').innerHTML = 'Your score is ' + countDown
  
  getSumbitInfo.addEventListener('click', (event) => {
    event.preventDefault()
    response = nameInput.value + "-" + countDown + "."
    submissionResponse.textContent = response;
    startButton.classList.remove('hide')
    viewHighScore()
  })
}

function pushFunction() {
  arrayHighScores.push(response)
  console.log(arrayHighScores);
}

//Step 7: View High Scroe
function viewHighScore() {
  startButton.classList.remove('hide')
  startButton.classList.add('float-right')
  viewAllHighScoresList.classList.remove('hide')
  inputBoxPlayerName.classList.add('hide')
  navBar.children[1].textContent = "Timer: 75"
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