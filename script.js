const inputBox = document.getElementById('input');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

// Define the expression and result variable
let expression = '';
let result = '';



// define event handler for button click
function buttonClick(event) {
    // get values from clicked button
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;

    // Switch case to control the calculator
    switch (action){
        case 'number':
            addValue(value);
            break;
        case 'clear':
            clearValue();
            break;
        case 'backspace':
            backspace();
            break;
        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            
            if (expression === '' && result !== '' ){
                // add an operator to the expression
                startFromResult(value);
            } else if (expression !== '' && !isLastCharOperator()) {
                // only add an operator if the last value is not empty
                // and if the last value is not another operator
                addValue(value);
            }
            break;
        case 'submit':
            submitValue();
            break;
        case 'negate':
            negateValue();
            break;
        case 'mod':
            percentage();
            break;
        case 'decimal':
            decimal(value);
            break;
    }
    // update display
    updateDisplay(expression, result);
    console.log(expression)
    console.log(typeof expression)
    console.log(result)
}


function addValue(value) {
    if (expression === "0") {
        expression = value;
    } else if (expression === '' && value === '0') {
        return; 
    } else {
        expression += value;
    }
    
}

function updateDisplay(expression, result) {
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
}

function clearValue() {
    expression = ' ';
    result = ' ';
}

function backspace() {
    expression = expression.slice(0, -1);
}

function isLastCharOperator() {
    return isNaN(parseInt(expression.slice(-1)))
    // looking at the last character from the exprssion string
    // can it be turned into a number? - parseInt
    // if NaN - return true
}

function startFromResult(value) {
    expression = result + value;
}

function submitValue(){
    result = evaluateExpression();
    expression ='';
}

function evaluateExpression() {
    const evalResult = eval(expression);

    return isNaN(evalResult) || !isFinite(evalResult) ? ''
    : evalResult === 0 ? '0'
    : evalResult < 1 ? parseFloat(evalResult.toFixed(10)) 
    : parseFloat(evalResult.toFixed(2));

}

function negateValue() {
    if (expression === '0' || result === '0') {
        return;
    }
    // negate the result if expression is empty and result is negative
    if (expression === '' && result !== '' ) {
        result = -result;
    } else if (!expression.startsWith('-') && expression !== '') {
        expression = '-' + expression
    } else if (expression.startsWith('-')) {
        expression = expression.slice(1)
    }
}

function percentage() {
    if (expression !== '') {
        result = evaluateExpression();
        expression = '';
        if (!isNaN(result) && isFinite(result)) {
            result /= 100;
        } else {
            result = '';
        }
    
    } else if (result !== ''){
        // if expressi0n is empty but the result exists
        result =parseFloat(result) /100;
    }
}

function decimal(value) {

    const lastOperatorIndex = Math.max (
        expression.lastIndexOf('+'),
        expression.lastIndexOf('-'),
        expression.lastIndexOf('*'),
        expression.lastIndexOf('/'),
    )

    const lastDecimalIndex = expression.lastIndexOf('.')

    console.log(lastOperatorIndex)
    console.log(lastDecimalIndex)

    if (lastDecimalIndex > lastOperatorIndex) {
        return;
    } else if (!expression.endsWith('.')) {
        addValue(value);
    }
}

inputBox.addEventListener('click', buttonClick);