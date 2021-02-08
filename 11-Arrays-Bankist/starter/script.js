'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

///////////////////////////////////
//  Video 11-3 Simple Array Methods

// Los arrays son objetos que tienen acceso a special built-in methods, que podemos considerar como herramientas para arrays

// let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE NOTE: no muta (no cambia) el array original, para cambiar hay que asignar a otro array
// Slice devuelve lo que establecemos entre los limites
/*
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); // start and ending index. End index is not included!
console.log(arr.slice(-2)); // ultimos 2 elementos del array
console.log(arr.slice(-1)); // ultimo elemento del array

// NOTE:2 formas de hacer un shallow copy de un array, con el metodo de slice o con el spread operator
// Preferencia personal sobre cual usar. Creo que el spread es mejor por un tema de novedad
console.log(arr.slice());
console.log([...arr]);
*/

// SPLICE NOTE: SI cambia el array original (lo muta)
// Splice devuelve lo que establecemos entre los limites, pero el array original pierde esos valores

/*
arr.slice(2);
console.log(arr); // el array NO cambió
arr.splice(2);
console.log(arr); // el array SI cambió
*/

// El uso más común de splice es borrar cierta cantidad de elementos

/*
arr.splice(-1); // le sacamos al array el ultimo elemento
console.log(arr);

// El primer argumento es la posición inicial, el 2do argumento es la cantidad de elementos que queremos borrar

arr.splice(1, 2);
console.log(arr);
*/

/*

// REVERSE Devuelve el array al reves o invertido NOTE: MUTA EL ARRAY ORIGINAL!
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2); // reverse muta el array original

// CONCAT Metodo que concatena arrays NOTE: NO MUTA LOS ARRAYS
const letters = arr.concat(arr2);
console.log(letters);
// otra opcion para concatenar es usar el spread operator. Cualquiera de los 2 metodos sirven, es preferencia personal
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join('-'));

*/

//////////////////////////////////////
//  Video 11-4 Looping Arrays forEach

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Como haciamos con for of
console.log('\n***** FOR OF ******');
for (const [i, movement] of movements.entries()) {
  if (movement > 0) console.log(`Movimiento ${i + 1}: Depositaste ${movement}`);
  else console.log(`Movimiento ${i + 1}: Retiraste ${Math.abs(movement)}`);
}

// Ahora usamos for each. For Each es tecnicamente una high order function. y requiere una callback function
// NOTE: Lo que hace for each es loopear un array in en cada iteración va a llamar a la callback function y le pasará
// el current element como argumento
// Los argumentos que pasa foreach son : elemento actual (current element), el index del current element y el array completo
// Podemos usar todos los parametros o uno solo, pero el orden es: element, index, array
// Tambien se pueden usar nombres cortos: el, i, arr

console.log('\n***** FOREACH ******');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) console.log(`Movimiento ${i + 1}: Depositaste ${mov}`);
  else console.log(`Movimiento ${i + 1}: Retiraste ${Math.abs(mov)}`);
});

// NOTE: continue y break no funcionan en un foreach! Si necesitamos esta funcionalidad tendremos que usar for of

*/

/////////////////////////////////////////
//  Video 11-5 forEach With Maps and Sets

/*

// For each with a Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// For each with a Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

// For each de un set pasa los mismos parametros a la callback function que cuando usamos un map
// NOTE: En este caso el key es exactamente igual que el value
// Recordar que un set no tiene key y no tiene index
// Se mantiene el mismo formato que el map para no complicar
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

*/

//////////////////////
// Coding Challenge #1

/*

Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.

Your tasks:

Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)

2. Create an array with both Julia's (corrected) and Kate's data

3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
🐶
")

4. Run the function for both test datasets

Test data:

§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

*/

/*

const checkDogs = function (dogsJulia, dogsKate) {
  
  const dogsJuliaCorrected = dogsJulia.slice(1, -2);
  
  console.log(`Julia's dogs ages, with cats: ${dogsJulia}`);
  console.log(`Julia's dogs ages, without cats: ${dogsJuliaCorrected}`);
  console.log(`Kate's dogs ages: ${dogsKate}`);
  
  const allDogsAges = [...dogsJuliaCorrected, ...dogsKate];
  // const allDogsAges = dogsJuliaCorrected.concat(dogsKate); // Tambien podriamos haber usado concat
  
  console.log(`All dogs ages: ${allDogsAges}`);
  allDogsAges.forEach(function (age, i) {
    if (age >= 3)
    console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    else console.log(`Dog number ${i + 1} is still a puppy 🐶`);
  });
};

console.log('\n***** TEST DATA 1 *****');
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
  console.log('\n***** TEST DATA 2 *****');
  checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
  
  */

//////////////////////////////
//  Video 11-10 The map Method

/*

//NOTE: MAP devuelve un nuevo array
// Map pasa a la callback function los mismos 3 parametros: elemento actual, index y array completo

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
  //   return mov * eurToUsd;
  // });
  
  // Vamos a convertir el map de arriba usando arrow function
  const movementsUSD = movements.map(mov => mov * eurToUsd);
  
  console.log(movements);
  console.log(movementsUSD);
  
  const movementsDescriptions = movements.map(
    (mov, i) =>
    `Movimiento ${i + 1}: ${mov > 0 ? 'Depositaste' : 'Retiraste'} ${Math.abs(
      mov
      )}`
    );
    
    console.log(movementsDescriptions);
    
    */

/*
NOTE: DIFERENCIAS ENTRE FOREACH Y MAP

- Foreach devuelve undefined - Map devuelve un nuevo array
- Com map podemos hacer chain con otros methods, como filter por ej. Como foreach devuelve undefined no podemos

*/

/////////////////////////////////
//  Video 11-12 The filter Method

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(function (mov) {
  //   return mov > 0; // El filter method solo va a devolver los valores que cumplan esta condición
  // });
  
  // Lo mismo de arriba pero usando arrow functions
  const deposits = movements.filter(mov => mov > 0);
  const withdrawals = movements.filter(mov => mov < 0);
  
  console.log(deposits);
  console.log(withdrawals);
  
  */

/////////////////////////////////
//  Video 11-13 The reduce Method

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// En el reduce method, el primer parámetro de la callback function es el accumulator (acc), y luego los demas
// NOTE: El accumulator es como una bola de nieve. En cada iteracion va actualizando su valor
// NOTE: El metodo en si, toma 2 parámetros, el primero es la callback function, y el 2do es el valor inicial del accumulator
// NOTE: Con el metodo reduce siempre tenemos que hacer return (devolver) algo, que es el valor que tomara el accumulator en la siguiente iteracion

// const balance = movements.reduce(function (acc, cur, i, arr) {
  //   console.log(`Iteration number ${i}: Accumulator value = ${acc}`);
  //   return acc + cur;
  // }, 0);
  
  // Lo mismo de arriba pero usando arrow functions
  const balance = movements.reduce((acc, cur) => acc + cur, 0);
  
console.log(balance);

// Find Maximum value using the reduce method
const max = movements.reduce(function (acc, mov) {
  if (acc > mov) return acc;
  else {
    return mov;
  }
}, movements[0]); // Usamos la primer posición porque se puede dar el caso que 0 es el mayor numero de todos y no se encuentra en el array
console.log(max);

// Lo mismo de arriba pero con arrow functions
const maxArrow = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
  );
console.log(maxArrow);

*/

//////////////////////
// Coding Challenge #2

/*

Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.

Your tasks:

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4

2. Exclude all dogs that are less than 18 human years old (which is the same as
  keeping dogs that are at least 18 years old)
  
  3. Calculate the average human age of all adult dogs (you should already know
    from other challenges how we calculate averages 😉)
    
    4. Run the function for both test datasets
    
    Test data:
    § Data 1: [5, 2, 4, 1, 15, 8, 3]
    § Data 2: [16, 6, 10, 5, 6, 1, 4]
    
    
    
    // const calcAverageHumanAge = function (ages) {
      //   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
      //   const adults = humanAges.filter(age => age >= 18);
      //   console.log(humanAges);
      //   console.log(adults);
      //   const average = adults.reduce((acc, age) => acc + age) / adults.length;
      //   return average;
      // };
      
      // Otra forma de hacerlo, PRESTAR ATENCION A COMO CALCULAMOS EL AVERAGE NOTE:
      // Calculo de promedio: (2 + 3) / 2 = 2.5 === (2/2) + (3/2) = 2.5
      // Este calculo nos permite hacer esto
      // const average = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0); NOTE:
      
      

      const calcAverageHumanAge = function (ages) {
        const dogHumanAge = ages
        .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
        .filter(age => age >= 18)
        .reduce((acc, age, i, arr) => acc + age / arr.length, 0); // NOTE: prestar atencion a como calculamos el average
        return dogHumanAge;
      };
  console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

*/

/////////////////////////////////////////////
//  Video 11-15 The Magic of Chaining Methods

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const totalDepositsUSD = movements
.filter(mov => mov > 0)
.map(mov => mov * eurToUsd)
.reduce((acc, mov) => acc + mov, 0);
  console.log(totalDepositsUSD);
  
  */

//////////////////////
// Coding Challenge #3

/*

const calcAverageHumanAge = ages =>
  ages
  .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
  .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
    
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

*/

///////////////////////////////
//  Video 11-17 The find Method

/*

// El find method va a devolver el primer elemento de un array que satisface
// la condicion que establecemos dentro de la callback function
// Mientras que filter devuelve todo el array, find solo el primer elemento

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find(mov => mov < 0); // devuelve el primer mov que es menor a cero
console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Sarah Smith');
console.log(account);

*/

//////////////////////////////
//  Video 11-21 some and every

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);
console.log(movements.includes(-130)); // EQUALITY

// NOTE: Mientras que includes nos sirve para chequear equalities (por ej si -130 existe en el array)
// con el metodo some podemos establecer ciertas condiciones, y de acuerdo a si se cumplen o no estas condiciones, retorna true or false

// SOME

const anyDeposits = movements.some(mov => mov > 5000); // Hay algun deposito mayor a 5000? True or false CONDITION
console.log(anyDeposits);

// EVERY
// NOTE: Si todos los elementos que pasamos por el metodo every cumplen con la condicion, retorna true
// Si aunque sea uno de los elementos no cumple la condición, devuelve false

console.log(movements.every(mov => mov > 5000)); // Todos los elementos son mayores a 5000? true or false

// NOTE: SEPARATE CALLBACK. Podemos guardar la callback function en una variable para luego llamarla desde la variable DRY
const deposit = mov => mov > 0;
console.log('some: ', movements.some(deposit));
console.log('every: ', movements.every(deposit));
console.log('filter: ', movements.filter(deposit));

*/

////////////////////////////////
//  Video 11-22 flat and flatMap

/*

//NOTE: Se usan para remover nested arrays. Aplana(flattens) the array

const arr2 = [[1, 2, 3], [4, 5, 6], 7, 8];
// Esto [[1, 2, 3], [4, 5, 6], 7, 8] se convierte en [1, 2, 3, 4, 5, 6, 7, 8];
console.log(arr2.flat());

// Veamos varios niveles de nested arrays
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// Esto [[[1, 2], 3], [4, [5, 6]], 7, 8] se convierte en [[1, 2], 3, 4, [5, 6], 7, 8];
// Por lo tanto lo que hace flat() es remover un nivel de nesting (cuando se usa sin argumentos) ya que el argumento default es 1
console.log(arrDeep.flat());
// Pero si hacemos flat(2) removemos todos los niveles de este array
console.log(arrDeep.flat(2));

// const accountMovements = accounts.movements.map((mov = mov));
// console.log(accountMovements);

// const accountMovements = accounts.map(acc => acc.movements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overalBalance = allMovements.reduce((acc, cur) => acc + cur, 0);
// console.log(overalBalance);

//NOTE: Usando chaining podemos hacer todo en un paso
// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, cur) => acc + cur, 0);
// console.log(overalBalance);

// NOTE: como map y flat es muy común que se usen juntos, se creó otro método que reune los 2, llamamo FLATMAP BETTER PERFOMANCE NOTE:
// FLATMAP SOLO VA A 1 LEVEL DEEP, si necesitamos más flat, debemos usar su método y especificar en el argumento cuanto flat necesitamos

const overalBalance = accounts
.flatMap(acc => acc.movements) // Primero mapea y luego hace un flat
.reduce((acc, cur) => acc + cur, 0);
console.log(overalBalance);

*/

//////////////////////////////
//  Video 11-23 Sorting Arrays

/*

// NOTE: Sort mutates the original array NOTE:

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Strings
const owners = ['Jonas', 'Zack', 'Adam', 'Martha'];
console.log(owners.sort()); //
console.log(owners);

// Numbers
console.log(movements);
console.log(movements.sort());
// Sort no ordena los numeros, convierte a string y los ordena como si ordenara strings

// Solucionamos el sort con numeros. El metodo sort pide 2 argumentos
// El primer argumento es el current value. El 2do arg es el next value
// LO IMPORTANTE DE SORT: 2 ARGUMENTOS, PODEMOS COMPARAR LO QUE SEA, INCLUSO LENGTH DE STRINGS
// SE SUMAN O RESTAN A Y B, Y DE ACUERDO AL RESULTADO (QUE PUEDE SER POSITIVO O NEGATIVO SEGUN A SEA MAYO A B O VICEVERSA)
// LOS DATOS SE VA A IR ACOMODANDO

// movements.sort((a, b) => {
  //   if (a > b) return 1;
  //   else if (a < b) return -1;
  // });
// console.log(movements);

// NOTE: forma bien condensado de arrow function para hacer un sort.
// NOTE: A - B ES SORT EN FORMA ASCENDENTE
// NOTE: B - A ES SORT EN FORMA DESCENDENTE
//

// ASCENDENTE
movements.sort((a, b) => a - b);
console.log(movements);
// DESCENDENTE
movements.sort((a, b) => b - a);
console.log(movements);

*/

////////////////////////////////////////////////////////
//  Video 11-24 More Ways of Creating and Filling Arrays

/*

// NOTE: Fill mutates the original array NOTE:

// NOTE: THROWAWAY VARIABLE -> Son las variables que no necesitamos y no vamos a usar, se establecen con _

const arr = [, 1, 2, 3, 4, 5, 6, 7];
console.log(arr);

const x = new Array(7); // da como resultado un array con 7 elementos o espacios vacíos.
console.log(x);
// Entonces ahora podemos usar el metodo fill()
// x.fill(1); // llenamos los 7 espacios con el numero 1, o sea [1,1,1,1,1,1,1]
x.fill(1, 3, 5); // llenar con 1 desde el index 3 al index 5 [empty × 3, 1, 1, empty × 2]
console.log(x);

arr.fill(23, 4, 6); // recordar que arr muta el array original [empty, 1, 2, 3, 23, 23, 6, 7]
console.log(arr);

// NOTE: Array.from
// 1er argumento un objeto con el length, 2do arg una callback function
const y = Array.from({ length: 7 }, () => 1); // [1,1,1,1,1,1,1]
console.log(y);

// como args de la callback function pasamos el current element (en este caso una throwaway variable) y el index
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// Creamos un array con 100 random dice rolls
const randomDiceRolls = Array.from({ length: 100 }, () =>
  Math.ceil(Math.random() * 6)
);
console.log(randomDiceRolls);

// Podemos usar Array.from para convertir un Nodelist en un array (recordar que un Nodelist no tiene los methods que si tiene un array, como por ej reduce)

*/

//////////////////////
// Coding Challenge #4

/*

Julia and Kate are still studying dogs, and this time they are studying if dogs are
eating too much or too little.
Eating too much means the dog's current food portion is larger than the
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10%
above and 10% below the recommended portion (see hint).

Your tasks:

1- Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)

2-Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) 🤓

3- Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').

4- Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!"

5- Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)

6- Log to the console whether there is any dog eating an okay amount of food
(just true or false)

7- Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.)

8- Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects 😉)

Hints:

Use many different tools to solve these challenges, you can use the summary
lecture to choose between them 😉
Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion.

*/

//Test data:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
if (sarahsDog.curFood > sarahsDog.recFood * 1.1) {
  console.log('El perro de Sarah esta comiendo mucho');
} else if (sarahsDog.curFood < sarahsDog.recFood * 0.9) {
  console.log('El perro de Sarah esta comiendo poco');
} else console.log('El perro de Sarah esta comiendo bien');

// 3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

// 4

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6
const dogEatingRight = dog =>
  dog.curFood < dog.recFood * 1.1 && dog.curFood > dog.recFood * 0.9;
console.log(dogs.some(dogEatingRight));

// 7
const arrDogsEatingRight = dogs.filter(dogEatingRight);
console.log(arrDogsEatingRight);

// 8

const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
//
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements, sort = false) {
  // Borramos el contenido de containerMovements antes de empezar. Asi empezamos en limpio
  //NOTE: La diferencia entre textContent e innerHTML es que textContent devuelve el texto, en cambio innerHTML es todo el HTML
  containerMovements.innerHTML = '';

  // Usamos el metodo slice ya que queremos hacer una copia de movements (recordar que sort muta el array)
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__value">${Math.abs(mov)}€</div>
      </div>`;

    // insertAdjacentHTML toma 2 parametros, donde lo ubicamos, y lo que queremos poner. Ver MDN docs para mas info
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
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
  // Display Movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // display summary
  calcDisplaySummary(acc);
};

// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // preventDefault impide que se haga el submit cuando se hace click en el botón
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  // Usamos optional chaining ya que si find no devuelve nada(no encuentra el user) currentAccount seria undefined.
  // Y al buscar algo dentro de undefined saldria error
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcome Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    // Update the UI
    updateUI(currentAccount);
  } else {
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Wrong username-password';
  }

  // Clear input fields
  inputLoginUsername.value = '';
  inputLoginPin.value = '';

  // Clear focus from input fields
  inputLoginUsername.blur(); //NOTE: El metodo blur sirve para sacar el focus de un elemento
  inputLoginPin.blur();
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(receiverAccount);

  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAccount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-Math.abs(amount));
    receiverAccount.movements.push(amount);
    console.log(currentAccount.movements);
    // Update the UI
    updateUI(currentAccount);

    // Clean input fields
  } else console.log('no se puede');

  inputTransferAmount.value = '';
  inputTransferTo.value = '';
});

// CLose account - Find Index
// NOTE: findIndex es muy similar find. La diferencia es que mientras find devueve el primer elemento que satisface nuestra búsqueda
// y findIndex devuelve el indice del primer elemento que cumple con las condiciones de nuestra búsqueda

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);
    console.log(accounts);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = '';
  inputClosePin.value = '';
});

// Request Loan functionality
// El banco solo otorgará un préstamo si existe un depósito de al menos un 10% del valor que se quiere pedir como préstamo
// Ej, para pedir un préstamo de 5000 debería haber un depósito de 500

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  } else console.log('prestamo no otorgado');

  // Clear input field and lose focus
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// Prueba de Array.from NO FORMA PARTE DE LA APP
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
  // NOTE: EXPLICACION: primero usamos array.from para crear un array del resultado del querySelectorAll(que por default es un Nodelist)
  // segundo: usamos un map para pasar por todo el array y convertir el textContent a Number, mientras le sacamos el signo €

  // NOTE: OTRA FORMA DE CONVERTIR UN NODELIST EN ARRAY, ES USANDO EL SPREAD OPERATOR
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2);
});
