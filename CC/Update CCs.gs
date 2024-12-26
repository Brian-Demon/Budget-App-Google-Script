function updateCCs(){
  // Check if database exiists
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ) return;
  
  let ccSources = getCCSources();
  
  let sheet = ssData.getSheetByName(ccSheetName);
  if( !sheet ){
    // let sheets = ssData.getSheets();
    ssData.insertSheet(ccSheetName, 2).setTabColor(colors.yellow);
    sheet = ssData.getSheetByName(ccSheetName);
  }
  
  sheet.clear();
  for( let i = 0; i < ccSources.length; i++ ){
    sheet.getRange(i + 1, 1).setValue(ccSources[i]);
  }
  
  // Find the CC Tracker section's range for the first, "Source" column and update the data validation for the dropdowns
  sheet = ss.getSheetByName(currentMonthName);
  let lastRow = sheet.getLastRow();
  let startRow = 0;
  let column = 22;
  for( let r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, column).getValue();
    // Logger.log(`Value at r:${r}/c:${column} = ${value}`);
    if( value === "Bill Reminders" ){
      startRow = r + 3;
      break;
    }
  }
  let ccColumnDropdown = 11;
  let numberOfRows = getTrackerRows(sheet, expenseTrackerString);
  let valuesRange = getCCRange();
  let range = sheet.getRange(startRow, ccColumnDropdown, numberOfRows, 1);
  // UPDATE DATA VALIDATION
  updateDataValidation(sheet, valuesRange, range);
  
  // Set date updated (row, 2)
  let row = 3;
  today = Utilities.formatDate(new Date(), timeZone, dateFormat);
  ccSheet = ss.getSheetByName(ccSheetName);
  ccSheet.getRange(row, 2).setValue(today);
  
  ss.toast("CC updated in the database and for the Current Month sheet successfully.");
}
