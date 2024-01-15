(() => {

    function getFromStorage(storageKey) {
        return JSON.parse(localStorage.getItem(storageKey))
    }

    // Генерируем массив пар чисел
    function createNumbersArray(count) {
        let arr = []
        for (let i = 1; i < count + 1; i++) {
            arr.push(i, i)
        }
        return arr
    }

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

    function createCard(number) {
        let card = document.createElement('div')
        let cardFaceBack = document.createElement('div')
        let cardFaceFront = document.createElement('div')

        card.classList.add('card')
        cardFaceBack.classList.add('card-face', 'number')
        cardFaceFront.classList.add('card-face', 'cover')

        cardFaceBack.textContent = number

        card.append(cardFaceBack, cardFaceFront)
        card.dataset['number'] = number

        return card
    }

    // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

    function startGame(key) {

        const pairsNumber = parseInt(getFromStorage(key))
        const array = createNumbersArray(pairsNumber)
        shuffle(array)

        let cardsContainer = document.querySelector('.cards-container')

        if ([5, 10].includes(pairsNumber)) {
            cardsContainer.style.width = '71.77%'
        } else if ([6, 8].includes(pairsNumber)) {
            cardsContainer.style.width = '57.4%'
        } else if (pairsNumber == 9) {
            cardsContainer.style.width = '86.12%'
        } else {
            let containerWidth = 150 * pairsNumber * 100 / 1045
            cardsContainer.style.width = containerWidth.toString() + '%'
        }

        for (let element of array) {
            let item = createCard(element.toString())
            cardsContainer.append(item)
        }

        const cards = document.querySelectorAll('.card')
        cards.forEach(card => card.addEventListener('click', flipCard))

        let isThereFlippedCard = false
        let lockCards = false
        let firstCard, secondCard

        function flipCard() {

            if (lockCards) {
                return
            }
        
            this.classList.add('flip')
            if (!isThereFlippedCard) {
                isThereFlippedCard = true
                firstCard = this
                return
            }
        
            secondCard = this
            isThereFlippedCard = false
        
            let isMatch = firstCard.dataset.number === secondCard.dataset.number
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

    }
    window.startGame = startGame
}) ();