function tutorial(){
  let ui = SpreadsheetApp.getUi();
  let setupForm = HtmlService.createHtmlOutputFromFile('Setup/Tutorial Modal').setTitle('Tutorial').setWidth(1000).setHeight(700);
  ui.showModalDialog(setupForm, "Tutorial");
}
