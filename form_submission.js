(() => {

    function writeToStorage(storageKey, data) {
        localStorage.setItem(storageKey, JSON.stringify(data));
    }
    
    let form = document.querySelector('.form')
    let input = document.querySelector('.input')
    
    form.addEventListener('submit', () => {
        if (input.value > 1 && input.value < 11) {
            const pairsNumber = input.value
            writeToStorage('pairs', pairsNumber)
        } else {
            const pairsNumber = 4
            writeToStorage('pairs', pairsNumber)
        }
    })

}) ();