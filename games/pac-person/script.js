import Ghost from './js/Ghost.js';

// Grid layout copied, with permission, directly from https://github.com/kubowania/pac-man/blob/master/app.js
// Legend
// 0 - pac person
// 1 - wall
// 2 - ghost lair
// 3 - power pellet
// 4 - empty
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];
const lairEntrance = [321, 322];

const WIDTH = 28;
const DIRECTIONS = [1, -1, WIDTH, -WIDTH];
const SCARED_GHOST_TIME = 10000;

const grid = document.querySelector('.grid');
const scoreEl = document.getElementById('score');
const squares = [];
const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500),
];

let score = 0;
let ppCurrentIndex = 490;

// GAME SETUP
function startGame() {
  createBoard();
  drawGhosts();

  squares[ppCurrentIndex].classList.add('pac-person');
  document.addEventListener('keyup', move);
}

function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
    squares.push(square);

    if (layout[i] === 0) squares[i].classList.add('pac-dot');
    if (layout[i] === 1) squares[i].classList.add('wall');
    if (layout[i] === 2) squares[i].classList.add('ghost-lair');
    if (layout[i] === 3) squares[i].classList.add('power-pellet');
  }
}

function drawGhosts() {
  ghosts.forEach((ghost) => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
  });
  ghosts.forEach((ghost) => moveGhost(ghost));
}

// GHOST LOGIC
function moveGhost(ghost) {
  ghost.timerId = setInterval(() => {
    const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
    if (isNotBlocked(ghost.currentIndex + dir, true)) {
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        'ghost',
        'scared'
      );
      ghost.currentIndex += dir;
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
    }

    if (ghost.isScared) squares[ghost.currentIndex].classList.add('scared');
    handleScared(ghost);
    checkGameOver();
  }, ghost.speed);
}

function handleScared(ghost) {
  if (
    ghost.isScared &&
    (checkSquareFor('pac-person', ghost.currentIndex) ||
      checkSquareFor('ghost', ppCurrentIndex))
  ) {
    squares[ghost.currentIndex].classList.remove(
      ghost.className,
      'ghost',
      'scared'
    );
    ghost.currentIndex = ghost.startIndex;
    score += 50;
    scoreEl.innerText = score;
    squares[ghost.currentIndex].classList.add(ghost.classList, 'ghost');
  }
}

// PLAYER MOVEMENT
function move(e) {
  let isGhost = false;
  squares[ppCurrentIndex].classList.remove('pac-person');

  switch (e.keyCode) {
    case 37:
      if (
        ppCurrentIndex % WIDTH !== 0 &&
        isNotBlocked(ppCurrentIndex - 1, isGhost)
      )
        ppCurrentIndex--;
      nextToExit(-1);
      break;
    case 38:
      if (
        ppCurrentIndex - WIDTH >= 0 &&
        isNotBlocked(ppCurrentIndex - WIDTH, isGhost)
      )
        ppCurrentIndex -= WIDTH;
      break;
    case 39:
      if (
        ppCurrentIndex % WIDTH < WIDTH - 1 &&
        isNotBlocked(ppCurrentIndex + 1, isGhost)
      )
        ppCurrentIndex++;
      nextToExit(1);
      break;
    case 40:
      if (
        ppCurrentIndex + WIDTH < WIDTH * WIDTH &&
        isNotBlocked(ppCurrentIndex + WIDTH, isGhost)
      )
        ppCurrentIndex += WIDTH;
      break;
    default:
      break;
  }

  squares[ppCurrentIndex].classList.add('pac-person');
  pacDotEaten();
  powerPelletEaten();
  checkGameOver();
}

function pacDotEaten() {
  if (squares[ppCurrentIndex].classList.contains('pac-dot')) {
    score++;
    scoreEl.innerText = score;
    squares[ppCurrentIndex].classList.remove('pac-dot');
  }
}

function powerPelletEaten() {
  if (checkSquareFor('power-pellet', ppCurrentIndex)) {
    score += 10;
    scoreEl.innerText = score;
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(unScareGhosts, SCARED_GHOST_TIME);
    squares[ppCurrentIndex].classList.remove('power-pellet');
  }
}

function unScareGhosts() {
  ghosts.forEach((ghost) => (ghost.isScared = false));
}

// SQUARE CHECKS
function checkSquareFor(type, index) {
  return squares[index].classList.contains(type);
}

function isNotBlocked(index, isGhost) {
  return (
    !squares[index].classList.contains('wall') &&
    (isGhost
      ? !squares[index].classList.contains('ghost')
      : !squares[index].classList.contains('ghost-lair'))
  );
}

function nextToExit(dir) {
  if (ppCurrentIndex + dir === 363) ppCurrentIndex = 391;
  if (ppCurrentIndex + dir === 392) ppCurrentIndex = 364;
}

// END GAME
function checkGameOver() {
  if (
    checkSquareFor('ghost', ppCurrentIndex) &&
    !checkSquareFor('scared', ppCurrentIndex)
  ) {
    endGame('LOSE');
  } else if (score >= 274) {
    endGame('WIN');
  }
  return;
}

function endGame(result) {
  ghosts.forEach((ghost) => clearInterval(ghost.timerId));
  document.removeEventListener('keyup', move);
  scoreEl.innerText = `YOU ${result}!`;
  setTimeout(() => {
    confirm('Play again?')
      ? (window.location = '/games/pac-person')
      : (window.location = '/');
  }, 500);
}

startGame();
