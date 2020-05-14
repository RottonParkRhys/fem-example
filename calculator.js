
     
const calculator = {
    displayValue: '0', //string to represent input of user, and calc display
    firstOperand: null, //the first input or operand
    waitingForSecondOperand: false, //boolean to check if the expression can be fulfilled or if it is waiting for a second operand
    operator: null, //operator +-/*
      };

function updateDisplay() {
    const display = document.querySelector('.answer-row');
    display.value = calculator.displayValue;
        }
updateDisplay();

const keys = document.querySelectorAll('.button-parameters');
keys.forEach(function(el) {
    el.addEventListener('click', (event) => {
    const { target } = event;

    if (!target.matches('button')) {
        return;
      }
    if (target.classList.contains('operator')) {
      handleOperator(target.value);
      updateDisplay();
        return;
      }
    if (target.classList.contains('all-clear')) {
      resetCalculator();
      updateDisplay();
        return;
      }
      inputDigit(target.value);
      updateDisplay();
});
});   

    function inputDigit(digit) {
      const { displayValue, waitingForSecondOperand } = calculator;
    
      if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
      } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
      }
    
      console.log(calculator);
    }

    function handleOperator(nextOperator) {
      const { firstOperand, displayValue, operator } = calculator
      const inputValue = parseFloat(displayValue);

      if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
      }
    
      if (firstOperand == null) {
        calculator.firstOperand = inputValue;
      } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
    
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
      }
    
      calculator.waitingForSecondOperand = true;
      calculator.operator = nextOperator;
      console.log(calculator);
    }
    const performCalculation = {
      '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    
      '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    
      '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    
      '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    
      '=': (firstOperand, secondOperand) => secondOperand
    };

    function resetCalculator() {
      calculator.displayValue = '0';
      calculator.firstOperand = null;
      calculator.waitingForSecondOperand = false;
      calculator.operator = null;
      console.log(calculator);
    }
