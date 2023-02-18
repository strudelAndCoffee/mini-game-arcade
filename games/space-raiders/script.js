import Alien from './classes/Alien.js'

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
const SHIP_START_Y = TILE_SIZE * ROWS - TILE_SIZE * 2 + TILE_SIZE / 2
const ship = {
  x: SHIP_START_X,
  y: SHIP_START_Y,
  height: SHIP_HEIGHT,
  width: SHIP_WIDTH,
}
const ship_velocity_x = TILE_SIZE
let ship_lives = 3
let ship_img
// aliens
const ALIEN_WIDTH = TILE_SIZE * 2
const ALIEN_HEIGHT = TILE_SIZE
const ALIEN_X = TILE_SIZE
const ALIEN_Y = TILE_SIZE
const ALIEN_IMGS = []
for (let i = 0; i < 4; i++) {
  let alien_img = new Image()
  if (i === 0) alien_img.src = './assets/images/alien.png'
  else if (i === 1) alien_img.src = './assets/images/alien-cyan.png'
  else if (i === 2) alien_img.src = './assets/images/alien-magenta.png'
  else if (i === 3) alien_img.src = './assets/images/alien-yellow.png'

  ALIEN_IMGS.push(alien_img)
}
let alien_arr = []
let alien_rows = 2
let alien_cols = 3
let alien_count = 0
let alien_velocity_x = 1
// bullets
const bullet_velocity_y = -10
let bullet_arr = []
// bombs
let bomb_freq = 1000
let alien_bomb_interval = setInterval(alienBombController, bomb_freq)
let bomb_velocity_y = 0.7
let bomb_arr = []
//score
let score = 0
let game_over = false

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

  createAliens()

  requestAnimationFrame(update)
  document.addEventListener('keydown', moveShip)
  document.addEventListener('keyup', shoot)
}

function update() {
  requestAnimationFrame(update)
  if (game_over) {
    runGameOver()
    return
  }

  // clear board
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

      context.drawImage(alien.img, alien.x, alien.y, alien.width, alien.height)

      if (alien.y >= ship.y) game_over = true
    }
  }

  //draw bombs
  for (let i = 0; i < bomb_arr.length; i++) {
    let bomb = bomb_arr[i]
    if (bomb.alive) {
      bomb.y += bomb_velocity_y
      context.fillStyle = 'yellow'
      context.fillRect(bomb.x, bomb.y, bomb.width, bomb.height)

      // bomb collisions
      if (detectCollision(bomb, ship)) {
        bomb.alive = false
        score -= 10000
        ship_lives--

        if (ship_lives === 0) game_over = true
      }
    }
  }

  //draw bullets
  for (let i = 0; i < bullet_arr.length; i++) {
    let bullet = bullet_arr[i]

    bullet.y += bullet_velocity_y
    context.fillStyle = 'white'
    context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)

    // bullet collisions with aliens
    for (let j = 0; j < alien_arr.length; j++) {
      let alien = alien_arr[j]
      if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
        bullet.used = true
        alien.alive = false
        alien_count--
        score += 80 + 10 * alien_rows
      }
    }

    // bullet collisions with bombs
    for (let k = 0; k < bomb_arr.length; k++) {
      let bomb = bomb_arr[k]
      if (!bullet.used && bomb.alive && detectCollision(bullet, bomb)) {
        bullet.used = true
        bomb.alive = false
        score += 40 + 5 * alien_rows
      }
    }
  }

  // clear bullets
  while (
    (bullet_arr.length > 0 && bullet_arr[0]?.used) ||
    bullet_arr[0]?.y < 0
  ) {
    bullet_arr.shift()
  }

  // clear bombs
  while ((bomb_arr.length > 0 && !bomb_arr[0]?.alive) || bomb_arr[0]?.y < 0) {
    bomb_arr.shift()
  }

  // next level
  if (alien_count === 0) {
    alien_cols = Math.min(alien_cols + 1, COLS / 2 - 2)
    alien_rows = Math.min(alien_rows + 1, ROWS - 4)
    alien_velocity_x += 0.2

    alien_arr = []
    bullet_arr = []
    bomb_arr = []
    createAliens()
  }

  // score
  context.fillStyle = 'white'
  context.font = '16px courier'
  context.fillText(score, 5, 20)
}

function moveShip(e) {
  if (game_over) return

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
      let random = Math.floor(Math.random() * 4)
      let img = ALIEN_IMGS[random]
      let x = ALIEN_X + c * ALIEN_WIDTH
      let y = ALIEN_Y + r * ALIEN_HEIGHT
      let width = ALIEN_WIDTH
      let height = ALIEN_HEIGHT
      let row_n = r
      let col_n = c

      let alien = new Alien(img, x, y, width, height, row_n, col_n)
      alien_arr.push(alien)
    }
  }

  alien_count = alien_arr.length
}

function shoot(e) {
  if (game_over) return

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

function dropBomb(alien) {
  let bomb = {
    x: alien.x + (alien.width * 15) / 32,
    y: alien.y + alien.height,
    width: TILE_SIZE / 3,
    height: TILE_SIZE / 3,
    alive: true,
  }

  bomb_arr.push(bomb)
}

function canDropBomb(alien) {
  for (let i = 0; i < alien_arr.length; i++) {
    let other_alien = alien_arr[i]

    // check if other aliens are underneath
    if (
      alien.row_n < other_alien.row_n &&
      alien.col_n === other_alien.col_n &&
      other_alien.alive
    )
      return false
  }
  return true
}

function alienBombController() {
  let random
  // decide if alien drops bomb
  for (let i = 0; i < alien_arr.length; i++) {
    random = Math.floor(Math.random() * 3)
    let alien = alien_arr[i]
    if (alien.alive && canDropBomb(alien) && random < 1) {
      dropBomb(alien)
    }
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width && // a's top left doesn't reach b's top right
    a.x + a.width > b.x && // a's top right passes b's top left
    a.y < b.y + b.height && // a's top left doesn't reach b's bottom left
    a.y + a.height > b.y // a's bottom left passes b's top lefft
  )
}

function runGameOver() {
  clearInterval(alien_bomb_interval)
  context.fillStyle = 'red'
  context.font = '32px courier'
  context.fillText('GAME OVER', 170, 70)
}
