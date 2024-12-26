function updateIncome(){
  // Check if database exiists
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ) return;
  
  let incomeSources = getIncomeSources();
  
  let sheet = ssData.getSheetByName(incomeSheetName);
  if( !sheet ){
    let sheets = ssData.getSheets();
    ssData.insertSheet(incomeSheetName, 2).setTabColor(colors.green);
    sheet = ssData.getSheetByName(incomeSheetName);
  }
  
  sheet.clear();
  for( let i = 0; i < incomeSources.length; i++ ){
    sheet.getRange(i + 1, 1).setValue(incomeSources[i]);
  }
  
  // Find the Income Tracker section's range for the first, "Source" column and update the data validation for the dropdowns
  sheet = ss.getSheetByName(currentMonthName);
  let lastRow = sheet.getLastRow();
  let startRow = 0;
  let column = 22;
  for( let r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, column).getValue();
    // Logger.log(`Value at r:${r}/c:${column} = ${value}`);
    if( value === "Bill Reminders" ){
      startRow = r + 3;
      break;
    }
  }
  let numberOfRows = getTrackerRows(sheet, incomeTrackerString);
  let valuesRange = getIncomeRange();
  let range = sheet.getRange(startRow, 16, numberOfRows, 1);
  // UPDATE DATA VALIDATION
  updateDataValidation(sheet, valuesRange, range);
  
  // Set date updated (row, 2)
  let row = 3;
  today = Utilities.formatDate(new Date(), timeZone, dateFormat);
  incomeSheet = ss.getSheetByName(incomeSheetName);
  incomeSheet.getRange(row, 2).setValue(today);
  
  ss.toast("Income updated in the database and for the Current Month sheet successfully.");
}
