document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector("#score")
    const resultDisplay = document.querySelector('#result')
    const width = 4
    let squares = []
    let score = 0

    const generate = () => {
        const randomNum = Math.floor(Math.random() * squares.length)
        
        if(squares[randomNum].innerHTML == 0){
            squares[randomNum].innerHTML = 2
            //check game over
        } else generate()
    }

    const createBoard = () => {
        for (let index = 0; index < width * width; index++) {
            const square = document.createElement('div')
            square.innerHTML = 0

            gridDisplay.appendChild(square)
            squares.push(square)
        }

        generate()
        generate()
    }

    createBoard()

    const moveRight = () => {
        for (let row = 0; row < width; row++) {
            // colectăm valorile din rândul curent
            let rowValues = []
            for (let col = 0; col < width; col++) {
                rowValues.push(parseInt(squares[row * width + col].innerHTML))
            }

            // filtrăm zero-urile și adăugăm zero-urile la început (pentru mutarea la dreapta)
            let filteredRow = rowValues.filter(num => num !== 0)
            let missing = width - filteredRow.length
            let zeros = Array(missing).fill(0)
            let newRow = zeros.concat(filteredRow)

            // reintroducem valorile în DOM
            for (let col = 0; col < width; col++) {
                squares[row * width + col].innerHTML = newRow[col]
            }
        }
    }

    const combineRow = () => {
        for (let index = 0; index < width * width - 1; index++) {
            if(squares[index].innerHTML === squares[index+1].innerHTML){
                let totalCombination = parseInt(squares[index].innerHTML) + parseInt(squares[index + 1].innerHTML)
                squares[index].innerHTML = totalCombination
                squares[index + 1].innerHTML = 0
                score += totalCombination
                scoreDisplay.innerHTML = score
            }
        }
        // checkWin()
    }

    const control = (e) => {
        if(e.key === 'ArrowLeft'){
            // keyLeft()
        } else if(e.key === 'ArrowRight'){
            keyRight()
        }
        // } else if(e.key === 'ArrowUp'){
        //     keyUp()
        // } else if(e.key === 'ArrowDown'){
        //     keyDown()
        // }
    }

    document.addEventListener("keydown", control)

    // const keyLeft = () => {
    //     moveLeft()
    //     combineRow()
    //     moveLeft()
    //     generate()
    // }

    const keyRight = () => {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

})