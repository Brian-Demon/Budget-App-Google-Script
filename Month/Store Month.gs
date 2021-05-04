function storeMonth(month){ // returns true if stored correctly
  let ssData = getSpreadsheetByName(ssID);
  // check to make sure ssData is there
  if ( !ssData ){
    error('ssData not found in Google Drive. Please contact support. --storeMonth()');
    return false;
  }
  // Check if month passed is valid
  if( months.indexOf(month) === -1 ){
    error('Invalid month ("' + month + '") passed. --storeMonth()');
    return false;
  }
  // Check if 'Current Month' sheet is in ss
  let sheet = ss.getSheetByName(currentMonthName);
  if( !sheet ){
    error("Current Month sheet missing. --storeMonth()");
    return false;
  }
  // Check if sheet (month) is already stored
  let sheets = ssData.getSheets();
  let sheetNames = [];
  for( let i in sheets ){
    sheetNames.push(sheets[i].getName());
  }
  let index = sheetNames.indexOf(month);
  if( index > -1 ){
    error('"' + month + '" is already stored. Please contect support. --storeMonth()');
    return false;
  }
  
  // STORE Current Month SHEET AS MONTH NAME PASSED IN ssData
  sheet.copyTo(ssData);
  ssData.getSheetByName("Copy of Current Month").setName(month).setTabColor(colors.blue);
  
  ss.toast('"' + month + '" successfully stored');
  return true;
}
