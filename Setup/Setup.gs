function setup(){
  let files = DriveApp.getFilesByName(ssID);
  while (files.hasNext()) {
    var currentFile = files.next();
    if( currentFile.getName() === ssID ){
//      currentFile.setTrashed(true);
      error("Database already exists...");
      return;
    }
  }
  
  // Create ssData sheet
  SpreadsheetApp.create(ssID);
  files = DriveApp.getFilesByName(ssID);
  while (files.hasNext()) {
    var currentFile = files.next();
    if( currentFile.getName() === ssID ){
      var file = currentFile;
      break;
    }
  }
  let ssData = SpreadsheetApp.open(file);
  
  // Create Template in the now initialized ssData spreadsheet
  createTemplate(ssData);
  // Delete sheet that is created by default
  ssData.deleteSheet(ssData.getSheetByName("Sheet1"));
  // Create Budget Sheet (blank)
  ssData.insertSheet(budgetSheetName, defaultSheets.indexOf(budgetSheetName));
  ssData.getSheetByName(budgetSheetName).setTabColor(colors.red);
  // Create Income Sheet (blank)
  ssData.insertSheet(incomeSheetName, defaultSheets.indexOf(incomeSheetName));
  ssData.getSheetByName(incomeSheetName).setTabColor(colors.green);
  
  // Delete WELCOME sheet
  ss.toast("REMINDER: DELETE WELCOME SHEET IN CODE (un-comment");
//  ss.deleteSheet(ss.getSheetByName("WELCOME"));
}