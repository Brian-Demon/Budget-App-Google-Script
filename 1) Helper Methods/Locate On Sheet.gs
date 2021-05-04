function locateOnSheet(sheet, find){
  // Check if sheet passed exists
  if( !sheet ){
    error("Sheet passed does not exist. --locateOnSheet()");
    return;
  }
  
  let location = {
    row: 0,
    column: 0,
    col: 0
  }
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  for( let r = 1; r <= lastRow; r++ ){
    let data = sheet.getRange(r, 1, 1, lastColumn).getValues().flat();
    let index = data.indexOf(find);
//    Logger.log("Row: " + r + ", Data: " + data.toString() + ", Index: " + index);
    if( index > -1 ){
//      Logger.log("FOUND! -- Row: " + r + ", Col: " + (index + 1));
      location.row = r;
      location.column = index + 1;
      location.col = index + 1;
      return location;
    }
  }
  Logger.log('"' + find + '" not found on "' + sheet.getName() + '" sheet');
  error('"' + find + '" not found on "' + sheet.getName() + '" sheet. --locateOnSheet()');
  return null;
}
