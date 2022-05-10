class Calculator {
    constructor() {
        this.clear()
    }

    clear() {
        this.currentStringOperand = ''
        this.previousStringOperand = ''
        this.operation = ''
        this.isCurrentSet = false
        this.isPreviousSet = false
    }

    // GETTERS

    get getIsCurentSet(){
        return this.isCurrentSet
    }

    get getIsPreviousSet(){
        return this.isPreviousSet
    }

    // SETTERS
    setCurrentStringOperand(number) {
        this.isCurrentSet = true
        if (number === '.' && this.currentStringOperand.includes('.')) return
        this.currentStringOperand += number
    }

    setPreviousStringOperand(number) {
        this.isPreviousSet = true
        this.previousStringOperand = number
    }

    setOperation(operation) {
        this.operation = operation
        this.isOperationSet = true
    }

    switchOperands() {
        this.setPreviousStringOperand(this.currentStringOperand)
        this.displayPreviousStringOperand()
        this.currentStringOperand = ''
        this.displayCurrentStringOperand()
    }


    // DISPLAY

    displayCurrentStringOperand() {
        currentOperand.innerText = this.currentStringOperand
    }

    displayPreviousStringOperand() {
        previousOperand.innerText = this.previousStringOperand
    }

    displayOperation() {
        operation.innerText = this.operation
    }

    displayAll() {
        this.displayCurrentStringOperand()
        this.displayPreviousStringOperand()
        this.displayOperation()
    }

    // DELETE

    delete() {
        if (this.currentStringOperand)
            this.currentStringOperand = this.currentStringOperand.slice(0, -1)
        if (!this.currentStringOperand)
            this.isCurrentSet = false
        if (this.previousStringOperand === '') this.operation = ''
    }

    calculate() {
        if (!this.isCurrentSet || !this.isPreviousSet || !this.isOperationSet) return

        const number1 = parseFloat(this.previousStringOperand);
        const number2 = parseFloat(this.currentStringOperand);
        const operation = this.operation;
        this.clear();
        let result = 0

        switch (operation) {
            case '+':
                result = number1 + number2;
                break;

            case '-':
                result = number1 - number2;
                break;

            case 'x':
                result = number1 * number2;
                break;

            case '/':
                result = number1 / number2;
                break;

            default:
                return
        }

        this.currentStringOperand = result.toString()
        this.isCurrentSet = true
        this.displayAll()

    }

    calculateSqrt() {
        let number = this.currentStringOperand
        this.clear()
        this.setCurrentStringOperand(Math.sqrt(number))
        this.displayCurrentStringOperand()
    }

    calculateSingleOperation() {
        const number = this.currentStringOperand;
        const operation = this.operation
        this.clear()
        let result = 0



        switch (operation) {
            case '√':
                result = Math.sqrt(number)
                break;
            case 'x2':
                result = number * number;
                break;
            case 'x3':
                result = number * number * number
                break;
            case 'x-1':
                result = 1 / number;
                break;
            case 'sin':
                result = Math.sin(number)
                break;
            case 'cos':
                result = Math.cos(number)
                break;
            case 'tan':
                result = Math.tan(number)
                break;
            case 'ln':
                result = Math.log(number)
                break;
            case '%':
                result = number / 100
                break;
            default:
                return
        }

        this.setCurrentStringOperand(result)
        this.displayCurrentStringOperand()

    }
}




const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const singleOperationButtons = document.querySelectorAll('[data-single-operation]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')

const currentOperand = document.querySelector('.current-operand')
const previousOperand = document.querySelector('.previous-operand')
const operation = document.querySelector('.operation')

const calculator = new Calculator()
calculator.displayCurrentStringOperand()

numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', function () {
        calculator.setCurrentStringOperand(numberButton.innerText)
        calculator.displayCurrentStringOperand()
    })
})


operationButtons.forEach(operationButton => {
    operationButton.addEventListener("click", function () {
        if (calculator.getIsCurentSet) {
            calculator.setOperation(operationButton.innerText)
            calculator.displayOperation()
            if (!calculator.isPreviousSet) calculator.switchOperands()
        }
    })
})

singleOperationButtons.forEach(singleOperationButton => {
    singleOperationButton.addEventListener('click', function () {
        if (calculator.getIsCurentSet) {
            calculator.setOperation(singleOperationButton.innerText)
            calculator.calculateSingleOperation()
            singleOperationButton.innerText !== '%' && moreSection.classList.toggle("active")
        }
    })
})

allClearButton.addEventListener('click', function () {
    calculator.clear()
    calculator.displayAll()
})

deleteButton.addEventListener('click', function () {
    calculator.delete()
    calculator.displayCurrentStringOperand()
    calculator.displayOperation()
})

equalButton.addEventListener('click', function () {
    calculator.calculate()
})


// MORE BUTTON

const moreBtn = document.getElementById('more-btn')
const backBtn = document.getElementById('back-btn')
const gridBtn = document.querySelector(".btn")
const moreSection = document.getElementById('more-section')
const buttonHeight = gridBtn.offsetHeight
moreBtn.addEventListener('click', toggleMoreSection)
backBtn.addEventListener('click', toggleMoreSection)


function toggleMoreSection() {
    moreSection.style.height = (buttonHeight * 4 + 4) + "px"
    moreSection.classList.toggle("active")
}