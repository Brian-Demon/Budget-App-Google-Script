function editMonth(month){
  Logger.log(`Month passed to editMonth: ${month}`)
  // Check and set ssData for database
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ){
    return;
  }
  // Check to make sure month exists in ssData
  let sheet = ssData.getSheetByName(month);
  if( !sheet ){
    error('"' + month + '" does not exist in the database. Please contact support. --getLastMonthBalance()');
    return;
  }
  
  // Copy month sheet from ssData to ss, deleting it from ssData
  sheet.copyTo(ss);
  ssData.deleteSheet(sheet);
  ss.getSheetByName("Copy of " + month).setName(month);
  menu();
  setActiveSheet(month);
}
