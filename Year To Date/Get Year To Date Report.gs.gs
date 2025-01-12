function getYearToDateReport(){
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
  let yearToDateReportForm = HtmlService.createHtmlOutputFromFile('Year To Date/Year To Date Report').setTitle('Year To Date Report').setWidth(1200).setHeight(1200);
  ui.showModalDialog(yearToDateReportForm, "Year To Date Report");
}
