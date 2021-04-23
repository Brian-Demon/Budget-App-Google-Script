function restoreMonth(month){
  let ssData = getSpreadsheetByName(ssID);
  // check to make sure ssData is there
  if ( !ssData ){
    error('ssData not found in Google Drive. Please contact support. --restoreMonth(month)');
    return false;
  }
  // Check if month passed is valid
  if( months.indexOf(month) === -1 ){
    error('Invalid month ("' + month + '") passed. --restoreMonth(month)');
    return false;
  }
  // Check if month passed sheet is in ss
  let sheet = ss.getSheetByName(month);
  if( !sheet ){
    error('"' + month + '" sheet missing. --restoreMonth(month)');
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
    error('"' + month + '" is already stored. Please contect support. --restoreMonth(month)');
    return false;
  }
  
  // STORE MONTH in ssData THEN DELETE IN ss
  sheet.copyTo(ssData);
  ssData.getSheetByName("Copy of " + jan).setName(month).setTabColor(colors.blue);
  ss.deleteSheet(ss.getSheetByName(month));
  
  ss.toast('"' + month + '" successfully stored');
  return true;
}
