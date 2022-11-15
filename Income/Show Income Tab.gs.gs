function showIncome(){
  let sheet = ss.getSheetByName(incomeSheetName);
  if( !sheet ){
    error("Income Sheet is missing. Please contact support. --showIncome()");
    return;
  }

  // Unhide (show) Income Tab
  sheet.showSheet();
}
