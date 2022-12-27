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

    let cell = [Math.floor(Math.random() * 2), border];
    arr.push(cell);
    index++;
  }

  return arr;
}

export { makeGridArray };
