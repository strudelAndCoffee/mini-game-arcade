import { createBoard } from './js/logic.js'

const SIZE = 10
const NUMBER_OF_MINES = 2

const board = createBoard(SIZE, NUMBER_OF_MINES)
const board_element = document.querySelector('.board')

board_element.style.setProperty('--size', SIZE)
board.forEach((row) => {
  row.forEach((tile) => {
    board_element.appendChild(tile.element)
  })
})
