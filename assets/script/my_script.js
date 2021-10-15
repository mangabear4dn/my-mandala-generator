/**
 * This document contails javascript code used in index.html document of this project.
*/
/* 
  References for manipulations of the date:
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  * notes of the CI course
  * mentor help
*/

/**
 * Calculations to get from date to mandala slice
 */

function getDateString(dateInput){
  /* getting the date string ddmmyyyy */
  let date, month, year;

  /* 
    for testing purposes of functions 
    for now only using today's date
  */
  //let dateInput = new Date(); // date is the today's date

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
  dateInput = date + month + year;
  return dateInput;
}

function mirrorDateString(str) {
  /* 
    creating mirrored dateString ddmmyyyyyyyymmdd
    refernce for inversing the string:
    https://www.freecodecamp.org/news/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb/
  */
  let mirror = str + str.split("").reverse().join("");
  mirror.split("");
  return mirror;
}

// F2 - input str, return array
function getPaired(str) {
  /** turns received string to pairs of its symbols */
  let arr = [];

  str.split("");

  for (let i = 0; arr.length < str.length; i++) {
    let p = [];
    if (!(str[i+1])){
      break;
    }
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
  let sum;
  let a1 = Number.parseInt(arr[0]);
  let a2 = Number.parseInt(arr[1]);
  sum = a1 + a2;
  if (sum > 9) {
    sum = sum.toString();
    let p = [];
    sum = sum.split("");
    p.push(sum[0]);
    p.push(sum[1]);
    sum = getSummed(p);
  }
  return sum.toString();
}

// F4 - input array, return str
function getNewString(arr) {
  /** receive array of pairs
   * declare a str 
   * iterate the array and run getSummed() for each
   * add result to str
   * return str
  */
  let str = [];

  arr.forEach(element => {
    let sum = getSummed(element);
    str.push(sum);
  });
  //console.log(str); 
  return str.join("");
}

// F1 - input str, return array
function getNumbersPie(dateStr) {
  /** define a array of arrays to contain the mandala result
   * iterate str -> F2 -> array of pairs -> F4 -> str -> mandala array
   * return mandala array
  */
  
  let mandalaSlice = [];
  mandalaSlice.push(dateStr);
  
  for (let i=0; i<15; i++) {
    let pairs = getPaired(mandalaSlice[i]); // gets pairs from the previous array
    let array = getNewString(pairs); // creates a new array
    mandalaSlice.push(array);
    //console.log(array);
  }
  return mandalaSlice;
}

function caller(dateInput) {
  /**
   * Calls functions for creating a mandala slice for the user entered date
   */
  let dateString = getDateString(dateInput);
  let mirrDateString = mirrorDateString(dateString);
  let numbersPie = getNumbersPie(mirrDateString);
  
  return numbersPie;
}

/**
 * Code related to directly interacting with users
 */


function handleSubmit(event) {
  /**
   * function reacts to a date submission in the form
   * and calls for mandala slice to be created (caller())
   */
  let input = document.getElementById('date');
  
  document.getElementById('mandala').innerHTML = input.value;
  console.log(input.value);

  /*
    return added to make sure the form keeps values after submit button is pushed
    reference:
    https://stackoverflow.com/questions/26008538/keep-input-value-after-form-submit-with-a-catch
  */
  return false;
}

//let form = document.getElementById('form');
//form.addEventListener('submit', handleSubmit);