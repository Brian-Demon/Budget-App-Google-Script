function getAccountsRange(){
  // Check if accounts sheet exists
  let sheet = ss.getSheetByName(accountsSheetName);
  if( !sheet ){
    error("Accounts Sheet is missing. Please contact support. --getAccountsRange()");
    return;
  }
  
  // Find start location of where the accounts source list (column) starts
  let accountsLocation = locateOnSheet(sheet, "Accounts Sources");
  if( !accountsLocation ){
    error('Could not locate "Accounts Sources" on "Accounts" sheet. --getAccountsRange()');
    return;
  }
  let startRow = accountsLocation.row + 2;
  let column = accountsLocation.col;
  let lastRow = sheet.getLastRow();
  let endRow = 0;
  // Itorate over section and store each accounts source 
  for( let r = startRow; r <= lastRow; r++ ){
    let value = sheet.getRange(r, column).getValue();
    let color = sheet.getRange(r, column).getBackground();
//    Logger.log("Row: " + r + ", Value: " + value + ", Color: " + color + "darkGray4: " + colors.darkGray4);
    if( color !== colors.darkGray4 ){
      endRow = r - 1;
      break;
    }
  }
  
  return sheet.getRange(startRow, column, (endRow - startRow + 1), 1);
}
