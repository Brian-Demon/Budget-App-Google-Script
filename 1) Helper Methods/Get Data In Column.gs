function getDataInColumn(sheet, column = 1, numberOfColumns = 1){
  // Check if passed sheet exists
  if( !sheet ){
    error("Sheet passed does not exists. --getDataInColumn()");
    return;
  }

  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  
  let data = sheet.getRange(1, column, lastRow, numberOfColumns).getValues();

  // Logger.log(data);
  return data;
}
