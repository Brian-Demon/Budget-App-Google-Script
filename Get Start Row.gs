function getStartRow(sheet = ss.getActiveSheet()){
  // Validate sheet
  var validateSheetIsDefaultSheet = true;
  validateSheetPassed(sheet, validateSheetIsDefaultSheet);
  
  // Get start row
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  for( let r = 1; r <= lastRow; r++ ){
    let rowData = sheet.getRange(r, 1, 1, lastColumn).getValues().flat();
    let index = rowData.indexOf(expenseTrackerString);
    if( index > -1 ){
      return (r + 3);
    }
  }
  error("Start row could NOT be found. Contact support... --getStartRow()");
  return null;
}
