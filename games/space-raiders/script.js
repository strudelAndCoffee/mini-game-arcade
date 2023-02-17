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
const SHIP_START_X = (TILE_SIZE * COLS) / 2 - TILE_SIZE
const SHIP_START_Y = TILE_SIZE * ROWS - TILE_SIZE * 2
const ship = {
  x: SHIP_START_X,
  y: SHIP_START_Y,
  height: SHIP_HEIGHT,
  width: SHIP_WIDTH,
}
let ship_velocity_x = TILE_SIZE
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

  requestAnimationFrame(update)
  document.addEventListener('keydown', moveShip)
}

function update() {
  requestAnimationFrame(update)
  context.clearRect(0, 0, board.width, board.height)

  context.drawImage(ship_img, ship.x, ship.y, ship.width, ship.height)
}

function moveShip(e) {
  if (e.code === 'ArrowLeft' && ship.x - ship_velocity_x >= 0) {
    ship.x -= ship_velocity_x
  }
  if (
    e.code === 'ArrowRight' &&
    ship.x + ship_velocity_x + ship.width <= board.width
  ) {
    ship.x += ship_velocity_x
  }
}
