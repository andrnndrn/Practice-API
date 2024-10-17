let currentNumber = "";
let previousNumber = "";
let operator = "";

function appendNumber(number) {
    currentNumber += number;
    updateScreen(currentNumber);
}

function setOperator(op) {
    if (currentNumber === "") return;
    if (previousNumber !== "") calculate();
    operator = op;
    previousNumber = currentNumber;
    currentNumber = "";
}

function calculate() { 
    if (operator === "" || currentNumber === "") return;
    const result = operate(
        parseFloat(previousNumber),
        parseFloat(currentNumber),
        operator
    )

    updateScreen(result);
    previousNumber = result;
    currentNumber = "";
    operator = "";
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        default:
            return 0;
    }
}

function updateScreen(value) {
    document.getElementById("screen").value = value;
}

function clearScreen() {
    currentNumber = "";
    previousNumber = "";
    operator = "";
    updateScreen("0");
}
