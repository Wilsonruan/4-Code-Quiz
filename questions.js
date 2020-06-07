var startButton = document.getElementById('start-btn');  // Start Button
startButton.children[0].addEventListener('click', startGame);
// startButton.children[1].addEventListener('click', clearHighScore);
var navBar = document.getElementById('nav-bar'); // Nav Bar
navBar.children[0].addEventListener('click', viewHighScore);
var questionContainerElements = document.getElementById('question-container'); //Question Container
var shuffledQuestions, currentQuestionIndex;
var countDown = 75; // Timer variables
var stopQuiz, stopQuizViewHighScore = false;
var inputBoxPlayerName = document.getElementById('input-box-name'); // High Score variables
var submissionResponse = document.getElementById("show-results"); // Get player information
var response = [];
var arrayHighScores = [];

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
  countDown = 75;
  stopQuiz = false;
  stopQuizViewHighScore = false;
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
  var pleaseStopIt = true;
  inputBoxPlayerName.classList.remove('hide')
  questionContainerElements.classList.add('hide');
  inputBoxPlayerName.children[1].textContent = "Please enter your initials below.";
  if (countDown < 0) {
    countDown = 0
  }
  inputBoxPlayerName.children[0].innerHTML = 'Your score is ' + countDown
  inputBoxPlayerName.children[4].addEventListener('click', () => {
      event.preventDefault()
    var checkInputBox = /[a-z]/gi;
    var resultsInputBox = checkInputBox.test(inputBoxPlayerName.children[2].value);
    inputBoxPlayerName.children[2].value = inputBoxPlayerName.children[2].value.toUpperCase();
    if (inputBoxPlayerName.children[2].value.length == 2 && resultsInputBox) {
      if (pleaseStopIt) {
        response = inputBoxPlayerName.children[2].value + "-" + countDown + ".";
        arrayHighScores.push(response);
        submissionResponse.children[0].textContent = "View High Score";
        var para = document.createElement("p");
        var node = document.createTextNode(submissionResponse);
        para.appendChild(node);
        submissionResponse.appendChild(para);
        for (var i = 0; i < arrayHighScores.length; i++) {
          submissionResponse.children[i + 1].textContent = arrayHighScores[i];
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
  startButton.classList.add('float-right');
  submissionResponse.classList.remove('hide');
  inputBoxPlayerName.classList.add('hide');
  navBar.children[1].textContent = "Timer: 0";
  console.log(arrayHighScores);
}

// function clearHighScore() {
//   for (var i = 1; i < arrayHighScores.length; i++) {
//     $(document).ready(function(){
//       $(startButton.children[1]).click(function(){
//         $("p").remove(submissionResponse.children[1]);
//       });
//     });
//   }
//   arrayHighScores = [];
//   console.log(arrayHighScores);
//   viewResults();
// }

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