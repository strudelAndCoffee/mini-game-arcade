import {
  SNAKE_SPEED,
  updateSnake,
  drawSnake,
  getSnakeHead,
  snakeIntersection,
} from './js/snake.js';
import { updateFood, drawFood } from './js/food.js';
import { outsideGrid } from './js/grid.js';
import { getGameStart } from './js/input.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

function main(currentTime) {
  if (gameOver) {
    confirm('You lost! Press OK to restart.')
      ? (window.location = '/games/snake')
      : (window.location = '/');
    return;
  }

  if (getGameStart())
    document.querySelector('.start-msg').classList.add('hide');

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
  updateFood();
  checkFail();
}

function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkFail() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
