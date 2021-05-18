function buildBills(sheet, buildAll){
  // Check and set ssData for database
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ){
    return;
  }
  // Check if passed sheet exists
  if( !sheet ){
    error("Sheet passed does not exists. --buildBills()");
    return;
  }
  
  let lastRow = sheet.getLastRow();
  let startRow = 0;
  
  // Find starting row (at "B" Column where "Line Item" is located) + 2
  for( let r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 18).getValue();
//    Logger.log("Row: " + r + ", Value: " + value);
    if( value === billRemindersString ){
      startRow = r + 3;
      break;
    }
  }

  if( startRow === 0 ){
    error("The sheet passed does not have a budget section. --buildBudget()");
    return;
  }
  
  //***************************//
  // CLEAR THEN RE-BUILD BILLS //
  //***************************//
  // Set active cell so to not interupt process
  let activeCell = sheet.getRange(1,1);
  sheet.setCurrentCell(activeCell);
  let bills = getBills();
  Logger.log(bills.toString());
  let numberOfRows = bills.length;
  let maxRows = sheet.getMaxRows();
  let rangeArray = [ startRow, 18, (maxRows - startRow), 5 ];
  clearRange(sheet, rangeArray);
  // If there are no bills, return
  if( numberOfRows < 1 ) return;
  // Set names and amounts
  for( let i = 0; i < bills.length; i++ ){
    let name = bills[i].name;
    let amount = bills[i].amount;
    sheet.getRange(startRow + i, 18).setValue(name);
    sheet.getRange(startRow + i, 21).setValue(amount);
  }
  // Set main borders and background color
  sheet.getRange(startRow, 18, numberOfRows, 5).setBorder(true, true, true, true, true, true, "black", solid).setBackground(colors.lightPurple3);
  // Set horizontal alignment for "Bill" and "Paid?" columns
  sheet.getRange(startRow, 18, numberOfRows, 2).setHorizontalAlignment("center");
  // Set horizontal alignment for all other columns along with currency formatting
  sheet.getRange(startRow, 20, numberOfRows, 3).setHorizontalAlignment("right").setNumberFormat(currencyFormat);;
  // Set "Paid?" column cell formulas
  let expenseTrackerRows = getTrackerRows(sheet, expenseTrackerString) + startRow - 1;
  sheet.getRange(startRow, 19).setValue('=IF($U' + startRow + ' = 0, "PAID", IF($T' + startRow + ' = 0, "NOT PAID",IF($T' + startRow + ' < $U' + startRow + ', "PARTIAL", "PAID")))');
  if( numberOfRows > 1 ){
    sheet.getRange(startRow, 19).copyTo(sheet.getRange(startRow + 1, 19, numberOfRows - 1, 1));
  }
  // Set "Paid Amount" column cell formulas
  sheet.getRange(startRow, 20).setValue('=SUMIF(H$' + startRow + ':K$' + expenseTrackerRows + ', $R' + startRow + ', K$' + startRow + ':K$' + expenseTrackerRows + ')');
  if( numberOfRows > 1 ){
    sheet.getRange(startRow, 20).copyTo(sheet.getRange(startRow + 1, 20, numberOfRows - 1, 1));
  }
  // Set "Difference" column cell formulas
  sheet.getRange(startRow, 22).setValue('=$U' + startRow + '-$T' + startRow);
  if( numberOfRows > 1 ){
    sheet.getRange(startRow, 22).copyTo(sheet.getRange(startRow + 1, 22, numberOfRows - 1, 1));
  }
  // Total Top Right
  sheet.getRange(startRow - 3, 22).setValue("=SUM(T" + startRow + ":T" + (startRow + numberOfRows - 1) + ")");
  
  //***********************************//
  // Set Budget Conditional Formatting //
  //***********************************//
  if( !buildAll ){
    conditionalFormatting(sheet);
  }
}
