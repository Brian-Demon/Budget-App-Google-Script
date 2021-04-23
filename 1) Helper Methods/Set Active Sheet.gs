function setActiveSheet(sheetName){
  SpreadsheetApp.flush();
  let activeSS = SpreadsheetApp.getActiveSpreadsheet();
  let sheets = activeSS.getSheets();
  sheets[1].activate();
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if( !sheet ){
    error('"' + sheetName + '" does not exist');
    return;
  }
  if( sheet.isSheetHidden() ){
    error('"' + sheetName + '" is not accessable at this time');
    return;
  }
  sheet.activate();
}