function getLastMonthSheet(currentMonth){
  // Validate month passed
  if( !validMonths.includes(currentMonth) ){
    error(`Month passed: ${currentMonth} is not a valid month. --Month/getPrevMonthSheet`);
    return;
  }

  // Check and set ssData for database
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ){
    return;
  }

  // Get previous row from ssData
  let prevMonth = getPrevMonth(currentMonth);
  let sheet = ssData.getSheetByName(prevMonth);
  // Check to make sure previous month exists in ssData
  if( !sheet ){
    error(`\"${prevMonth}\" does not exist in the database. Please contact support. --Month/getLastMonthAccountBalance()`);
    return;
  } else {
    return sheet;
  }
}
