function closeBudget(){
  let sheet = ss.getSheetByName(budgetSheetName);
  if( !sheet ){
    error("Budget Sheet is missing. Please contact support. --closeBudget()");
    return;
  }

  // Unhide (show) Income Tab
  sheet.hideSheet();
}
