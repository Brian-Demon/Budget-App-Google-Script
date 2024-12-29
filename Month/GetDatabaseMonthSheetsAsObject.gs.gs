function getMonthSheetsInDatabaseAsObject(){ // Returns array of objects and arrays: [ { month: "September", sheet: [Sheet] } ]
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
      let monthData = {
        month: sheetName,
        sheet: ssDataSheets[i]
      };
      databaseMonthSheets.push(monthData);
    }
  }
  // Logger.log(databaseMonthSheets);
  return databaseMonthSheets;
}
