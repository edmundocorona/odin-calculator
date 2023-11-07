console.log('hola');

const equation = [];
const hist = [];
let displayNum = 0;
const displayDOM = document.querySelector('#display');
let toggle;

const add = function () {
  equation.push(displayNum, '+')
}

const subtract = function () {
  equation.push(displayNum, '-')
}

const multiply = function () {
  equation.push(displayNum, '*')
}

const divide = function () {
  equation.push(displayNum, '/')
}

const equals = function () {
  if (equation.length > 1) {
    equation.push(displayDOM.textContent);
    console.log('a');
  } else if (hist.length > 0) {
    lastOPeration = hist[hist.length - 1]; 
    equation.push(displayDOM.textContent, lastOPeration[1], lastOPeration[2]);
    console.log('b');
  } else {
    console.log('c');
    console.log("what's wrong")
    return displayDOM.textContent;
  }
  console.log('d');
  return evalEquation();
}

const evalEquation = function () {
  let result;
  switch (equation[1]) {
    case '+':
      result = (+ equation[0]) + (+ equation[2]);
      break;
    case '-':
      result = equation[0] - equation[2];
      break;
    case 'x':
      result = equation[0] * equation[2];
      break;
    case '÷':
      result = equation[0] / equation[2];
      break;
    default:
      console.log("ERROR, this operand doesn't match");
  }
  hist.push(equation.splice(0, 3).concat(['=', result]));
  displayNum = result;
  return result;
}

const eraseC = function () {
  displayNum = 0;
}

const eraseAC = function () {
  hist.splice(0);
  equation.splice(0);
  eraseC();
}

const buttons =  document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const btnClass = button.className;
    const btnText = button.textContent;
    switch (btnClass) {
      case 'number':
        concatNumber(btnText);
        break;
      case 'option':
        editState(btnText)
        break;
      case 'operator':
        toggle = button;
        callOperation(btnText)
        break;
      default:
        console.log(btnClass);
    }
  })
});

const concatNumber = function (number) {
  if (number !== '.') {
    if (displayDOM.textContent !== '0') {
      displayDOM.textContent += number;
    } else  if (number !== '0' && number !== '00') {
      displayDOM.textContent = number;
    }
  } else if (!displayDOM.textContent.includes('.')) {
    displayDOM.textContent += '.';
  }
}

const editState = function (option) {
  console.log(option, 'o')
}

const callOperation = function (operator) {
  console.log(operator, 'op')
  if (operator === '=') {
    displayDOM.textContent = equals();
  } else if (operator === '√') {
    console.log('raiz');
  } else {
    equation.push(displayDOM.textContent, operator)
  }

  if (equation.length > 2) {
    displayDOM.textContent = evalEquation();
  }
}