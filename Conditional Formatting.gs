function conditionalFormatting(sheet){
  // Check if passed sheet exists
  if( !sheet ){
    error("Sheet passed does not exists. --conditionalFormatting()");
    return;
  }
  
  // CLEAR EXISTING CONDITIONAL FORMATTING
  sheet.clearConditionalFormatRules();
  let rules = sheet.getConditionalFormatRules();
  
  let startRow = getStartRow(sheet);
  let budget = getBudgetFromSheet(sheet);
  
  //******************//
  //* BUDGET SECTION *//
  //******************//
  let range = sheet.getRange(startRow, 6, budget.length, 1);
  let lessThanBudget = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0)
    .setBackground(colors.lightRed2)
    .setRanges([range])
    .build();
  rules.push(lessThanBudget);
  let greaterThanBudget = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(0)
    .setBackground(colors.lightGreen2)
    .setRanges([range])
    .build();
  rules.push(greaterThanBudget);
  let equalsBudget = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberEqualTo(0)
    .setBackground(colors.lightBlue2)
    .setRanges([range])
    .build();
  rules.push(equalsBudget);

  //****************************//
  //* EXPENSE TRACKER SECTIONS *//
  //****************************//
  let bills = getBills();
  let trackerColumnStart = 8;
  let trackerRows = getTrackerRows(sheet, expenseTrackerString);
  range = sheet.getRange(startRow, trackerColumnStart, trackerRows, 1);
  for( i = 0; i < bills.length; i++ ){
    // SET CONDITION WHEN A BILL IS SELECTED IN THE CATEGORY COLUMN
    let bill = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(bills[i].name)
      .setBackground(colors.darkCyan2)
      .setFontColor(colors.white)
      .setRanges([range])
      .build();
    rules.push(bill);
  }
  // SET CONDITION WHEN THE ACCOUNT COLUMN IS BLANK WHILE THE AMOUNT COLUMN IS NOT BLANK
  // EXPENSE SECTION
  range = sheet.getRange(startRow, trackerColumnStart + 2, trackerRows, 1);
  let expenseAccountNotSelectedWithAmountPresent = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied("=AND(ISBLANK($J5:$J), NOT(ISBLANK($N5:$N)))")
    .setBackground(colors.red)
    .setRanges([range])
    .build();
  rules.push(expenseAccountNotSelectedWithAmountPresent);
  // INCOME SECTION
  range = sheet.getRange(startRow, trackerColumnStart + 10, trackerRows, 1);
  let incomeAccountNotSelectedWithAmountPresent = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied("=AND(ISBLANK($R5:$R), NOT(ISBLANK($T5:$T)))")
    .setBackground(colors.red)
    .setRanges([range])
    .build();
  rules.push(incomeAccountNotSelectedWithAmountPresent);

  //******************//
  //* BILLS SECTIONS *//
  //******************//
  // Paid? Column
  let billsStartingColumn = 21;
  if( bills.length > 0 ){
    range = sheet.getRange(startRow, billsStartingColumn + 3, bills.length, 1);
    var paid = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("PAID")
    .setBackground(colors.lightGreen2)
    .setRanges([range])
    .build();
    rules.push(paid);
    var notPaid = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("NOT PAID")
    .setBackground(colors.lightRed2)
    .setRanges([range])
    .build();
    rules.push(notPaid);
    var partial = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("PARTIAL")
    .setBackground(colors.lightBlue2)
    .setRanges([range])
    .build();
    rules.push(partial);
    // Difference Column
    range = sheet.getRange(startRow, billsStartingColumn + 6, bills.length, 1);
    let lessThanBills = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0)
    .setBackground(colors.lightRed2)
    .setRanges([range])
    .build();
    rules.push(lessThanBills);
    let greaterThanBills = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(0)
    .setBackground(colors.lightGreen2)
    .setRanges([range])
    .build();
    rules.push(greaterThanBills);
    let equalsBills = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberEqualTo(0)
    .setBackground(colors.lightBlue2)
    .setRanges([range])
    .build();
    rules.push(equalsBills);
  }
  
  // SET ALL CONDITIONAL FORMATTING
  sheet.setConditionalFormatRules(rules);
}
