var startButton = document.getElementById('start-btn');  // Start Button
startButton.children[0].addEventListener('click', startGame);
startButton.children[1].addEventListener('click', clearHighScore);
var navBar = document.getElementById('nav-bar'); // Nav Bar
navBar.children[0].addEventListener('click', viewHighScore);
var questionContainerElements = document.getElementById('question-container'); //Question Container
var shuffledQuestions, currentQuestionIndex, questions;
var countDown = 75; // Timer variables
var stopQuiz, stopQuizViewHighScore = false;
var inputBoxPlayerName = document.getElementById('input-box-name'); // High Score variables
var submissionResponse = document.getElementById("show-results"); // Get player information
var highScore = document.getElementById('high-score')
var response = [];
var arrayHighScores = JSON.parse(localStorage.getItem("arrayHighScores"));
var correctSound = document.getElementById('correct-sound')
var incorrectSound = document.getElementById('incorrect-sound')

if (arrayHighScores === null) {
  console.log(arrayHighScores);
  arrayHighScores = [];
}

function timer() {
  navBar.children[1].textContent = "Timer: 75"
  var timerInterval = setInterval(() => {
    if (countDown <= 0 || stopQuiz) {
      getPlayerName();
      clearTimeout(timerInterval);
    } else if (stopQuizViewHighScore) {
      clearTimeout(timerInterval);
    } else {
      countDown--
    }
    navBar.children[1].textContent = "Timer: " + countDown
  }, 1000)
}

function startGame() { // Step 1: After clicking on the start button
  pickquestion()
  countDown = 75;
  stopQuiz = false;
  stopQuizViewHighScore = false;
  questionContainerElements.classList.remove('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  timer();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(title) { // Step 2: Shows the Question and Answers. Waiting for user to click.
  startButton.classList.add('hide')
  submissionResponse.classList.add('hide')
  while (questionContainerElements.children[1].firstChild) {
    questionContainerElements.children[1].removeChild(questionContainerElements.children[1].firstChild);
  }
  questionContainerElements.children[0].innerText = (title.title)
  questions[currentQuestionIndex].choices.sort(() => Math.random() - .5).forEach(answer => {
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
    correctSound.play();
  } else {
    questionContainerElements.children[2].innerText = "Incorrect"
    incorrectSound.play();
    countDown = countDown - 15;
  }
  setTimeout(() => {
    questionContainerElements.children[2].innerText = ''
  }, 500)
}

function getPlayerName() { //Step 5: Get player's name.
  var pleaseStopIt = true;
  inputBoxPlayerName.classList.remove('hide')
  questionContainerElements.classList.add('hide');
  inputBoxPlayerName.children[1].textContent = "Please enter your initials below.";
  if (countDown < 0) {
    countDown = 0
  }
  inputBoxPlayerName.children[0].innerHTML = 'Your score is ' + countDown
  inputBoxPlayerName.children[4].addEventListener('click', (event) => {
      event.preventDefault()
    var checkInputBox = /[a-z]/gi;
    var resultsInputBox = checkInputBox.test(inputBoxPlayerName.children[2].value);
    inputBoxPlayerName.children[2].value = inputBoxPlayerName.children[2].value.toUpperCase();
    if (inputBoxPlayerName.children[2].value.length == 2 && resultsInputBox) {
      if (pleaseStopIt) {
        response = inputBoxPlayerName.children[2].value + "-" + countDown + ".";
        arrayHighScores.push(response);
        submissionResponse.children[0].textContent = "View High Score";
        highScore.innerHTML = "";
        for (var i = 0; i < arrayHighScores.length; i++) {
          var para = document.createElement("p");
          var node = document.createTextNode(highScore);
          para.appendChild(node);
          highScore.appendChild(para);
          highScore.children[i].textContent = arrayHighScores[i];
        }
        pleaseStopIt = false;
        viewResults();
      }
    } else {
      inputBoxPlayerName.children[1].textContent = "Please try again with your initials ONLY.";
      return;
    }
  })
}

function viewHighScore() {
  stopQuizViewHighScore = true;
  questionContainerElements.classList.add('hide');
  viewResults();
}

function viewResults() { //Step 6: View High Score
  startButton.classList.remove('hide');
  startButton.children[1].classList.remove('hide');
  startButton.children[4].classList.remove('col-9');
  submissionResponse.classList.remove('hide');
  inputBoxPlayerName.classList.add('hide');
  navBar.children[1].textContent = "Timer: 0";
  console.log(arrayHighScores);
  var JSONReadyUsers = JSON.stringify(arrayHighScores);
  localStorage.setItem("arrayHighScores", JSONReadyUsers);
}

function clearHighScore() {
  arrayHighScores = [];
  highScore.innerHTML = "";
  viewResults();
}

function pickquestion() {

  if (startButton.children[4].children[0].children[0].checked) {
    questions = JavaSciptQuestions;
  }
  
  if (startButton.children[4].children[1].children[0].checked) {
    questions = HTMLquestions;
  }
  
  if (startButton.children[4].children[2].children[0].checked) {
    questions = CSSquestions;
  }
  
  if (startButton.children[4].children[3].children[0].checked) {
    questions = mathQuestions;
  }
  
  }

var HTMLquestions = [
  {
    title: "What does HTML stand for?",
    choices: [
      { text: "High Text Markup Language", correct: false },
      { text: "Hyper Text Makeup Language", correct: false },
      { text: "Hypertext Markup Language", correct: true },
      { text: "Hide Text Mistake Lost", correct: false },]
  },
  {
    title: "Which one is the correct HTML element?",
    choices: [
      { text: "class", correct: false },
      { text: "function myfucntion()", correct: false },
      { text: "<h1>", correct: true },
      { text: "element", correct: false },]
  },
  {
    title: "What is the correct HTML for adding a background color?",
    choices: [
      { text: "<style='background-color;yellow'>", correct: false },
      { text: "<body 'background-color:yellow;'>", correct: false },
      { text: "<body style='background-color:yellow;'>", correct: true },
      { text: "<background-color-yellow;>", correct: false },]
  },
  {
    title: "What element HTML bold text.",
    choices: [
      { text: "<li>", correct: false },
      { text: "<br>", correct: false },
      { text: "<strong>", correct: true },
      { text: "<bold>", correct: false },]
  },
  {
    title: "What are attribute in HTML?",
    choices: [
      { text: "It doesn nothing", correct: false },
      { text: "Changes the HTML elements", correct: false },
      { text: "Provide additional information about HTML elements", correct: true },
      { text: "All Above", correct: false },]
  },
];

var CSSquestions = [
  {
    title: "What does CSS stands for",
    choices: [
      { text: "strings", correct: false },
      { text: "booleans", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "numbers", correct: false },]
  },
  {
    title: "What is the correct CSS for adding a background color?",
    choices: [
      { text: "color: yellow;", correct: false },
      { text: "background-color-yellow;", correct: false },
      { text: "background-color: yellow;", correct: true },
      { text: "background-color: (yellow)", correct: false },]
  },
  {
    title: "What is the correct order of margin property sets?",
    choices: [
      { text: "Top, Top, Top, and Top", correct: false },
      { text: "Right, Bottom, Left, and Top", correct: false },
      { text: "Top, Right, Bottom, and Left", correct: true },
      { text: "Right, Bottom, Top, and Left", correct: false },]
  },
  {
    title: "Which HTML tag is used to define an internal style sheet?",
    choices: [
      { text: "<callstyle>", correct: false },
      { text: "<styles>", correct: false },
      { text: "<style>", correct: true },
      { text: "<css>", correct: false },]
  },
  {
    title: "How do you insert a comment in a CSS file?",
    choices: [
      { text: "// this is a comment", correct: false },
      { text: "// this is a comment //", correct: false },
      { text: "/* this is a comment */", correct: true },
      { text: "' this is a comment", correct: false },]
  },
];

var mathQuestions = [
  {
    title: "What is 25 * 37?",
    choices: [
      { text: "950", correct: false },
      { text: "1000", correct: false },
      { text: "925", correct: true },
      { text: "975", correct: false },]
  },
  {
    title: "What is 6 ÷ 2(1+2)?",
    choices: [
      { text: "9", correct: false },
      { text: "3", correct: false },
      { text: "0", correct: true },
      { text: "6", correct: false },]
  },
  {
    title: "What is 666 + 7777?",
    choices: [
      { text: "9443", correct: false },
      { text: "131313", correct: false },
      { text: "8443", correct: true },
      { text: "7443", correct: false },]
  },
  {
    title: "What is 9 - 3 ÷ 1 ÷ 3 + 1?",
    choices: [
      { text: "10", correct: false },
      { text: "1", correct: false },
      { text: "9", correct: true },
      { text: "0", correct: false },]
  },
  {
    title: "What is 43 x 67?",
    choices: [
      { text: "No meaning", correct: false },
      { text: "exit while when exitNow is false", correct: false },
      { text: "2881", correct: true },
      { text: "All Above", correct: false },]
  },
];

var JavaSciptQuestions = [
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