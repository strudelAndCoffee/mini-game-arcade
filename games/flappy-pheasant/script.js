import { setupBird, updateBird, getBirdRect } from './js/bird.js'

document.addEventListener('keypress', handleStart, { once: true })

const title = document.querySelector('[data-title]')
const subtitle = document.querySelector('[data-subtitle]')

function handleStart() {
  title.classList.add('hide')
  setupBird()
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
  if (checkLose()) return handleLose()
  last_time = time

  window.requestAnimationFrame(updateLoop)
}

function checkLose() {
  const bird_rect = getBirdRect()
  const out_of_bounds =
    bird_rect.top < 0 || bird_rect.bottom > window.innerHeight

  return out_of_bounds
}

function handleLose() {
  setTimeout(() => {
    title.classList.remove('hide')
    subtitle.classList.remove('hide')
    subtitle.textContent = '0 pipes'

    document.addEventListener('keypress', handleStart, { once: true })
  }, 100)
}
