function getLastMonthBalance(currentMonth){
  // Check and set ssData for database
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ){
    return;
  }
  // Check to make sure currentMonth is not January and therefor no previous month balance
  if( currentMonth === jan ){
    Logger.log('Somehow jan was passed to "--getLastMonthBalance()", check the validation in --buildBudget()');
    return 0;
  }
  
  // Get previous row from ssData
  let prevMonth = getPrevMonth(currentMonth);
  let sheet = ssData.getSheetByName(prevMonth);
  // Check to make sure previous month exists in ssData
  if( !sheet ){
    error('"' + prevMonth + '" does not exist in the database. Please contact support. --getLastMonthBalance()');
    return;
  }
  
  // Find cell containing "CURRENT MONTH BALANCE:" and get value of cell next to it by using getValues()
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  let value;
  for( let r = 1; r <= lastRow; r++ ){
    let data = sheet.getRange(r, 1, 1, lastColumn).getValues().flat();
    let index = data.indexOf("BALANCE:");
//    Logger.log("Data: " + data.toString());
//    Logger.log("Index: " + index);
    if( index > -1 ){
      return data[index + 3];
    }
  }
  Logger.log("Something went wrong");
}
