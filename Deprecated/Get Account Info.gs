// ************************** //
// ******  DEPRECATED  ****** //
// ************************** //

/*
function getAccountInfo(toCheck){
  // Set sheet to Account Sheet
  let sheet = ss.getSheetByName(accountSheetName);
  if( !sheet){
    error("Account sheet is missing. Please contact support. --getAccountInfo()");
    return;
  }
  
  // get data (values) from sheet and itorate over it to find thee specific item to check, then + 6 index slots will determine the value
  let data = getData(sheet, false);
//  Logger.log(data.toString());
  for( let i = 0; i < data.length; i++ ){
    let value = data[i];
    if( value === toCheck ){
      return data[i + 1];
    }
  }
  error('"' + toCheck + '" not found on the account sheet. Please contact support. --getAccountInfo()');
  return;
}
*/