function updateAccounts(){
  // Check if database exiists
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ) return;
  
  let accountSources = getAccountsSources();
  
  let sheet = ssData.getSheetByName(accountsSheetName);
  if( !sheet ){
    let sheets = ssData.getSheets();
    ssData.insertSheet(accountsSheetName, 2).setTabColor(colors.green);
    sheet = ssData.getSheetByName(accountsSheetName);
  }
  
  sheet.clear();
  for( let i = 0; i < accountSources.length; i++ ){
    sheet.getRange(i + 1, 1).setValue(accountSources[i]);
  }
  
  // Find the Account Tracker section's range for the first, "Source" column and update the data validation for the dropdowns
  sheet = ss.getSheetByName(currentMonthName);
  let lastRow = sheet.getLastRow();
  let startRow = 0;
  for( let r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 20).getValue();
    // Logger.log(`Value at r:${r}/c:${20} = ${value}`);
    if( value === "Bill Reminders" ){
      startRow = r + 3;
      break;
    }
  }

  // @TODO: CHANGE THE BELOW INFO SO IT UPDATES THE DATA VALIDATION FOR BOTH THE EXPENSE AND INCOME TRACKERS FOR CURRENT MONTH SHEET!!!!
  let numberOfRows = getTrackerRows(sheet, incomeTrackerString);
  let valuesRange = getAccountsRange();
  let range = sheet.getRange(startRow, 10, numberOfRows, 1);
  updateDataValidation(sheet, valuesRange, range);
  numberOfRows = getTrackerRows(sheet, expenseTrackerString);
  valuesRange = getAccountsRange();
  range = sheet.getRange(startRow, 16, numberOfRows, 1);
  updateDataValidation(sheet, valuesRange, range);
  
  // Set date updated (row, 2)
  let row = 3;
  today = Utilities.formatDate(new Date(), timeZone, dateFormat);
  accountSheet = ss.getSheetByName(accountsSheetName);
  accountSheet.getRange(row, 2).setValue(today);
  
  ss.toast("Accounts updated in the database and for the Current Month sheet successfully.");
}
