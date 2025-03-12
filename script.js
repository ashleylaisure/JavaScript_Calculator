const inputBox = document.getElementById('input');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

console.log(resultDiv)
// Define the expression and result variable
let expression = ' ';
let result = ' ';

// define event handler for button click

function buttonClick(event) {
    // get values from clicked button
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
    // console.log(target);
    // console.log("action: " + action);
    // console.log("value: " + value);

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
            console.log(expression)
            console.log(result)
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
            
    }

    // update display
    updateDisplay(expression, result);
}

inputBox.addEventListener('click', buttonClick);

function addValue(value) {
    // add the value to the expression
    expression += value;
    // console.log(expression);
    
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
    expression += result + value;
}

function submitValue(){
    result = evaluateExpression();
    expression =' ';
}

function evaluateExpression() {
    const evalResult = eval(expression);

    return isNaN(evalResult) || !isFinite(evalResult) ? ' ' : evalResult < 1 ? parseFloat(evalResult.toFixed(10)) : parseFloat(evalResult.toFixed(2));

}