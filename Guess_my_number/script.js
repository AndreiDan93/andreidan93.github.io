'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const displayNumber = function (number) {
  document.querySelector('.number').textContent = number;
};

const guessValue = function (guess) {
  document.querySelector('.guess').value = guess;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //When there is no input
  if (!guess) {
    // document.querySelector('.message').textContent = '⛔ No number!';
    displayMessage('⛔ No number!');

    //When player wins
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '🎉 Correct Number!';
    // document.querySelector('.number').textContent = secretNumber;
    displayMessage('🎉 Correct Number!');
    displayNumber(secretNumber);

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

    if (highscore < score) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    //When guess is too high
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      // guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
      // document.querySelector('.score').textContent = score;
      score--;
      displayScore(score);
    } else {
      // document.querySelector('.message').textContent = '💥 You lost the game!';
      displayMessage('💥 You lost the game!');

      displayScore(0);
    }
  }
});

//Coding challenge 1
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  // document.querySelector('.score').textContent = score;
  displayScore(score);
  // document.querySelector('.number').textContent = '?';
  displayNumber('?');
  // document.querySelector('.guess').value = '';
  guessValue('');

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
