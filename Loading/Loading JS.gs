function loading(){
  let ui = SpreadsheetApp.getUi();
  let loading = HtmlService.createHtmlOutputFromFile('Loading/Loading').setTitle('LOADING...');
  
  // Check if loading sheet exists, if it does delete and re-make it
  let activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  prevSheet.push(activeSheet.getName());
  
  let sheet = ss.getSheetByName("Loading");
  if( !sheet ){
    ss.insertSheet("Loading", 0);
    sheet = ss.getSheetByName("Loading");
  }
  sheet.setTabColor(colors.black).setHiddenGridlines(true);
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).setBackground(colors.black);
  
  // Use three different methods to set active sheet to the newly created "Loading" sheet ... not sure which one is working correctly as they seem to all need to run in order to work in conjuntion...
  // 1)
  setActiveSheet("Loading");
  // 2)
  SpreadsheetApp.flush();
  sheet.activate();
  // 3)
  SpreadsheetApp.flush();
  let sheets = ss.getSheets();
  sheets[0].activate();
  
  ui.showModalDialog(loading, ' ');
}
