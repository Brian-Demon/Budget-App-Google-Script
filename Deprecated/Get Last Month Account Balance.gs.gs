function getLastMonthAccountBalance(currentMonth, accountName){
  // Check and set ssData for database
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ){
    return;
  }

  // Check to make sure the currentMonth is a valid month
  if (!validMonths.includes(currentMonth)){
    error(`The value passed: ${currentMonth}, is not a valid month --getLastMonthAccountBalance()`);
    return 0;
  }

  // Check to make sure currentMonth is not January and therefor no previous month balance
  if( currentMonth === jan ){
    error('Somehow jan was passed to "--getLastMonthAccountBalance()", check the validation in --buildBudget()');
    return 0;
  }

  // Check to make sure the accountName passed exists
  let accounts = getAccountsSources();
  if( !accounts.includes(accountName) ){
    error(`The account: ${accountName}, does not appear in the accounts tab --getLastMonthAccountBalance()`);
    return 0;
  }
  
  // Get previous row from ssData
  let prevMonth = getPrevMonth(currentMonth);
  let sheet = ssData.getSheetByName(prevMonth);
  // Check to make sure previous month exists in ssData
  if( !sheet ){
    error(`\"${prevMonth}\" does not exist in the database. Please contact support. --getLastMonthAccountBalance()`);
    return;
  }
  
  // Find cell containing account passed and get value of cell next to it by using getValues()
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  for( let r = 1; r <= lastRow; r++ ){
    let data = sheet.getRange(r, 1, 1, lastColumn).getValues().flat();
    let index = data.indexOf(accountName);
    // Logger.log("Data: " + data.toString());
    // Logger.log("Index: " + index);
    if( index > -1 ){
      let balance = data[index + 3];
      // Logger.log(`data[index + 3] (${prevMonth}'s ${accountName} balance') = ${balance}`);
      return balance;
    }
  }
  error("Something went wrong --getLastMonthAccountBalance()");
}
