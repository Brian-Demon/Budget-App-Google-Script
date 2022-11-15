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
  let startColumn = 20;
  
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
  let rangeArray = [ startRow, startColumn, (maxRows - startRow), 5 ];
  clearRange(sheet, rangeArray);
  // If there are no bills, return
  if( numberOfRows < 1 ) return;
  // Set names and amounts
  for( let i = 0; i < bills.length; i++ ){
    let name = bills[i].name;
    let amount = bills[i].amount;
    sheet.getRange(startRow + i, startColumn).setValue(name);
    sheet.getRange(startRow + i, startColumn + 3).setValue(amount);
  }
  // Set main borders and background color
  sheet.getRange(startRow, startColumn, numberOfRows, 5).setBorder(true, true, true, true, true, true, "black", solid).setBackground(colors.lightPurple3);
  // Set horizontal alignment for "Bill" and "Paid?" columns
  sheet.getRange(startRow, startColumn, numberOfRows, 2).setHorizontalAlignment("center");
  // Set horizontal alignment for all other columns along with currency formatting
  sheet.getRange(startRow, startColumn + 2, numberOfRows, 3).setHorizontalAlignment("right").setNumberFormat(currencyFormat);;
  // Set "Paid?" column cell formulas
  let expenseTrackerRows = getTrackerRows(sheet, expenseTrackerString) + startRow - 1;
  sheet.getRange(startRow, startColumn + 1).setValue('=IF($W' + startRow + ' = 0, "PAID", IF($V' + startRow + ' = 0, "NOT PAID",IF($V' + startRow + ' < $W' + startRow + ', "PARTIAL", "PAID")))');
  if( numberOfRows > 1 ){
    sheet.getRange(startRow, startColumn + 1).copyTo(sheet.getRange(startRow + 1, startColumn + 1, numberOfRows - 1, 1));
  }
  // Set "Paid Amount" column cell formulas
  sheet.getRange(startRow, startColumn + 2).setValue('=SUMIF(H$' + startRow + ':L$' + expenseTrackerRows + ', $S' + startRow + ', L$' + startRow + ':L$' + expenseTrackerRows + ')');
  if( numberOfRows > 1 ){
    sheet.getRange(startRow, startColumn + 2).copyTo(sheet.getRange(startRow + 1, startColumn + 2, numberOfRows - 1, 1));
  }
  // Set "Difference" column cell formulas
  sheet.getRange(startRow, startColumn + 4).setValue('=$W' + startRow + '-$V' + startRow);
  if( numberOfRows > 1 ){
    sheet.getRange(startRow, startColumn + 4).copyTo(sheet.getRange(startRow + 1, startColumn + 4, numberOfRows - 1, 1));
  }
  // Total Top Right
  sheet.getRange(startRow - 3, startColumn + 4).setValue("=SUM(V" + startRow + ":V" + (startRow + numberOfRows - 1) + ")");
  
  //***********************************//
  // Set Budget Conditional Formatting //
  //***********************************//
  if( !buildAll ){
    conditionalFormatting(sheet);
  }
}
