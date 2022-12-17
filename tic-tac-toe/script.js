const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const winningMsgEl = document.getElementById('winningMsg');
const winningMsgTextEl = document.querySelector('[data-winning-msg-text]');
const restartBtn = document.getElementById('restartBtn');

let circleTurn;

function startGame() {
  circleTurn = false;
  cells.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardClass();
  winningMsgEl.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? O_CLASS : X_CLASS;
  cell.classList.add(currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    circleTurn = !circleTurn;
    setBoardClass();
  }
}

function setBoardClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  board.classList.add(circleTurn ? O_CLASS : X_CLASS);
}

function checkWin(currentClass) {
  return WINNING_COMBOS.some((combo) => {
    return combo.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winningMsgTextEl.innerText = 'Cat wins...';
  } else {
    winningMsgTextEl.innerText = `${circleTurn ? 'O' : 'X'} wins the game!`;
  }
  winningMsgEl.classList.add('show');
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

startGame();
restartBtn.addEventListener('click', startGame);
