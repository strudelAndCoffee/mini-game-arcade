import Ball from './js/Ball.js';
import Paddle from './js/Paddle.js';

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');

let points_to_win = 5;
let difficulty = 'easy';
let time_limit = null;
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
    window.location = '/pong';
  } else {
    window.location = '/';
  }
}

function startGame() {
  let count = 2;

  document.addEventListener('mousemove', (e) => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
  });

  const countDown = setInterval(() => {
    document.getElementById('count-down').innerText = count;
    if (count == 0) {
      clearInterval(countDown);
      document.getElementById('counter').classList.add('hide');
      window.requestAnimationFrame(update);
    }
    count--;
  }, 1000);
}

function setupGame() {
  const modalEl = document.getElementById('modal');

  const getFormData = (e) => {
    e.preventDefault();

    const diffSelectEl = modalEl.querySelector('#difficulty');
    const scoreSelectEl = modalEl.querySelector('#score');
    const timeSelectEl = modalEl.querySelector('#time');

    difficulty = diffSelectEl.value;
    points_to_win = parseInt(scoreSelectEl.value);
    time_limit = timeSelectEl.value != 0 ? parseInt(timeSelectEl.value) : null;

    // startGame();
  };

  modalEl.addEventListener('submit', getFormData);
}

setupGame();
