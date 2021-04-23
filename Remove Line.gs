function removeLine() {
  let sheet = SpreadsheetApp.getActiveSheet();
//  Logger.log(sheet.getName());
  // CHECK FOR VALID SHEET
  if( sheet.getName() !== budgetSheetName && sheet.getName() !== incomeSheetName ){
    errorWrongSheet('Budget" or "Income');
    return;
  }
  
  let row = sheet.getActiveRange().getRow();
//  Logger.log("Row: " + row);
  let results = rowInBounds( sheet, row, "remove" );
  
//  Logger.log("inBounds: " + results.inBounds);
//  Logger.log("startRow: " + results.startRow);
//  Logger.log("endRow: " + results.endRow);
  
  // CHECK IF SELECTED ROW IS IN THE BOUNDRIES
  if( !results.inBounds ){
    error("You cannot remove line at row " + row);
    return;
  } else {
//    Logger.log("Removing row: " + row);
    if( results.numberOfRows > 0 ){
      sheet.deleteRow(row);
      let maxRows = sheet.getMaxRows();
      if( maxRows < 1000 ){
        sheet.insertRowBefore(maxRows);
      }
    } else {
      error("You cannot delete the last line");
      return;
    }
  }
}
