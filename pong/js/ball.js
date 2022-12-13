const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.000005;

export default class Ball {
  constructor(ballEl) {
    this.ballEl = ballEl;
    this.reset();
  }

  get x() {
    return parseFloat(getComputedStyle(this.ballEl).getPropertyValue('--x'));
  }
  set x(val) {
    this.ballEl.style.setProperty('--x', val);
  }
  get y() {
    return parseFloat(getComputedStyle(this.ballEl).getPropertyValue('--x'));
  }
  set y(val) {
    this.ballEl.style.setProperty('--y', val);
  }

  rect() {
    return this.ballEl.getBoundingClientRect();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0, y: 0 };
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumber(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = INITIAL_VELOCITY;
  }

  update(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += VELOCITY_INCREASE * delta;
    const rect = this.rect();

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }

    if (paddleRects.some((r) => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function isCollision(r1, r2) {
  return (
    r1.left <= r2.right &&
    r1.right >= r2.left &&
    r1.top <= r2.bottom &&
    r1.bottom >= r2.top
  );
}
