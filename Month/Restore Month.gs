function restoreMonth(month){
  let ssData = getSpreadsheetByName(ssID);
  // check to make sure ssData is there
  if ( !ssData ){
    error('ssData not found in Google Drive. Please contact support. --restoreMonth()');
    return false;
  }
  // Check if month passed is valid
  if( months.indexOf(month) === -1 ){
    error('Invalid month ("' + month + '") passed. --restoreMonth()');
    return false;
  }
  // Check if month passed sheet is in ss
  let sheet = ss.getSheetByName(month);
  if( !sheet ){
    error('"' + month + '" sheet missing. --restoreMonth()');
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
    error('"' + month + '" is already stored. Please contect support. --restoreMonth()');
    return false;
  }
  
  // STORE MONTH in ssData THEN DELETE IN ss and move sheet to correct spot within months
  sheet.copyTo(ssData);
  ssData.getSheetByName("Copy of " + month).setName(month).setTabColor(colors.blue);
  ss.deleteSheet(ss.getSheetByName(month));
  // SHORT NEWLY STORED MONTH IN DB
  if(month !== dec){
    sheet = ssData.getSheetByName(month);
    sheetNames = [];
    for( let i in sheets ){
      sheetNames.push(sheets[i].getName());
    }
    ssData.setActiveSheet(sheet);
    sheets = ssData.getSheets();
    let nextMonth = months[months.indexOf(month) + 1];
    index = sheetNames.indexOf(nextMonth) + 1;
    ssData.moveActiveSheet(index);
  }
  
  menu();
  ss.toast('"' + month + '" successfully stored');
  return true;
}
