function randomNumber(size) {
  return Math.floor(Math.random() * size)
}

function positionsMatch(a, b) {
  return a.x === b.x && a.y === b.y
}

function stopProp(e) {
  e.stopImmediatePropagation()
}

export { randomNumber, positionsMatch, stopProp }
