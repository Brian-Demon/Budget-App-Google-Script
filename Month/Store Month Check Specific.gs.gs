function storeMonthCheckSpecific(sheet){
  // Check if active sheet is able to be stored
  let sheetName = sheet.getName();
  if( sheetName === currentMonthName ){
    error('You cannot store this sheet. Use "START NEW MONTH" instead if this month is complete.');
    return;
  }
  if( months.indexOf(sheetName) === -1){
    error("You cannot store this sheet.");
    return;
  }
  
  restoreMonth(sheetName);
}
