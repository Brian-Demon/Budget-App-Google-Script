function toggleAccount(){
  let sheet = ss.getSheetByName("Account");
  if( !sheet ){
    error('The "Account" page is missing. Contact support for help (Budget Menu -> Help -> Contacts)');
    return;
  } else {
    if( sheet.isSheetHidden() ){
      ss = SpreadsheetApp.openById(ssID);
      sheet.showSheet();
      setActiveSheet(sheet.getName());
    } else {
      if( ss.getSheets().length === 1 ){
        error("You can not close this page if it is the only one visible");
      } else {
        sheet.hideSheet();
      }
    }
  }
}
