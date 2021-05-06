function buildTracker( sheet, tracker, buildAll ){
  // Check and set ssData for database
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ){
    return;
  }
  // Check if passed sheet exists
  if( !sheet ){
    error("Sheet passed does not exists. --buildTracker()");
    return;
  }
  
  let startRow = 0;
  let lastRow = sheet.getLastRow();
  let budgetLastRow = 0;
  let startColumn = 0;
  let sectionColor;
  if( tracker === expenseTrackerString ){
    startColumn = 8;
    sectionColor = colors.lightBlue3;
  } else if( tracker === incomeTrackerString ) {
    startColumn = 13;
    sectionColor = colors.lightGreen3;
  } else {
    error('Tracker passed is not valid. "' + expenseTrackerString + '" or "' + incomeTrackerString + '" are the only valid options. --buildTracker()');
    return;
  }
  let numberOfColumns = 4;
  
  /// Find starting row (at "B" Column where "Expense Tracker" is located) + 2
  for( let r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 8).getValue();
//    Logger.log("Row: " + r + ', Value: "' + value);
    if( value === expenseTrackerString ){
      startRow = r + 3;
      break;
    }
  }
  for( let r = startRow; r <= sheet.getMaxRows(); r++ ){
    let budgetValue = sheet.getRange(r, 2).getValue();
    let color = getKeyByValue(colors, sheet.getRange(r, 8).getBackground());
//    Logger.log("Row: " + r + ", Color: " + color);
    if( budgetValue === "TOTALS:" ){
      budgetLastRow = r - 1;
    }
    if( color === "white" ){
      lastRow = r - 1;
      if( lastRow < (startRow + 50 - 1) ){
        lastRow = (startRow + 50 - 1);
      }
      break;
    }
  }
//  Logger.log("startRow: " + startRow + ", lastRow: " + lastRow);

  if( startRow === 0 ){
    error('The sheet passed is invalid. --buildTracker()');
    return;
  }
  
  //*******************************//
  //* CLEAR THEN RE-BUILD TRACKER *//
  //*******************************//
  let activeCell = sheet.getRange(1,1);
  sheet.setCurrentCell(activeCell);
  // CLEAR CURRENT TRACKER
  let numberOfRows = lastRow - startRow + 1;
//  Logger.log("numberOfRows: " + numberOfRows);
  let maxRows = sheet.getMaxRows();
  rangeArray = [ startRow, startColumn, (maxRows - startRow), numberOfColumns ];
  clearRange(sheet, rangeArray);
  // BUILD TRACKER
  // Set section border and color
  sheet.getRange(startRow, startColumn, numberOfRows, numberOfColumns).setBackground(sectionColor).setBorder(true, true, true, true, true, true, "black", solid);
  // Set section dropdowns for first column
  let budget = getBudgetFromSheet(sheet);
  let cell = sheet.getRange(startRow, startColumn);
  let valuesRange;
  if( tracker === expenseTrackerString ){
    valuesRange = sheet.getRange(startRow, 2, budget.length, 1);
  } else if( tracker === incomeTrackerString ){
    let incomeSources = getIncomeSources();
    valuesRange = getIncomeRange();
  } else {
    error("Invalid tracker passed after clear then re-build sectiion. --buildTracker()");
    return;
  }
  let rule = SpreadsheetApp.newDataValidation().requireValueInRange(valuesRange).setAllowInvalid(false).build();
  let range = sheet.getRange(startRow, startColumn, numberOfRows, 1);
  setDataValidation(sheet, rule, range);
//  cell.setDataValidation(rule);
//  sheet.getRange(startRow, startColumn).copyTo(sheet.getRange(startRow + 1, startColumn, numberOfRows - 1, 1));
  // Set formats for date and amount columns along with horizontal alignment
  // Date
  sheet.getRange(startRow, startColumn + 1, numberOfRows, 1).setNumberFormat("M/d").setHorizontalAlignment("center");
  // Amount
  sheet.getRange(startRow, startColumn + 3, numberOfRows, 1).setNumberFormat(currencyFormat).setHorizontalAlignment("right");
  // Total Top Right
  if( tracker === expenseTrackerString ){
    sheet.getRange(startRow - 3, startColumn + 3).setValue("=SUM(K" + startRow + ":K" + lastRow + ")");
  } else if( tracker === incomeTrackerString ){
    sheet.getRange(startRow - 3, startColumn + 3).setValue("=SUM(P" + startRow + ":P" + lastRow + ")");
  } else {
    error("Invalid tracker passed after clear then re-build sectiion. --buildTracker()");
    return;
  }
  
  //***********************************//
  // Set Budget Conditional Formatting //
  //***********************************//
  if( !buildAll ){
    conditionalFormatting(sheet);
  }
}
