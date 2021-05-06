function getAvailableMonths(){
  // Check to make sure ssData is there
  let ssData = getSpreadsheetByName(ssID);
  if ( !ssData ){
    error('ssData not found in Google Drive. Please contact support. --storeMonth()');
    return;
  }
  let sheets = ssData.getSheets();
  let months = [];
  for( let i = 0; i < sheets.length; i++ ){
    let sheetName = sheets[i].getName();
    if( sheetName === jan ) months.push(sheetName);
    if( sheetName === feb ) months.push(sheetName);
    if( sheetName === mar ) months.push(sheetName);
    if( sheetName === apr ) months.push(sheetName);
    if( sheetName === may ) months.push(sheetName);
    if( sheetName === jun ) months.push(sheetName);
    if( sheetName === jul ) months.push(sheetName);
    if( sheetName === aug ) months.push(sheetName);
    if( sheetName === sep ) months.push(sheetName);
    if( sheetName === oct ) months.push(sheetName);
    if( sheetName === nov ) months.push(sheetName);
    if( sheetName === dec ) months.push(sheetName);
  }
  return months;
}
