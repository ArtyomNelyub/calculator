const input = document.getElementById('expression');
const result = document.getElementById('result');
const DECIMAL_PLACE = 8;

const zero = document.getElementById('zero');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');

const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');
const percent = document.getElementById('percent');
const exponentiation = document.getElementById('exponentiation');

const del = document.getElementById('delete');
const point = document.getElementById('point');
const clear = document.getElementById('clear');
const equal = document.getElementById('equal');

const errors = {
  dividingByZero: 'Делить на ноль нельзя',
  incorrect: 'Некорректный ввод',
};

const ALL_BUTTONS = [
  [plus, '+'],
  [minus, '-'],
  [multiply, '*'],
  [divide, '/'],
  [percent, '%'],
  [zero, '0'],
  [one, '1'],
  [two, '2'],
  [three, '3'],
  [four, '4'],
  [five, '5'],
  [six, '6'],
  [seven, '7'],
  [eight, '8'],
  [nine, '9'],
  [del, 'Backspace'],
  [clear, 'Escape'],
  [equal, 'Enter'],
  [point, '.'],
  [exponentiation, '^'],
];

ALL_BUTTONS.forEach((button) => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    if (e.key === button[1]) {
      connectHandlers(button);
    }
  });

  button[0].addEventListener('click', () => connectHandlers(button));
});

function connectHandlers(button) {
  /\d/.test(button[1]) && numberHandler(button[1]);
  /[\+\-\*\/\%\^]/.test(button[1]) && operatorHandler(button);
  /\./.test(button[1]) && pointHandler();
  /Enter/.test(button[1]) && equalHandler();
  /Backspace/.test(button[1]) && delHandler();
  /Escape/.test(button[1]) && clearHandler();
}

function operatorHandler(operator) {
  if (Object.values(errors).includes(result.value)) {
    result.value = '';
    input.value = '';
  }

  let field = input.value;

  if (result.value) {
    input.value = result.value;
    result.value = '';
  }

  if (field === '') {
    if (operator[0] === minus) {
      input.value += operator[1];
    }
    return;
  }

  if (field === '-') {
    return;
  }

  //Если конец строки вида " (оператор)" и нажимается "-", добавить минус " (оператор) -"
  if (/\s[\+\-\*\/\%\^]\s$/.test(field) && operator[0] === minus) {
    input.value += operator[1];
    return;
  }

  //Если конец строки вида " (оператор) -" следующее нажатие на оператор заменит на " (новыйОператор) "
  if (/\s[\+\-\*\/\%\^]\s-$/.test(field)) {
    input.value = field.slice(0, field.length - 3) + operator[1] + ' ';
    return;
  }

  // Если конец строки вида "(оператор) ", следующее нажатие на оператор заменит на "(новОператор) "
  if (/[\+\-\*\/\%\^]\s$/.test(field)) {
    input.value = field.slice(0, field.length - 2) + operator[1] + ' ';
    return;
  }

  if (operator[0] === percent) {
    if (/\d$/.test(field)) {
      input.value += '%';
      return;
    }
  }

  input.value += ` ${operator[1]} `;
}

function numberHandler(number) {
  let field = input.value;

  if (result.value) {
    result.value = '';
    input.value = '';
  }

  if (/\%$/.test(field)) {
    input.value = field.slice(0, field.length - 1) + ` % ${number}`;
    return;
  }

  if (field === '0') {
    if (number === '0') {
      return;
    } else {
      input.value = number;
      return;
    }
  }

  input.value += number;
}

function pointHandler() {
  if (result.value) {
    result.value = '';
    input.value = '';
  }
  // Если строка заканчивается на "." или ".(любое кол-во цифр)", то пропустить
  if (/(\.\d+$)|(\.$)/.test(input.value)) {
    return;
  }

  if (/\d+$/.test(input.value)) {
    input.value += '.';
    return;
  }
  input.value += '0.';
}

function delHandler() {
  if (Object.values(errors).includes(result.value)) {
    result.value = '';
  }

  // Если конец строки вида " (оператор) ", удалить 3 знака
  if (/\s[\+\-\*\/\%\^]\s$/.test(input.value)) {
    input.value = input.value.slice(0, input.value.length - 3);
    return;
  }

  //Если конец строки вида " " удалить 2 знака
  if (/\s$/.test(input.value)) {
    input.value = input.value.slice(0, input.value.length - 2);
    return;
  }

  input.value = input.value.slice(0, input.value.length - 1);
}

function clearHandler() {
  input.value = '';
  result.value = '';
}

function equalHandler() {
  if (input.value.length === 0) {
    return;
  }

  let array = getArrayFromStrExpression(input.value);
  let answer = calculateArrayExpression(array);
  result.value = answer.toString();
}

function getArrayFromStrExpression(str) {
  // Если конец строки вида ' (оператор) ', обрезать
  if (/\s[\+\-\*\/\%\^]\s$/.test(str)) {
    str = str.slice(0, str.length - 3);
    input.value = str;
  }

  // Если конец строки вида ' (оператор) -', обрезать
  if (/\s[\+\-\*\/\%\^]\s-$/.test(str)) {
    str = str.slice(0, str.length - 4);
    input.value = str;
  }

  let result = str.split(' ').map((i) => (i === '.' ? 0 : i));

  return result;
}

function calculateArrayExpression(arr) {
  try {
    let priorities = [/^[\%\^]$/, /^[\*\/]$/, /^[\+\-]$/];

    priorities.forEach((priority) => {
      for (let i = 0; i < arr.length; i++) {
        if (priority.test(arr[i])) {
          let gap = calculate(arr[i - 1], arr[i + 1], arr[i]);
          arr.splice(i - 1, 3, gap);
          i--;
        }
      }
    });

    return arr[0];
  } catch (e) {
    return e.message;
  }
}

function makeArraysFromBrackets(arr) {
  while (arr.indexOf('(') !== -1) {
    makeArrayFromDeepBrackets(arr);
  }

  function makeArrayFromDeepBrackets(arr) {
    let start = -1;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '(') {
        start = i;
      }
    }

    let end = arr.indexOf(')', start);
    let gap = arr.slice(start + 1, end);
    let count = gap.length;
    let result = calculateArrayExpression(gap);
    arr.splice(start, count + 2, result);

    return arr;
  }

  return arr;
}

function calculate(a, b, operator) {
  function roundNumber(numb) {
    return Number(parseFloat(numb).toFixed(DECIMAL_PLACE));
  }

  if (/\%$/.test(a)) {
    a = parseFloat(a) / 100;
  }

  if (/\%$/.test(b)) {
    b = (parseFloat(a) * parseFloat(b)) / 100;
  }

  a = roundNumber(a);
  b = roundNumber(b);

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error(errors.incorrect);
  }

  switch (operator) {
    case '+':
      return roundNumber(a + b);
    case '-':
      return roundNumber(a - b);
    case '*':
      return roundNumber(a * b);
    case '/':
      if (b === 0) {
        throw new Error(errors.dividingByZero);
      }
      return roundNumber(a / b);
    case '%':
      return roundNumber((b * a) / 100);
    case '^':
      return roundNumber(Math.pow(a, b));
    default:
      throw new Error(errors.incorrect);
  }
}
