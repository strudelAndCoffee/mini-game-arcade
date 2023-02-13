import { randomNumber, positionsMatch } from './utils.js'

const TILE_CLASSES = {
  HIDDEN: 'hidden',
  MINE: 'mine',
  NUMBER: 'number',
  MARKED: 'marked',
}

function createBoard(size, number_of_mines) {
  const board = []
  const mine_positions = getMinePositions(size, number_of_mines)

  for (let x = 0; x < size; x++) {
    let row = []

    for (let y = 0; y < size; y++) {
      let element = document.createElement('div')
      element.dataset.status = TILE_CLASSES.HIDDEN

      let tile = {
        element,
        x,
        y,
        mine: mine_positions.some(positionsMatch.bind(null, { x, y })),
        get status() {
          return this.element.dataset.status
        },
        set status(val) {
          this.element.dataset.status = val
        },
      }
      row.push(tile)
    }
    board.push(row)
  }

  return board
}

function getMinePositions(size, number_of_mines) {
  const positions = []

  while (positions.length < number_of_mines) {
    let position = {
      x: randomNumber(size),
      y: randomNumber(size),
    }

    if (!positions.some(positionsMatch.bind(null, position))) {
      positions.push(position)
    }
  }

  return positions
}

export { createBoard }
