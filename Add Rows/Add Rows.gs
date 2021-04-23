function addRows(){
  // Check if active sheet valid
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//  Logger.log(sheet.getName());
  if( defaultSheets.indexOf(sheet.getName()) > -1 ){
    error("Can not add rows to this sheet. --addRows()");
    return;
  }
  
  // Prompt user for info
  let ui = SpreadsheetApp.getUi();
  let addRowsForm = HtmlService.createHtmlOutputFromFile('Add Rows/Add Rows Modal').setTitle('Add Rows').setWidth(500).setHeight(300);
  ui.showModalDialog(addRowsForm, "Need more rows...");
}
