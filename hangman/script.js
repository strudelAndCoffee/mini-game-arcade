import { words } from './lib/words.js';

const wordToGuess = words[Math.floor(Math.random() * words.length)];

const keyboardEl = document.querySelector('[data-keyboard]');

function startInteraction() {
  document.addEventListener('click', handleMouseClick);
  document.addEventListener('keydown', (e) => {
    handleKeyPress(e.key);
  });
}

function handleMouseClick(e) {
  if (e.target.matches('[data-key]')) {
    handleKeyPress(e.target.dataset.key);
    return;
  }
  return;
}

function handleKeyPress(key) {
  if (!key.match(/^[a-zA-Z]$/)) return;
  console.log(key);
}

startInteraction();
