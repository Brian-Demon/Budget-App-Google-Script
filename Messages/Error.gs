function error(message){
  SpreadsheetApp.getActiveSpreadsheet().toast(message, "ERROR:", 10);
  Logger.log("ERROR: " + message);
}