function getBudgetArea(){
  let sheet = ss.getSheetByName(budgetSheetName);
  let lastRow = sheet.getLastRow();
  let area = {
    startRow: 0,
    endRow: 0
  }
  
  for( let r = 1; r <= lastRow; r++ ){
    let value = sheet.getRange(r, 2).getValue();
    //    Logger.log("Row: " + r + ", Value: " + value);
    if( value === "start" ){
      area.startRow = r + 1;
    }
    if( value === "end" ){
      area.endRow = r - 1;
      break;
    }
  }
  
  var budgetAreaToString = objectToString(area);
  // Logger.log(`Budget Area: \n\n${budgetAreaToString}`);
  return area;
}
