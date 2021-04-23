function errorWrongSheet(validSheet){
  SpreadsheetApp.getActiveSpreadsheet().toast('You must be on the "' + validSheet + '" tab', "ERROR: Invalid Sheet", 10);
  Logger.log('ERROR: Invalid Sheet -- You must be on the "' + validSheet + '" tab');
}