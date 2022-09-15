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

const del = document.getElementById('delete');
const point = document.getElementById('point');
const clear = document.getElementById('clear');
const equal = document.getElementById('equal');

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
  /[\+\-\*\/\%]/.test(button[1]) && operatorHandler(button);
  /\d/.test(button[1]) && numberHandler(button[1]);
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
  if (/\s[\+\-\*\/\%]\s$/.test(field) && operator[0] === minus) {
    input.value += operator[1];
    return;
  }

  //Если конец строки вида " (оператор) -" следующее нажатие на оператор заменит на " (новыйОператор) "
  if (/\s[\+\-\*\/\%]\s-$/.test(field)) {
    input.value = field.slice(0, field.length - 3) + operator[1] + ' ';
    return;
  }

  // Если конец строки вида "(оператор) ", следующее нажатие на оператор заменит на "(новОператор) "
  if (/[\+\-\*\/\%]\s$/.test(field)) {
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