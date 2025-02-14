function test(){
  // Logger.log(`ssID = ${ssID}`);

  var sheet = ss.getSheetByName(currentMonthSheetName);
  buildTracker(sheet, expenseTrackerString, false);
}