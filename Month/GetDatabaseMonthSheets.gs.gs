function getMonthSheetsInDatabase(){ // Returns array of Sheet objects if they are a month...
  // Check for database existence...
  if (!checkForDatabase){
    error("The database (Google spreadsheet) does NOT exist...");
    return false;
  }

  // Get any month sheets (ref: 0) Global Variables: months variable) from database spreadsheet...
  var databaseMonthSheets = [];
  var ssData = getSpreadsheetByName(ssID);
  var ssDataSheets = ssData.getSheets();
  for (let i = 0; i < ssDataSheets.length; i++){
    let sheetName = ssDataSheets[i].getSheetName();
    if (months.includes(sheetName)){
      databaseMonthSheets.push(ssDataSheets[i]);
    }
  }
  // Logger.log(databaseMonthSheets);
  return databaseMonthSheets;
}
