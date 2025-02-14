function test(){
  // Logger.log(`ssID = ${ssID}`);

  var sheet = ss.getSheetByName(currentMonthSheetName);
  buildBills(sheet, false);
}