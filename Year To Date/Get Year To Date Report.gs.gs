function getYearToDateReport(){
  // Prompt user for info
  let ui = SpreadsheetApp.getUi();
  let yearToDateReportForm = HtmlService.createHtmlOutputFromFile('Year To Date/Year To Date Report').setTitle('Year To Date Report').setWidth(1200).setHeight(1200);
  ui.showModalDialog(yearToDateReportForm, "Year To Date Report");
}
