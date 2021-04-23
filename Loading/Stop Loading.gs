function stopLoading(){
  SpreadsheetApp.flush();
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Loading");
  if( sheet ){
    ss.deleteSheet(sheet);
  }
  let lastSheetName = prevSheet[0];
  setActiveSheet(lastSheetName);
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(lastSheetName).activate();
  closeHTMLBox();
}