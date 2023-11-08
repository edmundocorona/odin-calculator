const buttons =  document.querySelectorAll('button');
const display = document.querySelector('#display');
const operations = [];
const hist = [];

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const btnClass = button.className;
    const btnText = button.textContent;
    switch (btnClass) {
      case 'number':
        concatNumber(btnText);
        break;
      case 'option':
        editState(btnText);
        break;
      case 'operator':
        queueOperation(btnText);
        break;
      case 'dot':
        concatDot();
        break;
      case 'single-operator':
        singleOperation(btnText);
        break;
      case 'equal':
        equal();
        break;
      default:
        console.log(btnClass);
    }
    console.log(operations);
    console.table(hist);
  })
});

const concatNumber = function (number) {
  if (display.textContent === '0') {
    display.textContent = number !== '00' ? number : '0';
  } else {
    display.textContent += number;
  }
}

const concatDot = function() {
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

const queueOperation = function(operator) {
  if (operations.length > 1) {
    operations.push(display.textContent);
    display.textContent = reduceOperations();
  }
  operations.push(display.textContent, operator);
}

const reduceOperations = function () {
  const result = calcResult();
  hist.push(operations.splice(0, 3).concat(['=', result]));
  return result;
}

const calcResult = function () {
  const arithmetic = {
    '+': add,
    '-': subtract,
    '/': divide,
    '÷': divide,
    'x': multiply,
    '*': multiply,
  };
  return arithmetic[operations[1]]();
}

const add = function () {
  return (+ operations[0]) + (+ operations[2]);
}

const subtract = function () {
  return operations[0] - operations[2];
}

const divide = function () {
  return operations[0] / operations[2];
}

const multiply = function () {
  return operations[0] * operations[2];
}

const equal = function () {
  if (operations.length > 1) {
    operations.push(display.textContent);
    display.textContent = reduceOperations();
  } else if (hist.length > 0) {
    const lastOperation = hist[hist.length - 1];
    operations.push(display.textContent, lastOperation[1], lastOperation[2]);
    display.textContent = reduceOperations();
  }
}