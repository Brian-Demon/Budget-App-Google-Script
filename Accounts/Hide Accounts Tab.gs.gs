function closeAccounts(){
  let sheet = ss.getSheetByName(accountsSheetName);
  if( !sheet ){
    error("Accounts Sheet is missing. Please contact support. --closeAccounts()");
    return;
  }

  // Unhide (show) Income Tab
  sheet.hideSheet();
}
