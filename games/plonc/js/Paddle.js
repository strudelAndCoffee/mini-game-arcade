let speed = 0.012

export default class Paddle {
  constructor(paddleEl) {
    this.paddleEl = paddleEl
    this.reset()
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleEl).getPropertyValue('--position')
    )
  }
  set position(val) {
    this.paddleEl.style.setProperty('--position', val)
  }

  rect() {
    return this.paddleEl.getBoundingClientRect()
  }

  reset() {
    this.position = 50
  }

  update(delta, ballHeight) {
    this.position += speed * delta * (ballHeight - this.position)
  }

  setSpeed(level) {
    switch (level) {
      case 'easy':
        speed = 0.01
        break
      case 'med':
        speed = 0.016
        break
      case 'hard':
        speed = 0.02
        break
      default:
        break
    }
  }
}
