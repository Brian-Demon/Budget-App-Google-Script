function onOpen(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create menu
  menu();
  
  // Check if ssData is there
  let check = checkForDatabase();
//  Logger.log(check);
  if( !check ){
    ss.toast("The database is missing. Please contact support. --checkForDatabase()", "FATAL ERROR!", 20);
    return;
  }
  
  // Check if Loading sheet is visible somehow, if so delete it
  let loadingSheet = ss.getSheetByName("Loading");
  // Logger.log("loading sheet check: " + loadingSheet);
  if( loadingSheet ){
    // Logger.log("Deleting...");
    ss.deleteSheet(loadingSheet);
  }
//  ss.toast("You are now free to move about the cabin.", "Initial Startup COMPLETE", 5);
}
