// ************************** //
// ******  DEPRECATED  ****** //
// ************************** //

/*
function saveAccount(accountInfo){
  // Check if database exiists
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ) return;
  // Check if array passed has nothing in it
  if( accountInfo.length === 0 ){
    error("accountInfo.length === 0. --saveAccount(accountInfo)");
    return;
  }
  // Check if Acount sheet in ssData exists, if not, create it
  let sheet = ssData.getSheetByName(accountSheetName);
  if( !sheet ){
    ssData.insertSheet(accountSheetName, defaultSheets.indexOf(accountSheetName)).setTabColor(colors.orange);
    sheet = ssData.getSheetByName(budgetSheetName);
  }
  
  // Save account info to ssData
  sheet.clear();
  for( let i = 0; i < accountInfo.length; i++ ){
    sheet.getRange(i + 1, 1).setValue(accountInfo[i]);
  }
  closeSidebar();
}
*/