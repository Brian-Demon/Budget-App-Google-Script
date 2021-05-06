function setDataValidation(sheet, rule, range){
  // Check if passed sheet exists
  if( !sheet ){
    error("Sheet passed does not exists. --setDataValidation()");
    return;
  }
  
  let startRow = range.getRow();
  let startColumn = range.getColumn();
  let numberOfRows = range.getLastRow() - startRow + 1;
  range.setDataValidation(rule);
//  let cell = sheet.getRange(range.getRow(), range.getColumn());
//  cell.setDataValidation(rule);
//  sheet.getRange(startRow, startColumn).copyTo(sheet.getRange(startRow + 1, startColumn, numberOfRows - 1, 1));
}
