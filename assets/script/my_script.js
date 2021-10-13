/**
 * This document contails javascript code used in index.html document of this project.
*/
/* 
  References for manipulations of the date:
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  * notes of the CI course
*/

function getDateString(){
  /* getting the date string ddmmyyyy */
  let date, month, year;

  /* 
    for testing purposes of functions 
    for now only using today's date
  */
  let dateInput = new Date(); // date is the today's date

  // dd
  date = dateInput.getDate().toString();

  // mm (0 needed for january till september)
  month = Number.parseInt(dateInput.getMonth()); 
  month++; // getMonth() starts counting from 0 as the first
  let m = Number.parseInt(month);
  if (m < 10){
    month = '0' + month;
  }
  month = month.toString();

  // yyyy
  year = dateInput.getFullYear().toString(); 
  
  // dateString
  let dateString = date + month + year;
  return dateString;
}

function mirrorDateString(str) {
  /* 
    creating mirrored dateString ddmmyyyyyyyymmdd
    refernce for inversing the string:
    https://www.freecodecamp.org/news/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb/
  */
  let mirror = str + str.split("").reverse().join("");
  mirror = mirror.split("");
  return mirror;
}

// F2 - input str, return array
function getPaired(str) {
  /** turns received string to pairs of its symbols */
  let arr = [];

  str = str.split("");

  for (let i = 0; arr.length < str.length; i++) {
    let p = [];
    p.push(str[i]);
    p.push(str[i+1]);
    arr.push(p);
  }
  return arr;
}

// F3 - input array, return number
function getSummed(arr) {
  /** receives [],[]  
   * sums the 2 elements together
   * if sum < 10 returns result as str
   * else pass sum to getPaired() as a str
   * run itself
  */
  //arr = ['1', '2'];
  let sum;
  a1 = Number.parseInt(arr[0]);
  a2 = Number.parseInt(arr[1]);
  sum = a1 + a2;
  if (sum > 10) {
    sum = sum.toString;
    let p = [];
    sum = sum.split("");
    p.push(sum[0]);
    p.push(sum[1]);
    getSummed(p);
  }
  return sum.toString;
}

// F4 - input array, return str
function getNewString(arr) {
  /** receive array of pairs
   * declare a str 
   * iterate the array and run getSummed() for each
   * add result to str
   * return str
  */
  let str;

  arr.array.forEach(element => {
    let sum = getSummed(element);
    str.push(sum);
  });

  return str;
}

// F1 - input str, return array
function getNumbersPie(dateStr) {
  /** define a array of arrays to contain the mandala result
   * iterate str -> F2 -> array of pairs -> F4 -> str -> mandala array
   * return mandala array
  */
  
  let mandalaSlice = [[dateStr]];
  
  for (let i=0; i<16; i++) {
    let pairs = getPaired(mandalaSlice[i]); // gets pairs from the previous array
    let array = getNewString(pairs); // creates a new array
    mandalaSlice.push(array);
    console.log(mandalaSlice);

    return mandalaSlice;
  }







  
  /* creating the array from date for the mandala 'pieslice' of date numbers 
  let mirror = mirrorDateString(dateStr);
  let numbersPie = [];

  console.log(numbersPie);
  numbersPie.push(mirror);
  console.log(numbersPie);

  let counter1, counter2;
  do {
    counter1 = 16;
    for (let j = 1; j < mirror.length; j++) {
      counter1--;
      let pie = numbersPie[j-1];
      let array = [];
      for (let i = 0; i < counter1; i++) {
        let a, b;
        a = Number.parseInt(pie[i]);
        b = Number.parseInt(pie[i+1]);
        let sum = a + b;
        array.push(sum);
      }
      numbersPie.push(array);
      //console.log(numbersPie);
    }
    //console.log(counter);
    counter1--;
  } while (counter1 > 0);

  for (let i = 0; i < numbersPie.length; i++){
    console.log(numbersPie[i]);
  }
  return numbersPie;
  */
}

//calling functions for testing
let dateString = getDateString();
let mirrDateString = mirrorDateString(dateString);
let numbersPie = getNumbersPie(mirrDateString);