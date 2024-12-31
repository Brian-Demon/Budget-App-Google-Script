function addLine(){
  let sheet = SpreadsheetApp.getActiveSheet();
  // Logger.log(sheet.getName());
  // CHECK FOR VALID SHEET
  if( sheet.getName() !== budgetSheetName && sheet.getName() !== incomeSheetName && sheet.getName() !== accountsSheetName && sheet.getName() !== ccSheetName){
    errorWrongSheet('Account, Budget, CCs, or Income');
    return;
  }
  
  let row = sheet.getActiveRange().getRow();
  let results = rowInBounds( sheet, row, "add" );
  
  // Logger.log("inBounds: " + results.inBounds);
  // Logger.log("startRow: " + results.startRow);
  // Logger.log("endRow: " + results.endRow);
  
  // CHECK IF SELECTED ROW IS IN THE BOUNDRIES
  if( !results.inBounds ){
    error("You cannot add a line below row " + row);
    return;
  } else {
    if( row === results.startRow - 2 ){
      row += 1;
    }
    if( sheet.getName() === budgetSheetName ){
      sheet.insertRowAfter( row );
      // sheet.getRange(row + 1, 3).insertCheckboxes();
      sheet.getRange(row + 1, 4).setValue(0).setNumberFormat(currencyFormat);
      sheet.getRange(row + 1, 2, 1, 3).setBackground(colors.darkGray4).setFontColor(colors.white).setFontWeight("bold").setBorder(true, true, true, true, true, true, "black", solid);
    } else if( sheet.getName() === incomeSheetName || sheet.getName() === accountsSheetName || sheet.getName() === ccSheetName){
      sheet.insertRowAfter( row );
      sheet.getRange(row + 1, 3).setValue("").setBackground(colors.darkGray4).setFontColor(colors.white).setFontWeight("bold").setBorder(true, true, true, true, true, true, "black", solid);
    } else {
      errorWrongSheet('Account, Budget, CCs, or Income');
      return;
    }
  }
}
