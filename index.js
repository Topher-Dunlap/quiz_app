// Questions Object

const intQuestions = [
  {
    question: "What's Chicagos 'Windy City' nickname mean?",
    answers: [
      "Midwestern Great Plains Wind", 
      "High winds off lake Superior", 
      "Its residents were considered “windbags” and “full of hot air.", 
      "That has never been a chicago nickname", 
      "Flatulence"],
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
    $(".questionBox").html(addQuestion());
    addButtons();
    console.log("`startQuiz` ran");
  });
}


//creates html for question form
function addQuestion() {
  populateScore();
  questionNumber += 1;
  if (questionNumber <= 5) {
    quizQuestion = intQuestions[indexNumber].question;
    $(".questionBox").append("<h3>" + quizQuestion + "</h3>");
    let hmtlHolder = "";
    const quizAnswers = intQuestions[indexNumber].answers;
    const quizId = intQuestions[indexNumber].id;
    quizAnswers.forEach((a, idx) => {
      hmtlHolder += `
      <input type="radio" id="${quizId}-${idx}" class="question" name="${quizId}" value="${a}" /> 
      <label for="cat">${a}</label><br>
      `;
    });
    $(".questionBox").append(hmtlHolder);
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
  $(".questionBox").append(buttonHolder);
}

//consolidation function
function nextQuestion() {
  $(".questionBox").on("click", ".nextButton", function (event) {
    //check that user has made selection
    if ($('input:checked').length > 0) {
      let selectedAnswer = $('input:checked');
      let answer = selectedAnswer.val();
      //if is correct
      if (answer === intQuestions[indexNumber].correctAnswer) {
        // determine if end of quiz
          correctAnswerResponse();
          score += 1;
          $(".questionBox").empty();
          $("#counterStart").empty();
          indexNumber += 1;
          addQuestion();
          addButtons();
        }
      //if is incorrect
      else {
        wrongAnswerResponse();
        // determine if end of quiz
          $(".questionBox").empty();
          $("#counterStart").empty();
          indexNumber += 1;
          addQuestion();
          addButtons();
      }
    }
    //if user hasn't made selection prompt until if statement is true.
    else if ($('input:checked').length === 0) {
      $(".questionBox").show(); 
      alert("Please make a selection before continuing")
    }
  });
}

function populateScore() {
  $("#counterStart").append("<p> Question:" + questionNumber + "/5 </p>" + "<p> Score:" + score + "</p>");
}

//generates wrong answer pop up
function wrongAnswerResponse() {
  $(".questionBox").hide(); 
  $(".wrongAnswerTemp").remove();
  $("#wrongAnswer").append(`<p class="wrongAnswerTemp">The correct answer was: "${intQuestions[indexNumber].correctAnswer}"</p>`)
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
    console.log("`quizReset` ran");
  });
}

function totalScore() {
    $("#finalScoreText").remove();
    $("#totalScoreBox").prepend(`"<h2 id="finalScoreText"> Score: ` + score + "/5</h2>");
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
