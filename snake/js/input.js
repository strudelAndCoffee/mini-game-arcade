let inputDir = { x: 0, y: 0 };
let lastInputDir = { x: 0, y: 0 };
let gameStart = false;

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (gameStart === false) gameStart = true;
      if (lastInputDir.y !== 0) break;
      inputDir = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (gameStart === false) gameStart = true;
      if (lastInputDir.y !== 0) break;
      inputDir = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (gameStart === false) gameStart = true;
      if (lastInputDir.x !== 0) break;
      inputDir = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (gameStart === false) gameStart = true;
      if (lastInputDir.x !== 0) break;
      inputDir = { x: 1, y: 0 };
      break;
    default:
      break;
  }
});

export function getInputDir() {
  lastInputDir = inputDir;
  return inputDir;
}

export function getGameStart() {
  return gameStart;
}
