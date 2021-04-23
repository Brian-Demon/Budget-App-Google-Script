function getMonth(sheet){
  if( !sheet || defaultSheets.indexOf(sheet.getName()) !== -1 ){
    error("Invalid sheet passed. -- getMonth()");
    return;
  }
  
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  let month = '';
  for( let r = 1; r <= lastRow; r++ ){
    for( let c = 1; c <= lastColumn; c++ ){
      let value = sheet.getRange(r, c).getValue();
      if( months.indexOf(value) > -1 ){
        month = value;
//        Logger.log('The month for this sheet is: ' + month);
        break;
      }
    }
  }
  
  if( month === '' ){
    error('No month was found on "' + sheet.getName() + '" --getMonth()');
    return;
  } else {
    return month;
  }
}
