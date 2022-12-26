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

const WIDTH = 28;
const DIRECTIONS = [-1, 1, WIDTH, -WIDTH];
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
  ghosts.forEach(
    (ghost) => (ghost.timerId = setInterval(handleGhostMove, ghost.speed))
  );
}

// GHOST LOGIC
function handleGhostMove() {
  let dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];

  if (notBlocked(ghost.currentIndex + dir, true)) {
    squares[ghost.currentIndex].classList.remove(
      ghost.className,
      'ghost',
      'scared'
    );

    if (isOptimumDir(dir, ghost)) {
      ghost.currentIndex += dir;
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
    } else {
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
      dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
    }

    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
  } else dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];

  if (ghost.isScared) squares[ghost.currentIndex].classList.add('scared');
  if (ghost.isScared && checkSquareFor('pac-person', ghost.currentIndex)) {
    squares[ghost.currentIndex].classList.remove(
      ghost.className,
      'ghost',
      'scared'
    );
    ghost.currentIndex = ghost.startIndex;
    score += 100;
    squares[ghost.currentIndex].classList.add(ghost.classList, 'ghost');
  }
  if (checkSquareFor('pac-man', ghost.currentIndex))
    clearInterval(ghost.timerId);

  checkGameOver();
}

function isOptimumDir(dir, ghost) {
  const getCoordinates = (index) => {
    return [index % WIDTH, Math.floor(index / WIDTH)];
  };
  const [ghostX, ghostY] = getCoordinates(ghost.currentIndex);
  const [ppX, ppY] = getCoordinates(ppCurrentIndex);
  const [ghostNewX, ghostNewY] = getCoordinates(ghost.currentIndex + dir);

  const isCloserByAxis = (xAxis) => {
    let ghostCurrent = xAxis ? ghostX : ghostY;
    let ghostNew = xAxis ? ghostNewX : ghostNewY;
    let ppCurrent = xAxis ? ppX : ppY;

    if (ghostNew - ppCurrent > ghostCurrent - ppCurrent) {
      return true;
    } else return false;
  };

  if (isCloserByAxis(true) || isCloserByAxis(false)) return true;
  else return false;
}

// PLAYER MOVEMENT
function move(e) {
  squares[ppCurrentIndex].classList.remove('pac-person');
  switch (e.keyCode) {
    case 37:
      if (ppCurrentIndex % WIDTH !== 0 && notBlocked(ppCurrentIndex - 1, false))
        ppCurrentIndex--;
      nextToExit(-1);
      break;
    case 38:
      if (
        ppCurrentIndex - WIDTH >= 0 &&
        notBlocked(ppCurrentIndex - WIDTH, false)
      )
        ppCurrentIndex -= WIDTH;
      break;
    case 39:
      if (
        ppCurrentIndex % WIDTH < WIDTH - 1 &&
        notBlocked(ppCurrentIndex + 1, false)
      )
        ppCurrentIndex++;
      nextToExit(1);
      break;
    case 40:
      if (
        ppCurrentIndex + WIDTH < WIDTH * WIDTH &&
        notBlocked(ppCurrentIndex + WIDTH, false)
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
  checkWin();
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

function notBlocked(index, isGhost) {
  if (isGhost) {
    return (
      !squares[index].classList.contains('wall') &&
      !squares[index].classList.contains('ghost')
    );
  }
  return (
    !squares[index].classList.contains('wall') &&
    !squares[index].classList.contains('ghost-lair')
  );
}

function nextToExit(mod) {
  if (ppCurrentIndex + mod === 363) ppCurrentIndex = 391;
  if (ppCurrentIndex + mod === 392) ppCurrentIndex = 364;
}

// END GAME
function checkGameOver() {
  if (
    checkSquareFor('ghost', ppCurrentIndex) &&
    !checkSquareFor('scared', ppCurrentIndex)
  ) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener('keyup', move);
    setTimeout(() => alert('Game over!'), 500);
  }
}

function checkWin() {
  if (score >= 274) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener('keyup', move);
    alert('You win!');
  }
}

startGame();
