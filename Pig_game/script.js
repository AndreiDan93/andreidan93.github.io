'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const scoreP1 = document.querySelector('#current--0');
const scoreP2 = document.querySelector('#current--1');
const totalScoreP1 = document.querySelector('#score--0');
const totalScoreP2 = document.querySelector('#score--1');
let score = 0;
let totalScore1 = 0;
let totalScore2 = 0;

score0El.textContent = score;
score1El.textContent = score;
diceEl.classList.add('hidden');

const rollDice = function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  console.log(dice);

  score += dice;

  if (player1.classList.contains('player--active')) {
    scoreP1.textContent = score;
  } else if (player2.classList.contains('player--active')) {
    scoreP2.textContent = score;
  }

  if (dice === 1 && player1.classList.contains('player--active')) {
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
    score = 0;
    scoreP1.textContent = score;
  } else if (dice === 1 && player2.classList.contains('player--active')) {
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
    score = 0;
    scoreP2.textContent = score;
  }
};

const holdDice = function () {
  if (player1.classList.contains('player--active')) {
    {
      totalScore1 += score;
      totalScoreP1.textContent = totalScore1;
      player1.classList.remove('player--active');
      player2.classList.add('player--active');
      score = 0;
      scoreP1.textContent = score;
      if (totalScore1 >= 100) {
        player1.classList.add('player--winner');
        btnRoll.disabled = true;
        btnHold.disabled = true;
      }
    }
  } else if (player2.classList.contains('player--active')) {
    totalScore2 += score;
    totalScoreP2.textContent = totalScore2;
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
    score = 0;
    scoreP2.textContent = score;
    if (totalScore2 >= 100) {
      player2.classList.add('player--winner');
      btnRoll.disabled = true;
      btnHold.disabled = true;
    }
  }
};

const newGame = function () {
  score = 0;
  totalScore1 = 0;
  totalScore2 = 0;
  scoreP1.textContent = score;
  scoreP2.textContent = score;
  diceEl.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  totalScoreP1.textContent = totalScore1;
  totalScoreP2.textContent = totalScore2;
  btnRoll.disabled = false;
  btnHold.disabled = false;
  player2.classList.remove('player--active');
  player1.classList.add('player--active');
};

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdDice);
btnNew.addEventListener('click', newGame);
