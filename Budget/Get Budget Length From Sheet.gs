function getBudgetLengthFromSheet(sheet){
  // Valdiate sheet passed
  
  var validateSheetIsDefaultSheet = false;
  if (!validateSheetPassed(sheet, "getBudgetLengthFromSheet", validateSheetIsDefaultSheet))
    return false;

  var budgetRange = getBudgetRange(sheet);
  var budgetValues = budgetRange.getValues();
  var budgetLength = budgetValues.length - 1; // Minus one because the last line is the totals (ignore that)
  var sheetName = sheet.getSheetName();
  // Logger.log(`Budget length for sheet: ${sheetName} = ${budgetLength}`);
  return budgetLength;
}
