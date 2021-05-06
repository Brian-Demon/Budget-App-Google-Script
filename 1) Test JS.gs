function test(){
  // Display beggining steps modal for user
  let ui = SpreadsheetApp.getUi();
  let setupForm = HtmlService.createHtmlOutputFromFile('Setup/Setup Modal').setTitle('Initial Setup').setWidth(500).setHeight(500);
  ui.showModalDialog(setupForm, "Initial Setup");
//  @TODO
}
