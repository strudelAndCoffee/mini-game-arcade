function getNeighbors(index, currentGen, side) {
  let neighbors = [];

  let leftTop;
  let left;
  let leftBtm;
  let top;
  let btm;
  let rightTop;
  let right;
  let rightBtm;

  if (currentGen[index][1] === null) {
    leftTop = currentGen[index - 1 - side];
    left = currentGen[index - 1];
    leftBtm = currentGen[index - 1 + side];
    top = currentGen[index - side];
    btm = currentGen[index + side];
    rightTop = currentGen[index + 1 - side];
    right = currentGen[index + 1];
    rightBtm = currentGen[index + 1 + side];
  } else {
    switch (currentGen[index][1]) {
      case 'top':
        leftTop = -1;
        left = currentGen[index - 1];
        leftBtm = currentGen[index - 1 + side];
        top = -1;
        btm = currentGen[index + side];
        rightTop = -1;
        right = currentGen[index + 1];
        rightBtm = currentGen[index + 1 + side];
        break;
      case 'bottom':
        leftTop = currentGen[index - 1 - side];
        left = currentGen[index - 1];
        leftBtm = -1;
        top = currentGen[index - side];
        btm = -1;
        rightTop = currentGen[index + 1 - side];
        right = currentGen[index + 1];
        rightBtm = -1;
        break;
      case 'left':
        leftTop = -1;
        left = -1;
        leftBtm = -1;
        top = currentGen[index - side];
        btm = currentGen[index + side];
        rightTop = currentGen[index + 1 - side];
        right = currentGen[index + 1];
        rightBtm = currentGen[index + 1 + side];
        break;
      case 'right':
        leftTop = currentGen[index - 1 - side];
        left = currentGen[index - 1];
        leftBtm = currentGen[index - 1 + side];
        top = currentGen[index - side];
        btm = currentGen[index + side];
        rightTop = -1;
        right = -1;
        rightBtm = -1;
        break;
      case 'nw':
        leftTop = -1;
        left = -1;
        leftBtm = -1;
        top = -1;
        btm = currentGen[index + side];
        rightTop = -1;
        right = currentGen[index + 1];
        rightBtm = currentGen[index + 1 + side];
        break;
      case 'ne':
        leftTop = -1;
        left = currentGen[index - 1];
        leftBtm = currentGen[index - 1 + side];
        top = -1;
        btm = currentGen[index + side];
        rightTop = -1;
        right = -1;
        rightBtm = -1;
        break;
      case 'se':
        leftTop = currentGen[index - 1 - side];
        left = currentGen[index - 1];
        leftBtm = -1;
        top = currentGen[index - side];
        btm = -1;
        rightTop = -1;
        right = -1;
        rightBtm = -1;
        break;
      case 'sw':
        leftTop = -1;
        left = -1;
        leftBtm = -1;
        top = currentGen[index - side];
        btm = -1;
        rightTop = currentGen[index + 1 - side];
        right = currentGen[index + 1];
        rightBtm = -1;
        break;
      default:
        break;
    }
  }

  neighbors.push([leftTop, left, leftBtm]);
  neighbors.push([top, btm]);
  neighbors.push([rightTop, right, rightBtm]);
  return neighbors;
}

function applyRules(cell, neighbors) {
  return newCell;
}

export { getNeighbors, applyRules };
