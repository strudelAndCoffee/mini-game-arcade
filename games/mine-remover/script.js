import { createBoard } from './js/logic.js'

const SIZE = 10
const NUMBER_OF_MINES = 2

const board = createBoard(SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
boardElement.style.setProperty('--size', SIZE)
board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.appendChild(tile.element)
  })
})
