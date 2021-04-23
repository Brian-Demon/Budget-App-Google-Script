function storeMonthCheck(){
  // Check if active sheet is able to be stored
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let sheetName = sheet.getName();
  if( sheetName === currentMonthName ){
    error('You cannot store this sheet. Use "START NEW MONTH" instead if this month is complete.');
    return;
  }
  if( months.indexOf(sheetName) === -1){
    error("You cannot store this sheet.");
    return;
  }
  
  let ui = SpreadsheetApp.getUi();
  let response = ui.alert("Store Month", "Are you sure you want to store " + sheetName + "?", ui.ButtonSet.YES_NO);
  if( response !== ui.Button.YES ){
    return;
  }
  restoreMonth(sheetName);
}
