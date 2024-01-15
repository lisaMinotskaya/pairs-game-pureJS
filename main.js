(() => {
// Генерируем массив пар чисел
function createNumbersArray(count) {
    let arr = []
    for (let i = 1; i < count + 1; i++) {
        arr.push(i, i)
    }
    return arr
}

const array = createNumbersArray(8)

// Пермешиваем массив
function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let j = Math.floor(Math.random() * arr.length)
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    return arr
}

console.log(shuffle(array))

function createCard(number) {
    // const cardsWrapper = document.createElement('div')
    let card = document.createElement('div')
    let cardFaceBack = document.createElement('div')
    let cardFaceFront = document.createElement('div')

    // cardsWrapper.classList.add('cards-container')
    card.classList.add('card')
    cardFaceBack.classList.add('card-face', 'number')
    cardFaceFront.classList.add('card-face', 'cover')

    cardFaceBack.textContent = number

    card.append(cardFaceBack, cardFaceFront)
    card.dataset['number'] = number

    return card
}

let cardsContainer = document.querySelector(".cards-container")

for (let element of array) {
    let item = createCard(element.toString())
    cardsContainer.append(item)
}

const cards = document.querySelectorAll(".card")
cards.forEach(card => card.addEventListener('click', flipCard))

let isThereFlippedCard = false
let lockCards = false
let firstCard, secondCard

function flipCard() {

    if (lockCards) {
        return
    }

    this.classList.add('flip')
    // console.log(isThereFlippedCard)
    if (!isThereFlippedCard) {
        isThereFlippedCard = true
        firstCard = this
        return
    }

    secondCard = this
    isThereFlippedCard = false
    // checkForMatch()

    let isMatch = firstCard.dataset.number === secondCard.dataset.number
    // console.log(isMatch)
    isMatch ? disableCards() : unflipCards()
    return
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
}

function unflipCards() {
    lockCards = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        lockCards = false
      }, 1000)
}
  


// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function startGame(count) {

}

}) ();