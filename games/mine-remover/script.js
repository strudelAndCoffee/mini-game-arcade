import { TILE_CLASSES, createBoard, markTile, revealTile } from './js/logic.js'

const SIZE = 10
const NUMBER_OF_MINES = 10

const board = createBoard(SIZE, NUMBER_OF_MINES)
const board_element = document.querySelector('.board')
const mines_left_text = document.querySelector('[data-mine-count]')

board_element.style.setProperty('--size', SIZE)
mines_left_text.textContent = NUMBER_OF_MINES

board.forEach((row) => {
  row.forEach((tile) => {
    board_element.appendChild(tile.element)
    tile.element.addEventListener('click', () => {
      revealTile(board, tile)
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
