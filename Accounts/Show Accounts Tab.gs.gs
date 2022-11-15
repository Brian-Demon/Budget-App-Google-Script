function showAccounts(){
  let sheet = ss.getSheetByName(accountsSheetName);
  if( !sheet ){
    error("Budget Sheet is missing. Please contact support. --showAccounts()");
    return;
  }

  // Unhide (show) Income Tab
  sheet.showSheet();
}
