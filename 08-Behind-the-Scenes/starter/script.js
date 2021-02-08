'use strict';

const a = 'jonas';
first();

function first() {
  const b = 'hello';
  second();
  function second() {
    const c = 'hi';
    third();
  }
}

function third() {
  const d = 'hey';
  console.log(a, d);
  // no podemos acceder a b ni c desde acá
}

// Video 8-7

function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName);

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const firstName = 'Andrea';
      const str = `Oh, you're a millenial, ${firstName}`; // como no hace look up, firstName = Andrea
      // primero busca la variable en el bloque, si no la encuentra va subiendo en scope, (look up)
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      output = 'output variable changed inside if block'; // ningun problema, se puede hacer y cambia el valor
    }
    console.log(output);
    // add(2, 3); // Si usamos strict mode, desde ES6 las funciones son block scoped
    // console.log(str); // const y let son block scoped (solo se pueden acceder dentro de su bloque)
    console.log(millenial); // var es function scoped
  }

  printAge();
  return age;
}

const firstName = 'Juan';
calcAge(1982);

////////////
// Video 8-9

console.log(me);
// console.log(job);
// console.log(year);

var me = 'Juan';
let job = 'student';
const year = '1982';

// Functions
// Se pueden usar function declarations antes de declararlas
console.log(addDecl(2, 3));

// No se pueden usar arrow functions ni functions expressions antes de declararlas
// console.log(addExpr(3, 6));
// console.log(addArrow(1, 1));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

//////////
// Example

// Si el numero de productos no es cero, llamamos a la funcion
// Pero como averiguamos el valor de la variable antes de declararla, su valor real es undefined, que también es
// un valor falsy, así que está mal, BUG!!!
// Una variable declarada con var devuelve undefined si la usamos antes de declararla
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

// CONCLUSIONES:
// - No usar var, usar const siempre que se pueda, let cuando el valor cambia, pero siempre tratar
//     de usar const
// - Declarar las variables al tope( en la parte de arriba o al principio) de cada scope o block
// - Declarar las funciones primero siempre, y luego usarlas, incluso si usamos function declarations

///////////
// Usar var declara una propiedad en el window object, let y const no
var x = 1;
let y = 2;
const z = 3;
console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false

//////////////////
// Video 8-10 y 11

// keyword this
// this es creado en cada execution context (cada función)
// this apunta al owner (dueño) de la función

// 1
// this se refiere al objeto desde el que es llamado el metodo
const juancito = {
  year: 1982,
  calcAge: function (actual) {
    console.log('this in a method', actual - this.year);
  },
};
juancito.calcAge(2037);

// 2
// Si usamos this desde una funcion, this apuntará al window object,
//    pero si se usa el strict mode, this será undefined
console.log(this); // window object

function lala() {
  console.log(this); // undefined
}
lala();
// 3
// Arrow functions no reciben this. Si nos referimos a this dentro de un arrow function, this
// apuntará al this de su parent function o global. Se llama lexical this keyword

const calcAgeArrow = birthYear => {
  const age = 2037 - birthYear;
  console.log('arrow function this', this);
};
calcAgeArrow();
// 4
// En un event listener, this se refiere al elemento DOM

/////////////
// Video 8-12

const andrea = {
  firstName: 'Andrea',
  year: 1987,
  calcAge: function () {
    console.log('this in a method', 2037 - this.year);

    // const isMillenial = function() { // si usamos function expressions o declarations
    // this será undefined.

    //NOTE: this dentro de funciones toma el valor de undefined NOTE:

    const isMillenial = () => {
      // al usar arrow function this se refiere al parent
      console.log(this);

      console.log('millenial?', this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => {
    console.log(`Hey ${this.firstName}`);
  },
};

// andrea.greet();
andrea.calcAge();

////////////////////
// Arguments keyword

// NOTE: ARROW FUNCTIONS TAMPOCO RECIBEN arguments keyword NOTE:
// Aunque ES6 trajo formas más modernas que reemplazan este keyword

function addDecl2(a, b) {
  return a + b;
}

const addExpr2 = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr2(2, 5);

const addArrow2 = (a, b) => {
  // console.log(arguments); // arrow functions no reciben este keyword
  a + b;
};
addArrow2(2, 5, 8);

/////////////
// Video 8-13

let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const yo = {
  name: 'Juan',
  age: 38,
};

const friend = yo;

friend.age = 27;

console.log('friend: ', friend);
console.log('yo: ', yo);

// NOTE: Primitives: Number, String, Boolean, Undefined, Null, Symbol, BigInt <=  Primitive Types NOTE:
// NOTE: Objects: Object Literal, Arrays, Functions... and many more... <= Reference Types NOTE:
// NOTE: Solo los primitives no se pueden cambiar de valor con const
// Cuando copiamos un objeto no copiamos el objeto en si sino la referencia a la memoria donde se
// encuentra alojado el objeto y sus propiedades, por lo tanto cuando cambiamos un valor de un
// objeto cambiamos el valor de todos los objetos que están guardados
// cuando copiamos un objeto, lo que copiamos es la referencia en memoria al HEAP (donde se encuentra alojado
// los valores del objeto). En el stack solo figura la referencia a la memoria. VER VIDEO 8-13 MAS CLARO
// podemos declarar con cost un objeto y cambiarlo, ya que no cambiamos su valor en el stack,
// ya que el valor del objeto se encuentra en el HEAP, podemos cambiar sus valores y respetar el const

/////////////
// Video 8-14

let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName);
console.log(oldLastName);

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage: ', jessica.lastName);
console.log('After marriage: ', marriedJessica.lastName);

// Una manera para copiar el objeto, (no su referencia)

const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2); // Acá si copiamos el objeto - Shallow Copy, no es deep clone

jessicaCopy.lastName = 'Davis';
console.log('Before marriage: ', jessica2.lastName);
console.log('After marriage: ', jessicaCopy.lastName);
// console.log(jessicaCopy);
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('Peter');

// COmo hicimos un shallow copy, el array dentro del objeto no se copio, solo hacemos referencia
// Así que al cambiar un valor del array dentro del objeto, cambian los 2 arrays de los 2 objetos
console.log(jessicaCopy);
console.log(jessica2);
