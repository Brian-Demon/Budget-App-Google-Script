function validateSheetPassed(sheet, methodName, validateSheetIsDefaultSheet = false){
  if( !sheet ){
    error(`Sheet passed does not exist. Please contact support. --${methodName}()`);
    return false;
  }

  if (validateSheetIsDefaultSheet)
  {
    var sheetName = sheet.getSheetName();
    if(!defaultSheets.includes(sheetName)){
      error("Sheet passed is NOT a valid (default) sheet. Please contact support. --validateSheetPassed()");
      return false;
    }
  }
  return true;
}
