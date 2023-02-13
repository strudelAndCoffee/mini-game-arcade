import {
  TILE_CLASSES,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
} from './js/logic.js'
import { stopProp } from './js/utils.js'

const SIZE = 15
const NUMBER_OF_MINES = 15

const board = createBoard(SIZE, NUMBER_OF_MINES)
const board_element = document.querySelector('.board')
const mines_left_text = document.querySelector('[data-mine-count]')
const message_text = document.querySelector('.subtext')

board_element.style.setProperty('--size', SIZE)
mines_left_text.textContent = NUMBER_OF_MINES

board.forEach((row) => {
  row.forEach((tile) => {
    board_element.appendChild(tile.element)
    tile.element.addEventListener('click', () => {
      revealTile(board, tile)
      checkGameOver()
    })
    tile.element.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      markTile(tile)
      listMinesLeft()
    })
  })
})

function listMinesLeft() {
  const marked_tiles_count = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_CLASSES.MARKED).length
    )
  }, 0)

  mines_left_text.textContent = NUMBER_OF_MINES - marked_tiles_count
}

function checkGameOver() {
  const win = checkWin(board)
  const lose = checkLose(board)

  if (win || lose) {
    board_element.addEventListener('click', stopProp, { capture: true })
    board_element.addEventListener('contextmenu', stopProp, {
      capture: true,
    })
  }

  if (win) message_text.textContent = 'You Win!'
  if (lose) {
    message_text.textContent = 'You Lose'
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_CLASSES.MARKED) markTile(tile)
        if (tile.mine) revealTile(board, tile)
      })
    })
  }
}
