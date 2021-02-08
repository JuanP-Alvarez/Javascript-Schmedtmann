'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// LECTURES

//////////////////////////////////////////////////
// Video 16 - 4 Our First AJAX Call XMLHttpRequest

/*

// XML no se usa mas, ahora es todo JSON, que son objetos de JS pero en formato String(por esta razon necesitamos los metodos stringify y parse)
// En github buscar public apis (listado de apis)

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`); // type of HTTP request, GET, POST, etc., API ENDPOINT (es el URL que necesitamos)
  request.send(); // enviamos el request a la URL
  
  // console.log(request.responseText); // no sirve porque el resultado del request todavia no llego
  
  // ponemos un eventListener y esperamos al load event(que quiere decir que ya termino de cargar)
  request.addEventListener('load', function () {
    // console.log(this.responseText); // devuelve JSON
    
    const [data] = JSON.parse(this.responseText); // destructuring porque es un array, con una sola posición (1 solo pais)
    
    // sin destructuring seria asi
    // const data = JSON.parse(this.responseText)[0];
    
    console.log(data);
    
    const html = `
    <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].nativeName}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
      </article>
      `;
      countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// getCountryData('mexico');
// getCountryData('colombia');
// getCountryData('peru');
// getCountryData('ecuador');
// getCountryData('argentina');

*/

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
      <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
          <p class="country__row"><span>🗣️</span>${
            data.languages[0].nativeName
          }</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
          </article>
          `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

/*

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    
    console.log(data);
    
    // Render country 1
    renderCountry(data);
    
    // Get neighbour country 2
    
    const [neighbour] = data.borders;
    console.log(neighbour);

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('argentina');

*/

//////////////////////////////////////////
// Video 16 - 7 Promises and the Fetch API

/*
// Asi haciamos antes de Fetch
const request = new XMLHttpRequest();
// type of HTTP request, GET, POST, etc., API ENDPOINT (es el URL que necesitamos)
request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
request.send(); // enviamos el request a la URL

//NOTE: Fetch
const request = fetch('https://restcountries.eu/rest/v2/name/argentina');
console.log(request);

// NOTE: Un Promise es un container for a future value NOTE:

*/

//////////////////////////////////
// Video 16 - 8 Consuming Promises

//cuando el promise es fulfilled, se ejecuta lo que ponemos en then(response). response es el fulfilled value

/*
const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(function (response) {
      console.log(response); // para leer el response, necesitamos hacer response.json (que es un promise)
      return response.json(); // esto tambien es un promise, asi que necesitamos otro then()
    })
    .then(function ([data]) {
      console.log(data); // finalmente, data es el resultado final de los promises
      renderCountry(data);
    });
};
*/

//NOTE: Chaining promises es igual a chaining array methods. Vas dependiendo de su return para ir enlazando
// La 2da function de un then() se llama cuando la promise es rejected. Y su arg es el error en cuestion
// O mejor aun, usamos catch al final de chain NOTE:
// Por ultimo, finally() es llamado sin importar si la promise es fulfilled or rejected. Se ejecuta siempre
// Un uso comun de finally es cuando se ve en pantalla un circulo de carga y se termina de cargar algo y desaparece

/*
// version simplificada
const getCountryData = country =>
  // Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      // console.log(response);

      // Al ser 404 el response.ok toma valor de false
      if (!response.ok)
        // creamos un error con new. throw termina la funcion (como return)
        throw new Error(`Country ${country} not found (${response.status})`);
      // crear y tirar un error hace que la promise sea rejected NOTE: entonces va al catch

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);

      // const neighbour = data[0].borders[0];
      const neighbour = 'kjldsfhkjlfhsd';

      if (!neighbour) return; // esto no va a funcionar

      // Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`Country ${country} not found (${response.status})`);

      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      // err.message es el mensaje que pasamos cuando hicimos throw new Error
      console.error(`${err}💣💣💣`);
      renderError(`Something went wrong 💣💣💣 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
*/

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// Helper function que va a encargarse del then(response) y del error handling, para keep DRY
// Esta funcion va a devolver un promise que podemos seguir encadenando
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

/*
// En este fetch usamos la helper function getJSON, para seguir DRY
const getCountryData = country =>
  // Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    `Country ${country} not found`
  )
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];
      // const neighbour = 'kjldsfhkjlfhsd';

      if (!neighbour) throw new Error(`${data[0].name} has no neighbours`);

      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        `Country ${country} not found`
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      // err.message es el mensaje que pasamos cuando hicimos throw new Error
      console.error(`${err}💣💣💣`);
      renderError(`Something went wrong 💣💣💣 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });

// getCountryData('peru');
// getCountryData('ecuador');
// getCountryData('mexico');
// getCountryData('colombia');
// getCountryData('chile');

btn.addEventListener('click', function () {
  // getCountryData('hjgjhg');
  // getCountryData('portugal');
  getCountryData('australia');
});

*/

//////////////////////
// Coding Challenge #1

/*
In this challenge you will build a function 'whereAmI' which renders a country
only based on GPS coordinates. For that, you will use a second API to geocode
coordinates. So in this challenge, you’ll use an API on your own for the first time 😁

Your tasks:

PART 1

1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
and a longitude value ('lng') (these are GPS coordinates, examples are in test
data below).

2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
to convert coordinates to a meaningful location, like a city and country name.
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
will be done to a URL with this format:
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
promises to get the data. Do not use the 'getJSON' function we created, that
is cheating 😉

3. Once you have the data, take a look at it in the console to see all the attributes
that you received about the provided location. Then, using this data, log a
message like this to the console: “You are in Berlin, Germany”

4. Chain a .catch method to the end of the promise chain and log errors to the
console

5. This API allows you to make only 3 requests per second. If you reload fast, you
will get this error with code 403. This is an error with the request. Remember,
fetch() does not reject the promise in this case. So create an error to reject
the promise yourself, with a meaningful error message
PART 2

6. Now it's time to use the received data to render a country. So take the relevant
attribute from the geocoding API result, and plug it into the countries API that
we have been using.

7. Render the country and catch any errors, just like we have done in the last
lecture (you can even copy this code, no need to type the same code)

Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474
*/

/*

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// En este fetch usamos la helper function getJSON, para seguir DRY
const getCountryData = country =>
  // Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    `Country ${country} not found`
  )
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];
      // const neighbour = 'kjldsfhkjlfhsd';

      if (!neighbour) throw new Error(`${data[0].name} has no neighbours`);

      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        `Country ${country} not found`
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      // err.message es el mensaje que pasamos cuando hicimos throw new Error
      console.error(`${err}💣💣💣`);
      renderError(`Something went wrong 💣💣💣 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });

// getCountryData('peru');
// getCountryData('ecuador');
// getCountryData('mexico');
// getCountryData('colombia');
// getCountryData('chile');

const whereAmI = function (lat, lgn) {
  return fetch(`https://geocode.xyz/${lat},${lgn}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding (${response.status})`);

      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);

      return data.country[0].toLowerCase() + data.country.slice(1);
    })
    .then(country => getCountryData(country))
    .catch(err => {
      console.log(err.message);
      renderError(`Something went wrong 💣💣💣 ${err.message}. Try again!`);
    });
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
// whereAmI(28.45344, -16.2713);

let currentGeoLocation = [];

const geo_success = function (position) {
  currentGeoLocation.push(position.coords.latitude, position.coords.longitude);
};

const geo_error = function () {
  alert('Sorry, no position available.');
};

const getGeoLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geo_success, geo_error);
  } else {
    alert('Not Geo');
  }
};

btn.addEventListener('click', function () {
  // whereAmI(28.45344, -16.2713);
  whereAmI([...currentGeoLocation]);
  // whereAmI(52.508, 13.381);
  // whereAmI(19.037, 72.873);
  // whereAmI(-33.933, 18.474);
  // whereAmI(28.45344, -16.2713);
});

getGeoLocation();

*/

///////////////////////////////////////////
// Video 16 - 14 The Event Loop in Practice

/*

console.log('Test start');
setTimeout(() => {
  console.log('0 sec timer');
}, 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end');

*/

// Conclusiones:
/*
El orden de los console.log va a ser
Test start
Test end
Resolved promise 1
Resolved promise 2
0 sec timer

Explicacion: 
1- Top level code, es decir, codigo afuera de cualquier callback se ejecutará primero. Entonces Test start y Test end se logean primero
2- Luego vienen los microtasks (promises son microtaks)
3- Por ultimo los timers y callback functions. Es asi porque los microstask se ejecutan antes que cualquier cosa que esta en el callback stack

NOTE: dado lo anterior, queda demostrado que los timers NO SON PRECISOS!

*/

//////////////////////////////////////////
// Video 16 - 15 Building a Simple Promise

/*

// Promise constructor. La function dentro del promise se llama executor. Esta function se ejecuta cuando se crea la promise y tiene 2 args
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');

  setTimeout(function () {
    //En este ejemplo decimos que ganamos la loteria un 50% de las veces, por lo tanto se llama a resolve
    // Cuando se llama a resolve es porque la promise fue fulfilled
    if (Math.random() >= 0.5) {
      // En resolve pasamos el fulfilled value of the promise, para que podamos usar o encadenar then
      resolve('You won the lottery');
    } else {
      // en reject pasamos el error message que nos encargaremos de usar con catch
      reject(new Error('You lost your money!!!'));
    }
  }, 2000);
});

lotteryPromise
.then(res => console.log('then', res))
.catch(err => console.error('catch', err));

// Promisifying setTimeout
const wait = function (seconds) {
  // el executor en este caso no tiene reject porque un timeout nunca falla
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000); // en este caso no pasamos ningun value cuando la promise es fulfilled
  });
};


// De esta manera nos evitamos el callback hell
wait(1)
.then(() => {
  console.log('1 second passed');
  return wait(1);
})
.then(() => {
  console.log('2 seconds passed');
  return wait(1);
})
.then(() => {
  console.log('3 seconds passed');
  return wait(1);
})
.then(() => {
  console.log('4 seconds passed');
  });

// llamamos a una promise que se resuelve automáticamente
Promise.resolve('abc').then(x => console.log(x));

// llamamos a una promise que se reject automáticamente
Promise.reject(new Error('Problem!')).catch(err => console.error(err));

*/

/////////////////////////////////////////////////
// Video 16 - 16 Promisifying the Geolocation API

/*

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject); // simplificado
  });
};

getPosition()
  .then(res => console.log(res))
  .catch(err => console.log(err));

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// En este fetch usamos la helper function getJSON, para seguir DRY
const getCountryData = country =>
  // Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    `Country ${country} not found`
  )
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];
      // const neighbour = 'kjldsfhkjlfhsd';

      if (!neighbour) throw new Error(`${data[0].name} has no neighbours`);

      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        `Country ${country} not found`
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      // err.message es el mensaje que pasamos cuando hicimos throw new Error
      console.error(`${err}💣💣💣`);
      renderError(`Something went wrong 💣💣💣 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lgn } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lgn}?geoit=json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding (${response.status})`);

      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);

      return data.country[0].toLowerCase() + data.country.slice(1);
    })
    .then(country => getCountryData(country))
    .catch(err => {
      console.log(err.message);
      renderError(`Something went wrong 💣💣💣 ${err.message}. Try again!`);
    });
};

btn.addEventListener('click', whereAmI);

*/

//////////////////////
// Coding Challenge #2

/*

For this challenge you will actually have to watch the video! Then, build the image
loading functionality that I just showed you on the screen.

Your tasks:

Tasks are not super-descriptive this time, so that you can figure out some stuff by
yourself. Pretend you're working on your own 😉

PART 1

1. Create a function 'createImage' which receives 'imgPath' as an input.
This function returns a promise which creates a new image (use
document.createElement('img')) and sets the .src attribute to the
provided image path

2. When the image is done loading, append it to the DOM element with the
'images' class, and resolve the promise. The fulfilled value should be the
image element itself. In case there is an error loading the image (listen for
the'error' event), reject the promise

3. If this part is too tricky for you, just watch the first part of the solution
PART 2

4. Consume the promise using .then and also add an error handler

5. After the image has loaded, pause execution for 2 seconds using the 'wait'
function we created earlier

6. After the 2 seconds have passed, hide the current image (set display CSS
property to 'none'), and load a second image (Hint: Use the image element
returned by the 'createImage' promise to hide the current image. You will
need a global variable for that 😉)

7. After the second image has loaded, pause execution for 2 seconds again

8. After the 2 seconds have passed, hide the current image
Test data: Images in the img folder. Test the error handler by passing a wrong
image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
otherwise images load too fast

*/

/*

const img = document.createElement('img');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    img.src = imgPath;
    img.style.display = 'block';

    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', err => reject(err));
  });
};

createImage('img/img-1.jpg')
  .then(img => document.querySelector('.images').append(img))
  .then(() => wait(2))
  .then(() => {
    console.log('hide img');
    img.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(() => wait(2))
  .then(() => {
    console.log('hide img');
    img.style.display = 'none';
  })
  .catch(err => console.error(`Error: ${err}`));

  */

/*

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));

*/

///////////////////////////////////////////////////
// Video 16 - 18 Consuming Promises with AsyncAwait

// ES2017 Async Await => Es syntacti sugar sobre el metodo then()

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

/*

const whereAmI = async function () {
  // GeoLocation
  const position = await getPosition();
  const { latitude: lat, longitude: lgn } = position.coords;

  // Reverse Geocoding
  const geocodeResponse = await fetch(
    `https://geocode.xyz/${lat},${lgn}?geoit=json`
  );
  const geocodeData = await geocodeResponse.json();

  // Country data
  // una vez que obtenemos el resultado se guarda en la variable res MUCHO MAS FACIL!
  const restCountriesResponse = await fetch(
    `https://restcountries.eu/rest/v2/name/${geocodeData.country}`
  );

  // Para obtener el mismo resultado de arriba teniamos que usar then()
  // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res));

  // recordar que con el response del fetch teniamos que usar response.json() lo que devolvia otro promise.
  // Pero ahora con await, es mucho mas facil
  const restCountriesData = await restCountriesResponse.json();
  // console.log(restCountriesData); // FACIL!
  renderCountry(restCountriesData[0]);
};

const whereAmI = async function () {
  try {
    // GeoLocation
    const position = await getPosition();
    const { latitude: lat, longitude: lgn } = position.coords;
    
    // Reverse Geocoding
    const geocodeResponse = await fetch(
      `https://geocode.xyz/${lat},${lgn}?geoit=json`
      );
      if (!geocodeResponse.ok) throw new Error(`Problem getting location data`);
      const geocodeData = await geocodeResponse.json();
      
      // Country data
      const restCountriesResponse = await fetch(
        `https://restcountries.eu/rest/v2/name/${geocodeData.country}`
        );
        if (!restCountriesResponse.ok)
        throw new Error(`Problem getting country data`);
        
        const restCountriesData = await restCountriesResponse.json();
        renderCountry(restCountriesData[0]);
        
    // Dado que todo es una promise. El retun value se podra ver cuando la promise sea fulfilled
    return `You are in ${geocodeData.city}, ${geocodeData.country}`;
  } catch (err) {
    console.error(`${err} 💣💣💣`);
    renderError(`Error! ${err.message}`);
    
    // reject promise returned from async function;
    throw err;
  }
};

*/

// btn.addEventListener('click', whereAmI);

// Asi no se puede porque la promise esta pendiente al momento de darle valor a la variable
// const city = whereAmI();
// console.log(city);

// Se hace de la sgte manera, aunque podemos mejorarlo para no usar async/await con then catch y finally
// whereAmI()
//   .then(city => console.log('City:', city))
//   .catch(err => console.error(err))
//   .finally(() => console.log('3: Finished getting location'));

// Solucion usando IIFE NOTE: mejor solucion para no mezclar async/await con then()
// ESTE ES UNO DE LOS ULTIMOS USE CASES OF IIFES

/*

(async function () {
  try {
    console.log('1: Will get location');
    const city = await whereAmI();
    console.log('2: City:', city);
  } catch (err) {
    console.log(err.message);
  }
  console.log('3: Finished getting location');
})();

*/

////////////////////////////////////////////////
// Video 16 - 19 Error Handling With try...catch

/*

try {
  let y = 1;
  const x = 2;
  x = 3;
} catch (err) {
  alert(err.message);
}

*/

//////////////////////////////////////////////////////
// Video 16 - 20 Returning Values from Async Functions

// Mirar arriba

/////////////////////////////////////////////
// Video 16 - 21 Running Promises in Parallel

/*

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);

    // No tiene sentido hacer 3 awaits seguidos ya que el resultado de uno no depende del otro. Y al hacer asi
    // estamos perdiendo tiempo yu que el sgte await no se va a ejecutar hasta que no termine el anterior.
    //NOTE: Podemos ejecutar promises en paralelo usando Promise.all(), que toma un arrays de promises
    // Si uno de los promises falla, fallan todos

    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(data.flat().map(d => d.capital));
    // console.log(data.map(d => d[0].capital));
    // console.log(data);
  } catch (err) {}
};

get3Countries('argentina', 'peru', 'chile');

*/

///////////////////////////////////////////////////////////////////
// Video 16 - 22 Other Promise Combinators race, allSettled and any

//NOTE: COMBINATORS . Los siguientes y Promise.all() son combinators
// Promise race. Es una carrera, Promise race toma el valor del promise que devueve mas rapido (sea resolve o reject)
// NO es un array como en Promise.all(), sino que solo toma el valor del promise mas rapido

/*

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/canada`),
    getJSON(`https://restcountries.eu/rest/v2/name/colombia`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
  timeout(0.1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled() Es nueva, de ES2020!
// Toma un array de promises y devuelve un array con todos los settled promises, sin importar si son resolved or rejected
// La diferencia con Promise.all() es que Promise.all shortcircuits apenas uno de los promises devuelve rejected
// Mientras que promise.alSettled never shortcircuits
Promise.allSettled([
  Promise.resolve('Success!'),
  Promise.reject('Error'),
  Promise.resolve('Another success!'),
]).then(res => console.log(res));

// Diferencia con Promise.all
Promise.all([
  Promise.resolve('Success!'),
  Promise.reject('Error'),
  Promise.resolve('Another success!'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any() ES2021!! ====> Toma un array de Promises y devuelve el FIRST FULFILLED PROMISE. Ignora rejected Promises
Promise.any([
  Promise.resolve('Success!'),
  Promise.reject('Error'),
  Promise.resolve('Another success!'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

  */

//////////////////////
// Coding Challenge #3

/*

Your tasks:

PART 1

1. Write an async function 'loadNPause' that recreates Challenge #2, this time
using async/await (only the part where the promise is consumed, reuse the
'createImage' function from before)

2. Compare the two versions, think about the big differences, and see which one
you like more

3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
in the dev tools Network tab

PART 2

1. Create an async function 'loadAll' that receives an array of image paths
'imgArr'

2. Use .map to loop over the array, to load all the images with the
'createImage' function (call the resulting array 'imgs')

3. Check out the 'imgs' array in the console! Is it like you expected?

4. Use a promise combinator function to actually get the images from the array 😉

5. Add the 'parallel' class to all the images (it has some CSS styles)
Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-
3.jpg']. To test, turn off the 'loadNPause' function

*/
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';
    await wait(1);

    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

const imgArr = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];

const loadAll = async function (imgArr) {
  try {
    const imgs = await Promise.all(imgArr.map(img => createImage(img)));
    console.log(imgs);
    imgs.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.log('err');
  }
};

loadAll(imgArr);
