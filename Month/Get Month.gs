function getMonth(sheet){
  if( !sheet || defaultSheets.indexOf(sheet.getName()) !== -1 ){
    error("Invalid sheet passed. -- getMonth()");
    return;
  }
  
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  let month = "";
  for( let r = 1; r<= lastRow; r++ ){
    let data = sheet.getRange(r, 1, 1, lastColumn).getValues().flat();
    for( let i in data ){
      let month = data[i];
      if( months.indexOf(month) > -1 ){
//        Logger.log('The month for this sheet is: ' + month);
        return month;
      }
    }
  }
  error('No month was found on "' + sheet.getName() + '" --getMonth()');
}
