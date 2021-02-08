'use strict';

////////////////////////////////
// Video 10-3 Default Parameters

/*

const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price = 199) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', undefined, 10); // si queremos saltear un valor usamos undefined

*/

////////////////////////////////
// Video 10-4 Value vs Reference

/*

const flight = 'LH234';
const juan = {
  name: 'Juan Alvarez',
  passport: 9874398754,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
  if (passenger.passport === 9874398754) {
    alert('Checked In');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, juan);
console.log(flight);
console.log(juan);

const newPassport = function (person) {
  person.passport = Math.ceil(Math.random() * 10000000000);
  return person;
};

console.log(newPassport(juan));
checkIn(flight, juan);

*/

////////////////////////////////////////////////////
// Video 10-6 Functions Accepting Callback Functions

/*

// NOTE: LAS FUNCIONES TIENEN SUS PROPIOS METHODS, E INCLUSO TAMBIEN PROPERTIES, como por ejemplo el name

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// console.log(upperFirstWord('Lalal lele lilili'));

// La siguiente es una high order function. Porque acepta como parámetro otra función, o porque retorna una función
const transformer = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Transformed String: ${fn(str)}`);
  
  // Las funciones tienen metodos y propiedades
  console.log(`Transformed by the function: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function () {
  console.log('👋');
};

// EN el siguiente addEventListener es el High Order Function, y high5 es el callback function
document.body.addEventListener('click', high5);

['Pepe', 'Vito', 'Tino'].forEach(high5);

*/

///////////////////////////////////////////
// Video 10-7 Functions Returning Functions

/*

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey'); // gretterHey tomara como valor una funcion
greeterHey('Juan');
greeterHey('Steven');

//Tambien podemos hacer todo junto. llamar a la funcion, y llamar inmediatamente
// a la funcion de adentro y pasarle un argumento
greet('Hello')('Pepe');
greet('Hi')('Vito');
greet('Sup!')('Tino');

// Exercise. Rewrite the greet function using arrow functions

const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
greetArrow('hola')('miguel!');

*/

////////////////////////////////////////
// Video 10-8 The call and apply Methods

/*

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name,
    });
  },
};

lufthansa.book(435, 'Juan Alvarez');
lufthansa.book(128, 'Andrea Croce');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// Para que el objeto eurowings tambien tenga el metodo book() sin copiar el metodo book() que ya
// esta en el objeto lufthansa, asignamos el metodo o funcion a una variable
const book = lufthansa.book;

// Usando call apply y bind indicamos a donde va a apuntar this
// Como ya se vio antes las funciones tambien tiene metodos, call es un metodo
// al usar call, el primer argumento que pasamos es para indicar a donde queremos que apunte this

book.call(eurowings, 345, 'Doctor Cachetes');
console.log(eurowings);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 345, 'Sarah Connor');
console.log(swiss);

// Apply method
// Es similar al call ethod, pero en lugar de tomar los argumentos separados con coma, tenemos que ponerlos dentro de un array
book.apply(lufthansa, [2222, 'John Wick']);
console.log(lufthansa);

/////////////////////////////
// Video 10-9 The Bind Method

//NOTE: bind nos permite guardar en una variable donde queremos que apunte el keyword this. No es como call donde llamamos una funcion inmediatamente

// book.call(eurowings, 345, 'Doctor Cachetes');

const bookEW = book.bind(eurowings); // guardamos con bind donde queremos que apunte this
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Guillermo Fantino');

// Con bind también podemos guardar los argumentos que queremos pasar
const bookEW23 = book.bind(eurowings, 23); // En este caso dejamos fijo el flightNum y cuando llamemos desde acá solo deberemos poner el nombre
bookEW23('Pepe Argenti');
console.log(eurowings);

// With eventListeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  
  this.planes++;
  console.log(this.planes);
};

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
// NOTE: In an event handler function the this keyword always point to the element on which that handler is attached to
// O sea que en este caso this apuntaria al button -> lufthansa.buyPlane apunta a document.querySelector('.buy')
// Como tenemos que PASAR una funcion y NO LLAMARLA, no podemos usar el metodo call, asi que debemos usar bind
document
.querySelector('.buy')
.addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//NOTE: Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// Supongamos que tenemos un impuesto que siempre es el mismo, es un use case del metodo bind
// El primer argumento de bind es el this keyword, pero como no lo necesitamos ponemos null
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

// Exercise
const addTax2 = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
console.log(addTax2(0.1)(200));

*/

//////////////77777///////////////
// Video 10-10 Coding Challenge #1

/*

Coding Challenge #1
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an
array with the number of replies for each option. This data is stored in the starter
'poll' object below.

Your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The
method does 2 things:

1.1. Display a prompt window for the user to input the number of the
selected option. The prompt should look like this:
What is your favourite programming language?
0: JavaScript
1: Python
2: Rust
3: C++
(Write option number)

1.2. Based on the input number, update the 'answers' array property. For
example, if the option is 3, increase the value at position 3 of the array by
1. Make sure to check if the input is a number and if the number makes
sense (e.g. answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. If type is 'array', simply display the results array as it is, using
console.log(). This should be the default option. If type is 'string', display a
string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each
'registerNewAnswer' method call.
5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
object! So what should the this keyword look like in this situation?

Test data for bonus:
§ Data 1: [5, 2, 3]
§ Data 2: [1, 5, 3, 9, 6, 1]
Hints: Use many of the tools you learned about in this and the last section 😉
GOOD LUCK 😀

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
        )
        );
        if (isNaN(answer) || answer < 0 || answer > 3 || !answer) {
          console.log('WRONG!!!');
          return;
        }
        this.answers[answer]++;
        
        this.displayResults();
        this.displayResults('string');
      },
      displayResults(type = 'array') {
        if (type === 'array') console.log(this.answers);
        else if ((type = 'string'))
        console.log(`Poll results are: ${this.answers.join(', ')}`);
        else console.log('Type error');
      },
    };
    
    // Poll button event listener
    document
    .querySelector('.poll')
    .addEventListener('click', poll.registerNewAnswer.bind(poll));
    
    // MI SOLUCION TEST DATA
// const testData1 = {
  //   answers: [5, 2, 3],
  // };
// const testData2 = {
  //   answers: [1, 5, 3, 9, 6, 1],
  // };
  
  // const display = poll.displayResults;
  // display.call(testData1, 'string');
  // display.call(testData1, 'array');
  // display.call(testData2, 'string');
  // display.call(testData2, 'array');
  
  // Solucion mas simple, crear un objeto en la misma linea del call, y sin crear una variable
  poll.displayResults.call({ answers: [5, 2, 3] });
  poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
  poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
  poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
  
*/

//////////////////////////////////////////////////////////////
// Video 10-11 Immediately Invoked Function Expressions (IIFE)

/*  

// Es una funcion que se ejecuta una vez y desaparece
// La encerramos entre parentesis e inmediatamente despues la llamamos con ()
(function () {
  console.log('this will never run again');
})();

// tambien funciona con arrow functions
(() => console.log('this will never run again(arrow)'))();

// IIFE s ya no son muy usadas, si necesitamos provacidad podemos hacer asi

{
  const isPrivate = 23;
}
// console.log(isPrivate); // not defined error

*/

///////////////////////////////
// Video 10-12 y 13CLOSURES! //
///////////////////////////////

/*

const secureBooking = function () {
  let passengerCount = 0;
  
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

// Es la capacidad que tenemos de acceder al variable environment(VE) del execution context en el que la funcion fue creada, incluso despues
// de que el execution context no existe mas(se fue del stack)

// Closure es una snapshot de todas las variables a las que tenia acceso una funcion al momento de ser creada. No importa si su parent function
// no existe mas en el stack

console.dir(booker); // Usando console.dir vemos todas las propiedades, incluso los closures y de donde vienen
// Acá se ve el [[Scopes]] dentro de [[]], que quiere decir que es una propiedad interna que no podemos acceder directamente

// Example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); // Llamamos a la funcion g que va a reasignar el valor de f a un funcion
f(); // y llamamos a la funcion
console.dir(f);

// Volvemos a reasignar f dentro de la funcion h()
h();
f(); // al reasignar f dentro de h, f ya no tendrá acceso a la variable a

console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  
  console.log(`Will start boarding in ${wait} seconds`);
  return `termino funcion`; // la funcion ya hizo su return y sim embargo el settimeout puede usar sus parametros y su variable perGroup
};

// Timer functions son un excelente ejemplo de closures, porque la funcion boardPassengers ya no esta mas en el stack
// sin embargo la funcion setTimeout pude acceder a sus parametros n y wait, y su variable perGroup

// NOTE: LOS CLOSURES TIENEN PRIORIDAD POR SOBRE EL SCOPE CHAIN, por lo tanto perGroup va a valer n / 3
const perGroup = 1000;
console.log(boardPassengers(180, 3));

*/

//////////////////////
// Coding Challenge #2

/*

This is more of a thinking challenge than a coding challenge 🤓

Your tasks:

1. Take the IIFE below and at the end of the function, attach an event listener that
changes the color of the selected h1 element ('header') to blue, each time
the body element is clicked. Do not select the h1 element again!

2. And now explain to yourself (or someone around you) why this worked! Take all
the time you need. Think about when exactly the callback function is executed,
and what that means for the variables involved in this example.

*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
