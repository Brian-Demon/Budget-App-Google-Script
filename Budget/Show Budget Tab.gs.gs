function showBudget(){
  let sheet = ss.getSheetByName(budgetSheetName);
  if( !sheet ){
    error("Budget Sheet is missing. Please contact support. --showBudget()");
    return;
  }

  // Unhide (show) Income Tab
  sheet.showSheet();
}
