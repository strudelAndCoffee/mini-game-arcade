function randomNumber(size) {
  return Math.floor(Math.random() * size)
}

function positionsMatch(a, b) {
  return a.x === b.x && a.y === b.y
}

export { randomNumber, positionsMatch }
