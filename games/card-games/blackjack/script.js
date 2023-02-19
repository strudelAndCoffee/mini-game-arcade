const dealerCardsEl = document.getElementById('dealerCards')
const yourCardsEl = document.getElementById('yourCards')
const faceDownEl = document.getElementById('faceDown')
const hitBtnEl = document.getElementById('hit')
const stayBtnEl = document.getElementById('stay')
const resultsEl = document.getElementById('results')
const dealerSumEl = document.getElementById('dealerSum')
const yourSumEl = document.getElementById('yourSum')
const playAgainBtn = document.getElementById('playAgain')

let dealer_sum = 0
let your_sum = 0
let dealer_ace_count = 0
let your_ace_count = 0
let can_hit = true
let deck = []
let face_down

window.onload = function () {
  buildDeck()
  shuffleDeck()
  startGame()
}

function startGame() {
  face_down = deck.pop()
  dealer_sum += face_down.val
  if (face_down.val === 11) dealer_ace_count++

  while (dealer_sum < 17) {
    let cardEl = document.createElement('img')
    let card = deck.pop()
    cardEl.src = `../assets/images/${card.img}.png`
    dealer_sum += card.val
    if (card.val === 11) dealer_ace_count++

    dealerCardsEl.appendChild(cardEl)
  }

  getCard()
  getCard()

  hitBtnEl.addEventListener('click', hit)
  stayBtnEl.addEventListener('click', endGame)
}

function getCard() {
  let cardEl = document.createElement('img')
  let card = deck.pop()
  cardEl.src = `../assets/images/${card.img}.png`
  your_sum += card.val
  if (card.val === 11) your_ace_count++

  yourCardsEl.appendChild(cardEl)
}

function hit() {
  if (!can_hit) return

  getCard()
  if (reduceAce(your_sum, your_ace_count) >= 21) endGame()
}

function buildDeck() {
  const values = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ]
  const types = ['D', 'H', 'C', 'S']

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let img = values[j] + '-' + types[i]
      let val = j === 0 ? 11 : Math.min(j + 1, 10)
      let card = { img, val }

      deck.push(card)
    }
  }
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length)
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
}

function reduceAce(sum, ace_count) {
  while (sum > 21 && ace_count > 0) {
    sum -= 10
    ace_count--
  }
  return sum
}

function endGame() {
  dealer_sum = reduceAce(dealer_sum, dealer_ace_count)
  your_sum = reduceAce(your_sum, your_ace_count)
  can_hit = false

  faceDownEl.src = `../assets/images/${face_down.img}.png`

  let msg = ''
  if (your_sum > 21) msg = 'You lose.'
  else if (dealer_sum > 21) msg = 'You win!'
  else if (your_sum === dealer_sum) msg = "It's a tie."
  else if (your_sum < dealer_sum) msg = 'You lose.'
  else if (your_sum > dealer_sum) msg = 'You win!'

  resultsEl.innerText = msg
  dealerSumEl.innerText = dealer_sum
  yourSumEl.innerText = your_sum
  playAgainBtn.classList.remove('hide')
}
