import { SNAKE_SPEED, updateSnake, drawSnake } from './js/snake.js';

let lastRenderTime = 0;
const gameBoard = document.getElementById('game-board');

function main(currentTime) {
  window.requestAnimationFrame(main);
  const delta = (currentTime - lastRenderTime) / 1000;
  if (delta < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
}

function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
}
