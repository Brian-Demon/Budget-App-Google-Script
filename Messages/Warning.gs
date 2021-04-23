function warning(message){
  SpreadsheetApp.getActiveSpreadsheet().toast(message, "Warning:", 10);
  Logger.log("Warning: " + message);
}