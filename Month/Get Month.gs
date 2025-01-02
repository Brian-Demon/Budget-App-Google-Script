function getMonth(sheet){
  // Validate sheet passed
  var sheetName = sheet.getSheetName();
  var validateSheetIsDefaultSheet = true;
  if (!validateSheetPassed(sheet, validateSheetIsDefaultSheet))
    return false;
  
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  let month = "";
  for( let r = 1; r<= lastRow; r++ ){
    let data = sheet.getRange(r, 1, 1, lastColumn).getValues().flat();
    for( let i in data ){
      let month = data[i];
      if( months.indexOf(month) > -1 ){
        // Logger.log('The month for this sheet is: ' + month);
        return month;
      }
    }
  }
  error('No month was found on "' + sheet.getName() + '" --getMonth()');
}
