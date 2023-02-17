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
const ship_velocity_x = TILE_SIZE
let ship_img
// aliens
const ALIEN_WIDTH = TILE_SIZE * 2
const ALIEN_HEIGHT = TILE_SIZE
const ALIEN_X = TILE_SIZE
const ALIEN_Y = TILE_SIZE
const alien_arr = []
let alien_rows = 2
let alien_cols = 3
let alien_count = 0
let alien_velocity_x = 1
let alien_img
// bullets
const bullet_velocity_y = -10
const bullet_arr = []

window.onload = function () {
  board = document.getElementById('board')
  board.width = BOARD_WIDTH
  board.height = BOARD_HEIGHT
  context = board.getContext('2d')

  ship_img = new Image()
  ship_img.src = './assets/images/ship.png'
  ship_img.onload = function () {
    context.drawImage(ship_img, ship.x, ship.y, ship.width, ship.height)
  }

  alien_img = new Image()
  alien_img.src = './assets/images/alien.png'
  createAliens()

  requestAnimationFrame(update)
  document.addEventListener('keydown', moveShip)
  document.addEventListener('keyup', shoot)
}

function update() {
  requestAnimationFrame(update)
  context.clearRect(0, 0, board.width, board.height)

  // draw ship
  context.drawImage(ship_img, ship.x, ship.y, ship.width, ship.height)
  // draw aliens
  for (let i = 0; i < alien_arr.length; i++) {
    let alien = alien_arr[i]
    if (alien.alive) {
      alien.x += alien_velocity_x

      // if alien touches border
      if (alien.x + alien.width >= board.width || alien.x < 0) {
        alien_velocity_x *= -1
        alien.x += alien_velocity_x * 2
        for (let j = 0; j < alien_arr.length; j++) {
          alien_arr[j].y += alien.height
        }
      }

      context.drawImage(alien_img, alien.x, alien.y, alien.width, alien.height)
    }
  }
  //draw bullets
  for (let i = 0; i < bullet_arr.length; i++) {
    let bullet = bullet_arr[i]

    bullet.y += bullet_velocity_y
    context.fillStyle = 'white'
    context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
  }
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

function createAliens() {
  for (let c = 0; c < alien_cols; c++) {
    for (let r = 0; r < alien_rows; r++) {
      let alien = {
        img: alien_img,
        x: ALIEN_X + c * ALIEN_WIDTH,
        y: ALIEN_Y + r * ALIEN_HEIGHT,
        width: ALIEN_WIDTH,
        height: ALIEN_HEIGHT,
        alive: true,
      }

      alien_arr.push(alien)
    }
  }

  alien_count = alien_arr.length
}

function shoot(e) {
  if (e.code === 'Space') {
    let bullet = {
      x: ship.x + (ship.width * 15) / 32,
      y: ship.y,
      width: TILE_SIZE / 8,
      height: TILE_SIZE / 2,
      used: false,
    }

    bullet_arr.push(bullet)
  }
}