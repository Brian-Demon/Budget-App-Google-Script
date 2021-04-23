function getSheetNames(ssId){
  let spreadsheet = SpreadsheetApp.openById(ssId);
  // CHECK IF SPREADSHEET PASSED EXISTS
  if( !spreadsheet ){
    error('No such spreadsheet with ID "' + ssId + '"');
    return;
  }
  
  // ITORATE OVER PASSED SPREADSHEET AND RETURN ARRAY CONTAINING THE NAMES OF ALL THE SHEETS
  let sheets = spreadsheet.getSheets();
  let names = [];
  for( let i = 0; i < sheets.length; i++ ){
    names.push(sheets[i].getName());
  }
  return names;
}
