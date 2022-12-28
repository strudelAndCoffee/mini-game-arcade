import { makeGridArray, getNeighbors } from './js/utils.js';

const configGridEl = document.getElementById('configGrid');
const gridEl = document.getElementById('grid');
const startGameBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');

const side = 30;
const generation_rate = 100;
const dimension = side * side;
const CONFIG = [];
let iterations = 500;

function setupGame() {
  configGridEl.style.setProperty('--cols', side);
  configGridEl.style.setProperty('--rows', side);
  drawGridContainer('config');

  for (let i = 0; i < dimension; i++) {
    CONFIG.push(0);
  }

  configGridEl.addEventListener('click', (e) => {
    let target = e.target;
    target.classList.add('selected');
  });
  resetBtn.addEventListener('click', () => {
    const selectedCellEls = gridEl.querySelectorAll('.selected');
    const selectedCells = Array.from(selectedCellEls);
    selectedCells.forEach((cell) => cell.classList.remove('selected'));

    window.location = '/games/game-of-life';
  });
  startGameBtn.addEventListener('click', () => {
    const selectedCellEls = configGridEl.querySelectorAll('.selected');
    const selectedCells = Array.from(selectedCellEls);
    selectedCells.forEach((cell) => (CONFIG[cell.dataset.index] = 1));

    resetGrid();
    startGameBtn.classList.add('hide');
    startGame();
  });
}

function resetGrid() {
  configGridEl.classList.add('hide');
  gridEl.style.setProperty('--cols', side);
  gridEl.style.setProperty('--rows', side);
  gridEl.classList.remove('hide');
}

function startGame() {
  const starterGen = makeGridArray(dimension, side, CONFIG);
  drawGridContainer('');
  const tiles = gridEl.children;

  runGame(tiles, starterGen);
}

function drawGridContainer(type) {
  const grid = type === 'config' ? configGridEl : gridEl;

  let count = 0;
  while (count < dimension) {
    if (type === 'config') {
      let btnEl = document.createElement('button');
      btnEl.classList.add('btn');
      btnEl.dataset.index = count;
      grid.appendChild(btnEl);
    } else {
      let tileEl = document.createElement('div');
      tileEl.classList.add('cell');
      grid.appendChild(tileEl);
    }
    count++;
  }
}

function drawCurrentGen(tiles, gen) {
  for (let i = 0; i < gen.length; i++) {
    gen[i][0] === 1
      ? tiles[i].classList.add('alive')
      : tiles[i].classList.remove('alive');
  }
}

function runGame(tiles, gen) {
  iterations--;
  drawCurrentGen(tiles, gen);
  const newGen = [];

  for (let i = 0; i < gen.length; i++) {
    const liveNeighbors = getNeighbors(i, gen, side);
    let border = gen[i][1];
    let n;

    if (gen[i][0] === 1) {
      if (liveNeighbors < 2 || liveNeighbors > 3) {
        n = 0;
      } else {
        n = 1;
      }
    } else {
      if (liveNeighbors >= 3) {
        n = 1;
      } else {
        n = 0;
      }
    }

    let newCell = [n, border];
    newGen.push(newCell);
  }

  if (iterations <= 0) return;
  setTimeout(() => runGame(tiles, newGen), generation_rate);
}

setupGame();
