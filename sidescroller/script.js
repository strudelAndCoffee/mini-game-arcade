const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;

const worldEl = document.querySelector('[data-world]');

setPixelToWorldScale();
window.addEventListener('resize', setPixelToWorldScale);

function update(time) {}
window.requestAnimationFrame(update);

function setPixelToWorldScale() {
  let worldToPixelScale;
  window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT
    ? (worldToPixelScale = window.innerWidth / WORLD_WIDTH)
    : (worldToPixelScale = window.innerHeight / WORLD_HEIGHT);

  worldEl.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldEl.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
