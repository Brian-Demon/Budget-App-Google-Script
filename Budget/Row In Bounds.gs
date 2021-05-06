function rowInBounds(sheet, currentRow, typeOfAction) {
  let startRow = 0;
  let endRow = 0;
  let lastRow = sheet.getLastRow();
  let results = {
    inBounds: false,
    startRow: 0,
    endRow: 0,
    numberOfRows: 0
  };
  let column = 0;
  if( sheet.getName() === budgetSheetName ){
    column = 2;
  } else if( sheet.getName() === incomeSheetName ) {
    column = 3;
  } else {
    error("Column is set to 0 due to wrong sheet name. --rowInBounds()");
    return;
  }
  //  Logger.log("Last Row: " + lastRow);
  
  // Find minimum row that can be selected to add a line
  for( let r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, column).getValue();
//    Logger.log("Row: " + r + ", Value: " + value);
    if( value === "start" ){
      startRow = r + 1;
    }
    if( value === "end" ){
      endRow = r - 1;
      break;
    }
  }
  
  //  Logger.log("Start: " + startRow);
  //  Logger.log("End: " + endRow);
  if( currentRow >= startRow && currentRow <= endRow ){
    results.inBounds = true;
  } else {
    if( currentRow === (startRow - 2) && typeOfAction === "add" ){
      results.inBounds = true;
    } else {
      results.inBounds = false;
    }
  }
  
  results.startRow = startRow;
  results.endRow = endRow;
  results.numberOfRows = endRow - startRow;
  
  return results;
}
