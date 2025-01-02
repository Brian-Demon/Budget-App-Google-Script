function buildTracker( sheet, tracker, buildAll ){
  // Check and set ssData for database
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ){
    return;
  }
  // Check if passed sheet exists
  var validateSheetIsDefaultSheet = true;
  if (validateSheetPassed(sheet, "buildTracker", validateSheetIsDefaultSheet))
    return false;
  
  let startRow = 0;
  let lastRow = sheet.getLastRow();
  let maxRows = sheet.getMaxRows();
  let budgetLastRow = 0;
  let startColumn = 0;
  let sectionColor;
  if( tracker === expenseTrackerString ){
    startColumn = 8;
    sectionColor = colors.lightBlue3;
  } else if( tracker === incomeTrackerString ) {
    startColumn = 16;
    sectionColor = colors.lightGreen3;
  } else {
    error('Tracker passed is not valid. "' + expenseTrackerString + '" or "' + incomeTrackerString + '" are the only valid options. --buildTracker()');
    return;
  }
  let numberOfColumns = 5;
  
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
      if( lastRow < (startRow + defaultNumberOfTrackerRows - 1) ){
        lastRow = (startRow + defaultNumberOfTrackerRows - 1);
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
  let additionalColumns = 0;
  if( tracker === expenseTrackerString ){
    additionalColumns = 2;
  }
  let activeCell = sheet.getRange(1,1);
  sheet.setCurrentCell(activeCell);
  // CLEAR CURRENT TRACKER
  let numberOfRows = maxRows - startRow + 1;
  Logger.log("numberOfRows: " + numberOfRows);
  rangeArray = [ startRow, startColumn, (maxRows - startRow), numberOfColumns ];
  clearRange(sheet, rangeArray);

  // BUILD TRACKER
  // Set section border and color
  sheet.getRange(startRow, startColumn, numberOfRows, numberOfColumns + additionalColumns).setBackground(sectionColor).setBorder(true, true, true, true, true, true, "black", solid);
  // Set section dropdowns for first column
  let budgetLength = getBudgetLengthFromSheet(sheet);
  // let cell = sheet.getRange(startRow, startColumn);
  let acountValueRange = getAccountsRange();
  let valuesRange;
  let ccValueRange = getCCRange();
  if( tracker === expenseTrackerString ){
    valuesRange = sheet.getRange(startRow, 2, budgetLength, 1);
  } else if( tracker === incomeTrackerString ){
    valuesRange = getIncomeRange();
  } else {
    error("Invalid tracker passed after clear then re-build sectiion. --buildTracker()");
    return;
  }

  // CATEGORY OR SOURCE COLUMN (Category or Source)
  let rule = SpreadsheetApp.newDataValidation().requireValueInRange(valuesRange).setAllowInvalid(false).build();
  let range = sheet.getRange(startRow, startColumn, numberOfRows, 1);
  setDataValidation(sheet, rule, range);
  // DATE COLUMN (Date)
  sheet.getRange(startRow, startColumn + 1, numberOfRows, 1).setNumberFormat("M/d").setHorizontalAlignment("center");
  // ACCOUNT COLUMN (Account)
  rule = SpreadsheetApp.newDataValidation().requireValueInRange(acountValueRange).setAllowInvalid(false).build();
  range = sheet.getRange(startRow, startColumn + 2, numberOfRows, 1);
  setDataValidation(sheet, rule, range);
  // EXPENSES COLUMNS
  if( tracker === expenseTrackerString ){
    // CC COLUMN (CC)
    rule = SpreadsheetApp.newDataValidation().requireValueInRange(ccValueRange).setAllowInvalid(false).build();
    range = sheet.getRange(startRow, startColumn + 3, numberOfRows, 1);
    setDataValidation(sheet, rule, range);
    // CC DATE COLUMN (CC Date)
    sheet.getRange(startRow, startColumn + 4, numberOfRows, 1).setNumberFormat("M/d").setHorizontalAlignment("center");
  }
  // AMOUNT CELL (Amount)
  sheet.getRange(startRow, startColumn + 4 + additionalColumns, numberOfRows, 1).setNumberFormat(currencyFormat).setHorizontalAlignment("right");
  // Total Top Right
  if( tracker === expenseTrackerString ){
    sheet.getRange(startRow - 3, startColumn + 4 + additionalColumns).setValue("=SUM(N" + startRow + ":N" + maxRows + ")");
  } else if( tracker === incomeTrackerString ){
    sheet.getRange(startRow - 3, startColumn + 4 + additionalColumns).setValue("=SUM(T" + startRow + ":T" + maxRows + ")");
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
