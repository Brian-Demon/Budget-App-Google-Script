function buildAll(sheet){
  // Check if passed sheet exists
  if( !sheet ){
    error("Sheet passed does not exists. --buildAll(sheet)");
    return;
  }
  
  // Build all sections of the passed sheet
  buildBudget(sheet, true);
  buildTracker(sheet, expenseTrackerString, true);
  buildTracker(sheet, incomeTrackerString, true);
  buildBills(sheet, true);
  conditionalFormatting(sheet)
}
