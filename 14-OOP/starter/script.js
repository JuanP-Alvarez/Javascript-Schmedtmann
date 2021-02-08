'use strict';

//////////////////////////
//////   LECTURES   //////
//////////////////////////

///////////////////////////////////////////////////
// Video 14 - 3 What is Object-Oriented Programming

/*
Principios de OOP: 
Abstraction : escondemos cosas para facilitar el uso. Ignoramos o escodemos detalles que no importan, low level details que no importan

Encapsulation: hacemos privadas propiedades y metodos del objeto que no queremos que se puedan modificar ni acceder por fuera de la clase.
Exponemos metodos y propiedades que queremos

Inheritance: Parent class y child class que hereda metodos y propiedades para mantenerse DRY

Polymorphism: (many shapes) Child classes inherits from parent class, but each one of the child classes has a shape, or function
eg: parent child is User, childs are: author and admin and each one has a different login method. Child classes can overwrite inherited 
properties and methods
*/

/////////////////////////////////
// Video 14 - 4 OOP in JavaScript

/*
Prototypal inheritance: the prototype contains methods (behavior) that are accesible to all object linked to that prototype
Este behavior o funcionamiento es delegado al objeto prototipo
Ya venimos usando prototipos, como el metodo map -> Array.prototype.map (ver MDN). 
Array.prototype es el prototipo de todos los arrays que creamos en JSON. Por eso todos los arrays tienen acceso a Map, por ej.
si creamos un array de nombre num, se puede hacer num.map. En realidad num delega el metodo map a su prototipo

Como cremos prototypes:
- Constructor functions: Asi es como estan implementados objetos como arrays, maps, sets.

- ES6 Classes: forma moderna. NO ES "CLASSICAL OOP" -> Es prototypal inheritance. Es "syntax sugar" sobre los constructor functions
Es realmente una capa de abstraccion sobre los constructor functions

- Object.create(): forma mas facil de linkear un objeto a un prototipo. No es muy usado
*/

//////////////////////////////////////////////////////////
// Video 14 - 5 Constructor Functions and the new Operator

/*

// CONSTRUCTOR FUNCTION - por convención, el objeto empieza con mayúscula. Podemos usar function expressions or declarations
// pero arrow functions no funcionan aquí, al no tener el keyword this

const Person = function (firstName, birthYear) {
  console.log(this); // this is the empty object. Ver paso 2
  // Entonces vamos agregado propiedades, que formarán parte de lo que se retorne (return) al final. Ver paso 4

  this.firstName = firstName; // INSTANCE PROPERTY
  this.birthYear = birthYear; // INSTANCE PROPERTY

  //NOTE: A MODO DE EJEMPLO NOMAS, NUNCA SE DEBEN AGREGAR METODOS A UNA CONSTRUCTOR FUNCTION- BAD PRACTICE!!!
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

// NOTE: La diferencia entre una funcion y una constructor function es que llamamos a la constructor function usando new
const jonas = new Person('Jonas', 1991);
console.log(jonas);

//NOTE: Que pasa cuando creamos un objeto con new - 4 pasos
// 1- Un nuevo objeto (vacio, empty) es creado
// 2- function is called, el this keyword va a apuntar a este nuevo objeto vacio creado
// 3- Este objeto es linkeado al prototype
// 4- function automatically return the object

const matilda = new Person('Matilda', 1966);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

// chequeamos si jonas es una instancia (objeto creado por) de Person
console.log(jonas instanceof Person); // true
const jay = 'Jay';
console.log(jay instanceof Person); // false

//////////////////////////
// Video 14 - 6 Prototypes

// Prototypes
// Cada funcion de JS (incluidas las constructor functions) tiene una propiedad llamada prototype.
// NOTE: Por lo tanto, cada objeto creado con una constructor function tendrá acceso a los metodos y propiedades que definamos
//en el prototype de esa constructor function.
// NOTE: O sea que si queremos crear un método para un objeto creado con una constructor function, lo creamos en el Person.prototype
// (o como se llame el constructor en cuestion, puede ser Verdura.prototype) y luego el objeto podrá usarlo, gracias al PROTOTYPAL INHERITANCE
// Recordar que definir un metodo en cada objeto es malo para el performance y por lo tanto bad practice, por eso usamos prototypal inheritance

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge(); // Primero se tiene que definir el método, para luego poder usarlo

//NOTE: Un objeto tiene acceso a los métodos y propiedades de sus prototipo, cada objeto tiene una propiedad llamada __proto__
console.log(jonas.__proto__); // esta propiedad proviene del new operator. NOTE: Ver paso 3
console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species); // esta propiedad (species) es heredada del prototype. No forma para del objeto jonas o matilda
console.log(jonas.hasOwnProperty('firstName')); // true. Pertenece al objeto
console.log(jonas.hasOwnProperty('species')); // false. Es del prototype, y aunque tenga acceso a la propiedad, no forma parte del objeto

//////////////////////////////////////////////////////////////
// Video 14 - 7 Prototypal Inheritance and The Prototype Chain

// Slides

// Prototype Chain es muy similar en funcionamiento al scope chain. En el scope chain si no encontramos una variable va a ir hacia arriba
// en el scope buscando la variable. En el prototype chain lo mismo, va a ir hacia arriba buscando propiedades y metodos

//////////////////////////////////////////////////////////
// Video 14 - 8 Prototypal Inheritance on Built-In Objects

console.log(jonas.__proto__);

// Object.prototype (top of the prototype chain)
console.log(jonas.__proto__.__proto__); // Prototype Chain

console.log(jonas.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor);

const arr = [3, 6, 3, 8, 9, 3, 4, 6];
console.log(arr.__proto__); // aparecen todos los metodos que ya conocemos y mas. flat, map, filter, concat, forEach etc,etc
console.log(arr.__proto__ === Array.prototype); // true

// Tambien podemos añadir un metodo nuevo al prototype, y por lo tanto todos los arrays lo heredaran
// NOTE:  BAD PRACTICE!!! SOLO COMO MUESTRA. NO HACER ESTO
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => x + 1);

*/

///////////////////////////////////
// Video 14 - 9 Coding Challenge #1

/*

Your tasks:

1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h

2. Implement an 'accelerate' method that will increase the car's speed by 10,
and log the new speed to the console

3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console

4. Create 2 'Car' objects and experiment with calling 'accelerate' and
'brake' multiple times on each of them

Test data:
Data car 1: 'BMW' going at 120 km/h
Data car 2: 'Mercedes' going at 95 km/h


// 1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// 2
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is now going to ${this.speed} km/h`);
};

// 3
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is now going to ${this.speed} km/h`);
};

// 4
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
bmw.accelerate();
mercedes.accelerate();
bmw.brake();
mercedes.brake();
bmw.accelerate();
bmw.brake();

*/

////////////////////////////
// Video 14 - 10 ES6 Classes

/*

// NOTE: recordar, esto es Syntactic sugar.
// De esta manera no tenemos que pensar en prototypal inheritance.
// Podemos agregar la función sin tener que escribir PersonCl.prototype.calcAge = function...
// De cualquier manera, las funciones se siguien agregando al prototype property.
// NOTE: No cambia nada de fondo, sigue siendo Syntactic sugar

// Class Expression
// const PersonCl = class {}

// Class Declaration
class PersonCL {
  constructor(fullName, birthYear) {
    this.fullName = fullName; // cuando seteamos el fullName lo que estamos haciendo es llamar al setter
    this.birthYear = birthYear;
  }

  //NOTE: Instance methods. Todos los que llamen al constructor para crear la clase van a heredar estos metodos
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hello! ${this.fullName}`);
  }
  get age() {
    return 2037 - this.birthYear;
  }
  // Prestar atención que fullName ya existe. Estamos haciendo DATA VALIDATION
  //NOTE: Estamos creando un setter para una propiedad que ya existe
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    // tenemos que usar _fullName porque sino error ya que fullName ya existe. ES UNA CONVENCION. NO ES OBLIGATORIO EL _ PODRIA SER OTRA COSA
    else alert(`${name} is not a full name`);
  }
  // Este es el patrón que debemos seguir cuando queremos setear una propiedad que ya existe, ya que el valor de fullName se encuentra
  // en _fullName, y para no tener que escribir jonas._fullName hacemos esto
  get fullName() {
    return this._fullName; // entonces con esto hacemos que cuando pidamos por ej jonas.fullName nos devuelva el valor de _fullName
  }
  // creamos un static method. NOTE: este metodo no se hereda. por lo tanto solo pertenece a PersonCl.hey
  static hey() {
    console.log('Hey There 🖐️');
    console.log(this);
  }
}

const jessica = new PersonCL('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();

PersonCL.hey(); // STATIC METHOD

console.log('sacamos por consola el get age', jessica.age);

console.log(jessica.__proto__ === PersonCL.prototype); // true

// Lo siguiente es exactamente igual al metodo greet que creamos en class PersonCl
// PersonCL.prototype.greet = function () {
//   console.log(`Hello! ${this.firstName}`);
// };

jessica.greet();

const walter = new PersonCL('Walter White', 1995);

// 1 - NOTE: classes are not hoisted! Even if they are created as function declarations.
// Primero se debe crear la clase, y recien ahí se pueden usar
// 2 -  Classes are first class citizens -> Podemos pasarla a funciones y pueden ser el return de otra función
// 3 - Classes are executed ALWAYS in strict mode, even if stric mode is not activated

*/

////////////////////////////////////
// Video 14 - 11 Setters and Getters

/*

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    // setter necesita SIEMPRE un parámetro
    this.movements.push(mov);
  },
};

console.log(account.latest); // no llamamos al metodo, pero sin embargo se ejecuta y nos da el valor
account.latest = 50; // NO ES UN METODO, es como si fuese una propiedad, por lo tanto le tenemos que asignar un valor
// este valor pasaria a ser el parámetro dentro del setter

console.log(account.latest);
console.log(account.movements);

// Classes also have getters and setters. VER MAS ARRIBA

*/

///////////////////////////////
// Video 14 - 12 Static Methods

// Los static methods son metodos que estan atados a ciertos constructors
// Ej.
// Array.from()
// Number.parseFloat()
// Lo que quiere decir es que un numero no tiene el metodo parseFloat, para usarlo debemos llamar a Number.parseFloat

// Ver ejemplo mas arriba, en el constructor PersonCl creamos un static method llamado hey()

//////////////////////////////
// Video 14 - 13 Object.create

/*

const PersonProto = {
  // Esto es todo lo que queremos que hereden los objetos creados
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven);
console.log(steven.__proto__); // es la funcion calcAge()
console.log(steven.__proto__ === PersonProto); // true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1980);
sarah.calcAge();
console.log(sarah);

*/

////////////////////////////////////
// Video 14 - 14 Coding Challenge #2

/*

Your tasks:

1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')

2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
  by 1.6)
  
  3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
    converts it to km/h before storing the value, by multiplying the input by 1.6)
    
    4. Create a new car and experiment with the 'accelerate' and 'brake'
    methods, and with the getter and setter.
    
    Test data:
    Data car 1: 'Ford' going at 120 km/h
    
    
    class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going to ${this.speed} km/h`);
  }
  
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going to ${this.speed} km/h`);
  }
  
  get speedUs() {
    return `${this.make} is going to ${this.speed / 1.6} mi/h`;
  }
  
  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}

const bmw = new CarCl('BMW', 120);
const mercedes = new CarCl('Mercedes', 95);
const ford = new CarCl('Ford', 120);
console.log(ford.speedUs);

bmw.brake();
bmw.brake();
bmw.accelerate();

bmw.speedUs = 60;
console.log(bmw.speed);
ford.brake();
ford.brake();
console.log(ford.speedUs);

*/

//////////////////////////////////////////////////////////////////
// Video 14 - 15 Inheritance Between Classes Constructor Functions

/*

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // Recordar que this es un objeto vacio, por lo tanto hay que hacer un bind o call
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// NOTE: Linking prototypes. Con esto hacemos que Student.prototype herede de Person.prototype
// Esto es importante para definir el prototype chain
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);

mike.introduce();
mike.calcAge(); // Al establecer un prototype chain correcto podemos usar metodos de Person, calcAge por ej.

console.log(mike.__proto__); // Student prototype
console.log(mike.__proto__.__proto__); // person prototype.

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true

Student.prototype.constructor = Student;

console.dir(Student.prototype.constructor);

*/

//////////////////////
// Coding Challenge #3

/*

Your tasks:

1. Use a constructor function to implement an Electric Car (called 'EV') as a child
"class" of 'Car'. Besides a make and current speed, the 'EV' also has the
current battery charge in % ('charge' property)

2. Implement a 'chargeBattery' method which takes an argument
'chargeTo' and sets the battery charge to 'chargeTo'

3. Implement an 'accelerate' method that will increase the car's speed by 20,
and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
km/h, with a charge of 22%'

4. Create an electric car object and experiment with calling 'accelerate',
'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
you 'accelerate'! Hint: Review the definiton of polymorphism 😉

Test data:
Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%


const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is now going to ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is now going to ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`Battery charged to ${chargeTo}%`);
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
console.log(tesla);
tesla.accelerate(); // Even if Car class has the same accelerate method name, we are calling here the EV method, because of prototype chain
tesla.chargeBattery(90);
tesla.accelerate();
tesla.brake();

*/

////////////////////////////////////////////////////////
// Video 14 - 17 Inheritance Between Classes ES6 Classes

/*

class PersonCL {
  constructor(fullName, birthYear) {
    this.fullName = fullName; // cuando seteamos el fullName lo que estamos haciendo es llamar al setter
    this.birthYear = birthYear;
  }

  //NOTE: Instance methods. Todos los que llamen al constructor para crear la clase van a heredar estos metodos
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hello! ${this.fullName}`);
  }
  get age() {
    return 2037 - this.birthYear;
  }
  // Prestar atención que fullName ya existe. Estamos haciendo DATA VALIDATION
  //NOTE: Estamos creando un setter para una propiedad que ya existe
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    // tenemos que usar _fullName porque sino error ya que fullName ya existe. ES UNA CONVENCION. NO ES OBLIGATORIO EL _ PODRIA SER OTRA COSA
    else alert(`${name} is not a full name`);
  }
  // Este es el patrón que debemos seguir cuando queremos setear una propiedad que ya existe, ya que el valor de fullName se encuentra
  // en _fullName, y para no tener que escribir jonas._fullName hacemos esto
  get fullName() {
    return this._fullName; // entonces con esto hacemos que cuando pidamos por ej jonas.fullName nos devuelva el valor de _fullName
  }
  // creamos un static method. NOTE: este metodo no se hereda. por lo tanto solo pertenece a PersonCl.hey
  static hey() {
    console.log('Hey There 🖐️');
    console.log(this);
  }
}

// NOTE: con extends linkeamos los prototypes "behind the scenes" (como haciamos con Object.create)
class StudentCl extends PersonCL {
  constructor(fullName, birthYear, course) {
    // No tenemos que hacer Person.call, hacemos todo con el keyword super
    // NOTE: The call to the super always need to happen first!
    super(fullName, birthYear);
    this.course = course;
  }
  introduce = function () {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  };

  calcAge() {
    // prototype chain. Aplica este metodo aunque haya otro en la class parent
    console.log(`I'm ${2037 - this.birthYear}`);
  }
}

const martha = new StudentCl(
  'Martha Jones',
  2012,
  'Reparacion de calzado Avanzado III'
);

martha.introduce();
martha.calcAge();

*/

//////////////////////////////////////////////////////////
// Video 14 - 18 Inheritance Between Classes Object.create

/*

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const steven = Object.create(PersonProto);

console.log(steven);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  // Llamamos al metodo init con un call para bindear el keyword this
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay Simpson', 2000, 'Croterismo Esotérico Nivel X Intermedio');
console.log(jay);
jay.introduce();
jay.calcAge();

*/

//////////////////////////////////////
// Video 14 - 19 Another Class Example
// Video 14 - 20 Encapsulation Protected Properties and Methods

/*

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    // protected property (_movements). Es una convencion, realmente la propiedad no está protegida.
    // pero con _ estamos diciendo que no hay que modificarla por fuera de los metodos ya establecidos
    this._movements = [];
    this.locale = navigator.language;
    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public Interface of our object

  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
    return this; // esto nos posibilita encadenar (chaining) methods
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  _approveLoad(val) {
    return true;
  }

  requestLoad(val) {
    if (this._approveLoad(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1._movements.push(250) // Todavia podemos acceder así, pero como pusimos _ delante, no es lo indicado, convencion
// acc1._movements.push(-140)

acc1.deposit(250);
acc1.withdraw(140);

acc1.requestLoad(1000);

console.log(acc1);
console.log(acc1.pin);

console.log(acc1.getMovements());

*/

////////////////////////////////////////////////////////////////////////
// Video 14 - 21. Encapsulation Private Class Fields and Methods - TRULY

// NOTE: est está en STAGE 3. Todavía no es parte de JS pero es muy probable que en un futuro si

/////////////////////////////////
// Video 14 - 22 Chaining Methods

// Chaining

// acc1.deposit(300).deposit(500).withdraw(35).requestLoad(25000).withdraw(4000);
// console.log(acc1.getMovements());

//////////////////////
// Coding Challenge #4

/*

Your tasks:

1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
child class of the 'CarCl' class

2. Make the 'charge' property private

3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl'
class. Then experiment with chaining!

Test data:
Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%

*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is now going to ${this.speed} km/h`);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is now going to ${this.speed} km/h`);
    return this;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`Battery charged to ${chargeTo}%`);
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}
const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);

rivian
  .brake()
  .accelerate()
  .chargeBattery(50)
  .brake()
  .brake()
  .chargeBattery(70)
  .accelerate();

console.log(rivian);
