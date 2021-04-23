function editPreviousMonth(){
  let ui = SpreadsheetApp.getUi();
  let editPrevMonthForm = HtmlService.createHtmlOutputFromFile('Month/Edit Previous Month Modal').setTitle('Edit Previous Month').setWidth(300).setHeight(300);
  ui.showModalDialog(editPrevMonthForm, "Edit Previous Month");
}
