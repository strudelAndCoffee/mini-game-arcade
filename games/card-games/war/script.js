import Deck from './deck.js'

const CARD_VAL_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
}

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const computerDeckEl = document.querySelector('.computer-deck')
const playerDeckEl = document.querySelector('.player-deck')
const textEl = document.querySelector('.text')

let playerDeck, computerDeck, inRound, stop

function startGame() {
  const deck = new Deck()
  deck.shuffle()

  const deckMidPoint = Math.ceil(deck.numberOfCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, deckMidPoint))
  computerDeck = new Deck(deck.cards.slice(deckMidPoint, deck.numberOfCards))
  inRound = false
  stop = false

  clearRound()
}

function clearRound() {
  inRound = false
  computerCardSlot.innerHTML = ''
  playerCardSlot.innerHTML = ''
  textEl.innerText = ''

  updateDeckCount()
}

function updateDeckCount() {
  computerDeckEl.innerText = computerDeck.numberOfCards
  playerDeckEl.innerText = playerDeck.numberOfCards
}

function flipCards() {
  inRound = true

  const playerCard = playerDeck.pop()
  const computerCard = computerDeck.pop()

  playerCardSlot.appendChild(playerCard.getHTML())
  computerCardSlot.appendChild(computerCard.getHTML())

  updateDeckCount()

  if (isRoundWinner(playerCard, computerCard)) {
    textEl.innerText = 'Win'
    playerDeck.push(playerCard)
    playerDeck.push(computerCard)
  } else if (isRoundWinner(computerCard, playerCard)) {
    textEl.innerText = 'Lose'
    computerDeck.push(playerCard)
    computerDeck.push(computerCard)
  } else {
    textEl.innerText = 'Draw'
    playerDeck.push(playerCard)
    computerDeck.push(computerCard)
  }

  if (isGameOver(playerDeck)) {
    text.innerText = 'You lose!'
    stop = true
  } else if (isGameOver(computerDeck)) {
    text.innerText = 'You win!'
    stop = true
  }
}

function isRoundWinner(card1, card2) {
  return CARD_VAL_MAP[card1.value] > CARD_VAL_MAP[card2.value]
}

function isGameOver(deck) {
  return deck.numberOfCards <= 0
}

document.addEventListener('click', () => {
  if (stop) {
    startGame()
    return
  }

  inRound ? clearRound() : flipCards()
})

startGame()
