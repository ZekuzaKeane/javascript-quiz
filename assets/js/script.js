var timer = $('#timer');
var startButton = $('#start');
var wrongButton = $('.wrong');
var correctButton = $('.correct');
var initials = $('input[name="initials"]');
var submitScore = $('#submit-score');
var scoreDisplay = $('#scoreDisplay');
var scoreList = $('#score-list');
var timeScore = 60;
var pointScore = 0;
var score = 0;
var page = 0;
var timeLeft = 60;

function countdown() {
    var timeInterval = setInterval(function () {
      timeLeft--;
      timeScore--;
      timer.text("Timer:" + timeLeft);
      if(timeLeft <= 0) {
        clearInterval(timeInterval);
        page = 6;
        checkPage();
        calculateScore();
        gameOver();
      }
    }, 1000);
  }

function checkPage() {
    $('#startScreen').addClass('hidden');
    $('#questionOne').addClass('hidden');
    $('#questionTwo').addClass('hidden');
    $('#questionThree').addClass('hidden');
    $('#questionFour').addClass('hidden');
    $('#questionFive').addClass('hidden');
    $('#highScore').addClass('hidden');
    $('#leaderBoard').addClass('hidden');
    if (page === 0) {
        $('#startScreen').removeClass('hidden');
        $('#startScreen').addClass('quizSection');
    }
    else if (page === 1) {
        $('#questionOne').removeClass('hidden');
        $('#questionOne').addClass('quizSection');
    }
    else if (page === 2) {
        $('#questionTwo').removeClass('hidden');
        $('#questionTwo').addClass('quizSection');
    }
    else if (page === 3) {
        $('#questionThree').removeClass('hidden');
        $('#questionThree').addClass('quizSection');
    }
    else if (page === 4) {
        $('#questionFour').removeClass('hidden');
        $('#questionFour').addClass('quizSection');
    }
    else if (page === 5) {
        $('#questionFive').removeClass('hidden');
        $('#questionFive').addClass('quizSection');
    }
    else if (page === 6) {
        $('#highScore').removeClass('hidden');
        $('#highScore').addClass('quizSection');
    }
    else if (page === 7) {
        $('#leaderBoard').removeClass('hidden');
        $('#leaderBoard').addClass('quizSection');
    }
}

function wrongAnswer() {
    timeLeft -= 10;
    timeScore -= 10;
}

function correctAnswer() {
    pointScore += 20;
    page += 1;
    checkPage();
    if (page === 6) {
        calculateScore();
        gameOver();
    }
}

function gameOver() {
    timeLeft = 1;
    timer.text("");
    scoreDisplay.text("Final Score: " + score);
}

function calculateScore() {
    score = pointScore;
    score += timeScore;
    if (score <= 0) {
        score = 0;
    }
    return score;
}

function leaderBoard() {
    page = 7;
    checkPage();
    updateBoard();
}

function updateBoard() {
    var liEl = $('<li>');
    liEl.text(initials.val() + " - " + score);
    scoreList.append(liEl);
    $('input[name="score-input"]').val('');
}

wrongButton.on('click', wrongAnswer);

correctButton.on('click', correctAnswer);

submitScore.on('click', leaderBoard);

  startButton.on('click', function () {
    page = 1;
    checkPage();
    countdown();
  });