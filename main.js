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

    function startGame(key) {

        let min = sec = '0' + 0, startTimer
        runTimer()

        function runTimer() {
    
            startTimer = setInterval(() => {
                sec++
                sec = sec < 10 ? '0' + sec : sec
    
                if (sec == 60) {
                    min++
                    min = min < 10 ? '0' + min : min
                    sec = '0' + 0
                }
    
                printTimer()
    
            }, 1000)
            printTimer()
        }

        function printTimer() {
            let timer = document.querySelector('.timer')
            timer.innerHTML = `&#9200 Время игры ${min}:${sec}`
        }

        const pairsNumber = parseInt(getFromStorage(key))
        const array = createNumbersArray(pairsNumber)
        shuffle(array)

        let cardsContainer = document.querySelector('.cards-container')
        let header = document.querySelector('.header')
        let footer = document.querySelector('.footer')

        if ([5, 10].includes(pairsNumber)) {
            cardsContainer.style.width = header.style.width = footer.style.width = '71.77%'
        } else if ([6, 8].includes(pairsNumber)) {
            cardsContainer.style.width = header.style.width = footer.style.width = '65%'
        } else if (pairsNumber == 9) {
            cardsContainer.style.width = header.style.width = footer.style.width = '86.12%'
        } else {
            let containerWidth = 150 * pairsNumber * 100 / 1045
            cardsContainer.style.width = containerWidth.toString() + '%'
            header.style.width = footer.style.width = '65%'
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
        let step = 0
        let count = 0

        function flipCard() {
            if (lockCards) {
                return
            }

            if (this == firstCard) {
                return
            }
        
            this.classList.add('flip')
            if (!isThereFlippedCard) {
                isThereFlippedCard = true
                firstCard = this
                return
            }
            
            secondCard = this
            // isThereFlippedCard = false

            let isMatch = firstCard.dataset.number === secondCard.dataset.number
            isMatch ? disableCards() : unflipCards()

            if (count == pairsNumber) {
                victory()
            }
            step++
            printSteps()
            return
        }
        
        function disableCards() {
            count++
            firstCard.removeEventListener('click', flipCard)
            secondCard.removeEventListener('click', flipCard)

            resetGame()
        }
        
        function unflipCards() {
            lockCards = true
            
            setTimeout(() => {
                firstCard.classList.remove('flip')
                secondCard.classList.remove('flip')

                resetGame()
            }, 1000)
        }

        function resetGame() {
            [isThereFlippedCard, lockCards] = [false, false]
            [firstCard, secondCard] = [null, null]
        }

        function printSteps() {
            let steps = document.querySelector('.steps')
            steps.innerHTML = `&#128200 Ходы <br> ${step}`
        }

        function victory() {
            clearInterval(startTimer)
            let restartBtn = document.createElement('button')
            restartBtn.classList.add('restart-btn')
            restartBtn.textContent = 'Играть заново'
            let backBtn = document.createElement('a')
            backBtn.classList.add('back-btn')
            backBtn.textContent = 'На главную'
            backBtn.href = 'start_page.html'
            footer.append(restartBtn, backBtn)

            restartBtn.addEventListener('click', () => {
                location.reload()
            })

        }

    }
    window.startGame = startGame
}) ();
