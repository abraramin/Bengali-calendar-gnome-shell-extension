"use strict";

var wbDays = 
{
    "start_of_time" : "April 15, 2015",
    "start_year" : 1422,
    "1422" : [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    "1423" : [31, 32, 31, 31, 31, 31, 30, 29, 30, 29, 30, 31],
    "1424" : [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    "1425" : [31, 31, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    "1426" : [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    "1427" : [31, 32, 31, 31, 31, 31, 30, 29, 30, 29, 30, 31],
    "1428" : [],
    "1429" : [],
    "1430" : [],
    "1431" : [],
    "1432" : [],
    "1433" : [],
    "1434" : [],
    "daysInYear" : [365, 366, 365, 365, 365, 366],
    "end_of_time" : "April 15, 2021"
};

var bnMonths = ["বৈশাখ","জ্যৈষ্ঠ","আষাঢ়","শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ","পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"];

function getBnDayOfWeek(dayOfWeekIndex)
{
  var bnDaysOfWeek = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি"];
  return bnDaysOfWeek[dayOfWeekIndex];
}

/*
*A function that takes an integer and translates it to Bengali.
*@param enNumber - the number to be translated.
*@return bnNumber - the translated number.
*/
function translate(enNumber)
{
  var bengaliDigits = {0:"০", 1:"১", 2:"২", 3:"৩", 4:"৪", 5:"৫", 6:"৬", 7:"৭", 8:"৮", 9:"৯"};
  var bnNumber = "";
  if(enNumber<10)
  {
    bnNumber = bengaliDigits[enNumber];
    bnNumber = bengaliDigits["0"]+bnNumber;
    return bnNumber;
  }
  var intEnNumber = parseInt(enNumber, 10);
  while(intEnNumber > 0)
  {
    var currentDigit = intEnNumber % 10;
    intEnNumber = Math.floor(intEnNumber /10);
    bnNumber = bengaliDigits[String(currentDigit)]+bnNumber;
  }
  return bnNumber;
}


function getDateArray()
{
  var enDate = new Date();
  var date = enDate.getDate();
  var month = enDate.getMonth()+1;
  var year = enDate.getFullYear();
  var day = enDate.getDay();
  var dateArray = [date, month, year, day];
  return dateArray;
}

/*
* Returns the Gregorian calendar date translated to bengali.
*/
function bnEnToday()
{
  var enDate = getDateArray();
  var bnDay = translate(enDate[0]);
  var bnMonth = translate(enDate[1]);
  var bnYear = translate(enDate[2]);
  var bnDayOfWeek = getBnDayOfWeek(enDate[3]);
  var bnDate = (bnDayOfWeek+" "+bnDay+"/"+bnMonth+"/"+bnYear);
  return bnDate;
}

/*
* Returns the date in gregorian calendar when the current Bengali year started.
* Returns a date object.
*/
function bnStartOfYear(dateToday, bnDayOne)
{
  var startOfYear;
  if((dateToday[1]<=parseInt(bnDayOne.getMonth())+1))
  {
    if((dateToday[1]==parseInt(bnDayOne.getMonth())+1) && dateToday[0] >= bnDayOne.getDate())
    {
      var startOfYear = new Date("April 14, "+dateToday[2]);
      return startOfYear;
    }
    var startOfYear = new Date("April 14, "+(parseInt(dateToday[2])-1));
    return startOfYear;
  }
  var startOfYear = new Date("April 14, "+dateToday[2]);
  return startOfYear;
}

/*
* Return an array containing the Bengali date and month.
*/
function getBnDateMonth(firstDayOfYear)
{
  var bnDaysInMonth = [31,31,31,31,31,30,30,30,30,30,30,30];
  //var today = new Date();
  var today = new Date();
  var numDays = Math.floor((Math.round(today) - Math.round(firstDayOfYear)) / (1000*60*60*24));
  numDays++; //Account for day 1 - i.e. April 14th is 1st not number 0 day.
  var dayMonth = [0,0]; //Stores the current Bengali day and month.
  //Test for leap year
  if((!(today.getFullYear()%4) && today.getFullYear()%100) || (!(today.getFullYear()%400)))
  {
    bnDaysInMonth[10] = 31;
  }
  var i = 0;
  while(numDays > bnDaysInMonth[i])
  {
    numDays = numDays - bnDaysInMonth[i];
    i++;
  }
  dayMonth[0] = numDays;
  dayMonth[1] = i;

  return dayMonth;
}


function wbBnToday()
{
  var bnDateArray = [0,0,0,0];
  bnDateArray[3] = getBnDayOfWeek(getDateArray()[3]); //Day
  var enDate = getDateArray();
  var msToDay = 24*60*60*1000;
  var beginningOfTime = new Date(wbDays["start_of_time"]);
  var now = new Date()
  if(new Date(wbDays["end_of_time"]) < now)
    return "No more dates available.";
  var diffDays = Math.round(Math.abs((beginningOfTime.getTime() - now.getTime())/msToDay));
  var yearInc = 0;
  for(var i = 0; i<wbDays["daysInYear"].length; i++)
  {
    if(diffDays-wbDays["daysInYear"][i]<0)
      break;
    diffDays-=wbDays["daysInYear"][i];
    yearInc+=i;
  }
  var enBnYear = wbDays["start_year"]+yearInc+1; //year
  bnDateArray[0] =  translate(enBnYear);
  var monthInc = 0;
  for(var y = 0; y<wbDays[String(enBnYear)].length; y++)
  {
    if(diffDays-wbDays[String(enBnYear)][y]<0)
      break;
    diffDays-=wbDays[String(enBnYear)][y];
    monthInc+=y;
  }
  bnDateArray[1] = bnMonths[(monthInc)];
  bnDateArray[2] = translate(diffDays);
  return bnDateArray[3] +" "+ bnDateArray[2]+" "+bnDateArray[1]+", "+bnDateArray[0];
}


function bdBnToday()
{
  var enDate = getDateArray();
  var bnCalendarDayOne = new Date("April 14, 0593"); //months are indexed from 0 to 11. Actual date 14/04/593 AD.
  var bnDateArray = [0,0,0,0];
  bnDateArray[3] = getBnDayOfWeek(enDate[3]); //Get the day of the week today.

  // get the year.
  var monthCheck = (enDate[0] >=(bnCalendarDayOne.getDate())) && (enDate[1]==parseInt(bnCalendarDayOne.getMonth())+1);
  if(monthCheck || (enDate[1] > bnCalendarDayOne.getMonth()+1))
    bnDateArray[0] = translate(parseInt(enDate[2]) - parseInt(bnCalendarDayOne.getFullYear()));
  else
    bnDateArray[0] = translate(parseInt(enDate[2]) - parseInt(bnCalendarDayOne.getFullYear()) -1);


  var startOfYearDate = bnStartOfYear(enDate, bnCalendarDayOne);
  var bnDateMonth = getBnDateMonth(startOfYearDate);
  bnDateArray[1] = translate(bnDateMonth[0]);
  bnDateArray[2] = bnMonths[bnDateMonth[1]];
  return bnDateArray[3] +" "+ bnDateArray[1]+" "+bnDateArray[2]+", "+bnDateArray[0];
}

