// Questions Object

const quizQuestions = [
  {
    question: "What's Chicagos 'Windy City' nickname mean?",
    answers: [
      "Midwestern Great Plains Wind", 
      "High winds off lake Superior", 
      "Its residents were considered “windbags” and “full of hot air.", 
      "That has never been a chicago nickname", 
      "Flatulence"],
    userAnswer: 0,
    correctAnswer: "Its residents were considered “windbags” and “full of hot air.",
    id: "chicago",
  },
  {
    question: "What’s kind of animal is bullet proof?",
    answers: [
      "HoneyBadger",
      "Rhino",
      "Hippo",
      "Elephant",
      "Armadillo",
    ],
    userAnswer: 0,
    correctAnswer: "Armadillo",
    id: "bullet",
  },
  {
    question: "What's an unusual technique Firefighters use when batteling flames?",
    answers: [
      "They Use Glitter Bombs",
      "They make water 'wetter'",
      "They Blast heavy Metal from their Firetruck",
      "They Blow up a building",
      "They Throw their axes from afar",
    ],
    userAnswer: 0,
    correctAnswer: "They make water 'wetter'",
    id: "fireFighter",
  },
  {
    question: "What was active on the moon when dinosaurs were alive?",
    answers: [
      "Volcanos",
      "Rivers",
      "Aliens",
      "Small animals",
      "Jet Stream",
    ],
    userAnswer: 0,
    correctAnswer: "Volcanos",
    id: "go",
  },
  {
    question: "What were avocados originally named after?",
    answers: [
      "Earth Berry", 
      "Tree Stones", 
      "Green Jewel", 
      "Alligator Heart", 
      "Testicles"],
      userAnswer: 0,
    correctAnswer: "Testicles",
    id: "temp",
  },
];

// Global Variables
let indexNumber = 0;
let questionNumber = 0;
let score = 0;

//begins the quiz
function startQuiz() {
  $(".altBox").hide();
  $("#sadFace").hide();
  $("#happyFace").hide();
  $("#totalScoreBox").hide();
  $(".questionBox").hide();
  $(".startQuiz").on("click", ".startButton", function (event) {
    $(".startQuiz").hide();
    $(".questionBox").show();
    htmlGenerator();
  });
}

function htmlGenerator() {
  htmlHolder = '';
  htmlHolder += addQuestion();
  htmlHolder += addButtons();
  $(".questionBox").html(htmlHolder);
}

//creates html for question form
function addQuestion() {
  questionNumber += 1;
  if (questionNumber <= 5) {
    let htmlHolder = "";
    let quizQuestionTitle = quizQuestions[indexNumber].question;
    const quizAnswers = quizQuestions[indexNumber].answers;
    const quizId = quizQuestions[indexNumber].id;
    htmlHolder = `<h3> ${quizQuestionTitle} </h3>`;
    quizAnswers.forEach((a, idx) => {
      htmlHolder += `
      <div class="inline">
        <label class="question_padding" for="cat">${a}</label>
        <input type="radio" id="${quizId}-${idx}" class="question" name="${quizId}" value="${a}" /> 
      </div>
      `;
    });
    return htmlHolder;
  }
  else {
    totalScore();
  }
}

function addButtons() {
  let buttonHolder = "";
  buttonHolder += `
  <div>
  <button type="next" class="nextButton">Next</button>
  <button type="reset" class="resetButton">Reset</button>
  </div>
  `;
  return buttonHolder;
}

//consolidation function
function nextQuestion() {
  $(".questionBox").on("click", ".nextButton", function (event) {
    //check that user has made selection
    event.preventDefault();
    checkAnswer();
  });
}

function checkAnswer() {
  if ($('input:checked').length > 0) {
    let selectedAnswer = $('input:checked');
    let answer = selectedAnswer.val();
    //if is correct
    if (answer === quizQuestions[indexNumber].correctAnswer) {
      // determine if end of quiz
        correctAnswerResponse();
        quizQuestions[indexNumber].userAnswer = 1;
        $(".questionBox").empty();
        $("#counterStart").empty();
        populateScore();
        indexNumber += 1;
        htmlGenerator();
      }
    //if is incorrect
    else {
      wrongAnswerResponse();
      // determine if end of quiz
        $(".questionBox").empty();
        $("#counterStart").empty();
        populateScore();
        indexNumber += 1;
        htmlGenerator();
    }
  }
  //if user hasn't made selection prompt until if statement is true.
  else if ($('input:checked').length === 0) {
    $(".questionBox").show(); 
    alert("Please make a selection before continuing");
  }
}


function populateScore() {
  scoreGrab = quizQuestions[indexNumber].userAnswer;
  score += scoreGrab
  $("#counterStart").append("<p> Question:" + questionNumber + "/5 </p>" + "<p> Score:" + score + "</p>");
}

//generates wrong answer pop up
function wrongAnswerResponse() {
  $(".questionBox").hide(); 
  $(".wrongAnswerTemp").remove();
  $("#wrongAnswer").append(`<p class="wrongAnswerTemp">The correct answer was: "${quizQuestions[indexNumber].correctAnswer}"</p>`)
  $("#sadFace").show();
  $("#sadFace").on("click", ".nextButton", function (event) {
    $("#sadFace").hide();
    $(".questionBox").show();
    });
}

//generates correct answer pop up
function correctAnswerResponse() {
  $(".questionBox").hide(); 
  $("#happyFace").show();
  $("#happyFace").on("click", ".nextButton", function (event) { 
    $("#happyFace").hide();
    $(".questionBox").show(); 
    });
}

function quizReset() {
  $(".catBox").on("click", ".resetButton", function (event) {
    event.preventDefault();
    $(".questionBox").empty();
    $(".questionBox").hide();
    $("#happyFace").hide();
    $("#sadFace").hide();
    $("#totalScoreBox").hide();
    $(".startQuiz").show();
    resetValues();
  });
}

function totalScore() {
    $("#finalScoreText").remove();
    $("#totalScoreBox").prepend(`<h2 id="finalScoreText"> Final Score: ${score}/5 </h2>`);
    $("#totalScoreBox").show();
    $("#counterStart").empty();
    $("#happyFace").hide();
    $("#sadFace").hide();
    $(".questionBox").hide();
    $("#totalScoreBox").on("click", ".resetButton", function (event) { 
      quizReset()
      }); 
}

function resetValues() {
  indexNumber = 0;
  questionNumber = 0;
  score = 0;
  $("#counterStart").empty();
  $("#counterStart").show();
}

//runs the functions
function makeQuiz() {
  startQuiz();
  quizReset();
  resetValues();
  nextQuestion();
}

$(makeQuiz);
