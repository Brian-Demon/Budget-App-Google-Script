function buildBudget(sheet, buildAll){
  // Check and set ssData for database
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ){
    return;
  }
  // Check if passed sheet exists
  if( !sheet ){
    error("Sheet passed does not exists. --buildBudget(sheet, buildAll)");
    return;
  }
  
  let lastRow = sheet.getLastRow();
  let startRow = 0;
  
  // Find starting row (at "B" Column where "Line Item" is located) + 2
  for( let r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 2).getValue();
//    Logger.log("Row: " + r + ", Value: " + value);
    if( value === "Line Item" ){
      startRow = r + 2;
      break;
    }
  }
  // Check if sheet passed has a budget section
  if( startRow === 0 ){
    error("The sheet passed does not have a budget section. --buildBudget(sheet, buildAll)");
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
  if( month !== jan ){
    let prevMonth = getPrevMonth(month);
    let budgetNames = extractKey(budget, "name");
    let prevMonthSheet = ssData.getSheetByName(prevMonth);
    // Check if prevMonthSheet exists in ssData
    if(!prevMonthSheet ){
      error('"' + prevMonth + '" sheet does not exist in database. Please contact support. --buildBudget(sheet, buildAll)');
      return;
    }
    // Get last month's budget
    let lastMonthBudget = getBudgetFromSheet(prevMonthSheet);
    if( lastMonthBudget.length === 0 ){
      error("lastMonthBudget.length === 0. -- buildBudget(sheet)");
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
        sheet.getRange(r, 4).setValue(lastMonthBudget[index].amount);
      }
    }
    sheet.getRange(endRow + 1, 4).setValue("=SUM(D" + startRow + ":D" + endRow + ")");
  }
  //**********************************//
  // Set FOURTH ("This Month") column //
  //**********************************//
  sheet.getRange(startRow, 5, numberOfBudgetRows, 1).setBackground(colors.lightPurple2).setNumberFormat(currencyFormat);
  let expenseRows = getTrackerRows(sheet, expenseTrackerString);
  let expenseLastRow = startRow + expenseRows - 1;
//  Logger.log("Tracker Rows: " + trackerRows);
  sheet.getRange(startRow, 5).setValue("=sumif($H$" + startRow + ":$K$" + expenseLastRow + ",$B" + startRow + ",$K$" + startRow + ":$K$" + expenseLastRow + ")");
  sheet.getRange(startRow, 5).copyTo(sheet.getRange(startRow + 1, 5, numberOfRows - 1, 1));
  sheet.getRange(endRow + 1, 5).setValue("=SUM(E" + startRow + ":E" + endRow + ")");
  //******************************//
  // Set FIFTH ("Balance") column //
  //******************************//
  sheet.getRange(startRow, 6).setValue("=$C" + startRow + "-$E" + startRow);
  sheet.getRange(startRow, 6).copyTo(sheet.getRange(startRow + 1, 6, numberOfRows - 1, 1));
  sheet.getRange(endRow + 1, 6).setValue("=SUM(F" + startRow + ":F" + endRow + ")");
  //*********************************************//
  // Set Last Month / Current Month Balance Rows //
  //*********************************************//
  let lastMonthBalance = 0;
  let prevMonthRow = endRow + 3;
  let currentMonthRow = prevMonthRow + 1;
  if( month !== jan ){
    lastMonthBalance = getLastMonthBalance(month);
  }
  sheet.getRange(prevMonthRow, 3, 1, 3).mergeAcross();
  sheet.getRange(currentMonthRow, 3, 1, 3).mergeAcross();
  sheet.getRange(prevMonthRow, 3, 1, 4).setBackground(colors.darkGray3);
  sheet.getRange(currentMonthRow, 3, 1, 4).setBackground(colors.darkPurple2);
  sheet.getRange(prevMonthRow, 3).setValue("Last Month Ending Balance:").setHorizontalAlignment("right").setFontWeight("bold").setFontColor(colors.white);
  sheet.getRange(currentMonthRow, 3).setValue("BALANCE:").setHorizontalAlignment("right").setFontWeight("bold").setFontColor(colors.white);
  sheet.getRange(prevMonthRow, 6).setValue(lastMonthBalance).setHorizontalAlignment("right").setFontWeight("bold").setFontColor(colors.white).setNumberFormat(currencyFormat);
  sheet.getRange(currentMonthRow, 6).setValue("=F" + prevMonthRow + "-K" + (startRow - 3) + "+P" + (startRow - 3)).setHorizontalAlignment("right").setFontWeight("bold").setFontColor(colors.white).setNumberFormat(currencyFormat);
  sheet.getRange(prevMonthRow, 3, 2, 4).setBorder(true, true, true, true, true, true, "black", solidMedium);
  //****************************************//
  // Update Expense Tracker Data Validation //
  //****************************************//
  let valuesRange = sheet.getRange(startRow, 2, budget.length, 1);
  let range = sheet.getRange(startRow, 8, 50, 1);
  updateDataValidation(sheet, valuesRange, range);
  //***********************************//
  // Set Budget Conditional Formatting //
  //***********************************//
  if( !buildAll ){
    conditionalFormatting(sheet);
  }
}
