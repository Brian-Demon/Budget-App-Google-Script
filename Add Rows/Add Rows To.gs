function addRowsTo(tracker, rows){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//  Logger.log(sheet.getName());
//  console.log(sheet.getName());
  let column;
  let valuesRange;
  let startRow = getStartRow(sheet);
  let sectionColor = colors.black;
  if( tracker === expenseTrackerString ){
    column = 8;
    let budget = getBudgetFromSheet(sheet);
    valuesRange = sheet.getRange(startRow, 2, budget.length, 1);
    sectionColor = colors.lightBlue3;
  } else {
    column = 13;
    valuesRange = getIncomeRange();
    sectionColor = colors.lightGreen3;
  }
  let row = getTrackerRows(sheet, tracker) + startRow;
  let rule = SpreadsheetApp.newDataValidation().requireValueInRange(valuesRange).setAllowInvalid(false).build();
  let range = sheet.getRange(row, column, rows, 1);
  sheet.getRange(row, column, rows, 4).setBackground(sectionColor).setBorder(true, true, true, true, true, true, "black", solid);
  setDataValidation(sheet, rule, range);
  closeHTMLBox();
}
