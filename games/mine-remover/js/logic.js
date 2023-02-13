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

function markTile(tile) {
  if (
    tile.status !== TILE_CLASSES.HIDDEN &&
    tile.status !== TILE_CLASSES.MARKED
  )
    return

  tile.status === TILE_CLASSES.MARKED
    ? (tile.status = TILE_CLASSES.HIDDEN)
    : (tile.status = TILE_CLASSES.MARKED)
}

function revealTile(board, tile) {
  if (tile.status !== TILE_CLASSES.HIDDEN) return
  if (tile.mine) {
    tile.status = TILE_CLASSES.MINE
    return
  }

  tile.status = TILE_CLASSES.NUMBER
  const adjacent_tiles = nearbyTiles(board, tile)
  const mines = adjacent_tiles.filter((t) => t.mine)

  mines.length === 0
    ? adjacent_tiles.forEach(revealTile.bind(null, board))
    : (tile.element.textContent = mines.length)
}

function nearbyTiles(board, { x, y }) {
  const tiles = []

  for (let xOffest = -1; xOffest <= 1; xOffest++) {
    for (let yOffest = -1; yOffest <= 1; yOffest++) {
      let tile = board[x + xOffest]?.[y + yOffest]
      if (tile) tiles.push(tile)
    }
  }

  return tiles
}

function checkWin(board) {
  return board.every((row) => {
    return row.every((tile) => {
      return (
        tile.status === TILE_CLASSES.NUMBER ||
        (tile.mine &&
          (tile.status === TILE_CLASSES.HIDDEN ||
            tile.status === TILE_CLASSES.MARKED))
      )
    })
  })
}

function checkLose(board) {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === TILE_CLASSES.MINE
    })
  })
}

export { TILE_CLASSES, createBoard, markTile, revealTile, checkWin, checkLose }
