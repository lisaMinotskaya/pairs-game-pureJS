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

function createGameBoard() {
    const gameBoard = document.createElement('div')
    const gameBoardContent = document.createElement('div')
    const gameBoardHeader = document.createElement('')
}

function createCard() {
    const buttonWrapper = document.createElement('div')
    const button = document.createElement('button')

}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function startGame(count) {

}

}) ();