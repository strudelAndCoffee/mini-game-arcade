import { setupGround, updateGround } from './js/ground.js';
import { setupDino, updateDino } from './js/dino.js';

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const worldEl = document.querySelector('[data-world]');
const scoreEl = document.querySelector('[data-score]');
const startScreenEl = document.querySelector('[data-start-screen]');

setPixelToWorldScale();
window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener('keydown', handleStart, { once: true });

let lastTime;
let speedScale;
let score;

function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);

  lastTime = time;
  window.requestAnimationFrame(update);
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreEl.textContent = Math.floor(score);
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;

  setupGround();

  startScreenEl.classList.add('hide');
  window.requestAnimationFrame(update);
}

function setPixelToWorldScale() {
  let worldToPixelScale;
  window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT
    ? (worldToPixelScale = window.innerWidth / WORLD_WIDTH)
    : (worldToPixelScale = window.innerHeight / WORLD_HEIGHT);

  worldEl.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldEl.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
