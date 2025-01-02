function buildBills(sheet, buildAll){
  // Check and set ssData for database
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ){
    return;
  }
  // Check if passed sheet exists
  var validateSheetIsDefaultSheet = false;
  if (!validateSheetPassed(sheet, validateSheetIsDefaultSheet))
    return false;
  
  let lastRow = sheet.getLastRow();
  let startRow = 0;
  let startColumn = 22;
  
  // Find starting row (at "B" Column where "Line Item" is located) + 2
  for( let r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, startColumn).getValue();
  //  Logger.log("Row: " + r + ", Value: " + value);
    if( value === billRemindersString ){
      startRow = r + 3;
      break;
    }
  }

  if( startRow === 0 ){
    error("The sheet passed does not have a bills section. --buildBills()");
    return;
  }
  
  //***************************//
  // CLEAR THEN RE-BUILD BILLS //
  //***************************//
  // Set active cell so to not interupt process
  let activeCell = sheet.getRange(1,1);
  sheet.setCurrentCell(activeCell);
  let bills = getBills();
  let numberOfRows = bills.length;
  let maxRows = sheet.getMaxRows();
  let rangeArray = [ startRow, startColumn, (maxRows - startRow), 6 ];
  clearRange(sheet, rangeArray);
  // If there are no bills, return
  if( numberOfRows < 1 ) return;
  // Set names, due dates, and amounts
  for( let i = 0; i < bills.length; i++ ){
    let name = bills[i].name;
    let billDue = bills[i].billDue;
    let amount = bills[i].amount;
    sheet.getRange(startRow + i, startColumn).setValue(name);
    sheet.getRange(startRow + i, startColumn + 1).setValue(billDue);
    sheet.getRange(startRow + i, startColumn + 4).setValue(amount);
  }
  // Set main borders and background color
  sheet.getRange(startRow, startColumn, numberOfRows, 6).setBorder(true, true, true, true, true, true, "black", solid).setBackground(colors.lightPurple3);
  // Set horizontal alignment for "Bill," "Due," and "Paid?" columns
  sheet.getRange(startRow, startColumn, numberOfRows, 3).setHorizontalAlignment("center");
  // Set horizontal alignment for all other columns along with currency formatting
  sheet.getRange(startRow, startColumn + 3, numberOfRows, 3).setHorizontalAlignment("right").setNumberFormat(currencyFormat);

  // Set "Paid?" column cell formulas
  sheet.getRange(startRow, startColumn + 2).setValue('=IF($Z' + startRow + ' = 0, "PAID", IF($Y' + startRow + ' = 0, "NOT PAID",IF($Y' + startRow + ' < $Z' + startRow + ', "PARTIAL", "PAID")))');
  if( numberOfRows > 1 ){
    sheet.getRange(startRow, startColumn + 2).copyTo(sheet.getRange(startRow + 1, startColumn + 2, numberOfRows - 1, 1));
  }

  // Set "Paid Amount" column cell formulas
  let expenseTrackerRows = getTrackerRows(sheet, expenseTrackerString) + startRow - 1;
  sheet.getRange(startRow, startColumn + 3).setValue('=SUMIF(H$' + startRow + ':H$' + expenseTrackerRows + ', $V' + startRow + ', N$' + startRow + ':N$' + expenseTrackerRows + ')');
  if( numberOfRows > 1 ){
    sheet.getRange(startRow, startColumn + 3).copyTo(sheet.getRange(startRow + 1, startColumn + 3, numberOfRows - 1, 1));
  }

  // Set "Difference" column cell formulas
  sheet.getRange(startRow, startColumn + 5).setValue('=$Z' + startRow + '-$Y' + startRow);
  if( numberOfRows > 1 ){
    sheet.getRange(startRow, startColumn + 5).copyTo(sheet.getRange(startRow + 1, startColumn + 5, numberOfRows - 1, 1));
  }

  // Total Top Right
  sheet.getRange(startRow - 3, startColumn + 5).setValue("=SUM(Y" + startRow + ":Y" + (startRow + numberOfRows - 1) + ")");
  
  //***********************************//
  // Set Budget Conditional Formatting //
  //***********************************//
  if( !buildAll ){
    conditionalFormatting(sheet);
  }
}
