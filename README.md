# Сalculator

__! Калькулятор будет некорректно работать с числами больше чем (2^53 - 1) и меньше -(2^53-1), т.к. памяти под эти числа не хватает, калькулятор будет пытаться округлить до ближайшего целого!__

Данный калькулятор работает по следующему принципу:

- Сначала считывается строка из поля ввода;
- Затем строка преобразуется в массив из чисел и операторов;
- Полученный массив, прогонятся по массиву математических операций в порядке приоритета;
- В соответствии с оператором, вычисляется операция из двух соседних чисел между ним;
- Полученное значение подставляется в массив вместо трех предыдущих значений (число, оператор, число);
- Алгоритм повторяется, пока в массиве не останется одно число.

Калькулятор работает при нажатии на клавиши клавиатуры (цифры, операторы)

- 'Enter' - возвращает результат ("=");
- 'Esc' - очищает поля ("C");
- 'Backspace' - убирает один знак или оператор ("DEL")

Немного о работе:

- Если строка ввода заканчивается оператором, он будет игнорироваться;
- Если поле "результат" пустое, калькулятор работает обычно;
- Если поле "результат" имеет значение, то при нажатии на оператор, в поле "выражение" подставляется значение, а поле "результат" очищается;
- Если поле "результат" имеет значение, то при нажатии на цифру, калькулятор работает как обычно, поле "результат" очищается;
- Если поле "результат" содержит ошибку, то калькулятор работает как обычно, при нажатии на кнопку поле "результат" очищается;

Оператор "-":

- "-" минус может быть первым, будет трактоваться как унарный минус;
- После остальных бинарных операторов может быть "-", будет трактоваться как унарный минус. При повторном нажатии на "-", заменится сам оператор, будет трактоваться как бинарный минус.

Оператор "%":

- "%" не может быть первым;
- Если перед числом c "%" нет другого числа с оператором, то "%" будет делить число на сто. (пример, 5% === 0.05);
- Если после числа c % есть оператор с числом, то % также делит первое число на сто. (пример, 50% _ 4 === 0,5 _ 4);
- Если перед числом с % есть число с оператором, то второе число заменяется на соответствующий % от первого. (пример, 60 - 50% -> 60 - 60\*50/100 -> 60 - 30);
- Если "%" между двух чисел (бинарный), то возвращается % от следующего числа. (пример, 50 % 200 = 100)
- Еще примеры:

  `10 * 50 % 8 + 2 -> 10 * 4 + 2`

  `10 * 50% * 8 + 2 -> 10 * 5 * 8 + 2`

  `10 + 50% * 8 + 2 -> 10 + 0,5 * 8 + 2`

  `10 + 50% + 8 + 2 -> 10 + 5 + 8 + 2`

  `50% + 10 -> 0.5 + 10`

  `50% % 50% -> 0.5 % 0.25 -> 0.00125`

Оператор "^" (возведение в степень) имеет такой же приоритет как и "%"
`2 ^ 2% -> 2 ^ 0.04`
`2 ^ 2 % 100 -> 4 % 100 -> 4`