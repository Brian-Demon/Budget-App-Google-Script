function storeAllPreviousMonths() {

  // Get all months in current workbook...
  var sheets = ss.getSheets();
  var monthsActive = [];
  var monthsActiveNames = [];
  for (sheet of sheets)
  {
    let currentSheetName = sheet.getName();
    if (months.includes(currentSheetName))
    {
      monthsActiveNames.push(currentSheetName);
      monthsActive.push(sheet);
    }
  }

  // Ensure at least one previous month is in ss...
  if (!monthsActiveNames.length > 0)
  {
    error("There are no previous months available to store...");
    return false;
  }
  
  // Prompt the user to confirm...
  let ui = SpreadsheetApp.getUi();
  let response = ui.alert("Store All Previous Months", "Are you sure you want to store month(s):\n\n" +arrayToString(sortMonthsArray(monthsActiveNames), "\n"), ui.ButtonSet.YES_NO);
  if( response !== ui.Button.YES ){
    return;
  }

  // LOADING...
  loading();

  // Loop for however many months are active, storing each month that is...
  for (month of monthsActive)
  {
    storeMonthCheckSpecific(month);
  }

  // REBUILD MENU
  menu();
  // STOP LOADING
  stopLoading(false);
}
