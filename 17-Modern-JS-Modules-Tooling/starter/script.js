//NOTE: Todos los modules se ejecutan en strict mode by default.
// NOTE: para establecer un archivo js como module tenemos que agregar type="module" en el tag <script></script> en el HTML
// EG.: <script type="module" defer src="script.js"></script>

// Importing module
import {
  addToCart,
  totalPrice as price, // cambiamos el nombre de totalPrice a price
  tq,
} from './shoppingCart.js'; // El codigo de shoppingCart.js se ejecuta primero
addToCart('bread', 5);
console.log(price, tq);
console.log('Importing module');

// Tambien podemos importar todo junto con *¨( y por convencion el nombre que le damos empieza con mayuscula)
// ShoppingCart pasa a ser un objeto
import * as ShoppingCart from './shoppingCart.js';

ShoppingCart.addToCart('bread', 5);
ShoppingCart.addToCart('pizza', 2);
ShoppingCart.addToCart('apples', 4);

console.log(ShoppingCart.totalPrice);
console.log(ShoppingCart.cart);

// NOTE: Los imports no son copias de los exports! Son live connections. Lo que se importa y modifica en un modulo tambien se modifica
// en el modulo que exporto ese elemento
// O sea import y exports apuntan al mismo lugar en memoria, por lo tanto modificar un valor importado modifica el original

//////////////////////////////////
// Video 17 - 6 The Module Pattern

/*

// Para que el return de un IIFE no se pierda, guardamos el IIFE en una variable.
// O sea que la variable va a tomar el valor que retorna el IIFE
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;
  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };
  
  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };
  
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('calabaza', 4);
ShoppingCart2.addToCart('pizza', 3);

*/

///////////////////////////////////
// Video 17 - 9 Introduction to NPM

// Installed Lodash with npm, now we are going to import cloneDeep
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es'; // shortcut en lugar de poner la ruta como arriba, solo ponemos el nombre de la libreria

// Now we are going to use a lodash functionality, clone Deep objects
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 3 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
state.user.loggedIn = false; // Object.assign does not make a deep copy. Both loggedIn values in both objects are changed to false
console.log('Object.assign clone', stateClone);

// Entonces usamos la libreria de lodash con funcionalidades que otras personas escribieron por nosotros
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = true;
console.log('lodash clone', stateDeepClone); // Esto es un clone de verdad, state.user.loggedIn sigue siendo false en esta variable

/////////////////////////////////////////////////////
// Video 17 - 10 Bundling With Parcel and NPM Scripts

//NOTE: Para usar parcel con installs locales, usamos npx parcel index.html (en este caso index.html es el entry point)

// Este codigo siguiente solo lo entiende parcel
//NOTE: Cuando cambiemos algo no va a forzar un page reload
if (module.hot) {
  module.hot.accept();
}

//////////////////////////////////////////////////
// Video 17 - 11 Configuring Babel and Polyfilling

// Parcel usa Babel automaticamente y hace transpilling del code

// El preset de Babel que usa parcel es preset-env.
// Este preset acepta final features, meaning features that passed all four stages of ECMA
// Vamos a usar una feature que esta en stage 3

// Lo siguiente ya anda en parcel!
class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const juan = new Person('Juan');

// Vamos a probar con nullish coalescing operator. Tambien funciona
console.log('Juan' ?? null);

console.log(ShoppingCart.cart.find(el => el.quantity > 2));

// Babel hace solo transpilling, no hace polyfilling, asi que necesitamos otra libreria
//NOTE: Transpilling es por ejemplo cambiar de let a var. Pero Babel sigue dejando los metodos como find y las Promises (que ambos son de ES6)
// Para transformar estas nuevas features a ES5 necesitamos hacer polyfill
import 'core-js/stable';

// Si quisieramos hacer polyfill de un solo metodo para que el bundle sea mas chico podriamos hacer
// import 'core-js/stable/array/find';

// Y para hacer polyfilling de async functions necesitamos otro package ya que core-js no lo hace
import 'regenerator-runtime/runtime';

/* NOTE: Resumiendo los packages que usamos son
Parcel => bundle, tambien se comporta como live server, build (comprime)
Babel => Incluido por defecto y aplicado por parcel. Hace transpilling
core-js => polyfill, menos async functions
generator-runtime => polyfill de async functions
NOTE: Recordar que los imports se hacen al principio de los files, aunque al estar hoisted no pasa nada, pero siempre al principio
*/

/////////////////////////////////////////////////////////////////////
// Video 17 - 12 Modern, Clean and Declarative JavaScript Programming
