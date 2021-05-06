function getStartRow(sheet = ss.getActiveSheet()){
  // Check if sheet passed is valid, if not return null
  if( defaultSheets.indexOf(sheet.getName()) > -1 ){
    error("Sheet passed is not valid. ");
    return null;
  }
  
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
  Logger.log("Something went wrong... --getStartRow()");
  return null;
}
