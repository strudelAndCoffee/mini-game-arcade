import Grid from './js/Grid.js';

const gameBoard = document.getElementById('gameBoard');

const grid = new Grid(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
