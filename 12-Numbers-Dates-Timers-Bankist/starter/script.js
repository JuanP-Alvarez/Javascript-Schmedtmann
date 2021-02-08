'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-01-22T17:01:17.194Z',
    '2021-01-23T23:36:17.929Z',
    '2021-01-24T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const DaysPassed = calcDaysPassed(new Date(), date);
  // console.log(DaysPassed);

  if (DaysPassed === 0) return 'Today';
  if (DaysPassed === 1) return 'Yesterday';
  if (DaysPassed <= 7) return `${DaysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0); // convertimos a string y le agregamos ceros hasta que tenga un length de 2 caracteres
  // const month = `${date.getMonth() + 1}`.padStart(2, 0); // hacemos + 1 porque es base cero
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(Math.abs(mov), acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = () => {
    const min = Math.floor(time / 60)
      .toString()
      .padStart(2, 0);
    const sec = (time % 60).toString().padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When timer reachs 0, stop timer and log out user
    if (time === 0) {
      clearInterval(timer); // Paramos el contador
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    // Decrease 1 second
    time--;
  };

  // Set time to 5 minutes = 300s
  let time = 300;

  // Call the timer every second
  // Creamos la funcion tick para poder llamarla inmediatamente sin esperar los 1000 ms del setInterval.
  // O sea, llamamos una vez inmediatamente tick y luego cada 1 segundo mediante setInterval
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

const resetTimer = () => {
  clearInterval(timer);
  timer = startLogOutTimer();
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0); // convertimos a string y le agregamos ceros hasta que tenga un length de 2 caracteres
// const month = `${now.getMonth() + 1}`.padStart(2, 0); // hacemos + 1 porque es base cero
// const year = now.getFullYear();
// const hour = now.getHours();
// const min = now.getMinutes();

// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

// Mostrar la fecha con el sgte formato day/month/year

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0); // convertimos a string y le agregamos ceros hasta que tenga un length de 2 caracteres
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); // hacemos + 1 porque es base cero
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Experimenting API
    const now = new Date();

    // Opciones para la API
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // January, etc.
      // month: '2-digit', // 08 etc
      year: 'numeric',
      // weekday: 'long',
    };

    // Vamos a sacar el lenguaje que usa el navegador
    // const locale = navigator.language;

    // labelDate.textContent = new Intl.DateTimeFormat('es-ES', options).format(now);
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // timer
    if (timer) clearInterval(timer); // Si ya hay un setInterval funcionando, lo paramos
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // // Reset timer
    // clearInterval(timer);
    // timer = startLogOutTimer();
    resetTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';

  // // Reset timer
  // clearInterval(timer);
  // timer = startLogOutTimer();
  resetTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

///////////////////////////////////////////////
// Video 12 - 3 Converting and Checking Numbers

/*

// NOTE: Todos los numeros son considerados por JavaScript como floating point. HAY UN SOLO DATA TYPE FOR ALL NUMBERS
console.log(0.1 + 0.2);

// CONVERSION
// Convertir string a NUMBERS
console.log(Number('23'));
// Otra opción es:
console.log(+'23');

// PARSING
console.log(Number.parseInt('30px', 10)); // Para que funcione el string debe comenzar con un numero. Luego intentará convertir todo lo que sea num
// El 2do argumento de parseInt es la base numerica, casi siempre trabajamos base 10, aunque es bueno indicarlo para evitar posibles bugs

console.log(Number.parseInt('2.5rem')); // 2
console.log(Number.parseFloat('2.5rem')); // 2.5

// Chequear si un valor es o no es un numero: isNaN dara true cuando no es un numero y viceversa
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(20 / 0));

// isFinite es mejor que isNaN para chequear si un valor es numero o no NOTE: ?¿?¿ Dudas
console.log('----isFinite----');

console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite('20X')); // false
console.log(Number.isNaN(20 / 0)); // false

*/

/////////////////////////////////
// Video 12 - 4 Math and Rounding

/*

// Raiz cuadrada
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5

console.log(8 ** (1 / 3)); // Raiz cubica = 2

// Numero maximo de una serie de numeros. Este método hace type cohercion NOTE:
console.log(Math.max(5, 18, '23', 11, 2)); // 23

// Numero minimo de una serie de numeros. Este método hace type cohercion NOTE:
console.log(Math.min(5, 18, 23, 11, 2)); // 2

// PI - Area de un círculo - Pi por radio al cuadrado
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Random
console.log(Math.trunc(Math.random() * 6) + 1);

// NOTE: IMPORTANTE FORMULA PARA GENERAR UN NUMERO RANDON ENTRE UN MAXIMO Y MINIMO ESTABLECIDO
const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
console.log(randomInt(4, 8));

// Rounding integers. TODOS ESTOS METODOS HACEN TYPE COHERCION NOTE:
console.log(Math.round(23.3)); // Redondea al entero más próximo
console.log(Math.trunc(23.3)); // Solamente saca los decimales sin cambiar la parte del entero
console.log(Math.floor(23.3)); // redondea para abajo
console.log(Math.ceil(23.3)); // redondea para arriba
// console.log(Math.round(23.3));
// console.log(Math.round(23.3));
// console.log(Math.round(23.3));

// Rounding decimals
console.log((2.7).toFixed(0)); // toFixed(aclarar la cantidad de decimales) -> devuelve un string
console.log((2.343).toFixed(2)); // toFixed(aclarar la cantidad de decimales) -> devuelve un string (redondea si sca decimales)
console.log(+(2.343).toFixed(2)); // Usamos el + adelante asi ya tenemos un Number NOTE:

*/

//////////////////////////////////////
// Video 12 - 5 The Remainder Operator

/*

console.log(5 % 2);

const isEven = n => n % 2 === 0;
console.log(isEven(2));
console.log(isEven(5));
console.log(isEven(16));
console.log(isEven(195));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'red';
    if (i % 3 === 0) row.style.backgroundColor = 'yellow';
  });
});

*/

///////////////////////////////////
// Video 12 - 6 Working with BigInt

/*

// Los numeros son representados internamente con 64bits
// 53 de esos bits son para el numero, los otros 11 restantes es para la posición de la coma y el signo

// NOTE: sacamos por consola el numero más grande que maneja JS
console.log(2 ** 53 - 1); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER);

// Big Int, se usa cuando necesitamos numeros mayores al limite de 64 bits
console.log(453987453789934875439857435897n); // la n al final marca que es un bigInt

// operations

console.log(10000n + 10000n);

// NOTE: no se pueden mezclar bigInts con otros types
// console.log(20000n + 23); // error

*/

//////////////////////////////
// Video 12 - 7 Creating Dates

/*

//NOTE: Ways of creating a date
// 1
const now = new Date();
console.log(now); // Sun Jan 24 2021 21:04:37 GMT-0300 (hora estándar de Argentina)

// 2
console.log(new Date('Jan 24 2021 21:04:37'));
console.log(new Date('December 24, 2015'));

console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); // Thu Nov 19 2037 15:23:05 GMT-0300 (hora estándar de Argentina)


// Working with dates

const future = new Date(2037, 10, 19, 15, 23);
console.log(future); // Thu Nov 19 2037 15:23:00 GMT-0300 (hora estándar de Argentina)
console.log(future.getFullYear()); // devuelve el año, en number NOTE: no hay que usar getYear ?¿?¿ Averiguar
console.log(future.getMonth()); // Mes in number, indice 0 (cero base), november is 10
console.log(future.getDate());
console.log(future.getDay()); // dia de la semana, base cero
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

console.log(future.toISOString());

// timestamp, el tiempo que paso desde el 1-1-1970
console.log(future.getTime());

*/

/////////////////////////////////////
// Video 12 - 9 Operations With Dates

/*

// NOTE: cuando convertimos un Date a numbers, nos da el valor en milisegundos
// Usando este valor y haciendo cuentas, podemos comparar fechas



const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

// Vamos a crear una funcion que va a comparar 2 fechas y nos va a decir cuantos dias pasaron
// const calcDaysPassed = (date1, date2) =>
//   (date2 - date1) / (1000 * 60 * 60 * 24);

// days1 va a tener como valor la diferencia en dias entre las 2 fechas
// const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
// console.log(days1);

*/

//////////////////////////////////////////////////
// Video 12 - 11 Internationalizing Numbers (Intl)

/*

const num = 3987987.23;

const options = {
  style: 'currency',
  // unit: 'mile-per-hour',
  currency: 'EUR',
  // useGrouping: false, // numeros separados por puntos o comas
};

console.log('US:       ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany:  ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:    ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  'Browser:  ',
  new Intl.NumberFormat(navigator.locale, options).format(num)
);

*/

//////////////////////////////////////////////////
// Video 12 - 12 Timers setTimeout and setInterval

/*

// NOTE: setTimeout runs only once

const ingredients = ['olives', 'spinach'];

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`here is your pizza 🍕 with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
console.log('waiting');

// clearTimeout para el timeout
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// NOTE: setInterval keeps running forever until we stop it
setInterval(() => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  console.log(`${hour}:${minute}:${second}`);
}, 1000);

*/
