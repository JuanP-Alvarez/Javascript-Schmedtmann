// Exporting module
console.log('Exporting module');

// Variables declaradas dentro de un modulo, su scope es el modulo, no se pueden acceder desde otro modulo
const shippingCost = 10;
export const cart = [];

// NOTE: EXPORTS NEED TO HAPPEN ALWAYS ON TOP LEVEL CODE. ( not inside a block)

// Named exports: Ahora podemos acceder a esta funcion desde otro modulo usando import { addToCart } from './shoppingCart.js';
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

// al exportar le cambiamos el nombre a totalQuantity a tq
export { totalPrice, totalQuantity as tq };

/* Default exports
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};
Para importar un default export se hace import nombreQueLeQueremosPoner from './shoppingCart.js';
*/
