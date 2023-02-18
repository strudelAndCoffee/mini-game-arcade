export default class Alien {
  constructor(img, x, y, width, height, row_n, col_n) {
    this.img = img
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.row_n = row_n
    this.col_n = col_n
    this.alive = true
  }
}
