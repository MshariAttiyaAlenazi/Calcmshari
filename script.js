// Get the display element
const display = document.getElementById('display');

// Append number to display
function appendNumber(num) {
    display.value += num;
}

// Append operator to display
function appendOperator(op) {
    // Replace comma with dot for decimal calculations
    const operator = op === ',' ? '.' : op;
    
    // Prevent multiple operators in a row
    const lastChar = display.value[display.value.length - 1];
    if (['+', '-', '*', '/'].includes(lastChar)) {
        return;
    }
    
    // Prevent operator at the beginning (except minus for negative numbers)
    if (display.value === '' && operator !== '-') {
        return;
    }
    
    display.value += operator;
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Clear display
function clearDisplay() {
    display.value = '';
}

// Calculate result
function calculate() {
    try {
        // Replace comma with dot for proper calculation
        const expression = display.value.replace(/,/g, '.');
        
        // Evaluate the expression
        const result = eval(expression);
        
        // Handle division by zero and other errors
        if (isFinite(result)) {
            display.value = result;
        } else {
            display.value = 'Error';
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Allow keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Numbers
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    }
    
    // Operators
    if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        appendOperator(key);
    }
    
    // Decimal point
    if (key === '.' || key === ',') {
        event.preventDefault();
        appendOperator('.');
    }
    
    // Enter or equals
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    
    // Backspace
    if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
    
    // Clear
    if (key === 'c' || key === 'C') {
        clearDisplay();
    }
});
