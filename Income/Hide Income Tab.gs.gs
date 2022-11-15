function closeIncome() {
  let sheet = ss.getSheetByName(incomeSheetName);
  if( !sheet ){
    error("Income Sheet is missing. Please contact support. --closeIncome()");
    return;
  }

  // Hide Income Tab
  sheet.hideSheet();
}
