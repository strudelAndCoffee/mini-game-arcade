import { makeGridArray } from './js/utils.js';
import { getNeighbors, applyRules } from './js/rules.js';

const SIDE = 5;
const DIMENSION = SIDE * SIDE;

const gridEl = document.getElementById('grid');
let tiles;
let currentGen;
let newGen;

function setup() {
  const config = [];
  currentGen = makeGridArray(DIMENSION, SIDE, config);

  drawGridContainer();
  tiles = gridEl.children;
  runGame(tiles);
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

function runGame(tiles) {
  drawCurrentGen(tiles);
  updateGen();
}

function drawCurrentGen(tiles) {
  for (let i = 0; i < currentGen.length; i++) {
    currentGen[i][0] === 1
      ? tiles[i].classList.add('alive')
      : tiles[i].classList.remove('alive');
  }
}

function updateGen() {
  currentGen.forEach((cell, index) => {
    let neighbors = getNeighbors(index, currentGen, SIDE);
    console.log(neighbors);
  });
}

setup();
