function makeGridArray(dimension, side, config) {
  let arr = [];
  let index = 0;
  while (index < dimension) {
    let border = null;
    if (index === 0) {
      border = 'nw';
    } else if (index === side - 1) {
      border = 'ne';
    } else if (index === dimension - side) {
      border = 'sw';
    } else if (index === dimension - 1) {
      border = 'se';
    } else if (index > 0 && index < side - 1) {
      border = 'top';
    } else if (index >= dimension - side) {
      border = 'bottom';
    } else if (index === 0 || index % side === 0) {
      border = 'left';
    } else if (index === side - 1 || index % side === side - 1) {
      border = 'right';
    }

    let n = index % 3 === 0 ? 1 : 0;
    let cell = [n, border];
    arr.push(cell);
    index++;
  }

  return arr;
}

function getNeighbors(index, gen, side) {
  const cell = gen[index];
  let neighbors;

  const leftTop = index - side - 1;
  const left = index - 1;
  const leftBtm = index + side - 1;
  const top = index - side;
  const btm = index + side;
  const rightTop = index - side + 1;
  const right = index + 1;
  const rightBtm = index + side + 1;

  if (cell[1] === null) {
    neighbors = [
      gen[leftTop][0],
      gen[left][0],
      gen[leftBtm][0],
      gen[top][0],
      gen[btm][0],
      gen[rightTop][0],
      gen[right][0],
      gen[rightBtm][0],
    ];
  } else {
    switch (gen[index][1]) {
      case 'top':
        neighbors = [
          gen[left][0],
          gen[leftBtm][0],
          gen[btm][0],
          gen[right][0],
          gen[rightBtm][0],
        ];
        break;
      case 'bottom':
        neighbors = [
          gen[leftTop][0],
          gen[left][0],
          gen[top][0],
          gen[rightTop][0],
          gen[right][0],
        ];
        break;
      case 'left':
        neighbors = [
          gen[top][0],
          gen[btm][0],
          gen[rightTop][0],
          gen[right][0],
          gen[rightBtm][0],
        ];
        break;
      case 'right':
        neighbors = [
          gen[leftTop][0],
          gen[left][0],
          gen[leftBtm][0],
          gen[top][0],
          gen[btm][0],
        ];
        break;
      case 'nw':
        neighbors = [gen[btm][0], gen[right][0], gen[rightBtm][0]];
        break;
      case 'ne':
        neighbors = [gen[left][0], gen[leftBtm][0], gen[btm][0]];
        break;
      case 'se':
        neighbors = [gen[leftTop][0], gen[left][0], gen[top][0]];
        break;
      case 'sw':
        neighbors = [gen[top][0], gen[rightTop][0], gen[right][0]];
        break;
      default:
        neighbors = [];
        break;
    }
  }

  let liveNeighbors = 0;
  neighbors.forEach((n) => {
    if (n === 1) liveNeighbors++;
  });
  return liveNeighbors;
}

export { makeGridArray, getNeighbors };
