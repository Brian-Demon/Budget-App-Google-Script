function test(){
  // Logger.log(`ssID = ${ssID}`);
  let sheet = ss.getSheetByName("Current Month");
  // let section = expenseTrackerString;
  // let lastRow = getTrackerRows(sheet, section);
  //Logger.log(`Last Row: ${lastRow}`);
  // buildBills(sheet, false);
  buildAll(sheet);
  // buildBudget(sheet, false);
  // buildTracker(sheet, expenseTrackerString, true);
  // let sheet = getLastMonthSheet("February");
  // getLastMonthAccountsAndBalances(sheet);
  // let ssData = getSpreadsheetByName(ssID);
  // createTemplate(ssData);

  // let sheet = getSpreadsheetByName(ssID).getSheetByName("January");
  // Logger.log(getLastMonthAccountsAndBalances(sheet));
}