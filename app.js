document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector("#score")
    const resultDisplay = document.querySelector('#result')
    const width = 4
    let squares = []
    let score = 0

    const createBoard = () => {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
        addColors()
    }

    const generate = () => {
        let randomNum = Math.floor(Math.random() * squares.length)
        if (squares[randomNum].innerHTML == 0) {
            squares[randomNum].innerHTML = 2
        } else {
            generate()
        }
    }

    const moveRight = () => {
        for (let row = 0; row < width; row++) {
            let rowValues = []
            for (let col = 0; col < width; col++) {
                rowValues.push(parseInt(squares[row * width + col].innerHTML))
            }
            let filteredRow = rowValues.filter(num => num !== 0)
            let missing = width - filteredRow.length
            let zeros = Array(missing).fill(0)
            let newRow = zeros.concat(filteredRow)
            for (let col = 0; col < width; col++) {
                squares[row * width + col].innerHTML = newRow[col]
            }
        }
    }

    const moveLeft = () => {
        for (let row = 0; row < width; row++) {
            let rowValues = []
            for (let col = 0; col < width; col++) {
                rowValues.push(parseInt(squares[row * width + col].innerHTML))
            }
            let filteredRow = rowValues.filter(num => num !== 0)
            let missing = width - filteredRow.length
            let zeros = Array(missing).fill(0)
            let newRow = filteredRow.concat(zeros)
            for (let col = 0; col < width; col++) {
                squares[row * width + col].innerHTML = newRow[col]
            }
        }
    }

    const moveUp = () => {
        for (let col = 0; col < width; col++) {
            let columnValues = []
            for (let row = 0; row < width; row++) {
                columnValues.push(parseInt(squares[row * width + col].innerHTML))
            }
            let filteredColumn = columnValues.filter(num => num !== 0)
            let missing = width - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)
            for (let row = 0; row < width; row++) {
                squares[row * width + col].innerHTML = newColumn[row]
            }
        }
    }

    const moveDown = () => {
        for (let col = 0; col < width; col++) {
            let columnValues = []
            for (let row = 0; row < width; row++) {
                columnValues.push(parseInt(squares[row * width + col].innerHTML))
            }
            let filteredColumn = columnValues.filter(num => num !== 0)
            let missing = width - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)
            for (let row = 0; row < width; row++) {
                squares[row * width + col].innerHTML = newColumn[row]
            }
        }
    }

    const combineRow = () => {
        for (let row = 0; row < width; row++) {
            for (let col = 0; col < width - 1; col++) {
                let currentIndex = row * width + col
                let nextIndex = currentIndex + 1
                if (squares[currentIndex].innerHTML === squares[nextIndex].innerHTML &&
                    squares[currentIndex].innerHTML !== '0') {
                    let combinedTotal = parseInt(squares[currentIndex].innerHTML) + parseInt(squares[nextIndex].innerHTML)
                    squares[currentIndex].innerHTML = combinedTotal
                    squares[nextIndex].innerHTML = 0
                    score += combinedTotal
                    scoreDisplay.innerHTML = score
                }
            }
        }
        checkWin()
    }

    const combineColumn = () => {
        for (let col = 0; col < width; col++) {
            for (let row = 0; row < width - 1; row++) {
                let current = row * width + col
                let next = (row + 1) * width + col
                if (squares[current].innerHTML === squares[next].innerHTML &&
                    squares[current].innerHTML !== '0') {
                    let combinedTotal = parseInt(squares[current].innerHTML) + parseInt(squares[next].innerHTML)
                    squares[current].innerHTML = combinedTotal
                    squares[next].innerHTML = 0
                    score += combinedTotal
                    scoreDisplay.innerHTML = score
                }
            }
        }
        checkWin()
    }

    const checkWin = () => {
        for (let i = 0; i < squares.length; i++) {
            if (parseInt(squares[i].innerHTML) === 2048) {
                resultDisplay.innerHTML = 'You Win!'
                document.removeEventListener('keydown', control)
                clearInterval(myTimer)
            }
        }
    }

    const checkLose = () => {
        let hasZero = false
        let hasMoves = false

        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                hasZero = true
                break
            }
        }

        for (let i = 0; i < squares.length; i++) {
            let row = Math.floor(i / width)
            let col = i % width
            let current = parseInt(squares[i].innerHTML)

            if (col < width - 1) {
                let right = parseInt(squares[i + 1].innerHTML)
                if (current === right) hasMoves = true
            }
            if (row < width - 1) {
                let down = parseInt(squares[i + width].innerHTML)
                if (current === down) hasMoves = true
            }
        }

        if (!hasZero && !hasMoves) {
            resultDisplay.innerHTML = 'You Lose!'
            document.removeEventListener('keydown', control)
            clearInterval(myTimer)
        }
    }

    const addColors = () => {
        for (let i = 0; i < squares.length; i++) {
            let val = parseInt(squares[i].innerHTML)
            squares[i].style.backgroundColor = '#afa192' // default color

            if (val === 2) squares[i].style.backgroundColor = '#eee4da'
            else if (val === 4) squares[i].style.backgroundColor = '#f2b179'
            else if (val === 8) squares[i].style.backgroundColor = '#ede0c8'
            else if (val === 16) squares[i].style.backgroundColor = '#ffcea4'
            else if (val === 32) squares[i].style.backgroundColor = '#e8c064'
            else if (val === 64) squares[i].style.backgroundColor = '#ffab6e'
            else if (val === 128) squares[i].style.backgroundColor = '#fd9982'
            else if (val === 256) squares[i].style.backgroundColor = '#ead79c'
            else if (val === 512) squares[i].style.backgroundColor = '#76daff'
            else if (val === 1024) squares[i].style.backgroundColor = '#beeaa5'
            else if (val === 2048) squares[i].style.backgroundColor = '#d7d4f0'
        }
    }

    const control = (e) => {
        if (e.key === 'ArrowLeft') keyLeft()
        else if (e.key === 'ArrowRight') keyRight()
        else if (e.key === 'ArrowUp') keyUp()
        else if (e.key === 'ArrowDown') keyDown()
    }

    const keyLeft = () => {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
        addColors()
        checkLose()
    }

    const keyRight = () => {
        moveRight()
        combineRow()
        moveRight()
        generate()
        addColors()
        checkLose()
    }

    const keyUp = () => {
        moveUp()
        combineColumn()
        moveUp()
        generate()
        addColors()
        checkLose()
    }

    const keyDown = () => {
        moveDown()
        combineColumn()
        moveDown()
        generate()
        addColors()
        checkLose()
    }

    document.addEventListener('keydown', control)

    createBoard()
    addColors()

    let myTimer = setInterval(addColors, 50)
})
