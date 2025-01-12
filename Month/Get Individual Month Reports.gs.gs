function getIndividualMonthReports(){
  // Check if month is January. If so, don't run below. Show error...
  var sheet = ss.getSheetByName(currentMonthSheetName);
  var month = getMonth(sheet)
  if (month == "January")
  {
    error("Cannot run until February...");
    return false;
  }

  // Prompt user for info
  let ui = SpreadsheetApp.getUi();
  let monthSummaryForm = HtmlService.createHtmlOutputFromFile('Month/Individual Month Reports').setTitle('Individual Month Reports').setWidth(1200).setHeight(1200);
  ui.showModalDialog(monthSummaryForm, "Individual Month Reports");
}
