// ************************** //
// ******  DEPRECATED  ****** //
// ************************** //

/***********************************************************************************************************************
  USEAGE:
  Logger.log(`This Account Belongs To "${getAccountName()}"`);
  
  OUTPUT:
  This Account Belongs To "{Whoever is in the cell two collumns to the right of "Account Name:" in the "Account" Sheet}"
************************************************************************************************************************/

/*

function getAccountName(){
  let sheet = accountSheet;
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  let dataRange = sheet.getRange(1, 1, lastRow, lastColumn);
  let data = dataRange.getValues();
//  Logger2D(data, false, "AccountSheetData");
  let flattenedData = data.flat();
  let accountNameLocation = flattenedData.indexOf("Account Name:");
  let accountName = flattenedData[accountNameLocation + 2];
//  Logger.log(accountName);
  return accountName;
}

*/