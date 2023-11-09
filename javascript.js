const buttons =  document.querySelectorAll('button');
const display = document.querySelector('#display');
const operations = [];
const hist = [];
let toggleBtn;
let mem;
let histMode = false;
let indexHist;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    manageInput(button);
  })
});

const manageInput = function (button) {
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
      if (typeof toggleBtn === "undefined") {
        queueOperation(btnText);
      } else {
        clearToggle();
        operations[operations.length - 1] = btnText;
      }
      toggleBtn = button;
      toggleBtn.classList.toggle("operator-hover");
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
  if (btnClass !== 'operator' && btnText !== '+/-' && typeof toggleBtn !== "undefined") {
    clearToggle();
  }
  // console.log(operations);
  // console.table(hist);
  // console.log(toggleBtn);
}

const clearToggle = function () {
  toggleBtn.classList.toggle("operator-hover");
  toggleBtn = undefined;
}

const clearInput = function () {
  if (typeof toggleBtn !== "undefined") {
    eraseC();
  }
  if (hist.length > 0 && operations.length === 0) {
    eraseC();
  }
}

const concatNumber = function (number) {
  clearInput();
  if (display.textContent === '0') {
    display.textContent = number !== '00' ? number : '0';
  } else {
    display.textContent += number;
  }
}

const concatDot = function() {
  clearInput();
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

const square = function () {
  const result = Math.sqrt(Number(display.textContent));
  operations.splice(0);
  hist.push(['²', '√', display.textContent, '=', result]);
  return result;
}

const sign = function () {
  return (-1) * display.textContent;
}

const equal = function () {
  if (operations.length > 1) {
    operations.push(display.textContent);
    display.textContent = reduceOperations();
  } else if (hist.length > 0) {
    const lastOperation = hist[hist.length - 1];
    let result;
    if (lastOperation[1] === '√') {
      result = square();
    } else {
      operations.push(display.textContent, lastOperation[1], lastOperation[2]);
      result = reduceOperations();
    }
    display.textContent = result;
  }
}

const singleOperation = function (operator) {
  const operators = {
    '√': square,
    '+/-': sign,
  }
  display.textContent = operators[operator]();
}

const editState = function (option) {
  const options = {
    'C': eraseC,
    'AC': eraseAC,
    'Hist': showHist,
    '˄': upHist,
    '˅': downHist,
    '←': eraseDel,
  }
  options[option]();
}

const eraseC = function () {
  display.textContent = '0';
}

const eraseAC = function () {
  exitHistMode();
  operations.splice(0);
  hist.splice(0);
  eraseC();
}

const setHistMode = function () {
  if (!histMode) {
    mem = display.textContent;
  }
  if (hist.length > 0) {
    histMode = true;
  }
}

const showHist = function () {
  setHistMode();
  if (histMode) {
    if (typeof indexHist === "undefined") {
      indexHist = 0;
      display.textContent = hist[indexHist].join(' ');
    } else {
      exitHistMode();
    }
  }
}

const upHist = function () {
  setHistMode();
  if (histMode) {
    if (typeof indexHist === "undefined") {
      indexHist = hist.length;
    }
    indexHist = indexHist > 0 ? indexHist - 1 : 0;
    display.textContent = hist[indexHist].join(' ');
  }
}

const downHist = function () {
  if (histMode) {
    indexHist = indexHist < hist.length - 1 ? indexHist + 1 : hist.length;
    if (indexHist === hist.length) {
      exitHistMode();
    } else {
      display.textContent = hist[indexHist].join(' ');
    }
  }
}

const exitHistMode = function () {
  display.textContent = mem;
  histMode = false;
  mem = undefined;
  indexHist = undefined;
}

const eraseDel = function () {
  const text = display.textContent;
  display.textContent = text.length > 1 ? text.substring(0, text.length - 1) : '0';
}

document.addEventListener('keydown', (event) => {
  const allowKeys = {
    'c': 'C',
    'a': 'AC',
    'escape': 'AC',
    'h': 'hist',
    'arrowup': 'up',
    'arrowdown': 'down',
    '9': 'nine',
    '8': 'eight',
    '7': 'seven',
    '6': 'six',
    '5': 'five',
    '4': 'four',
    '3': 'three',
    '2': 'two',
    '1': 'one',
    '0': 'zero',
    'backspace': 'back',
    'm': 'minus',
    's': 'minus',
    '.': 'dot',
    'r': 'sqrt',
    's': 'sqrt',
    'x': 'multiply',
    '*': 'multiply',
    '/': 'divide',
    '-': 'subtract',
    '+': 'add',
    '=': 'equals',
    'enter': 'equals',
  };
  const keyName = event.key;
  const btnID = allowKeys[keyName.toLowerCase()];
  if (typeof btnID !== "undefined") {
    btnEquivalent = document.querySelector(`#${btnID}`);
    manageInput(btnEquivalent);
  }
});