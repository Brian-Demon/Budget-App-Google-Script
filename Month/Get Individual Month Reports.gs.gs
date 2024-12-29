function getIndividualMonthReports(){
  // Prompt user for info
  let ui = SpreadsheetApp.getUi();
  let monthSummaryForm = HtmlService.createHtmlOutputFromFile('Month/Individual Month Reports').setTitle('Individual Month Reports').setWidth(1200).setHeight(1200);
  ui.showModalDialog(monthSummaryForm, "Individual Month Reports");
}
