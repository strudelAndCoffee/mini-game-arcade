const BIRD_SPEED = 0.4
const JUMP_DURATION = 125
const bird_element = document.querySelector('[data-bird]')

let time_since_last_jump = Number.POSITIVE_INFINITY

function setupBird() {
  setTop(window.innerHeight / 2)
  document.removeEventListener('keydown', handleJump)
  document.addEventListener('keydown', handleJump)
}

function updateBird(delta) {
  time_since_last_jump < JUMP_DURATION
    ? setTop(getTop() - BIRD_SPEED * delta)
    : setTop(getTop() + BIRD_SPEED * delta)

  time_since_last_jump += delta
}

function getBirdRect() {
  return bird_element.getBoundingClientRect()
}

function setTop(top) {
  bird_element.style.setProperty('--bird-top', top)
}

function getTop() {
  return parseFloat(
    getComputedStyle(bird_element).getPropertyValue('--bird-top')
  )
}

function handleJump(e) {
  if (e.code !== 'Space') return
  time_since_last_jump = 0
}

export { setupBird, updateBird, getBirdRect }
