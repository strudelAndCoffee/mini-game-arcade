const HOLE_HEIGHT = 200
const PIPE_WIDTH = 120
const PIPE_INTERVAL = 1500
const PIPE_SPEED = 0.75

let pipes = []
let time_since_last_pipe
let passed_pipe_count

function setupPipes() {
  document.documentElement.style.setProperty('--pipe-width', PIPE_WIDTH)
  document.documentElement.style.setProperty('--hole-height', HOLE_HEIGHT)

  pipes.forEach((p) => p.remove())
  time_since_last_pipe = PIPE_INTERVAL
  passed_pipe_count = 0
}

function updatePipes(delta) {
  time_since_last_pipe += delta

  if (time_since_last_pipe > PIPE_INTERVAL) {
    time_since_last_pipe -= PIPE_INTERVAL
    createPipe()
  }

  pipes.forEach((pipe) => {
    if (pipe.left + PIPE_WIDTH < 0) {
      passed_pipe_count++
      return pipe.remove()
    }

    pipe.left = pipe.left - delta * PIPE_SPEED
  })
}

function getPassedPipesCount() {
  return passed_pipe_count
}

function getPipeRects() {
  return pipes.flatMap((p) => p.rects())
}

function createPipe() {
  const pipe_element = document.createElement('div')
  const top_element = createPipeSegment('top')
  const bottom_element = createPipeSegment('bottom')

  pipe_element.classList.add('pipe')
  pipe_element.appendChild(top_element)
  pipe_element.appendChild(bottom_element)

  pipe_element.style.setProperty(
    '--hole-top',
    randomNumberBetween(
      HOLE_HEIGHT * 1.5,
      window.innerHeight - HOLE_HEIGHT * 0.5
    )
  )

  const pipe = {
    get left() {
      return parseFloat(
        getComputedStyle(pipe_element).getPropertyValue('--pipe-left')
      )
    },
    set left(val) {
      pipe_element.style.setProperty('--pipe-left', val)
    },
    remove() {
      pipes = pipes.filter((p) => p !== pipe)
      pipe_element.remove()
    },
    rects() {
      return [
        top_element.getBoundingClientRect(),
        bottom_element.getBoundingClientRect(),
      ]
    },
  }

  pipe.left = window.innerWidth
  document.body.appendChild(pipe_element)
  pipes.push(pipe)
}

function createPipeSegment(position) {
  const segment = document.createElement('div')
  segment.classList.add('segment', position)
  return segment
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export { setupPipes, updatePipes, getPassedPipesCount, getPipeRects }
