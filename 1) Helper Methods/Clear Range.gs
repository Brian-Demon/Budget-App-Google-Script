/***********************************************************************************************************************
  USEAGE:
  Clears all the cells in a range of a given sheet
  
  TIP:
  The rangeArray [ a, b, c, d ] maps to the range you want cleared, i.e. getRange( a, b, c, d )
************************************************************************************************************************/

function clearRange(sheet, rangeArray){
  // Check if sheet exists
  if( !sheet ){
    error("Sheet passed does not exist. Please contact support. --clearRange()");
    return;
  }
  // Check if rangeArray is valid
  if( rangeArray.length !== 4 ){
    Logger.log("Length: " + rangeArray.length);
    error("rangeArray passed is not valid. Please contact support. --clearRange()");
    return;
  }
  
  let startRow = rangeArray[0];
  let startColumn = rangeArray[1];
  let numberOfRows = rangeArray[2];
  let numberOfColumns = rangeArray[3];
//  Logger.log("Start Row: " + startRow);
//  Logger.log("Start Column: " + startColumn);
//  Logger.log("Number of Rows: " + numberOfRows);
//  Logger.log("Number of Columns: " + numberOfColumns);
  if( ss.getSheetByName(empty) ){
    ss.deleteSheet(empty);
  }
  ss.insertSheet(empty, 1).hideSheet();
  let emptySheet = ss.getSheetByName(empty);
  let emptyRange = emptySheet.getRange(startRow, startColumn, numberOfRows, numberOfColumns);
  emptySheet.getRange(startRow, startColumn, numberOfRows, numberOfColumns).copyTo(sheet.getRange(startRow, startColumn, numberOfRows, numberOfColumns));
  ss.deleteSheet(emptySheet);
}
