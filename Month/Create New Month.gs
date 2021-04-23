function createNewMonth(){
  // Check if Current Month sheet exists
  let sheet = ss.getSheetByName(currentMonthName);
  if( !sheet){
    error('"Current Month" sheet is missing. Please contact support. --createNewMonth()');
    return;
  }
  // Check to make sure ssData is there
  let ssData = getSpreadsheetByName(ssID);
  if ( !ssData ){
    error('ssData not found in Google Drive. Please contact support. --storeMonth(month)');
    return;
  }
  
  // Prompt user to confirm create new month
  let ui = SpreadsheetApp.getUi();
  let response = ui.alert("Create New Month", "Are you sure?", ui.ButtonSet.YES_NO);
  if( response !== ui.Button.YES ){
    return;
  }
  
  // LOADING...
  loading();
  
  // Check if template exists, if not re-create and move on
  let template = ssData.getSheetByName("Template");
  if( !template ){
    createTemplate(ssData);
    template = ssData.getSheetByName("Template");
  }
  //*********************//
  // STORE CURRENT MONTH //
  //*********************//
  let month = getMonth(sheet);
  let nextMonth = getNextMonth(month);
  // Check if it's the end of the year
  if( nextMonth === nextYear ){
    stopLoading();
    ss.toast("Please contact support for next years budget! CHEERS!!! :D", "HAPPY NEW YEAR!!! ", 10);
    return;
  }
  // Check if month stored correctly by trying to store Current Month (running storeMonth(month) method)
  if( storeMonth(month) ){
    // Delete Current Month
    ss.deleteSheet(sheet);
    // Copy template from ssData to ss
    template.copyTo(ss);
    sheet = ss.getSheetByName("Copy of Template").setName(currentMonthName).setTabColor(colors.blue);
    //*************************//
    // SETUP NEW CURRENT MONTH //
    //*************************//
    // SET MONTH NAME ON NEWLY CREATED Current Month SHEET
    setMonthName(sheet, nextMonth);
    // BUILD ALL SECTIONS
    buildAll(sheet);
    // Freeze rows up to startRow - 2;
    let startRow = getStartRow(sheet);
    sheet.setFrozenRows(startRow - 2);
    // STOP LOADING
    stopLoading();
  } else {
    // STOP LOADING
    stopLoading();
  }
}
