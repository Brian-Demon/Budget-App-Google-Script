function getIncomeSources(){
  // Check if income sheet exists
  let sheet = ss.getSheetByName(incomeSheetName);
  if( !sheet ){
    error("Income Sheet is missing. Please contact support. --getIncomeSources()");
    return;
  }
  
  // Find start location of where the income source list (column) starts
  let incomeLocation = locateOnSheet(sheet, "Income Sources");
  if( !incomeLocation ){
    error('Could not locate "Income Sources" on "Income" sheet. --getIncomeSources()');
    return;
  }
  let startRow = incomeLocation.row + 2;
  let column = incomeLocation.col;
  let lastRow = sheet.getLastRow();
  // Itorate over section and store each income source 
  let incomeSources = [];
  for( let r = startRow; r <= lastRow; r++ ){
    let value = sheet.getRange(r, column).getValue();
    let color = sheet.getRange(r, column).getBackground();
//    Logger.log("Row: " + r + ", Value: " + value + ", Color: " + color + "darkGray4: " + colors.darkGray4);
    if( color !== colors.darkGray4 ){
      break;
    }
    if( value !== "" ){
      incomeSources.push(value);
    }
  }
//  Logger.log(incomeSources.toString());
  return incomeSources;
}
