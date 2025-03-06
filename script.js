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
    console.log(target);
    console.log(action);
    console.log(value);

    // Switch case to control the calculator
    switch (action){
        case 'number':
            console.log('number');
            break;
        case 'clear':
            console.log('clear');
            break;
    }
}

inputBox.addEventListener('click', buttonClick);