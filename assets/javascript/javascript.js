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
  let dateInput = new Date; // date is the today's date

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

console.log(getDateString());
