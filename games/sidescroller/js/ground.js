import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from '../utils.js';

const SPEED = 0.05;
const groundEls = document.querySelectorAll('[data-ground]');

export function setupGround() {
  setCustomProperty(groundEls[0], '--left', 0);
  setCustomProperty(groundEls[1], '--left', 300);
}

export function updateGround(delta, speedScale) {
  groundEls.forEach((ground) => {
    incrementCustomProperty(ground, '--left', delta * speedScale * SPEED * -1);

    if (getCustomProperty(ground, '--left') <= -300) {
      incrementCustomProperty(ground, '--left', 600);
    }
  });
}
