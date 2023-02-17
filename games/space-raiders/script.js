// board
const TILE_SIZE = 32
const ROWS = 16
const COLS = 16
const BOARD_WIDTH = TILE_SIZE * COLS
const BOARD_HEIGHT = TILE_SIZE * ROWS
let board
let context
// ship
const SHIP_WIDTH = TILE_SIZE * 2
const SHIP_HEIGHT = TILE_SIZE
let ship_x = (TILE_SIZE * COLS) / 2 - TILE_SIZE
let ship_y = TILE_SIZE * ROWS - TILE_SIZE * 2
let ship = {
  x: ship_x,
  y: ship_y,
  height: SHIP_HEIGHT,
  width: SHIP_WIDTH,
}
let ship_img

window.onload = function () {
  board = document.getElementById('board')
  board.width = BOARD_WIDTH
  board.height = BOARD_HEIGHT
  context = board.getContext('2d')

  // context.fillStyle = 'green'
  // context.fillRect(ship.x, ship.y, ship.width, ship.height)

  ship_img = new Image()
  ship_img.src = './assets/images/ship.png'
  ship_img.onload = function () {
    context.drawImage(ship_img, ship.x, ship.y, ship.width, ship.height)
  }
}
