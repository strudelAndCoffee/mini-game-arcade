import { makeGridArray, getNeighbors } from './js/utils.js';

const SIDE = 5;
const DIMENSION = SIDE * SIDE;
const CONFIG = [];
const gridEl = document.getElementById('grid');

let iterations = 1000;

function setup() {
  const starterGen = makeGridArray(DIMENSION, SIDE, CONFIG);
  console.log(starterGen);

  drawGridContainer();
  const tiles = gridEl.children;

  runGame(tiles, starterGen);
}

function drawGridContainer() {
  gridEl.style.setProperty('--cols', SIDE);
  gridEl.style.setProperty('--rows', SIDE);

  let count = 0;
  while (count < DIMENSION) {
    let tileEl = document.createElement('div');
    tileEl.classList.add('cell');
    gridEl.appendChild(tileEl);
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
  drawCurrentGen(tiles, gen);
  const newGen = [];

  for (let i = 0; i < gen.length; i++) {
    const liveNeighbors = getNeighbors(i, gen, SIDE);
    let border = gen[i][1];
    let n = 0;

    if (gen[i][0] === 1 && (liveNeighbors < 2 || liveNeighbors >= 3)) {
      n = 0;
    } else if (gen[i][0] === 0 && liveNeighbors >= 3) n = 1;

    let newCell = [n, border];
    newGen.push(newCell);
  }

  console.log(newGen);
}

setup();
