function getTrackerStartColumn(sheet, tracker){
  // Ensure sheet exists
  if (!validateSheetPassed(sheet, "getTrackerStartColumn"))
    return false;

  // Variables
  var trackerString = tracker == expenseTrackerString ? expenseTrackerString : incomeTrackerString;
  var startRow = 1;
  var lastRow = getStartRow(sheet)
  var lastColumn = sheet.getLastColumn();
  var valuesRange = sheet.getRange(startRow, 1, lastRow, lastColumn);
  var sheetValues = valuesRange.getValues();
  for (let i = 0; i < sheetValues.length; i++){
    let trackerStartColumnIndex = sheetValues[i].indexOf(trackerString);
    if (trackerStartColumnIndex > -1)
    {
      let trackerStartColumnFound = trackerStartColumnIndex + 1; // Account for zero indexing
      // Logger.log(`Tracker Start Column = ${trackerStartColumnFound}`);
      return trackerStartColumnFound;
    }
  }
  // Not found
  error("Unable to find tracker start column. Please contact support. --getTrackerStartColumn()");
}
