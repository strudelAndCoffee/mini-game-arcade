const TILE_CLASSES = {
  HIDDEN: 'hidden',
  MINE: 'mine',
  NUMBER: 'number',
  MARKED: 'marked',
}

function createBoard(size, numberOfMines) {
  const board = []

  for (let x = 0; x < size; x++) {
    let row = []

    for (let y = 0; y < size; y++) {
      let element = document.createElement('div')
      element.dataset.status = TILE_CLASSES.HIDDEN

      let tile = {
        element,
        x,
        y,
      }
      row.push(tile)
    }
    board.push(row)
  }

  return board
}

export { createBoard }
