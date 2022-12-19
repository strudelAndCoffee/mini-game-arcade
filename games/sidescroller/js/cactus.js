import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from '../utils.js';

const SPEED = 0.05;
const CACTUC_INTERVAL_MIN = 500;
const CACTUC_INTERVAL_MAX = 2000;
const worldEl = document.querySelector('[data-world]');

let nextCactusTime;

export function setupCactus() {
  nextCactusTime = CACTUC_INTERVAL_MIN;
  document
    .querySelectorAll('[data-cactus]')
    .forEach((cactus) => cactus.remove());
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll('[data-cactus]').forEach((cactus) => {
    incrementCustomProperty(cactus, '--left', delta * speedScale * SPEED * -1);
    if (getCustomProperty(cactus, '--left') <= -100) cactus.remove();
  });

  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime =
      randomNumberBetween(CACTUC_INTERVAL_MIN, CACTUC_INTERVAL_MAX) /
      speedScale;
  }
  nextCactusTime -= delta;
}

export function getCactusRects() {
  return [...document.querySelectorAll('[data-cactus]')].map((cactus) =>
    cactus.getBoundingClientRect()
  );
}

function createCactus() {
  const cactus = document.createElement('img');
  cactus.dataset.cactus = true;
  cactus.src = 'imgs/cactus.png';
  cactus.classList.add('cactus');
  setCustomProperty(cactus, '--left', 100);
  worldEl.append(cactus);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
