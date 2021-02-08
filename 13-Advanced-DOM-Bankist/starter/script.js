'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  // Forma moderna de hacer scroll. Solo necesitamos el behavior. Ver soporte de browsers de esta forma
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

// NOTE: Event delegation. BEST PRACTICE, IT'S USED TO AVOID ATTACHING EVENT LISTENERS TO MANY ELEMENTS Pasos:
// 1- Add event listener to common parent element
// 2- Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Para saber en que elemento se origino el click, necesitamos leer el event.target

  // Matching strategy - Solo queremos los elementos que nos interesan, que en este caso son todos los que tienen la case 'nav__link'
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); // #section--1 por ej.
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////
// Tabbed component

// Event delegation
tabsContainer.addEventListener('click', function (e) {
  // Matching strategy: buscamos el PARENT mas cercano que tenga la clase operations__tab
  const clicked = e.target.closest('.operations__tab');

  // NOTE: Guard Clause
  // cuando hacemos click afuera de los botones no va a encontrar el parent con clase operations__tab, en ese caso es null.
  if (!clicked) return;

  // NOTE: ASI SE HACE Antes de agregar la clase active al boton que clickeamos, se la sacamos a todos los botones
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  // Lo mismo para el texto
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////
// Menu Fade Animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this; // this es el valor que bindeamos en el addEventListener!
      }
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
// NOTE: al usar bind lo que estamos haciendo es "bindear" el valor 0.5 a la funcion handleHover.
// Por lo tanto, en la funcion handleHover this va a ser 0.5 NOTE: IMPORTANTE!!!
// Necesitamos hacer asi ya que no podemos usar una funcion y pasar parámetros dentro de un addEventListener
// NOTE: Incluso cuando bindeamos un valor a this, en la funcion todavia tenemos acceso al evento. Por ej e.target

// Mouseout es el contrario de mouseover, se activa cuando salimos del elemento
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////////////////
// Sticky Navigation with Intersection Observer API

const header = document.querySelector('header');

// necesitamos la altura del nav para establecer el rootMargin
const navHeight = nav.getBoundingClientRect().height; // Altura en px del nav (Number)

const stickyNav = function (entries) {
  const [entry] = entries; // aunque solo hayamos puesto 1 solo threshold, entries sigue siendo un array de 1 elemento
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // entire viewport
  threshold: 0, // Cuando el header se deje de ver por completo
  rootMargin: `-${navHeight}px`, // util si queremos que aplique dependiendo de la altura del nav, por ej.
  // rootMargin necesita que sea un string, y con los caracteres px
});
headerObserver.observe(header);

//////////////////
// Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; // NOTE: importante para desechar el primer entry que se acciona al hacer refresh
  entry.target.classList.remove('section--hidden'); // NOTE: ASI SE HACE PARA HACER APARECER SECCIONES A MEDIDA QUE HACEMOS SCROLL

  // NOTE: Una vez que aparece en pantalla no necesitamos observar más, REMOVEMOS EL OBSERVER
  observer.unobserve(entry.target); // en entry.target se encuentra la seccion en cuestión
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

//////////////////////
// Lazy Loading images
// NOTE: en CSS se pone una clase con un filter: blur(20px)

// Seleccionamos todas las imagenes con la propiedad data-src
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; // guard clause

  // Replace src attribute with data-src.
  entry.target.src = entry.target.dataset.src;

  // Una vez que reemplaza la img JS va a emitir the load event, asi que ponemos un listener ahí
  // NOTE: Necesitamos hacerlo así para no sacar la clase que hace el blur antes de que se cargue la nueva imagen
  // Resumiendo: recién después de que se carga la nueva imagen sacamos el blur
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // rootMargin negativo para esconderle al usuario que estamos haciendo lazy loading
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////
// Slider Component

const slider = function () {
  const slides = document.querySelectorAll('.slide');

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  ///////////////
  // Functions //
  ///////////////

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      // currentSlide = 1: -100% 0%, 100%, 200%
    });
  };

  // Go to next Slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) currentSlide = 0;
    else currentSlide++;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // Go to prev Slide
  const prevSlide = function () {
    if (currentSlide === 0) currentSlide = maxSlide - 1;
    else currentSlide--;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0); // llamamos al comienzo con valor 0 para acomodar los slides
    createDots(); // creamos los dots
    activateDot(0); // Ponemos en activo el primer dot
  };

  init();

  ////////////////////
  // Event Handlers //
  ////////////////////

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //////////////////
  // Keypress events
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
  });

  //////
  //DOTS

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // e.target.classList.add('.dots__dot--active');
      const { slide } = e.target.dataset; // const slide = e.target.dataset.slide
      // console.log('DOT number: ', e.target.dataset.slide);
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
////////////////////////////////////////
/////////////   LECTURES   /////////////
////////////////////////////////////////

///////////////////////////////////////////
// Page Navigation without event delegation -NOT GOOD!!

// NOTE: DEJAMOS COMO EJEMPLO, PORQUE NO ES LA MEJOR SOLUCION YA QUE ESTAMOS PONIENDO UN LISTENER EN CADA ELEMENTO
// Y LA MEJOR SOLUCION ES RECURRIR AL EVENT DELEGATION
// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); // el default en este caso seria ir a su seccion correspondiente,
//     // necesitamos prevenir el default bahavior para poder hacer un smooth scrolling
//     // console.log('LINK');
//     const id = this.getAttribute('href'); // #section--1 por ej.
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//////////////////////////////
// Button scrolling explaining

/*

btnScrollTo.addEventListener('click', function (e) {
  // Conseguimos las coordenadas
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log('sicords valor top', s1coords.top);
  // console.log(e.target.getBoundingClientRect());

  // Current scroll position
  // Es la distancia entre la posición actual y el tope superior de la pagina (scroll bien al top)
  // console.log('current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // tamaño del viewport
  console.log(
    'height/width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // NOTE: Scrolling, acá decimos a donde tenemos que hacer scroll
  // Sumamos pageYOffset para eliminar el problema que se presenta cuando hacemos click al boton y no estamos en el borde superior de la pagina
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Pasamos un objeto con las propiedades, esto nos permite usar la propiedad behavior: smooth para un scroll suave
  // NOTE: Todo esto es la forma vieja de hacer scroll
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Forma moderna de hacer scroll. Solo necesitamos el behavior. Ver soporte de browsers de esta forma
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

*/

//////////////////////////////////////////////////////////
// Video 13 - 5 Selecting, Creating, and Deleting Elements

/*

// SELECTION ELEMENTS
console.log(document.documentElement); // Seleccionamos todo el document of a webpage
console.log(document.head); // head
console.log(document.body); // todo el body

const allSections = document.querySelectorAll('.section'); // NOTE: querySelectorAll devuelve un Nodelist
console.log(allSections);

document.getElementById('section--1'); // no necesitamos poner #

const allButtons = document.getElementsByTagName('button'); // todos los elementos con el name de button
console.log(allButtons);

console.log(document.getElementsByClassName('btn')); // no necesitamos el selector .

//NOTE: Creating and inserting elements
// inserAdjacentHTML -> ya lo vimos en la seccion anterior de bankist

const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improve functionality and analytics.'
message.innerHTML =
  'We use cookies for improve functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // prepend lo que hace es añadir como first child este elemento al header
header.append(message); // append lo que hace es añadir como last child este elemento al header
// Al usar append y prepend no se crearon 2 elementos, es siempre uno solo y lo cambiamos de lugar

// NOTE: Clonar elementos
// header.append(message.cloneNode(true)); // true significa que todos los childs también serán copiados

// header.before(message); // añade el elemento guardado en la variable message al documento como un sibling del header, y lo coloca antes
// header.after(message); // sibling(hermano) del header, colocado después

// NOTE: Delete elements

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // borramos el mensaje cuando hacemos click en got it!
    message.remove(); // Este método es nuevo, antes se hacía así
    // message.parentElement.removeChild(message);
  });

*/

//////////////////////////////////////////////
// Video 13 - 6 Styles, Attributes and Classes

/*

// Styles
// NOTE: estos estilos se agregan como inline styles

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.height); // no podemos leer atributos CSS si no están establecidos como inline styles
console.log(message.style.width); // como si establecimos el width y es un inline style si lo podemos leer

//si podemos leer los estilos usando getComputedStyle
console.log(getComputedStyle(message).fontWeight);

message.style.height =
Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// NOTE: CSS custom properties (variables de CSS) Como cambiar el valor de las variables
document.documentElement.style.setProperty('--color-primary', '#436572');

// Attributes Solo podemos leer los atributos estandar de cada elemento.
// NOTE: Para leer atributos custom de elementos HTML desde JS necesitamos usar getAttribute
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); // podemos acceder al src de la img
console.log(logo.getAttribute('designer')); // leer atributos custom

logo.alt = 'Beautiful minimalist logo';

// para poner atributos custom
logo.setAttribute('company', 'Bankist');

// Cuando usamos logo.src nos da la url absoluta de la imagen
console.log(logo.src);
console.log(logo.getAttribute('src')); // url relativa

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
// En html tenemos un atributo llamado data-version-number y se leen en JS usando dataset
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

*/

//////////////////////////////////////////////////
// Video 13 - 8 Types of Events and Event Handlers

/*

const h1 = document.querySelector('h1');

// mouseenter fires when the mouse 'enters' a certain element

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the header :)');

  // Sacamos el event Listener. La sintaxis es igual que cuando usamos addEventListener
  // NOTE: Para poder usar esta caracteristica tenemos que guardar el event handler(funcion) en una variable
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// Tambien podemos remover el eventListener despues de un tiempo si queremos*
setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
  console.log('removimos el eventListener');
}, 3000);

// NOTE: tambien podemos usar onclick en el HTML para manejar eventos, pero sigue siendo recomendable usar eventListeners

// otra forma seria, mas vieja sería esta NOTE: usar addEventlistener es lo recomendable, es la nueva forma
// NOTE: Addeventlistener es superior por 2 razones
// podemos poner mas de un eventListener en un elemento
// podemos remover el eventListener cuando queramos.

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the header :)');
// };

*/

//////////////////////////////////////////////
// Video 13 - 10 Event Propagation in Practice

/*

// NOTE: Events bubbles up to the parent elements

const randomInt = (min, max) =>
Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
`rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log('link', e.target, e.currentTarget); // e.target nos dice DONDE paso el evento,
  //currentTarget es el elemento al que esta aplicado el eventListener. NOTE: O sea que e.currentTarget === this
  console.log(e.currentTarget === this); // true
  
  this.style.backgroundColor = randomColor();
  
  // NOTE: PARAR EL EVENT PROPAGATION
  e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('container', e.target); // e.target nos dice DONDE paso el evento
});

// NOTE: Por defecto los eventListeners no funcionan o no captan durante la capturing phase y solo funcionan durante la
// bubbling phase Pero podemos agregar un 3er parámetro (true) para que lo haga
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('nav', e.target); // e.target nos dice DONDE paso el evento
  },
  true
  );
  
  // NOTE: NOT IMPORTANT!!! NO REAL WORLD APPLICATIONS
  // Capturing phase: event travels DOWN from document to the element
  // Bubbling phase: event travels UP from the element to the document
  
*/

///////////////////////////////
// Video 13 - 12 DOM Traversing

/*

const h1 = document.querySelector('h1');

console.log('----DOWNWARDS');

// Yendo para abajo, seleccionamos los childs
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
console.log(h1.firstElementChild);
h1.firstElementChild.style.backgroundColor = 'yellow';
console.log(h1.lastElementChild);

// Going Upwards: parents
console.log('----UPWARDS');
console.log(h1.parentNode);
console.log(h1.parentElement);

// elemento mas cerca hacia arriba que tiene la clase .header
// mientras querySelector busca childrens dentro del document(hacia abajo) closest busca parents (hacia arriba)
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Goin Sideways: Siblings
console.log(h1.previousElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextElementSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); // Asi obtenemos a todos los siblings de un elemento
console.log([...h1.parentElement.children]);
[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

*/

///////////////////////////////////////////////////////////
// Video 13 - 16 A Better Way The Intersection Observer API

/*
const observerCallbackFunction = function (entries, observer) { // 2 parametros
  entries.forEach(entry => { // es un array
    console.log(entry);
  });
};

const observerOptions = {
  root: null, // element that the target is intercepting.Si ponemos null nos referimos a todo el viewport
  threshold: 0, // % of interception. 0.1 es 10%
};
// Necesita 2 parámetros, una callback function y un objeto con opciones
const observer = new IntersectionObserver(
  observerCallbackFunction,
  observerOptions
  );
  observer.observe(section1); // NOTE: callback function se va a llamar cuando el elemento section1 intercepte el root (viewport en este caso) al 10%
  */

//////////////////////////////////////////////////////////////////
// Video 13 - 15 Implementing a Sticky Navigation The Scroll Event

/*

NOTE: Forma vieja de hacer sticky el nav. BAD PERFORMANCE, BAD PRACTICE
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

*/

/////////////////////////////////////
// Video 13 - 21 Lifecycle DOM Events

// DOMContentLoaded: este evento se llama apenas se termino de cargar el HTML y se convierte al DOM (o parsea)
// NOTE: Al poner el script tag al final antes de cerrar el body, no es necesario llamar a este eventListener
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// load event. Este evento se llama una vez que se cargaron no solo el HTML y el JS, sino tambien todo el CSS, imgs, external CSS, etc
// NOTE: o sea, este evento se llama cuando la pagina se ha cargado completamente
window.addEventListener('load', function (e) {
  console.log('Page fully loaded: ', e);
});
// Estos 2 eventos se ven en el network tab

// Este evento se llama antes de que un usuario abandone la pagina mmmm, lo hemos visto
// window.addEventListener('beforeunload', event => {
//   // Cancel the event as stated by the standard.
//   event.preventDefault();
//   // Chrome requires returnValue to be set.
//   event.returnValue = ''; // NOTE: esto es raro pero va asi, por historical reasons
//   console.log('dlkjsfdjlsk');
// });

/////////////////////////////////////////////////////////
// Video 13 - 22 Efficient Script Loading defer and async

// No poner a cargar el script de JS en el head NUNCA
// Poner el script justo antes de cerrar el body

// NOTE: La mejor forma de cargar un script de JS es la siguiente: defer en el head.
// defer respeta el orden en el que ponemos los scripts en el HTML

/*

// Ejemplo usando defer
<head>
  <title>Bankist | When Banking meets Minimalist</title>
  <script defer src="script.js"></script> NOTE:
</head>
*/
