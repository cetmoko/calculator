const container = document.querySelector('#container');

const calculator = {a: "", b: "", operator: "", display: "", op_change: false};

const operate = function(a, b, operator) {
    switch(operator) {
        case "+":
            return a+b;
        case "-":
            return a-b;
        case "*":
            return a*b;
        case "/":
            if (b === 0) {
                return "Error: Zero Division! Press AC to continue";
            } else {
                return Math.round(((a/b) * 1000000000)) / 1000000000;
            };
    }
}

// display
const display = document.querySelector('.display');
display.textContent = calculator.display;
container.append(display);

const clear = function() {
    calculator.a = "";
    calculator.b = "";
    display.textContent = "";
    calculator.operator = "";
    calculator.op_change = false;
}

const get_from_display = function(input) {
    if (([0,1,2,3,4,5,6,7,8,9].includes(+input)) && (calculator.op_change === false) && (display.textContent !== "") && (calculator.operator === "=")) {
        calculator.text = "";
        display.textContent = input;
        calculator.a = input;
        calculator.operator = "";
    }
    else if (([0,1,2,3,4,5,6,7,8,9].includes(+input)) && (calculator.op_change === false)) {
        display.textContent += input;
        calculator.a += input;
    }
    else if (([0,1,2,3,4,5,6,7,8,9].includes(+input)) && (calculator.op_change === true)) {
        display.textContent += input;
        calculator.b += input;
    }
    else if ((["+", "-", "*", "/"].includes(input)) && (calculator.op_change === false)) {
        calculator.b = "";
        display.textContent += input;
        calculator.operator = input;
        calculator.op_change = true;
    }
    else if (input === "=") {
        display.textContent = operate(+calculator.a, +calculator.b, calculator.operator);
        calculator.operator = "=";
        calculator.op_change = false;
        calculator.a = display.textContent;

    }
    else if ((["+", "-", "*", "/"].includes(input)) && (calculator.op_change === true) && (calculator.b === "")) {
        calculator.operator = input;
    }
    else if ((["+", "-", "*", "/"].includes(input)) && (calculator.op_change === true)) {
        display.textContent = operate(+calculator.a, +calculator.b, calculator.operator);
        calculator.a = display.textContent;
        display.textContent += input;
        calculator.operator = input;
        calculator.b = "";
        calculator.op_change = true;
    }
    else if (input === "clear") {
        clear();
    }
}

// button functionality
for (i = 0; i < 10; i++) {
    const numButton = document.createElement('button');
    numButton.textContent = i;
    numButton.addEventListener('click', function() {get_from_display(numButton.textContent)})
    container.append(numButton)
}

operations = {"+": "+", "-": "-", "×": "*", "÷": "/", "=": "=", "AC": "clear"}
for (const key in operations) {
    const opButton = document.createElement('button');
    opButton.textContent = key;
    opButton.setAttribute("style", "background-color: orange;")
    opButton.addEventListener('click', function() {get_from_display(operations[key])})
    container.append(opButton)
}