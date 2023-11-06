console.log('hola');

const equation = [];
const hist = [];
let displayNum = 0;

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
    equation.push(displayNum);
    console.log('a');
  } else if (hist.length > 0) {
    lastOPeration = hist[hist.length - 1]; 
    equation.push(displayNum, lastOPeration[1], lastOPeration[2]);
    console.log('b');
  } else {
    console.log('c');
    return "What's wrong";
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
    case '*':
      result = equation[0] * equation[2];
      break;
    case '/':
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