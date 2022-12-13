import { getInputDir } from './input.js';

export const SNAKE_SPEED = 1;
const snakeBody = [{ x: 11, y: 11 }];

export function updateSnake() {
  const inputdir = getInputDir();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputdir.x;
  snakeBody[0].y += inputdir.y;
}

export function drawSnake(gameBoard) {
  snakeBody.forEach((seg) => {
    const snakeEl = document.createElement('div');
    snakeEl.style.gridRowStart = seg.y;
    snakeEl.style.gridColumnStart = seg.x;
    snakeEl.classList.add('snake');
    gameBoard.appendChild(snakeEl);
  });
}
