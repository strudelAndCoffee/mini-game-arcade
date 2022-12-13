import Ball from './js/Ball.js';
import Paddle from './js/Paddle.js';

const POINTS_TO_WIN = 3;
const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');

let lastTime;

function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    // ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--hue')
    );

    document.documentElement.style.setProperty('--hue', hue + delta * 0.008);

    if (isLose()) {
      handleLose();
    }
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
    parseInt(playerScoreEl.textContent) >= POINTS_TO_WIN ||
    parseInt(computerScoreEl.textContent) >= POINTS_TO_WIN
  ) {
    handleGameOver();
  }
}

function handleGameOver() {
  let result;
  parseInt(playerScoreEl.textContent) >= POINTS_TO_WIN
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
  const countDown = setInterval(() => {
    document.getElementById('count-down').innerText = count;
    if (count == 0) {
      clearInterval(countDown);
      document.getElementById('counter').classList.add('hide');

      document.addEventListener('mousemove', (e) => {
        playerPaddle.position = (e.y / window.innerHeight) * 100;
      });
      window.requestAnimationFrame(update);
    }
    count--;
  }, 1000);
}

startGame();
