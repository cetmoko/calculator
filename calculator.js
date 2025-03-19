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
                return "wtf are you doing bruh?? press clear to continue";
            } else {
                return a/b;
            };
    }
}

const get_from_display = function(input) {
    if (([0,1,2,3,4,5,6,7,8,9].includes(+input)) && (calculator.op_change === false)) {
        calculator.display += input;
        calculator.a += input;
    }
    else if (([0,1,2,3,4,5,6,7,8,9].includes(+input)) && (calculator.op_change === true)) {
        calculator.display += input;
        calculator.b += input;
    }
    else if ((["+", "-", "*", "/"].includes(input)) && (calculator.op_change === false)) {
        calculator.b = "";
        calculator.display += input;
        calculator.operator = input;
        calculator.op_change = true;
    }
    else if (input === "=") {
        calculator.display = operate(+calculator.a, +calculator.b, calculator.operator);
        calculator.operator = "";
        calculator.op_change = false;
        calculator.a = calculator.display;
    }
    else if ((["+", "-", "*", "/"].includes(input)) && (calculator.op_change === true)) {
        calculator.display = operate(+calculator.a, +calculator.b, calculator.operator);
        calculator.a = calculator.display;
        calculator.display += input;
        calculator.operator = input;
        calculator.b = "";
        calculator.op_change = true;
    }
    else if (input === "clear") {
        calculator.a = "";
        calculator.b = "";
        calculator.display = "";
        calculator.operator = "";
        calculator.op_change = false;
    }
}

// button functionality
for (i = 0; i < 10; i++) {
    const numButton = document.createElement('button');
    numButton.textContent = i;
    numButton.addEventListener('click', function() {get_from_display(numButton.textContent); console.log(calculator);})
    container.append(numButton)
}

operations = {"+": "+", "-": "-", "×": "*", "÷": "/", "=": "=", "CLEAR": "clear"}
for (const key in operations) {
    const opButton = document.createElement('button');
    opButton.textContent = key;
    opButton.addEventListener('click', function() {get_from_display(operations[key]); console.log(calculator);})
    container.append(opButton)
}