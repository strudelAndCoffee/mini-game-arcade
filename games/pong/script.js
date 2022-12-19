import Ball from './js/Ball.js';
import Paddle from './js/Paddle.js';

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');

let points_to_win = 5;
let lastTime;

function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--hue')
    );

    document.documentElement.style.setProperty('--hue', hue + delta * 0.008);

    if (isLose()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();
  rect.right >= window.innerWidth
    ? (playerScoreEl.textContent = parseInt(playerScoreEl.textContent) + 1)
    : (computerScoreEl.textContent = parseInt(computerScoreEl.textContent) + 1);

  ball.reset();
  computerPaddle.reset();
  if (
    parseInt(playerScoreEl.textContent) >= points_to_win ||
    parseInt(computerScoreEl.textContent) >= points_to_win
  ) {
    handleGameOver();
  }
}

function handleGameOver() {
  let result;
  parseInt(playerScoreEl.textContent) >= points_to_win
    ? (result = 'You win!!')
    : (result = 'You lose.');

  if (confirm(`${result} Play again?`)) {
    playerScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;
    window.location = '/games/pong';
  } else {
    window.location = '/';
  }
}

function startGame() {
  document.addEventListener('mousemove', (e) => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
  });
  window.requestAnimationFrame(update);
}

function setupGame() {
  const modalEl = document.getElementById('modal');

  const getFormData = (e) => {
    e.preventDefault();

    const diffSelectEl = modalEl.querySelector('#difficulty');
    const scoreSelectEl = modalEl.querySelector('#score');

    ball.setVelIncr(diffSelectEl.value);
    computerPaddle.setSpeed(diffSelectEl.value);
    points_to_win = parseInt(scoreSelectEl.value);

    modalEl.removeEventListener('submit', getFormData);
    modalEl.classList.add('hide');

    startGame();
  };

  modalEl.addEventListener('submit', getFormData, { once: true });
}

setupGame();
