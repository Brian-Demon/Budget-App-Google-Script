function updateTrackerDataValidations(sheet, tracker){
  // Check if sheet exists
  if (!validateSheetPassed(sheet))
    return false;

  // Ensure tracker is valid
  if (tracker != expenseTrackerString && tracker != incomeTrackerString)
  {
    error(`Invalid tracker: \"${tracker} passed. Please contact support. --updateTrackerDataValidations()`);
    return false;
  }

  // Variables
  // Budget
  var budget = getBudget();
  // Start Row and last row
  var startRow = 0;
  var lastRow = sheet.getLastRow();
  // Find starting row (at "B" Column where "Line Item" is located) + 2
  for( let r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 2).getValue();
  //  Logger.log("Row: " + r + ", Value: " + value);
    if( value === "Line Item" ){
      startRow = r + 2;
      break;
    }
  }
  // Other rows
  var maxRows = sheet.getMaxRows();
  var sheetLastRow = (maxRows - startRow + 1);
  var bottomRow = budget.length + startRow;
  var endRow = bottomRow - 1;
  var balanceRow = endRow + 3;
  var lastMonthEndingBalanceRow = balanceRow + 1;
  var thisMonthBalanceStartRow = lastMonthEndingBalanceRow + 3;
  // Column(s)
  var startColumn = getTrackerStartColumn(sheet, tracker);
  // Other variables
  var accounts = getAccountsSources();
  var numberOfAccounts = accounts.length;

  // Update Data Validation for Tracker(s)
  // EXPENSE
  if (tracker == expenseTrackerString){
    // CATEGORY
    let valuesRange = sheet.getRange(startRow, 2, budget.length, 1);
    let range = sheet.getRange(startRow, startColumn, sheetLastRow, 1);
    updateDataValidation(sheet, valuesRange, range);
    // ACCOUNT
    valuesRange = sheet.getRange(thisMonthBalanceStartRow, 3, numberOfAccounts, 1);
    range = sheet.getRange(startRow, startColumn + 2, sheetLastRow, 1);
    updateDataValidation(sheet, valuesRange, range);
    // CC
    valuesRange = getCCRange();
    range = sheet.getRange(startRow, startColumn + 3, sheetLastRow, 1);
    updateDataValidation(sheet, valuesRange, range);
  }
  // INCOME
  if (tracker == incomeTrackerString){
    // SOURCE
    let numberOfIncomeTrackerRows = getTrackerRows(sheet, incomeTrackerString);
    valuesRange = getIncomeRange();
    range = sheet.getRange(startRow, startColumn, numberOfIncomeTrackerRows, 1);
    updateDataValidation(sheet, valuesRange, range);
    // ACCOUNT
    valuesRange = sheet.getRange(thisMonthBalanceStartRow, 3, numberOfAccounts, 1);
    range = sheet.getRange(startRow, startColumn + 2, numberOfIncomeTrackerRows, 1);
    updateDataValidation(sheet, valuesRange, range);
  }
}
