import { setupBird, updateBird, getBirdRect } from './js/bird.js'
import {
  setupPipes,
  updatePipes,
  getPassedPipesCount,
  getPipeRects,
} from './js/pipe.js'

document.addEventListener('keypress', handleStart, { once: true })

const title = document.querySelector('[data-title]')
const subtitle = document.querySelector('[data-subtitle]')

function handleStart() {
  title.classList.add('hide')
  setupBird()
  setupPipes()
  last_time = null

  window.requestAnimationFrame(updateLoop)
}

let last_time
function updateLoop(time) {
  if (last_time == null) {
    last_time = time
    window.requestAnimationFrame(updateLoop)
    return
  }

  const delta = time - last_time
  updateBird(delta)
  updatePipes(delta)

  if (checkLose()) return handleLose()
  last_time = time

  window.requestAnimationFrame(updateLoop)
}

function checkLose() {
  const bird_rect = getBirdRect()
  const inside_pipe = getPipeRects().some((rect) =>
    isCollision(bird_rect, rect)
  )
  const out_of_bounds =
    bird_rect.top < 0 || bird_rect.bottom > window.innerHeight

  return inside_pipe || out_of_bounds
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function handleLose() {
  setTimeout(() => {
    title.classList.remove('hide')
    subtitle.classList.remove('hide')
    subtitle.textContent = `${getPassedPipesCount()} pipes`

    document.addEventListener('keypress', handleStart, { once: true })
  }, 100)
}
