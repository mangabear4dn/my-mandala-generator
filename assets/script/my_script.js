/**
 * This document contails javascript code used in index.html document of this project.
*/
/* 
  References for manipulations of the date:
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  * and other JS reference documentations on attributes and built in functions incl. Strings, forms etc.
  * notes of the CI course
  * mentor's help
*/

/**
 * Calculations to get from date to mandala slice
 */

function getDateString(dateInput){
  /* getting the date string ddmmyyyy */
  let date, month, year;

  // because the received input is yyyy-mm-dd
  date = dateInput.substring(8, 10);
  month = dateInput.substring(5, 7);
  year = dateInput.substring(0, 4);
  
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

  // check that date was entered
  if (input.value === '') {
    alert("Please enter date to calculate mandala!")
    return false;
  }

  console.log('Received date: ' + input.value);
  let mandala = caller(input.value);

  // html to display the mandala
  let html = `
  <div id="mandala-display">`;

  for (let str of mandala) {
    html += `<div class="div-size${str.length}">
    `;
    for (let i=0;  i < str.length; i++) {
      html += `<span class="span${str[i]}"> ${str[i]} </span>`;
    }
    html += `</div><br>
    `;
  }

  html += `</div>`;

  document.getElementById('mandala').innerHTML = html;

  /* 
   statistics about the displayed mandala
   reference to the calculations for the count:
   https://stackoverflow.com/questions/881085/count-the-number-of-occurrences-of-a-character-in-a-string-in-javascript?rq=1
  */
  let statistics = `
  <div id="input-display">Date: ${input.value}</div>
  <table>
  <thead>
  <tr>
  <th>Number</th>
  <th>Color</th>
  <th>Count</th>
  </tr>
  </thead>
  <tbody>`;
  
  let colors = ['White', 'Red', 'Dark blue', 'Green', 'Yellow', 'Light Blue', 'Sea Green', 'Pink', 'Orange', 'Violet'];
  let counter = [0,0,0,0,0,0,0,0,0,0];
  
  for (let str of mandala) {
    for (let i of str) {
      let count = str.match(new RegExp(i, "g")) || [].length;
      count.parseInt;
      counter[i]++;
    }
  }
  // console.log(counter);
  
  for (let i = 0; i < counter.length; i++) {
    statistics += `
    <tr>
    <td>${i}</td>
    <td class='span${i}'>${colors[i]}</td>
    <td>${counter[i]}</td>
    </tr>`;
  }
  
  statistics += `
  </tbody>
  </table>`;

  // console.log(statistics);

  document.getElementById('stats').innerHTML = statistics;

  /* 
   Seven cycles of 52 days starting from the day after birthday
  */
  let days52 = `
  <div>Day 0 (mm.dd): ${input.value.substring(5, 10)}</div>
  <table>
  <thead>
  <tr>
  <th>Cycle</th>
  <th>Time period</th>
  <th>Meaning</th>
  </tr>
  </thead>
  <tbody>`;

  date0 = Date.parse(input.value);
  console.log(date0);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let counterForDates = [[1, 52], [53, 104], [105, 156], [157, 208], [209, 260], [261, 312], [313, 364]];
  let dates52 = [];
  let meanings52 = ['-1-', '-2-', '-3-', '-4-', '-5-', '-6-', '-7-'];

  /*
    Reference: https://stackoverflow.com/questions/563406/how-to-add-days-to-date
    Calculating adding days to the birthday for the ranges
  */
    Date.prototype.addDays = function(days) {
      var date = new Date(date0.valueOf());
      date.setDate(date.getDate() + days);
      return date;
  }
  var dateStart = new Date();
  console.log(dateStart.addDays(5));


  for (let i = 0; i < counterForDates.length; i++) {
    let fromDate = dateStart.addDays(counterForDates[i][0]);
    let tillDate = dateStart.addDays(counterForDates[i][1]);
    let rangeDates = `${monthNames[fromDate.getMonth()]} ${fromDate.getDate()} - ${monthNames[tillDate.getMonth()]} ${tillDate.getDate()}`;
    dates52.push(rangeDates);
    console.log(i);
  }

  console.log(dates52);
  
  for (let i = 0; i < 7; i++) {
    days52 += `
    <tr>
    <td>${i+1}</td>
    <td>${dates52[i]}</td>
    <td>${meanings52[i]}</td>
    </tr>`;
  }
  
  days52 += `
  </tbody>
  </table>`;

  // console.log(days52);

  document.getElementById('days52').innerHTML = days52;

  /*
    return added to make sure the form keeps values after submit button is pushed
    references:
    https://stackoverflow.com/questions/26008538/keep-input-value-after-form-submit-with-a-catch
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  */
  return false;
}