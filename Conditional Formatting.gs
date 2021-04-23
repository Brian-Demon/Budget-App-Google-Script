function conditionalFormatting(sheet){
  // Check if passed sheet exists
  if( !sheet ){
    error("Sheet passed does not exists. --conditionalFormatting(sheet)");
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
  //********************//
  //* TRACKER SECTIONS *//
  //********************//
  let bills = getBills();
  let trackerRows = getTrackerRows(sheet, expenseTrackerString);
  range = sheet.getRange(startRow, 8, trackerRows, 1);
  for( i = 0; i < bills.length; i++ ){
    let bill = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(bills[i].name)
      .setBackground(colors.darkCyan2)
      .setFontColor(colors.white)
      .setRanges([range])
      .build();
    rules.push(bill);
  }
  //******************//
  //* BILLS SECTIONS *//
  //******************//
  // Paid? Column
  range = sheet.getRange(startRow, 19, bills.length, 1);
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
  range = sheet.getRange(startRow, 22, bills.length, 1);
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
  
  // SET ALL CONDITIONAL FORMATTING
  sheet.setConditionalFormatRules(rules);
}
