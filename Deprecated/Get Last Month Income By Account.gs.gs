function getLastMonthIncomeByAccount(currentMonth, accountName){
  // Check and set ssData for database
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ){
    return;
  }

  // Check to make sure the currentMonth is a valid month
  if (!validMonths.includes(currentMonth)){
    error(`The value passed: ${currentMonth}, is not a valid month --Month/getLastMonthAccountBalance()`);
    return 0;
  }

  // Check to make sure currentMonth is not January and therefor no previous month balance
  if( currentMonth === jan ){
    error('Somehow jan was passed to "--Month/getLastMonthAccountBalance()", check the validation in --Build/buildBudget()');
    return 0;
  }

  // Check to make sure the accountName passed exists
  let accounts = getAccountsSources();
  if( !accounts.includes(accountName) ){
    error(`The account: ${accountName}, does not appear in the accounts tab --Month/getLastMonthAccountBalance()`);
    return 0;
  }
  
  // Get previous row from ssData
  let prevMonth = getPrevMonth(currentMonth);
  let sheet = ssData.getSheetByName(prevMonth);
  // Check to make sure previous month exists in ssData
  if( !sheet ){
    error(`\"${prevMonth}\" does not exist in the database. Please contact support. --Month/getLastMonthAccountBalance()`);
    return;
  }
  
  // Look within column C (3) for the start of the sections for last months income per account then the accountName to get the amount within the amount column (F/6)
  let sectionTitle = "This Month Income Per Account:";
  let accountColumn = 3;
  let amountColumn = 6;
  let accountColumnData = getDataInColumn(sheet, accountColumn);
  let amountColumnData = getDataInColumn(sheet, amountColumn);

  for( let i = 0; i < accountColumnData.length; i++ ){
    let account = accountColumnData[i];
    let amount = amountColumnData[i];

    if( account === accountName ){
      Logger.log(`Income amount for account: ${accountName} = ${income}`);
      return amount;
    }
  }

  error(`Account: ${accountName} not found. --Month/getLastMonthAccountBalance()`);
}
