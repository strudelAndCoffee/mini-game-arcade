import { words } from './lib/words.js';

const drawingEl = document.querySelector('[data-drawing]');
const wordEl = document.querySelector('[data-word]');
const keyboardEl = document.querySelector('[data-keyboard]');

const DANCE_FX_DURATION = 200;

let wordToGuess = words[Math.floor(Math.random() * words.length)].split('');
let wrongGuesses = 0;
let letters;

function createWordToGuess() {
  for (let i = 0; i < wordToGuess.length; i++) {
    let letterEl = document.createElement('span');
    letterEl.classList.add('letter');
    letterEl.dataset.letter = wordToGuess[i];
    letterEl.dataset.state = 'hidden';

    wordEl.append(letterEl);
  }
  letters = wordEl.querySelectorAll('[data-letter]');
}

function handleClick(e) {
  if (e.target.matches('[data-key]')) {
    const key = e.target.dataset.key;
    handleGuessLetter(key);
  }
}

function handleKeydown(e) {
  const key = e.key.toLowerCase();
  handleGuessLetter(key);
}

function handleGuessLetter(key) {
  if (!key.match(/^[a-z]$/)) return;

  const keyEl = keyboardEl.querySelector(`[data-key="${key}"]`);
  if (keyEl.disabled) return;

  keyEl.disabled = true;
  wordToGuess.includes(key) ? handleCorrectLetter(key) : handleWrongLetter();
}

function handleCorrectLetter(key) {
  letters.forEach((letter) => {
    if (letter.dataset.letter === key) {
      letter.textContent = key.toUpperCase();
      letter.dataset.state = 'shown';
      wordToGuess = wordToGuess.filter((val) => {
        return val != key;
      });
    }
  });

  if (wordToGuess.length === 0) handleWin();
}

function handleWrongLetter() {
  wrongGuesses++;
  if (wrongGuesses === 6) handleLose();

  const bodyPiece = drawingEl.querySelector(`[data-piece="${wrongGuesses}"]`);
  bodyPiece.classList.remove('hidden');
}

function handleLose() {
  letters.forEach((letter) => {
    if (letter.dataset.state == 'hidden') {
      letter.textContent = letter.dataset.letter.toUpperCase();
      letter.classList.add('lost');
    }
  });

  const result = 'You are out of guesses.';
  setTimeout(() => {
    handleGameOver(result);
  }, 100);
}

function handleWin() {
  letters.forEach((letter, index) => {
    setTimeout(() => {
      letter.classList.add('won');
      letter.classList.add('dance');
      letter.addEventListener(
        'animationend',
        () => {
          letter.classList.remove('dance');
        },
        { once: true }
      );
    }, (index * DANCE_FX_DURATION) / letters.length);
  });

  const result = 'You win!';
  setTimeout(() => {
    handleGameOver(result);
  }, letters.length + 500);
}

function handleGameOver(result) {
  confirm(`${result} Would you like to play again?`)
    ? (window.location = '/hangman')
    : (window.location = '/');
}

createWordToGuess();
console.log(wordToGuess);
document.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeydown);
