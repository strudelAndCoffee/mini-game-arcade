export default class Paddle {
  constructor(paddleEl) {
    this.paddleEl = paddleEl;
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleEl).getPropertyValue('--position')
    );
  }
  set position(val) {
    this.paddleEl.style.setProperty('--position', val);
  }
}
