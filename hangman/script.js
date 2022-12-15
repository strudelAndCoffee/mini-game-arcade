import { words } from './lib/words.js';

const wordToGuess = words[Math.floor(Math.random() * words.length)].split('');

const drawingEl = document.querySelector('[data-drawing]');
const wordEl = document.querySelector('[data-word]');
const keyboardEl = document.querySelector('[data-keyboard]');

let wrongGuesses = 0;

function createWordToGuess() {
  for (let i = 0; i < wordToGuess.length; i++) {
    let letterEl = document.createElement('span');
    letterEl.classList.add('letter');

    wordEl.append(letterEl);
  }
}

function handleClick(e) {
  if (e.target.matches('[data-key]')) {
    handleGuessLetter(e.target.dataset.key);
  }
}

function handleKeydown(e) {
  const key = e.key.toLowerCase();
  handleGuessLetter(key);
}

function handleGuessLetter(key) {
  if (!key.match(/^[a-z]$/)) return;

  wordToGuess.includes(key) ? handleCorrectLetter(key) : handleWrongLetter(key);
}

function handleCorrectLetter(key) {
  console.log(key);
}

function handleWrongLetter(key) {
  if (wrongGuesses >= 6) {
    handleLose();
    return;
  }

  const keyEl = keyboardEl.querySelector(`[data-key="${key}"]`);
  if (keyEl.disabled) return;
  keyEl.disabled = true;
  wrongGuesses++;

  const bodyPiece = drawingEl.querySelector(`[data-piece="${wrongGuesses}"]`);
  bodyPiece.classList.remove('hidden');
}

function handleLose() {
  document.removeEventListener('click', handleClick);
  document.removeEventListener('keydown', handleKeydown);
}

createWordToGuess();
console.log(wordToGuess);
document.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeydown);
