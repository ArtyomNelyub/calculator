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