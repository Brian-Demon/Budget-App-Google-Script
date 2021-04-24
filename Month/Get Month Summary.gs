function getMonthSummary(){
  // Prompt user for info
  let ui = SpreadsheetApp.getUi();
  let monthSummaryForm = HtmlService.createHtmlOutputFromFile('Month/Month Summary').setTitle('Month Summary').setWidth(1200).setHeight(700);
  ui.showModalDialog(monthSummaryForm, "Get Month Summary");
}
