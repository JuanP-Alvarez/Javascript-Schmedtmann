'use strict';

// Video 033
// function logger() {
//   console.log('my name is john');
// }

// logger();

// function fruitProcessor(apples, oranges) {
//   console.log(apples, oranges);
//   const juice = `Juice with ${apples} apples and ${oranges} oranges`;
//   return juice;
// }

// const applejuice = fruitProcessor(5, 0);

// console.log(applejuice);
// console.log(fruitProcessor(5, 0));


// Video 034
// Function declarations pueden llamarse antes de declararse, function expressions no. 

// FUNCTION DECLARATION
// function calcAge1(birthYear) {
//   return 2037 - birthYear;
// }

// const age1 = calcAge1(1991);
// console.log(age1);

// // FUNCTION EXPRESSION
// const calcAge2 = function (birthYear) {
//   return 2037 - birthYear;
// }

// const age2 = calcAge2(1991);
// console.log(age2);


// Video 035
// Arrow Functions
// const calcAge3 = birthYear => 2037 - birthYear;
// const age3 = calcAge3(1991);
// console.log(age3);

// const yearsUltilRetirement = (birthYear, firstName) => {
//   const age = 2037 - birthYear;
//   const retirement = 65 - age;
//   return `${firstName} retires in ${retirement} years.`;
// }

// console.log(yearsUltilRetirement(1991, 'John'));
// console.log(yearsUltilRetirement(1980, 'Bob'));


// VIdeo 036

// function cutFruitPieces(fruit) {
//   return fruit * 4;
// }

// function fruitProcessor(apples, oranges) {

//   const applePieces = cutFruitPieces(apples);
//   const orangePieces = cutFruitPieces(oranges);


//   console.log(apples, oranges);
//   const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange`;
//   return juice;
// }

// console.log(fruitProcessor(2, 3));



// Coding Challenge #1

// Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new
// gymnastics discipline, which works differently.
// Each team competes 3 times, and then the average of the 3 scores is calculated (so
// one average score per team).
// A team only wins if it has at least double the average score of the other team.
// Otherwise, no team wins!

// Your tasks:
// 1.2.3.4.5.Create an arrow function 'calcAverage' to calculate the average of 3 scores
// Use the function to calculate the average for both teams
// Create a function 'checkWinner' that takes the average score of each team
// as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner
// to the console, together with the victory points, according to the rule above.
// Example: "Koalas win (30 vs. 13)"
// Use the 'checkWinner' function to determine the winner for both Data 1 and
// Data 2
// Ignore draws this time
// Test data:
// §
//  Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
// §
//  Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

// const calcAverage = (num1, num2, num3) => (num1 + num2 + num3) / 3;

// const checkWinner = (avgDolphins, avgKoalas) => {
//   if (avgDolphins > (avgKoalas * 2)) {
//     return `Dolphins win (${avgDolphins} vs ${avgKoalas})`;
//   } else if (avgKoalas > (avgDolphins * 2)) {
//     return `Koalas win (${avgKoalas} vs ${avgDolphins})`;
//   } else {
//     return `Nobody Wins`;
//   }
// }

// const avgDolphins = calcAverage(44, 23, 71);
// const avgKoalas = calcAverage(65, 54, 71);
// console.log(checkWinner(avgDolphins, avgKoalas));
// console.log(checkWinner(calcAverage(85, 54, 71), calcAverage(23, 34, 27)));



// Video 040

// const friends = ['Michael', 'Steven', 'Peter'];
// const newLength = friends.push('Jay'); // Añade un elemento al final del array. push returns el nuevo length luego de agregar
// console.log(newLength);

// friends.unshift('John'); // unshift agrega un elemento al inicio del array. unshift tambien devuelve el length del array

// friends.pop(); // Saca el ultimo elemento del array. Devuelve el elemento que se sacó

// friends.shift(); // Saca el primer elemento del array. Devuelve el elemento que se sacó

// console.log(friends);
// console.log(friends.indexOf('Steven')); // devuelve el indice del elemento que le decimos que busque. Si no encuenta devuelve -1

// console.log(friends.includes('Steven')); // Devuelve true o false de acuerdo a si esta o no el elemento que buscamos. 



// Coding Challenge #2
// Steven is still building his tip calculator, using the same rules as before: Tip 15% of
// the bill if the bill value is between 50 and 300, and if the value is different, the tip is
// 20%.

// Your tasks:

// 1. Write a function 'calcTip' that takes any bill value as an input and returns
// the corresponding tip, calculated based on the rules above (you can check out
// the code from first tip calculator challenge if you need to). Use the function
// type you like the most. Test the function using a bill value of 100

// 2. And now let's use arrays! So create an array 'bills' containing the test data
// below

// 3. Create an array 'tips' containing the tip value for each bill, calculated from
// the function you created before

// 4. Bonus: Create an array 'total' containing the total values, so the bill + tip
// Test data: 125, 555 and 44

// 1
// const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
// console.log(calcTip(100));

// // 2
// const bills = [125, 555, 44];

// // 3
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// console.log(tips);

// // 4
// const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]]
// console.log(total);


// Video 042 y 043

// const juan = {
//   firstName: 'Juan',
//   lastName: 'Alvarez',
//   age: 2020 - 1982,
//   job: 'manuales por interne',
//   friends: ['Michael', 'Steven', 'Peter']
// }

// console.log(juan);

// console.log(juan.lastName);
// console.log(juan['lastName']);

// const nameKey = 'Name';
// console.log(juan['first' + nameKey]);
// console.log(juan['last' + nameKey]);

// const interestedIn = prompt('What do you want to now about the user? Options: firstName, lastName, age, job, friends');

// if (juan[interestedIn]) console.log(juan[interestedIn]);
// else console.log('eso no esiste');

// juan.location = 'Maciel';
// juan['peso'] = 130;

// console.log(juan);

// console.log(`${juan.firstName} has ${juan.friends.length} friends and his best friend is ${juan.friends[0]}`);


// Video 044

// const juan = {
//   firstName: 'Juan',
//   lastName: 'Alvarez',
//   birthYear: 1982,
//   job: 'vendedor de manuale por interne',
//   friends: ['Michael', 'Steven', 'Peter'],
//   hasDriversLicense: true,

//   // calcAge: function (yearOfBirth) {
//   //   return 2021 - yearOfBirth;
//   // }

//   // calcAge: function () {
//   //   console.log(this); // muestra todo el object
//   //   return 2021 - this.birthYear;
//   // }

//   calcAge: function () {
//     this.age = 2021 - this.birthYear;
//     return this.age;
//   },

//   getSummary: function () {
//     return `${this.firstName} is a ${this.age ? this.age : this.calcAge()}-years old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license`;
//   }
// }

// // console.log(juan.calcAge(1991));
// // juan.calcAge(); // llamamos al metodo que calcula la edad y la guarda en el objeto
// // console.log(juan.age);

// console.log(juan.getSummary());



// Coding Challenge #3

// Let's go back to Mark and John comparing their BMIs! This time, let's use objects to
// implement the calculations! Remember: BMI = mass / height ** 2 = mass
// / (height * height) (mass in kg and height in meter)

// Your tasks:

// 1. For each of them, create an object with properties for their full name, mass, and
// height (Mark Miller and John Smith)

// 2. Create a 'calcBMI' method on each object to calculate the BMI (the same
// method on both objects). Store the BMI value to a property, and also return it
// from the method

// 3. Log to the console who has the higher BMI, together with the full name and the
// respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
// Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m
// tall.

// const mark = {
//   fullName: 'Mark Miller',
//   mass: 78,
//   height: 1.69,
//   calcBMI: function () {
//     this.bmi = this.mass / (this.height ** 2);
//     return this.bmi;
//   }
// }

// const john = {
//   fullName: 'John Smith',
//   mass: 92,
//   height: 1.95,
//   calcBMI: function () {
//     this.bmi = this.mass / (this.height ** 2);
//     return this.bmi;
//   }
// }

// mark.calcBMI();
// john.calcBMI();
// console.log(`${john.fullName}'s BMI (${john.bmi}) is ${john.bmi > mark.bmi ? 'higher' : 'lower'} than ${mark.fullName}'s BMI (${mark.bmi})!`);



// Video 046

// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weight repetition ${rep}.`);
// }


// Video 047

// const types = [];

// const juan = [
//   'Juan',
//   'Alvarez',
//   2021 - 1982,
//   'vendedor de manuale por interne',
//   ['Michael', 'Steven', 'Peter']
// ]

// for(let i = 0; i < juan.length; i++) {
//   console.log(juan[i], typeof juan[i]);
//   types[i] = (typeof juan[i]);

//   // types.push(typeof juan[i]); // otra manera de hacer lo mismo
// }

// console.log(types);

// const years = [1991, 2007, 1969, 2020];
// const ages = [];

// for (let i = 0; i < years.length; i++) {
//   ages.push(2021 - years[i]);
// }
// console.log(ages);



// const juan = [
//   'Juan',
//   'Alvarez',
//   2021 - 1982,
//   'vendedor de manuale por interne',
//   ['Michael', 'Steven', 'Peter']
// ]
// const juanSoloStrings = [];
// for(let i = 0; i < juan.length; i++) {
//   if (typeof juan[i] !== 'string') continue; // tambien podemos usar break
//   // continue salta la iteracion y pasa a la siguiente. break sale del for
//   else juanSoloStrings.push(juan[i]);
// }
// console.log(juanSoloStrings);



// Video 048

// const juan = [
//   'Juan',
//   'Alvarez',
//   2021 - 1982,
//   'vendedor de manuale por interne',
//   ['Michael', 'Steven', 'Peter']
// ]

// for (let i = juan.length - 1; i >= 0; i--) {
//   console.log(i, juan[i]);
// }

// for( let exercise = 1; exercise <= 3; exercise++) {
//   console.log(`------Starting exercise: ${exercise}------`);
//   for( let rep = 1; rep <= 5; rep++) {
//     console.log(`Lifting weight repetition ${rep}`);
//   }
// }



// Video 049

// for( let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weight repetition ${rep}`);
// }

// let dice = 0;
// let intentos = 0;
// while(dice !== 6) {
//   dice = Math.ceil(Math.random() * 6);
//   console.log(`number is ${dice}`);
//   intentos++
// }

// console.log(`ganaste luego de ${intentos} intentos`);




// Coding Challenge #4

// Let's improve Steven's tip calculator even more, this time using loops!

// Your tasks:

// 1. Create an array 'bills' containing all 10 test bill values

// 2. Create empty arrays for the tips and the totals ('tips' and 'totals')

// 3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate
// tips and total values (bill + tip) for every bill value in the bills array. Use a for
// loop to perform the 10 calculations!
// Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52
// Hints: Call ‘calcTip ‘in the loop and use the push method to add values to the
// tips and totals arrays 😉

// Bonus:

// 4. Bonus: Write a function 'calcAverage' which takes an array called 'arr' as
// an argument. This function calculates the average of all numbers in the given
// array. This is a difficult challenge (we haven't done this before)! Here is how to
// solve it:

// 4.1. First, you will need to add up all values in the array. To do the addition,
// start by creating a variable 'sum' that starts at 0. Then loop over the
// array using a for loop. In each iteration, add the current value to the
// 'sum' variable. This way, by the end of the loop, you have all values
// added together

// 4.2. To calculate the average, divide the sum you calculated before by the
// length of the array (because that's the number of elements)

// 4.3. Call the function with the 'totals' array

// 1
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

// 2
const tips = [];
const totals = [];

// 3
const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;

for( let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(bills[i] + tips[i]);
}

// 4
const calcAverage = (arr) => {
  let sum = 0;
  for( let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}

console.log(`The average is: ${calcAverage(totals)}`);