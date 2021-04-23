function updateDataValidation(sheet, valuesRange, range){
  // Check if passed sheet exists
  if( !sheet ){
    error("Sheet passed does not exists. --updateDataValidation(sheet, valuesRange, range)");
    return;
  }
  
  let rule = SpreadsheetApp.newDataValidation().requireValueInRange(valuesRange).setAllowInvalid(false).build();
  setDataValidation(sheet, rule, range);
}
