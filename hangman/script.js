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

function handleGuessLetter(key) {
  if (!key.match(/^[a-zA-Z]$/)) return;

  wordToGuess.includes(key) ? handleCorrectLetter(key) : handleWrongLetter(key);
}

function handleCorrectLetter(key) {
  console.log(key);
}

function handleWrongLetter(key) {
  const bodyPiece = drawingEl.querySelector(
    `[data-piece="${wrongGuesses + 1}"]`
  );
  bodyPiece.classList.remove('hidden');
  wrongGuesses++;
}

createWordToGuess();
console.log(wordToGuess);
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-key]')) {
    handleGuessLetter(e.target.dataset.key);
  }
});
document.addEventListener('keydown', (e) => {
  handleGuessLetter(e.key);
});
