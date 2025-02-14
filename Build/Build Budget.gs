function buildBudget(sheet, buildAll){
  // Check and set ssData for database
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ){
    return;
  }
  // Check if passed sheet exists
  if( !sheet ){
    error("Sheet passed does not exists. --buildBudget()");
    return;
  }
  
  let lastRow = sheet.getLastRow();
  let startRow = 0;
  
  // Find starting row (at "B" Column where "Line Item" is located) + 2
  for( let r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 2).getValue();
  //  Logger.log("Row: " + r + ", Value: " + value);
    if( value === "Line Item" ){
      startRow = r + 2;
      break;
    }
  }
  // Check if sheet passed has a budget section
  if( startRow === 0 ){
    error("The sheet passed does not have a budget section. --buildBudget()");
    return;
  }
  
  //****************************//
  // CLEAR THEN RE-BUILD BUDGET //
  //****************************//
  let activeCell = sheet.getRange(1,1);
  sheet.setCurrentCell(activeCell);
  let budget = getBudget();
  let numberOfBudgetRows = budget.length;
  let bottomRow = budget.length + startRow;
  let numberOfRows = budget.length;
  let endRow = bottomRow - 1;
//  Logger.log("start: " + startRow + ", end: " + endRow);
  // CLEAR CURRENT BUDGET
  let maxRows = sheet.getMaxRows();
  rangeArray = [ startRow, 2, (maxRows - startRow), 5 ];
  clearRange(sheet, rangeArray);
  // Set names and amounts
  for( let i = 0; i < budget.length; i++ ){
    let name = budget[i].name;
    let amount = budget[i].amount;
    sheet.getRange(startRow + i, 2).setValue(name);
    sheet.getRange(startRow + i, 3).setValue(amount);
  }
  // Set main borders
  sheet.getRange(startRow, 2, budget.length + 1, 5).setBorder(true, true, true, true, true, true, "black", solid);
  // Top row borders
  sheet.getRange(startRow - 2, 2, 2, 5).setBorder(true, true, true, true, true, true, "black", solidMedium);
  // Set bottom part of budget section
  sheet.getRange(bottomRow, 2, 1, 5).setBackground(colors.lightYellow2).setBorder(true, true, true, true, true, true, "black", solidMedium).setFontWeight("bold").setHorizontalAlignment("center");
  sheet.getRange(bottomRow, 2).setBackground(colors.darkRed2).setFontColor(colors.white).setValue("TOTALS:");
  sheet.getRange(bottomRow, 3).setNumberFormat(currencyFormat).setValue("=SUM(C" + startRow + ":C" + endRow + ")");
  //********************************//
  // Set FIRST ("Line Item") column //
  //********************************//
  sheet.getRange(startRow, 2, numberOfBudgetRows, 1).setFontWeight("bold").setHorizontalAlignment("center").setBackground(colors.lightYellow3);
  //******************************//
  // Set SECOND ("Amount") column //
  //******************************//
  sheet.getRange(startRow, 3, numberOfBudgetRows, 1).setBackground(colors.lightOrange2).setNumberFormat(currencyFormat);
  //*********************************//
  // Set THIRD ("Last Month") column //
  //*********************************//
  sheet.getRange(startRow, 4, numberOfBudgetRows, 1).setBackground(colors.lightMagenta2).setNumberFormat(currencyFormat);
  let month = getMonth(sheet);
  // Logger.log(`Month = ${month}`);
  // Logger.log(`jan = ${jan}`);
  // Logger.log(`month == jan: ${month == jan}`);
  if( month !== jan ){
    let prevMonth = getPrevMonth(month);
    let budgetNames = extractKey(budget, "name");
    let prevMonthSheet = ssData.getSheetByName(prevMonth);
    // Check if prevMonthSheet exists in ssData
    if(!prevMonthSheet ){
      error('"' + prevMonth + '" sheet does not exist in database. Please contact support. --buildBudget()');
      return;
    }
    // Get last month's budget
    let lastMonthBudget = getBudgetFromSheet(prevMonthSheet);
    if( lastMonthBudget.length === 0 ){
      error("lastMonthBudget.length === 0. -- buildBudget()");
      return;
    }
    // Compare and set amounts found in last month's budget for this month (sheet passed month)
    for( let r = startRow; r <= endRow; r++ ){
      let value = sheet.getRange(r, 2).getValue();
      let index = -1;
//      Logger.log("Row: " + r + ", Value: " + value);
      for( let i = 0; i < lastMonthBudget.length; i++ ){
//        Logger.log("i: " + i + ", lastMonthBudget[i].name: " + lastMonthBudget[i].name);
        if( value === lastMonthBudget[i].name ){
          index = i;
          break;
        }
      }
//      Logger.log("Row: " + r + ", Value: " + value + ", Index: " + index);
      if( index > -1 ){
        sheet.getRange(r, 4).setValue(lastMonthBudget[index].thisMonthAmount);
      }
    }
    sheet.getRange(endRow + 1, 4).setValue("=SUM(D" + startRow + ":D" + endRow + ")");
  }
  //**********************************//
  // Set FOURTH ("This Month") column //
  //**********************************//
  sheet.getRange(startRow, 5, numberOfBudgetRows, 1).setBackground(colors.lightPurple2).setNumberFormat(currencyFormat);
  // let expenseRows = getTrackerRows(sheet, expenseTrackerString);
  // let expenseLastRow = startRow + expenseRows - 1;
  //  Logger.log("Tracker Rows: " + trackerRows);
  let expenseLastRow = sheet.getMaxRows();
  sheet.getRange(startRow, 5).setValue("=sumif($H$" + startRow + ":$H$" + expenseLastRow + ",$B" + startRow + ",$N$" + startRow + ":$N$" + expenseLastRow + ")");
  if( numberOfRows > 1 ){
    sheet.getRange(startRow, 5).copyTo(sheet.getRange(startRow + 1, 5, numberOfRows - 1, 1));
  }
  sheet.getRange(endRow + 1, 5).setValue("=SUM(E" + startRow + ":E" + endRow + ")");
  //******************************//
  // Set FIFTH ("Balance") column //
  //******************************//
  sheet.getRange(startRow, 6).setValue("=$C" + startRow + "-$E" + startRow);
  if( numberOfRows > 1 ){
    sheet.getRange(startRow, 6).copyTo(sheet.getRange(startRow + 1, 6, numberOfRows - 1, 1));
  }
  sheet.getRange(endRow + 1, 6).setValue("=SUM(F" + startRow + ":F" + endRow + ")");
  //*************************//
  //* BUILD SUMMARY SECTION *//
  //*************************//
  let accounts = getAccountsSources();
  let numberOfAccounts = accounts.length;
  let accountNameColumn = 3;
  let accountAmountColumn = 6;
  let balanceRow = endRow + 3;
  let lastMonthAccountsAndBalances;
  let numberOfAccountsLastMonth;
  // let lastMonthSheet;
  let lastMonthBalance;
  if( month !== jan ){
    lastMonthBalance = getLastMonthBalance(month);
    // lastMonthAccountsAndBalances = getLastMonthAccountsAndBalances(lastMonthSheet);
    lastMonthAccountsAndBalances = getLastMonthAccountsAndBalances(getLastMonthSheet(getMonth(sheet)));
    numberOfAccountsLastMonth = lastMonthAccountsAndBalances.length;
    // lastMonthSheet = getLastMonthSheet(month);
  }
  // let numberOfAccountsLastMonth = Object.keys(lastMonthAccountsAndBalances).length;
  // let numberOfAccountsLastMonth = lastMonthAccountsAndBalances.length;
  // Rows
  let lastMonthEndingBalanceRow = balanceRow + 1;
  let thisMonthBalanceStartRow = lastMonthEndingBalanceRow + 2;
  let lastMonthBalanceStartRow = thisMonthBalanceStartRow + numberOfAccounts + 1;

  // Clear the summary area
  let maxRow = sheet.getMaxRows();
  sheet.getRange(balanceRow, 3, maxRow, 4).clear();

  // BALANCE SECTION
  sheet.getRange(balanceRow, 3, 1, 3).mergeAcross();
  sheet.getRange(balanceRow, 3, 1, 4).setBackground(colors.darkPurple2);
  sheet.getRange(balanceRow, 3).setValue("BALANCE:").setHorizontalAlignment("right");
  let finalTotalFormula = `=SUM(F${thisMonthBalanceStartRow + 1}:F${thisMonthBalanceStartRow + numberOfAccounts})`;
  sheet.getRange(balanceRow, 6).setHorizontalAlignment("right").setValue(finalTotalFormula).setNumberFormat(currencyFormat);
  // Last Month Ending Balance Section
  sheet.getRange(lastMonthEndingBalanceRow, 3, 1, 3).mergeAcross().setHorizontalAlignment("center");
  sheet.getRange(lastMonthEndingBalanceRow, 3, 1, 4).setBackground(colors.darkGray3);
  sheet.getRange(lastMonthEndingBalanceRow, 3).setValue("Last Month Ending Balance:").setHorizontalAlignment("right");
  sheet.getRange(lastMonthEndingBalanceRow, 6).setHorizontalAlignment("right").setValue(lastMonthBalance).setNumberFormat(currencyFormat);
  // Set border, font weight, and font color for BALANCE and Last Month Ending Balance Section
  sheet.getRange(balanceRow, 3, lastMonthEndingBalanceRow - balanceRow + 1, 4).setBorder(true, true, true, true, true, true, "black", solidMedium).setFontWeight("bold").setFontColor(colors.white);

  // THIS MONTH SECTION
  // This Month Balance Section
  sheet.getRange(thisMonthBalanceStartRow, 3, 1, 4).mergeAcross().setValue("This Month Balance Per Account:").setHorizontalAlignment("center");
  sheet.getRange(thisMonthBalanceStartRow, 3, numberOfAccounts + 1, 4).setBackground(colors.lightGreen2).setFontColor(colors.black);
  for( let row = thisMonthBalanceStartRow + 1; row < thisMonthBalanceStartRow + numberOfAccounts + 1; row++){
    let account = accounts[row - thisMonthBalanceStartRow - 1];
    sheet.getRange(row, accountNameColumn, 1, 3).mergeAcross();
    sheet.getRange(row, accountNameColumn).setValue(account).setHorizontalAlignment("right");
  }
  sheet.getRange(thisMonthBalanceStartRow, 3, (numberOfAccounts + 1), 4).setBorder(true, true, true, true, true, true, "black", solidMedium).setFontWeight("bold").setFontColor(colors.black);

  // LAST MONTH SECTION
  // Last Month Income Per Account Section
  if( month !== jan){
    sheet.getRange(lastMonthBalanceStartRow, 3, 1, 4).mergeAcross().setValue("Last Month Balance Per Account:").setHorizontalAlignment("center");
    sheet.getRange(lastMonthBalanceStartRow, 3, numberOfAccountsLastMonth + 1, 4).setBackground(colors.lightCornflowerBlue2);
    for( let row = lastMonthBalanceStartRow + 1; row < lastMonthBalanceStartRow + numberOfAccountsLastMonth + 1; row++){
      let index = row - lastMonthBalanceStartRow - 1;
      sheet.getRange(row, accountNameColumn, 1, 3).mergeAcross();
      sheet.getRange(row, accountNameColumn).setValue(lastMonthAccountsAndBalances[index][0]).setHorizontalAlignment("right");
      sheet.getRange(row, accountAmountColumn).setValue(lastMonthAccountsAndBalances[index][1]).setNumberFormat(currencyFormat);
    }

    // SET THIS MONTH BALANCES PER ACCOUNT DEPENDING IF THAT ACCOUNT EXISTED LAST MONTH
    for( let i = 0; i < accounts.length; i++ ){
      let accountToFind = accounts[i];
      let row = getRowByColumnAndValue(sheet, 3, accountToFind, lastMonthBalanceStartRow + 1);
      let formula = '0';
      // let numberOfTrackingRows = defaultNumberOfTrackerRows + startRow - 1;
      let numberOfTrackingRows = sheet.getMaxRows();
      if( row != null ){
        formula = `=SUMIF(R\$${startRow}:R\$${numberOfTrackingRows}, \$C${thisMonthBalanceStartRow + i + 1}, T\$${startRow}:T\$${numberOfTrackingRows})-SUMIF(J\$${startRow}:J\$${numberOfTrackingRows}, \$C${thisMonthBalanceStartRow + i + 1}, N\$${startRow}:N\$${numberOfTrackingRows})+F${row}`;
      } else {
        formula = `=SUMIF(R\$${startRow}:R\$${numberOfTrackingRows}, \$C${thisMonthBalanceStartRow + i + 1}, T\$${startRow}:T\$${numberOfTrackingRows})-SUMIF(J\$${startRow}:J\$${numberOfTrackingRows}, \$C${thisMonthBalanceStartRow + i + 1}, N\$${startRow}:N\$${numberOfTrackingRows})`;
      }
      sheet.getRange(thisMonthBalanceStartRow + i + 1, 6).setValue(formula);
    }

    // Set border, font weight, and font color for This Month Income & Expenses Section
    sheet.getRange(lastMonthBalanceStartRow, 3, (numberOfAccountsLastMonth + 1), 4).setBorder(true, true, true, true, true, true, "black", solidMedium).setFontWeight("bold").setFontColor(colors.black);
  } else {
    for( let i = 0; i < accounts.length; i++ ){
      let accountToFind = accounts[i];
      let row = getRowByColumnAndValue(sheet, 3, accountToFind, lastMonthBalanceStartRow + 1);
      let formula = '0';
      let numberOfTrackingRows = defaultNumberOfTrackerRows + startRow - 1;
      if( row != null ){
        formula = `=SUMIF(R\$${startRow}:R\$${numberOfTrackingRows}, \$C${thisMonthBalanceStartRow + i + 1}, T\$${startRow}:T\$${numberOfTrackingRows})-SUMIF(J\$${startRow}:J\$${numberOfTrackingRows}, \$C${thisMonthBalanceStartRow + i + 1}, N\$${startRow}:N\$${numberOfTrackingRows})+F${row}`;
      } else {
        formula = `=SUMIF(R\$${startRow}:R\$${numberOfTrackingRows}, \$C${thisMonthBalanceStartRow + i + 1}, T\$${startRow}:T\$${numberOfTrackingRows})-SUMIF(J\$${startRow}:J\$${numberOfTrackingRows}, \$C${thisMonthBalanceStartRow + i + 1}, N\$${startRow}:N\$${numberOfTrackingRows})`;
      }
      sheet.getRange(thisMonthBalanceStartRow + i + 1, 6).setValue(formula).setNumberFormat(currencyFormat);
    }
  }
  
  //***********************************//
  // Set Budget Conditional Formatting //
  //***********************************//
  if( !buildAll ){
    conditionalFormatting(sheet);
  }
}
