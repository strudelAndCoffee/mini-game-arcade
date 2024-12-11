import { targetWords, dictionary } from './lib/words.js'

const guessGrid = document.querySelector('[data-guess-grid]')
const keyboard = document.querySelector('[data-keyboard]')
const alertContainer = document.querySelector('[data-alert-container]')

const totalGames = document.querySelector('#total-games')
const gamesWon = document.querySelector('#games-won')
const winPercentage = document.querySelector('#win-percentage')

const greenLetters = document.querySelector('#green-letters')
const yellowLetters = document.querySelector('#yellow-letters')
const validGuesses = document.querySelector('#valid-guesses')
const unboundGuesses = document.querySelector('#unbound-guesses')
const currentTry = document.querySelector('#current-try')

const WORD_LENGTH = 5
const FLIP_FX_DURATION = 500
const DANCE_FX_DURATION = 500

const offsetFromDate = new Date(2022, 11, 13)
const msOffset = Date.now() - offsetFromDate
const dayOffset = msOffset / 1000 / 60 / 60 / 24
const targetWord = targetWords[Math.floor(dayOffset)]

const letterCount = {}

let targetLettersArray = targetWord.split('')
for (let i = 0; i < 5; i++) {
  let currentLetter = targetLettersArray.pop()
  if (letterCount[currentLetter] >= 1) letterCount[currentLetter]++
  else letterCount[currentLetter] = 1
}

console.log(letterCount)

let game_points = 0
let green_letters = 0
let yellow_letters = 0
let valid_guesses = 0
let unbound_guesses = 0

function startInteraction() {
  document.addEventListener('click', handleMouseClick)
  document.addEventListener('keydown', handleKeyDown)
}

function stopInteraction() {
  document.removeEventListener('click', handleMouseClick)
  document.removeEventListener('keydown', handleKeyDown)
}

function handleMouseClick(e) {
  if (e.target.matches('[data-key]')) {
    pressKey(e.target.dataset.key)
    return
  }
  if (e.target.matches('[data-enter]')) {
    submitGuess()
    return
  }
  if (e.target.matches('[data-delete]')) {
    deleteKey()
    return
  }
}

function handleKeyDown(e) {
  if (e.key === 'Enter') {
    submitGuess()
    return
  }
  if (e.key === 'Delete' || e.key === 'Backspace') {
    deleteKey()
    return
  }
  if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key)
    return
  }
}

function pressKey(key) {
  const activeTiles = getActiveTiles()
  if (activeTiles.length >= WORD_LENGTH) return

  const nextTile = guessGrid.querySelector(':not([data-letter])')
  nextTile.dataset.letter = key.toLowerCase()
  nextTile.textContent = key
  nextTile.dataset.state = 'active'
}

function deleteKey() {
  const activeTiles = getActiveTiles()
  const lastTile = activeTiles[activeTiles.length - 1]
  if (lastTile == null) return

  lastTile.textContent = ''
  delete lastTile.dataset.state
  delete lastTile.dataset.letter
}

function submitGuess() {
  const activeTiles = [...getActiveTiles()]
  if (activeTiles.length !== WORD_LENGTH) {
    showAlert('Not enough letters')
    shakeTiles(activeTiles)
    return
  }

  const guess = activeTiles.reduce((word, tile) => {
    return word + tile.dataset.letter
  }, '')

  if (!dictionary.includes(guess)) {
    showAlert('Not in word list')
    shakeTiles(activeTiles)
    return
  }

  stopInteraction()
  activeTiles.forEach((...params) => flipTile(...params, guess))
}

function flipTile(tile, index, array, guess) {
  const letter = tile.dataset.letter
  const key = keyboard.querySelector(`[data-key="${letter}"i]`)

  setTimeout(() => {
    tile.classList.add('flip')
  }, (index * FLIP_FX_DURATION) / 2)

  tile.addEventListener(
    'transitionend',
    () => {
      tile.classList.remove('flip')
      if (targetWord[index] === letter) {
        tile.dataset.state = 'correct'
        key.classList.add('correct')
        letterCount[letter]--
      } else if (targetWord.includes(letter) && letterCount[letter] >= 1) {
        tile.dataset.state = 'wrong-location'
        key.classList.add('wrong-location')
      } else {
        tile.dataset.state = 'wrong'
        key.classList.add('wrong')
      }

      if (index === array.length - 1) {
        tile.addEventListener(
          'transitionend',
          () => {
            startInteraction()
            checkWinLose(guess, array)
          },
          { once: true }
        )
      }
    },
    { once: true }
  )
}

function getActiveTiles() {
  return guessGrid.querySelectorAll('[data-state="active"]')
}

function showAlert(msg, duration = 1000) {
  const alert = document.createElement('div')
  alert.textContent = msg
  alert.classList.add('alert')
  alertContainer.prepend(alert)

  if (duration == null) return
  setTimeout(() => {
    alert.classList.add('hide')
    alert.addEventListener('transitionend', () => {
      alert.remove()
    })
  }, duration)
}

function shakeTiles(tiles) {
  tiles.forEach((tile) => {
    tile.classList.add('shake')
    tile.addEventListener(
      'animationend',
      () => {
        tile.classList.remove('shake')
      },
      { once: true }
    )
  })
}

function danceTiles(tiles) {
  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add('dance')
      tile.addEventListener(
        'animationend',
        () => {
          tile.classList.remove('dance')
        },
        { once: true }
      )
    }, (index * DANCE_FX_DURATION) / 5)
  })
}

function checkWinLose(guess, tiles) {
  if (guess === targetWord) {
    showAlert('You win!', 5000)
    danceTiles(tiles)
    stopInteraction()
    return
  }

  const remainingTiles = guessGrid.querySelectorAll(':not([data-letter])')
  if (remainingTiles.length === 0) {
    showAlert(`So close! The word was ${targetWord.toUpperCase()}`, null)
    stopInteraction()
  }
}

function addStats(type, id) {
  type++
  id.textContent = type
}

startInteraction()
