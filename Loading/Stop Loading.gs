function stopLoading(makePrevSheetActive = true){
  SpreadsheetApp.flush();
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Loading");
  if( sheet ){
    ss.deleteSheet(sheet);
  }

  if (makePrevSheetActive)
  {
    let lastSheetName = prevSheet[0];
    setActiveSheet(lastSheetName);
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(lastSheetName).activate();
  }

  // Toast temp fix to tell user to close loading dialog...
  SpreadsheetApp.getActiveSpreadsheet().toast("You may now close the loading dialog box.", "Loading Finished:", 10);
  
  // Not working as of Dec 2024... Will fix in the future...
  // closeHTMLBox();
}