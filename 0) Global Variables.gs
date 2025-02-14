const ssID = SpreadsheetApp.getActiveSpreadsheet().getId();
var ss = SpreadsheetApp.openById(ssID);

/**************/
/*** SHEETS ***/
/**************/
const empty = "Empty";
const welcomeSheetName = "WELCOME"
const budgetSheetName = "Budget";
const incomeSheetName = "Income";
const ccSheetName = "CCs"
const accountsSheetName = "Accounts";
const currentMonthSheetName = "Current Month"; 

/**********************/
/*** DEFAULT SHEETS ***/
/**********************/
var defaultSheets = [
  welcomeSheetName,
  budgetSheetName,
  incomeSheetName,
  ccSheetName,
  accountsSheetName,
  currentMonthSheetName,
];

/************************/
/*** STRING VARIABLES ***/
/************************/
const expenseTrackerString = "Expense Tracker";
const incomeTrackerString = "Income Tracker";
const billRemindersString = "Bill Reminders";

/*************************/
/*** LOADING VARIABLES ***/
/*************************/
var prevSheet = [];

/*************************/
/*** MONTHLY VARIABLES ***/
/*************************/
const currentMonthName = "Current Month";
const jan = "January";
const feb = "February";
const mar = "March";
const apr = "April";
const may = "May";
const jun = "June";
const jul = "July";
const aug = "August";
const sep = "September";
const oct = "October";
const nov = "November";
const dec = "December";
const nextYear = "2022";
const months = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, nextYear];
const validMonths = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];
var monthData = [];
var monthSummary;

/***********************/
/*** OTHER VARIABLES ***/
/***********************/
// const defaultNumberOfTrackerRows = 100;


/***************/
/*** FORMATS ***/
/***************/
const timeZone = Session.getScriptTimeZone();
const currencyFormat = "$#,##0.00;$(#,##0.00)";
const dateFormat = "EEEE, MMMM dd, yyyy @h:mm a";
const shortDateFormat = "mm/dd";

/*********************/
/*** BORDER STYLES ***/
/*********************/
const solid = SpreadsheetApp.BorderStyle.SOLID;
const solidMedium = SpreadsheetApp.BorderStyle.SOLID_MEDIUM;

/**************/
/*** COLORS ***/
/**************/
const colors = {
  black:"#000000",
  darkGray4:"#434343",
  darkGray3:"#666666",
  darkGray2:"#999999",
  darkGray1:"#b7b7b7",
  Gray:"#cccccc",
  lightGray1:"#d9d9d9",
  lightGray2:"#efefef",
  lightGray3:"#f3f3f3",
  white:"#ffffff",
  redBerry:"#980000",
  red:"#ff0000",
  orange:"#ff9900",
  yellow:"#ffff00",
  green:"#00ff00",
  cyan:"#00ffff",
  cornflowerBlue:"#4a86e8",
  blue:"#0000ff",
  purple:"#9900ff",
  magenta:"#ff00ff",
  lightRedBerry3:"#e6b8af",
  lightRed3:"#f4cccc",
  lightOrange_:"#fce5cd",
  lightYellow3:"#fff2cc",
  lightGreen3:"#d9ead3",
  lightCyan3:"#d0e0e3",
  lightCornflowerBlue3:"#c9daf8",
  lightBlue3:"#cfe2f3",
  lightPurple3:"#d9d2e9",
  lightMagenta3:"#ead1dc",
  lightRedBerry2:"#dd7e6b",
  lightRed2:"#ea9999",
  lightOrange2:"#f9cb9c",
  lightYellow2:"#ffe599",
  lightGreen2:"#b6d7a8",
  lightCyan2:"#a2c4c9",
  lightCornflowerBlue2:"#a4c2f4",
  lightBlue2:"#9fc5e8",
  lightPurple2:"#b4a7d6",
  lightMagenta2:"#d5a6bd",
  lightRedBerry1:"#cc4125",
  lightRed1:"#e06666",
  lightOrange1:"#f6b26b",
  lightYellow1:"#ffd966",
  lightGreen1:"#93c47d",
  lightCyan1:"#76a5af",
  lightCornflowerBlue1:"#6d9eeb",
  lightBlue1:"#6fa8dc",
  lightPurple1:"#8e7cc3",
  lightMagenta1:"#c27ba0",
  darkRedBerry1:"#a61c00",
  darkRed1:"#cc0000",
  darkOrange1:"#e69138",
  darkYellow1:"#f1c232",
  darkGreen1:"#6aa84f",
  darkCyan1:"#45818e",
  darkCornflowerBlue1:"#3c78d8",
  darkBlue1:"#3d85c6",
  darkPurple1:"#674ea7",
  darkMagenta1:"#a64d79",
  darkRedBerry2:"#85200c",
  darkRed2:"#990000",
  darkOrange2:"#b45f06",
  darkYellow2:"#bf9000",
  darkGreen2:"#38761d",
  darkCyan2:"#134f5c",
  darkCornflowerBlue2:"#1155cc",
  darkBlue2:"#0b5394",
  darkPurple2:"#351c75",
  darkMagenta2:"#741b47",
  darkRedBerry3:"#5b0f00",
  darkRed3:"#660000",
  darkOrange3:"#783f04",
  darkYellow3:"#7f6000",
  darkGreen3:"#274e13",
  darkCyan3:"#0c343d",
  darkCornflowerBlue3:"#1c4587",
  darkBlue3:"#073763",
  darkPurple3:"#20124d",
  darkMagenta3:"#4c1130"
};