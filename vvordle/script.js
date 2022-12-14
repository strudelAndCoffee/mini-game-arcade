import { targetWords, dictionary } from './lib/words.js';

const guessGrid = document.querySelector('[data-guess-grid]');
const alertContainer = document.querySelector('[data-alert-container]');
const WORD_LENGTH = 5;
const offsetFromDate = new Date(2022, 11, 13);
const msOffset = Date.now() - offsetFromDate;
const dayOffset = msOffset / 1000 / 60 / 60 / 24;
const targetWord = targetWords[Math.floor(dayOffset)];

function startInteraction() {
  document.addEventListener('click', handleMouseClick);
  document.addEventListener('keydown', handleKeyDown);
}

function stopInteraction() {
  document.removeEventListener('click', handleMouseClick);
  document.removeEventListener('keydown', handleKeyDown);
}

function handleMouseClick(e) {
  if (e.target.matches('[data-key]')) {
    pressKey(e.target.dataset.key);
    return;
  }
  if (e.target.matches('[data-enter]')) {
    submitGuess();
    return;
  }
  if (e.target.matches('[data-delete]')) {
    deleteKey();
    return;
  }
}

function handleKeyDown(e) {
  if (e.key === 'Enter') {
    submitGuess();
    return;
  }
  if (e.key === 'Delete' || e.key === 'Backspace') {
    deleteKey();
    return;
  }
  if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key);
    return;
  }
}

function pressKey(key) {
  const activeTiles = getActiveTiles();
  if (activeTiles.length >= WORD_LENGTH) return;

  const nextTile = guessGrid.querySelector(':not([data-letter])');
  nextTile.dataset.letter = key.toLowerCase();
  nextTile.textContent = key;
  nextTile.dataset.state = 'active';
}

function deleteKey() {
  const activeTiles = getActiveTiles();
  const lastTile = activeTiles[activeTiles.length - 1];
  if (lastTile == null) return;

  lastTile.textContent = '';
  delete lastTile.dataset.state;
  delete lastTile.dataset.letter;
}

function submitGuess() {
  const activeTiles = [...getActiveTiles()];
  if (activeTiles.length !== WORD_LENGTH) {
    showAlert('Not enough letters');
    shakeTiles(activeTiles);
    return;
  }
}

function getActiveTiles() {
  return guessGrid.querySelectorAll('[data-state="active"]');
}

function showAlert(msg, duration = 1000) {
  const alert = document.createElement('div');
  alert.textContent = msg;
  alert.classList.add('alert');
  alertContainer.prepend(alert);

  if (duration == null) return;
  setTimeout(() => {
    alert.classList.add('hide');
    alert.addEventListener('transitionend', () => {
      alert.remove();
    });
  }, duration);
}

function shakeTiles(tiles) {
  tiles.forEach((tile) => {
    tile.classList.add('shake');
    tile.addEventListener(
      'animationend',
      () => {
        tile.classList.remove('shake');
      },
      { once: true }
    );
  });
}

startInteraction();
