function mySetColumnWidth(sheet, column, width){
  if( !sheet ){
    // Logger.log("Invalid sheet passed to mySetColumnWidth()");
    error("Invalid sheet passed. --mySetColumnWidth()");
    return;
  }
  if(!column || !width || typeof column !== 'string' ){
    // Logger.log("Invalid data passed to mySetColumnWidth()");
    error("Invalid data passed. --mySetColumnWidth()");
    return;
  }
  let target = sheet || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let col = colA1ToIndex(column);
//  Logger.log(`Column #:${col} ("${column}") width set to: ${width}`)
  sheet.setColumnWidth(col, width);
}
