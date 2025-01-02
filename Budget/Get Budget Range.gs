function getBudgetRange(sheet){
  // Check if passed sheet exist
  var sheetIsDefaultSheet = false;
  if (!validateSheetPassed(sheet, "getBudgetRange", sheetIsDefaultSheet))
    return false;
  
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  let startRow, numberOfRows, startColumn, numberOfColumns = 5;
  for( let r = 1; r <= lastRow; r++ ){
    let data = sheet.getRange(r, 1, 1, lastColumn).getValues().flat();
    let startIndex = data.indexOf("Line Item");
    let endIndex = data.indexOf("TOTALS:");
    if( startIndex > -1 ){
      startRow = r + 2;
      startColumn = startIndex + 1;
      continue;
    } else if( endIndex > -1 ){
      numberOfRows = r - startRow + 1;
    }
  }
//  Logger.log("sheet.getRange(" + startRow + ", " + startColumn + ", " + numberOfRows + ", " + numberOfColumns + " )");
  return sheet.getRange(startRow, startColumn, numberOfRows, numberOfColumns);
}
