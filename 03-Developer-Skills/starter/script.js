// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// crear snippet para console.log()
// "Print to console": {
//   "scope": "javascript,typescript",
//   "prefix": "cl",
//   "body": ["console.log($1);", "$2"],
//   "description": "Log output to console"
// }

// desmarcar la opción "editor.suggest.snippetsPreventQuickSuggestions": false

// Video 059

const temps1 = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
const temps2 = [8, -4, -1, -10, 'error', 7, 4, 23, 35, 11, 4, 2];

const calcTempAmplitude = (t1, t2) => {
  // Mejor manera usando destructuring para encontrar el numero maximo y minimo de un array
  // let maxTemp = Math.max(...temps);
  // let minTemp = Math.min(...temps);

  // O usando lo que sabemos hasta ahora
  const temps = t1.concat(t2);
  let maxTemp = 0;
  let minTemp = 0;

  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] !== 'number') continue;
    if (temps[i] > maxTemp) maxTemp = temps[i];
    if (temps[i] < minTemp) minTemp = temps[i];
  }

  return `${minTemp} is the lowest temperature, and ${maxTemp} is the highest temperature. The amplitude is : ${
    maxTemp - minTemp
  }`;
};

console.log(calcTempAmplitude(temps1, temps2));
