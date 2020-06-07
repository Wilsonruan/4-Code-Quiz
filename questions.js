var startButton = document.getElementById('start-btn');  // Start Button
startButton.addEventListener('click', startGame);
var navBar = document.getElementById('nav-bar'); // Nav Bar
navBar.children[0].addEventListener('click', viewHighScore);
var questionContainerElements = document.getElementById('question-container'); //Question Container
var shuffledQuestions, currentQuestionIndex;
var countDown = 75; // Timer variables
var stopQuiz = false;
var inputBoxPlayerName = document.getElementById('input-box-name'); // High Score variables
var submissionResponse = document.getElementById("show-results"); // Get player information
var response = [];
var arrayHighScores = [];

function timer() {
  var timerInterval = setInterval(() => {
    if (countDown <= 0 || stopQuiz) {
      getPlayerName()
      clearTimeout(timerInterval);
    } else {
      countDown--
    }
    navBar.children[1].textContent = "Timer: " + countDown
  }, 1000)
}

function startGame() { // Step 1: After clicking on the start button
  navBar.children[0].classList.add('disabled')
  countDown = 75
  stopQuiz = false
  questionContainerElements.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  timer()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(title) { // Step 2: Shows the Question and Answers. Waiting for user to click.
  startButton.classList.add('hide')
  submissionResponse.classList.add('hide')
  while (questionContainerElements.children[1].firstChild) {
    questionContainerElements.children[1].removeChild
      (questionContainerElements.children[1].firstChild)
  }
  questionContainerElements.children[0].innerText = (title.title)
  title.choices.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn-primary')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    questionContainerElements.children[1].appendChild(button)
  })
}

function selectAnswer(e) { // Step 3: User selects Answer and determines if answer is correct/incorrect.  If not more question, function will reset.
  var selectedbutton = e.target
  var correct = selectedbutton.dataset.correct
  showAnswer(document.body, correct)
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++
    showQuestion(shuffledQuestions[currentQuestionIndex])
  } else {
    stopQuiz = true
  }
}

function showAnswer(element, correct) { // Step 4: Shows users if they are correct/incorrect.
  if (correct) {
    questionContainerElements.children[2].innerText = "Correct"
  } else {
    questionContainerElements.children[2].innerText = "Incorrect"
    countDown = countDown - 15;
  }
  setTimeout(() => {
    questionContainerElements.children[2].innerText = ''
  }, 500)
}

function getPlayerName() { //Step 5: Get player's name.
  inputBoxPlayerName.classList.remove('hide')
  questionContainerElements.classList.add('hide');
  if (countDown < 0) {
    countDown = 0
  }
  inputBoxPlayerName.children[0].innerHTML = 'Your score is ' + countDown

  inputBoxPlayerName.children[4].addEventListener('click', (event) => {
    event.preventDefault()

    if (inputBoxPlayerName.children[2].value.length == 2) {
      response = inputBoxPlayerName.children[2].value + "-" + countDown + "."
      submissionResponse.textContent = "Thank you for playing: " + response;
      startButton.classList.remove('hide')
      viewResults()
    } else {
      inputBoxPlayerName.children[1].textContent = "Please try again with your initials."
      getPlayerName()
    }
  })
}

function pushFunction() {
  arrayHighScores.push(response)
  console.log(arrayHighScores);
}

function viewResults() { //Step 6: View High Scroe
  startButton.classList.remove('hide')
  startButton.children[1].classList.remove('hide')
  startButton.classList.add('float-right')
  submissionResponse.classList.remove('hide')
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