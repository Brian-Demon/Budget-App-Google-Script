function getBudgetFromSheet(sheet){
  // Check if sheet is valid and not a default sheet
  // var sheetName = sheet.getSheetName();
  var sheetIsDefaultSheet = true;
  if (!validateSheetPassed(sheet, sheetIsDefaultSheet))
    return false;
  
  // Find where budget starts, if not send error message and return
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  let row = 0;
  let range = sheet.getRange(1, 1, lastRow, lastColumn);
  let rangeValues = range.getValues();
  for (let i = 0; i < rangeValues.length; i++){
    for (let j = 0; j < rangeValues[i].length; j++){
      let value = rangeValues[i][j];
      if( value === "Line Item" ){
        row = i + 3;
        break;
      }
    }
  }
  let budget = [];
  for( let r = row; r <= lastRow; r++ ){
    let name = sheet.getRange(r, 2).getValue();
    let amount = sheet.getRange(r, 3).getValue();
    let thisMonthAmount = sheet.getRange(r, 5).getValue();
    if( name === "TOTALS:" ){
      break;
    }
    let info = {
      name: name,
      amount: amount,
      thisMonthAmount: thisMonthAmount
    }
    budget.push(info);
  }
//  for( let i = 0; i < budget.length; i++ ){
//    Logger.log("i: " + i + ", " + budget[i].name + " = " + budget[i].amount);
//  }
  return budget;
}
