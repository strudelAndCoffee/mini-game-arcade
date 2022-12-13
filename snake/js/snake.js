import { getInputDir } from './input.js';

export const SNAKE_SPEED = 5;
const snakeBody = [{ x: 11, y: 11 }];
let newSegs = 0;

export function updateSnake() {
  addSegs();

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

export function expandSnake(amount) {
  newSegs += amount;
}

export function onSnake(position) {
  return snakeBody.some((seg) => {
    return equalPositions(seg, position);
  });
}

function equalPositions(p1, p2) {
  return p1.x === p2.x && p1.y == p2.y;
}

function addSegs() {
  for (let i = 0; i < newSegs; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegs = 0;
}
