// Questions Object
STORE = {
  quizQuestions: [
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
  ],
  // Global Variables
  indexNumber: 0,
  questionNumber: 0,
  score: 0
}

//** RENDER FUNCTION **//
function renderStart() {
  $(".renderQuiz").on("click", ".startButton", function (event) {
    $(".renderQuiz").hide();
    $(".questionBox").show();
    renderHtml();
  });
}


//** RENDER FUNCTION **//
function renderQuiz() {
  $(".altBox").hide();
  $("#sadFace").hide();
  $("#happyFace").hide();
  $("#totalScoreBox").hide();
  $(".questionBox").hide();
  renderStart();
}

//** RENDER FUNCTION **//
function renderHtml() {
  htmlHolder = '';
  htmlHolder += addQuestion();
  htmlHolder += addButtons();
  $(".questionBox").html(htmlHolder);
}

//** CONTROLLER FUNCTION **//
function addQuestion() {
  incrementQuestionNumber();
  if (STORE.questionNumber <= 5) {
    let htmlHolder = "";
    let quizQuestionTitle = STORE.quizQuestions[STORE.indexNumber].question;
    const quizAnswers = STORE.quizQuestions[STORE.indexNumber].answers;
    const quizId = STORE.quizQuestions[STORE.indexNumber].id;
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
    renderTotalScore();
  }
}

//** CONTROLLER FUNCTION **//
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

//** CONTROLLER FUNCTION **//
function nextQuestion() {
  $(".questionBox").on("click", ".nextButton", function (event) {
    //check that user has made selection
    event.preventDefault();
    renderAnswer();
  });
}

//** CONTROLLER FUNCTION **//
function incrementIndex() {
  STORE.indexNumber += 1;
}

//** CONTROLLER FUNCTION **//
function incrementUserAnswer() {
  STORE.quizQuestions[STORE.indexNumber].userAnswer = 1;
}

//** CONTROLLER FUNCTION **//
function incrementQuestionNumber() {
  STORE.questionNumber += 1;
}

//** RENDER FUNCTION **//
function renderAnswer() {
  if ($('input:checked').length > 0) {
    let selectedAnswer = $('input:checked');
    let answer = selectedAnswer.val();
    //if is correct
    if (answer === STORE.quizQuestions[STORE.indexNumber].correctAnswer) {
      // determine if end of quiz
        renderCorrectAnswerResponse();
        incrementUserAnswer();
        renderQuizBoxEmpty();
        renderScore();
        incrementIndex()
        renderHtml();
      }
    //if is incorrect
    else {
        renderWrongAnswerResponse();
        renderQuizBoxEmpty();
        renderScore();
        incrementIndex()
        renderHtml();
    }
  }
  //if user hasn't made selection prompt until if statement is true.
  else if ($('input:checked').length === 0) {
    $(".questionBox").show(); 
    alert("Please make a selection before continuing");
  }
}

function renderQuizBoxEmpty() {
  $(".questionBox").empty();
  $("#counterStart").empty();
}

//** CONTROLLER FUNCTION **//
function calculateScore() {
  scoreGrab = STORE.quizQuestions[STORE.indexNumber].userAnswer;
  STORE.score += scoreGrab;
}

//** RENDER FUNCTION **//
function renderScore() {
  calculateScore();
  $("#counterStart").append("<p> Question: " + STORE.questionNumber + "/5 </p>" + "<p> Score: " + STORE.score + "</p>");
}

//** RENDER FUNCTION **//
function renderWrongAnswerResponse() {
  $(".questionBox").hide(); 
  $(".wrongAnswerTemp").remove();
  $("#wrongAnswer").append(`<p class="wrongAnswerTemp">The correct answer was: "${STORE.quizQuestions[STORE.indexNumber].correctAnswer}"</p>`)
  $("#sadFace").show();
  hideWrongAnswerResponse();
}

//** RENDER FUNCTION **//
function hideWrongAnswerResponse() {
  $("#sadFace").on("click", ".nextButton", function (event) {
    $("#sadFace").hide();
    $(".questionBox").show();
    });
}

//** RENDER FUNCTION **//
function renderCorrectAnswerResponse() {
  $(".questionBox").hide(); 
  $("#happyFace").show();
  hideCorrectAnswerResponse();
}

//** RENDER FUNCTION **//
function hideCorrectAnswerResponse() {
  $("#happyFace").on("click", ".nextButton", function (event) { 
    $("#happyFace").hide();
    $(".questionBox").show(); 
    });
}

//** RENDER FUNCTION **//
function renderReset() {
  $(".catBox").on("click", ".resetButton", function (event) {
    event.preventDefault();
    $(".questionBox").empty();
    $(".questionBox").hide();
    $("#happyFace").hide();
    $("#sadFace").hide();
    $("#totalScoreBox").hide();
    $(".renderQuiz").show();
    $("#counterStart").empty();
    $("#counterStart").show();
    resetValues();
  });
}

//** RENDER FUNCTION **//
function renderTotalScore() {
    $("#finalScoreText").remove();
    $("#totalScoreBox").prepend(`<h2 id="finalScoreText"> Final Score: ${STORE.score}/5 </h2>`);
    $("#totalScoreBox").show();
    $("#counterStart").empty();
    $("#happyFace").hide();
    $("#sadFace").hide();
    $(".questionBox").hide();
    quizResetListener();
}

//** CONTROLLER FUNCTION **//
function quizResetListener() {
  $("#totalScoreBox").on("click", ".resetButton", function (event) { 
    renderReset();
});
}

//** CONTROLLER FUNCTION **//
function resetValues() {
  STORE.indexNumber = 0;
  STORE.questionNumber = 0;
  STORE.score = 0;
}

//** RENDER FUNCTION **//
function renderNewQuiz() {
  renderQuiz();
  renderReset();
  resetValues();
  nextQuestion();
}

$(renderNewQuiz);
