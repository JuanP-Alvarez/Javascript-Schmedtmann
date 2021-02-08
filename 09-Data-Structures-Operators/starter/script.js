'use strict';

//////////////////////////////////////
// Video 9-11 Enhanced Object Literals

// Creamos un array que usaremos dentro de un objeto
const weekdays = ['mon', 'tus', 'wed', 'thu', 'fri', 'sat', 'sun'];

//  Creamos un objeto que luego insertaremos dentro de otro objeto
// Tambien usamos el array weekdays para establecer los dias
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // Con ES6 podemos insertar facilmente DRY un objeto
  openingHours,

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // Podemos obviar la palabra function en los metodos
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    // console.log(starterIndex, mainIndex, time, address);
    // console.log(this.order(starterIndex, mainIndex));
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/////////////////////////////////
// Video 9-3 Destructuring Arrays

// Sin destructuring
// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// // Lo mismo pero usando destructuring. El array arr no es cambiado de ninguna manera al hacer destructuring
// const [x, y, z] = arr;
// console.log(x, y, z);

// // Aunque en restaurant.categories hay más elementos, solo toma los primeros dos
// // const [first, second] = restaurant.categories;

// // Usando comas en este caso tomamos el primer y el tercer valor de restaurant.categories
// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // Dar vuelta los valores (switching) sin destructuring
// /*
// let temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);
// */

// // NOTE: Switching usando destructuring
// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// // Usando el metodo del object restaurant
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// const nested = [2, 4, [6, 8]];
// const [j, , j2] = nested;
// console.log(j, j2);

// const [i, , [, i2]] = nested;
// console.log(i, i2);

// // Default values
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

//////////////////////////////////
// Video 9-4 Destructuring Objects

/*

const { name, openingHours, categories } = restaurant;

console.log(name, openingHours, categories);

// Nombrar variables haciendo destructuring de objetos
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// Default values en destructuring de objetos
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

// Tenemos que usar paréntesis para hacer este object destructuring
({ a, b } = obj);
console.log(a, b);

// Nested objects
const {
  fri: { open: openFriday, close: closeFriday },
} = openingHours;
console.log(openFriday, closeFriday);

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

// Llamamos de nuevo al metodo pero sin todos los datos
restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

*/

////////////////////////////
// Video 9-5 Spread Operator
// NOTE: El spread operator funciona en todos los iterables, como arrays, strings, maps, sets,
// Los objetos no son iterables pero el spread desde ES2018 funciona con objetos
// Podemos usar el spread operator para construir nuevos Array o para pasar valores multiples a una funcion, por ej.
// Lo usamos para expandir y separar los iterables y objetos en elementos individuales.

/*

const arr = [7, 8, 9];
const badNewArray = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArray);

const newArray = [1, 2, ...arr]; // el sread se usa como reemplaza a escribir varios valores separados por comas
console.log(newArray);

console.log(...newArray); // Acá sacamos a consola los valores como si fuesen distintas variables, no un array

const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
console.log(newMenu);

// NOTE: Usos del spread
// Copy Array
const mainMenuCopy = [...restaurant.mainMenu];

// Join two arrays together
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);

// const ingredients = [
  //   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Let's make pasta! Ingredient 2?"),
//   prompt("Let's make pasta! Ingredient 3?"),
// ];
// restaurant.orderPasta(...ingredients);

// Si no usaramos el spread seria asi
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// Spread Operator with objects

// Esto basicamente copia el objeto restaurant en newRestaurant, e incluso podemos agregar
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Mangiaculo' };
console.log(newRestaurant);

// Hacemos una copia Fijarse que son distintos, podemos cambiar el valor de uno que no se va a reflejar en el otro
// O sea, estamos copiando el objeto, no la referencia a memoria
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurant.name);
console.log(restaurantCopy.name);

*/

/////////////////////////
// Video 9-5 Rest Pattern
// Mientras el spread operator UNPACKS AN ARRAY, EL REST HACE LO CONTRARIO

/*

// El siguiente es un SPREAD porque está a la DERECHA del =
const arr = [1, 2, ...[3, 4]];
console.log(arr);

// Y el siguiente es un REST, porque está a la IZQUIERDA del =
// Y acá vemos por que se llama REST, porque toma el resto de los elementos del array y los pone en un nuevo array llamado others
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherfood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherfood);

// Spread en Objects
// Aunque en el objeto sat figura ultimo, recordar que los objetos no tienen orden, por lo tanto los que no especificamos
// caen dentro del REST, o sea el resto
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat);
console.log(weekdays);

// Functions;
// la variable numbers sera un array con todos los parametros, gracias a REST
const add = function (...numbers) {
  const total = numbers.reduce((acc, b) => acc + b, 0);
  return total;
};

console.log(add(1, 3, 5, 6, 8, 3, 5, 6));

// Vamos a llamar a la funcion add con la variable x como argumento, pero como la funcion add solo toma valores individuales
// x es un array, usamos spread
const x = [23, 5, 7];
console.log(add(...x));

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');

*/

/////////////////////////////
// Video 9-6 Short Circuiting

// NOTE:
// Logical Operators:
// Use ANY data type
// Return ANY data type
// Do short circuiting, or short circuit evaluation

/*

console.log('----OR----');

console.log(3 || 'Jonas'); // imprime 3 en consola. Devuelve el primer truthy value
console.log('' || 'Jonas'); // el primer value es falsy, asi que devuelve 'Jonas'
console.log(true || 0);
console.log(undefined || null); // como los 2 values son falsy, devuelve el ultimo value (aunque sea falsy, algo tiene que devolver)

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Devuelve el primer truthy value, 'Hello'

// Usando ternary operator
const guest1 = restaurant.numGuest ? restaurant.numGuest : 10;
// Usando Short Circuiting con OR ||
const guest2 = restaurant.numGuest || 10;
console.log(guest1, guest2);

console.log('----AND----');
// The && AND operator short circuits when the first value is falsy. Returns the first falsy value
console.log(0 && 'Jonas'); // Devuelve 0
console.log(7 && 'Jonas'); // Devuelve 'Jonas' Cuando todos los valores son truthy,, devuelve el último valor
console.log('Hello' && 23 && null && 'Jonas');

// Ejemplo usando if
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'milan', 'anana');
}

// mismo ejemplo pero usando el && shortcircuit
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'milan', 'anana');

*/

////////////////////////////////////////
// Video 9-7 Nullish Coalescing Operator

// NOTE: este operator soluciona el problema del shortcircuit || cuando preguntamos si existe una variable de valor 0
// En este caso lo tomará como falso porque 0 es un valor falsy. Nullish operator arregla esto porque solo toma en cuenta
// los null y undefined, por lo tanto una variable de valor 0 no trae problemas
// Ej

/*

const falsyValue = 0;
// Con shortcircuit operator
console.log(falsyValue || 10); // Devuelve 10 ya que aunque la variable existe, tiene valor 0 por lo tanto es falsy

// Con nullish operator
console.log(falsyValue ?? 10); // Devuelve 0 ya que la variable existe, y aunque tenga valor 0 (falsy), nullish solo se fija
// en valores null o undefined

*/

//////////////////////
// Video 9-8 Challenge

// Coding Challenge #1
// We're building a football betting app (soccer for my American friends 😅)!
// Suppose we get data from a web service about a certain game ('game' variable on
// next page). In this challenge we're gonna work with that data.
// Your tasks:
// 1. Create one player array for each team (variables 'players1' and
// 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field
// players. For Bayern Munich (team 1) create one variable ('gk') with the
// goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
// field players
// 3. Create an array 'allPlayers' containing all players of both teams (22
// players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
// new array ('players1Final') containing all the original team1 players plus
// 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called
// 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player
// names (not an array) and prints each of them to the console, along with the
// number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which
// team is more likely to win, without using an if/else statement or the ternary
// operator.
// Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
// Then, call the function again with players from game.scored

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
//   printGoals: function (...players) {
//     for (let i = 0; i < players.length; i++) {
//       console.log(players[i]);
//     }
//     console.log('Score: ', this.score);
//   },
// };

// // 1
// const [players1, players2] = game.players;
// console.log('Team 1 Bayern players: ', players1);
// console.log('Team 2 Dortmund players: ', players2);

// // 2
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// // 3
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 4
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // 5

// const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);

// // 6

// game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// game.printGoals(...game.scored);

// // 7
// console.log('Team most likely to win');
// team1 < team2 && console.log('Team1 is most likely to win');
// team1 > team2 && console.log('Team2 is most likely to win');

/////////////////////////
// Video 9-10 For Of Loop

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// // console.log(menu);

// // reemplazo del for loop, mucho mas simple ya que no tenemos que crear el counter ni hacer i++ etc
// for (const item of menu) console.log(item);

// // Para obtener el indice hacemos
// for (const item of menu.entries()) {
//   console.log(item);
// }
// // menu.entries() crea un array con 2 elementos, index y valor actual

// // una aplicacion de ejemplo de menu.entries()
// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}.`);
// }

///////////////////////////////
// Video 9-12 Optional Chaining

/*

// Feature de ES2020. Sirve para saber si existe una propiedad
// en deeply nested objects. Si no existe tal propiedad devuelve undefined
//  Se comporta igual al Nullish operator, sin tomar como inexistentes valores
//  falsy como 0

// SIN Optional chaining, asi es como se comprueba si existe una propiedad
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
  // Como no existe no imprime en consola
}
if (restaurant.openingHours && restaurant.openingHours.fri) {
  console.log(restaurant.openingHours.fri.open);
  // Como SI existeo imprime en consola
}

// Lo mismo de arriba pero usando optional chaining
console.log(restaurant.openingHours.mon?.open); // no existe, devuelve undefined
console.log(restaurant.openingHours.fri?.open);

//  Real world example
const days = ['mon', 'tus', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  console.log(` day: ${day} ${restaurant.openingHours[day]?.open ?? 'closed'}`);
}

// Optional chaining tambien sirve para llamar metodos de objetos
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// Nullish operator y optional chaining funcional juntos perfectamente

//  Optional chaining con arrays
const users = [
  {
    name: 'Juan',
    email: 'lala@dede.com',
  },
];

console.log(users[2]?.name ?? 'Esa posicion del array no existe');

*/

//////////////////////////////////////////////////////////////
// Video 9-13 Looping Objects Object Keys, Values, and Entries

/*

// PROPERTY NAMES: en los objetos son llamados keys. Key value pair

const properties = Object.keys(openingHours);
// con Object.keys creamos un array cuyos elementos seran cada key del objeto que usamos como argumento
console.log(properties);

// Y como es un array podemos usar cualquiera de sus metodos o propiedades
let openStr = `We are open ${properties.length} days a week: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// PROPERTY VALUES: en los objetos son llamados values, son los valores. Key value pair
const values = Object.values(openingHours);
// console.log(values);

const entries = Object.entries(openingHours);
// Esto nos crea un array, y en cada posicion del array estara el pair key value de openingHours
console.log(entries);

// COmo gracias a Object.entries ahora tenemos un array con todos los pair key values, podemos loopear
// for (const x of entries) {
  //   console.log(`On ${x[0]} we open at ${x[1].open} and close at ${x[1].close}`);
  // }
  
// Lo mismo de arriba pero usando destructuring. ACOSTUMBRARSE A USAR DESTRUCTURING!!!!!
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

*/

//////////////////////
// Coding Challenge #2

// Let's continue with our football betting app! Keep using the 'game' variable from
// before.

// Your1.2.3.4.tasks:

// Loop over the game.scored array and print each player name to the console,
// along with the goal number (Example: "Goal 1: Lewandowski")
// Use a loop to calculate the average odd and log it to the console (We already
// studied how to calculate averages, you can go check if you don't remember)
// Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them
// (except for "draw"). Hint: Note how the odds and the game objects have the
// same property names 😉
// Bonus: Create an object called 'scorers' which contains the names of the
// players who scored as properties, and the number of goals as the value. In this
// game, it will look like this:
// {
// Gnarby: 1,
// Hummels: 1,
// Lewandowski: 2
// }

/*

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
for (const [i, el] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${el}`);
}

// 2 y 3
let oddsAvg = 0;
const oddsEntry = Object.entries(game.odds);
for (const [team, odd] of oddsEntry) {
  const teamStr = team === 'x' ? 'draw' : `victory of ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
  oddsAvg += odd;
}
oddsAvg /= oddsEntry.length;
console.log(`Odds Average: ${oddsAvg}`);

// 4
const scorers = {};
for (const player of game.scored) {
  // if (scorers[player] === undefined) scorers[player] = 1;
  // else scorers[player] += 1;
  // En una linea usando optional chaining
  scorers?.[player] ? (scorers[player] += 1) : (scorers[player] = 1);
}
console.log(scorers);

*/

//////////////////
// Video 9-15 SETS

// NOTE: Un set es una colección de datos únicos, no hay datos repetidos. Los sets son iterables. Aunque el orden es irrelevante, no es como un array
// En los SETS NO HAY INDICES!

/*

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Rissoto',
  'Pasta',
  'Pizza',
]);

console.log(ordersSet);

console.log(new Set('Jonas'));

console.log(ordersSet.size); // Similar a length de los arrays
console.log(ordersSet.has('Pizza')); // Similar a includes de los arrays. Devuelve boolean

ordersSet.add('Garlic Bread'); // Añadimos al set
ordersSet.delete('Pizza'); // Borramos una entrada del set
console.log(ordersSet);

// ordersSet.clear(); // Borra todos los elementos del set

for (const order of ordersSet) {
  console.log(order);
}

// NOTE: Main Use case of Sets is remove repeated values from arrays
// Real world usage of sets
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffUnique = new Set(staff); // Pasamos de array a set
// console.log(staffUniobjectque);

// NOTE: One liner paraobject pasar un array a set y otra vez a array para eliminar duplicados

const staffUnique = [...new Set(staff)];
console.log(staffUnique);

*/

///////////////////////////////
// Video 9-16 Maps Fundamentals

/*

// Un map es similar a un objeto ya que tiene un key value pair. COn la diferencia que en los maps
// el key puede ser cualquier cosa, un array, un numero, un string, etc. Mientras que en los objetos el key es un string

const rest = new Map(); // empty map
rest.set('name', 'Classico Italiano'); // key name y value
rest.set(1, 'Firenze, Italy'); // En un map, el key puede ser number, string, array,etc
console.log(rest.set(2, 'Lisbon, Portugal')); // el set method devuelve el nuevo set

// Como set devuelve el nuevo map, podemos concatenar sets
rest
.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
.set('open', 11)
.set('close', 23)
.set(true, 'We are open :D')
.set(false, 'We are closed :(');

// Para leer data de un map, usamos el get method, y pasamos el key
console.log(rest.get('name'));
console.log(rest.get(true));

const time = 10;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// Para saber si un map contiene determinada key, usamos el method has
console.log(rest.has('categories'));

// Usamos el method delete para borrar
rest.delete('name');
console.log(rest);

// Method size para el tamanio
console.log(rest.size);

// Y para borrar todos los elementos del map usamos clear
// rest.clear();
// console.log(rest);

// Objetos como keys en un map
// para poder usar arrays y objects como keys y poder usar get en este key primero tendremos que asignarlo a una variable
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest.get(arr));

// Ejemplo con El DOM
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);

*/

////////////////////////////
// Video 9-17 Map Iterations
// How to populate a map without using the set method

/*

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correctoooo'],
  [false, 'Try again!'],
]);
console.log(question);

//NOTE: Convert object to map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz App
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const answer = Number(prompt('Your answer is?'));
const answer = 3;
console.log(answer);
console.log(question.get(question.get('correct') === answer));

// Convert map to array
console.log([...question]);
// console.log([...question.keys()]);  El array va a tener los keys
console.log([...question.values()]); // El array va a tener los values

*/

//////////////////////
// Coding Challenge #3

// Let's continue with our football betting app! This time, we have a map called
// 'gameEvents' (see below) with a log of the events that happened during the
// game. The values are the events themselves, and the keys are the minutes in which
// each event happened (a football game has 90 minutes plus some extra time).

// Your tasks:

// 1. Create an array 'events' of the different game events that happened (no
// duplicates)

// 2. After the game has finished, is was found that the yellow card from minute 64
// was unfair. So remove this event from the game events log.

// 3. Compute and log the following string to the console: "An event happened, on
// average, every 9 minutes" (keep in mind that a game has 90 minutes)

// 4. Loop over 'gameEvents' and log each element to the console, marking
// whether it's in the first half or second half (after 45 min) of the game, like this:
// ⚽
// [FIRST HALF] 17: GOAL

/*

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

//  1
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2
gameEvents.delete(64);
console.log(gameEvents);

// 3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// 4

for (const [key, value] of gameEvents) {
  console.log(
    `${key < 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${key}: ${value}`
  );
}

*/

///////////////////////////////////////////
// VIdeo 9-20 Working with Strings - Part 1

/*

const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane[0]); // Posicion 0 del string = 'A'
console.log('8737'[0]); // 8

console.log(airline.length);
console.log('8737'.length);

// STRING METHODS
console.log(airline.indexOf('r')); // devuelve indice letra 'r' primera
console.log(airline.lastIndexOf('r')); // devuelve indice letra 'r' ultima
console.log(airline.indexOf('Portugal')); // Es case sensitive

// SLICE
// NOTE: Es imposible mutar strings, porque son primitives. Por lo que estos métodos siempre devuelven un nuevo string
// Para poder usar este nuevo string, entonces, debemos guardarlo en una nueva variable

console.log(airline.slice(4));
console.log(airline); // El string no cambió.
console.log(airline.slice(4, 7)); // El slice va desde el index 4 hasta el 7(NO SE INCLUYE EL INDICE 7 EN EL SLICE)
// O sea que este slice devuelve indice 4, 5 y 6 = 'Air'

console.log(airline.slice(0, airline.indexOf(' '))); // Primer palabra
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Ultima palabra. + 1 para no incluir el espacio

console.log(airline.slice(-2)); // Ultimas 2 letras
console.log(airline.slice(1, -1)); // Nop incluimos la primer y ultima letra

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const letter = seat.slice(-1).toUpperCase();
  
  return letter === 'B' || letter === 'E' ? 'Middle Seat' : 'Not Middle Seat';
};

console.log(checkMiddleSeat('11B'));
console.log(checkMiddleSeat('23C'));
console.log(checkMiddleSeat('3E'));

*/

///////////////////////////////////////////
// VIdeo 9-22 Working with Strings - Part 2

/*

const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase()); // todo minusculas
console.log(airline.toUpperCase()); // todo mayusculas
console.log('Juan'.toUpperCase());

// Fix capitalization in name
// Mi solucion
const passenger = 'jUanCiTO';
console.log(passenger[0].toUpperCase() + passenger.slice(1).toLowerCase());

// Solucion del curso
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
  console.log(passengerCorrect);

  // Ejercicio, hacerlo funcion
  const fixCapitalization = passengerName => {
    if (!passengerName || typeof passengerName !== 'string')
    return 'pasame un nombre che';
  return passengerName[0].toUpperCase() + passengerName.slice(1).toLowerCase();
};

console.log(fixCapitalization(1));
console.log(fixCapitalization([1, 2]));
console.log(fixCapitalization('cHe guEVAra'));
console.log(fixCapitalization(''));
console.log(fixCapitalization(' '));

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim(); // trim saca los whitespaces
// console.log(trimmedEmail);

// todo junto en un paso
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing
const priceGB = '288,97€';
const priceUS = priceGB.replace('€', '$').replace(',', '.');
console.log(priceUS);

const announcement =
'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate')); // replace solo reemplaza 1
console.log(announcement.replaceAll('door', 'gate')); // replace all reemplaza todos

// Replace usando RegEx
console.log(announcement.replace(/door/g, 'gate')); // el flag g indica que queremos reemplazar todos

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320')); // devuelve true or false
console.log(plane.includes('Boeing')); // devuelve true or false
console.log(plane.startsWith('Air')); // devuelve true or false

if (plane.startsWith('Airbus') && plane.endsWith('neo'))
console.log('This plane belongs to the NEW Airbus Family');
else console.log("This plane doesn't belongs to the Airbus Family");

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase(); // Siempre conviene convertir los strings a lowercase para trabajar con ellos y hacer comparaciones etc
  if (baggage.includes('knife') || baggage.includes('gun'))
  console.log('you cant board');
  else console.log('Welcome aboard');
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('I have some socks and a camera');
checkBaggage('I have some snacks and a gun for protection');

*/

///////////////////////////////////////////
// VIdeo 9-23 Working with Strings - Part 3

/*

// Split

console.log('a+very+nice+string'.split('+')); // Dividimos usando el +, el resultado es un array
console.log('Juan Pablo Alvarez'.split(' '));

const [firstName, lastName] = 'Juan Alvarez'.split(' ');

// Join method
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

// MI SOLUCION
// const capitalizeName = function (name) {
  //   const nameArr = [];
  //   for (const word of name.split(' ')) {
    //     nameArr.push(word[0].toUpperCase() + word.slice(1));
    //   }
    //   return nameArr.join(' ');
    // };

// Solucion del curso
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
  }
  return namesUpper.join(' ');
};

console.log(capitalizeName('jessica ann smith davis'));
console.log(capitalizeName('andrea croce'));
console.log(capitalizeName('juan pablo alvarez'));

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+')); // Completamos con + hasta que el length del string sea 25
console.log('Juan'.padStart(25, '+')); // Completamos con + hasta que el length del string sea 25

console.log(message.padStart(25, '+').padEnd(30, '+')); // Y Agregamos 5 + con padEnd

const maskCreditCard = function (number) {
  const str = number + ''; // haciendo esto convertimos el numero a string
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(4567294730585610));
console.log(maskCreditCard('2936769846285640'));
console.log(maskCreditCard('202240'));

// Repeat

const messageRepeat = 'Bad Weather... All Departures Delayed...\n';
console.log(messageRepeat.repeat(5));

const planesInLine = function (n) {
  return `There are ${n} planes in line ${'✈️ '.repeat(n)}`;
};

console.log(planesInLine(5));
console.log(planesInLine(3));
console.log(planesInLine(15));

*/

///////////////////////////////////////////
// Coding Challenge #4

// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase.
// The input will come from a textarea inserted into the DOM (see code below to
// insert the elements), and conversion will happen when the button is pressed.
// Test data (pasted to textarea, including spaces):

/*

underscore_case 
 first_name 
Some_Variable  
  calculate_AGE 
delayed_departure

*/

// Should produce this output (5 separate console.log outputs):
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅
// Hints:
// § Remember which character defines a new line in the textarea 😉
// § The solution only needs to work for a variable made out of 2 words, like a_b
// § Start without worrying about the ✅. Tackle that only after you have the variable
// name conversion working 😉
// § This challenge is difficult on purpose, so start watching the solution in case
// you're stuck. Then pause and continue!
// Afterwards, test with your own test data!

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const btn = document.querySelector('button');

// MI SOLUCION

// btn.addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   console.log(toCamelCase(text));
// });
// function toCamelCase(str) {
//   if (!str.includes('_')) return 'Not underscore_case';

//   const splitted = str.split('\n');
//   let i = 1;
//   for (const underscore of splitted) {
//     const word = underscore.trim().toLowerCase().split('_');
//     word[1] = word[1].slice(0, 1).toUpperCase() + word[1].slice(1);
//     console.log(word.join('').padEnd(20, ' ') + '✅'.repeat(i));
//     i++;
//   }

//   i = 1;
// }

// Solucion del curso

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  console.log(text);
  const rows = text.split('\n');
  console.log(rows);
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});
