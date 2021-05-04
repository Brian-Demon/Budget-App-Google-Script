function getBudgetFromSheet(sheet){
  // Check if sheet is valid and not a default sheet
  if( !sheet ){
    error("Sheet passed does not exist. --getBudgetFromSheet()");
    return;
  }
  if( defaultSheets.indexOf(sheet.getName()) > -1 ){
    error("Sheet passed is not valid. --getBudgetFromSheet()");
    return;
  }
  
  // Find where budget starts, if not send error message and return
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastRow();
  let row = 0;
  for( let r = 1; r <= lastRow; r++ ){
    for( let c = 1; c <= lastColumn; c++ ){
      let value = sheet.getRange(r, c).getValue();
      if( value === "Line Item" ){
        row = r + 2;
        break;
      }
    }
  }
  let budget = [];
  for( let r = row; r <= lastRow; r++ ){
    let name = sheet.getRange(r, 2).getValue();
    let amount = sheet.getRange(r, 3).getValue();
    if( name === "TOTALS:" ){
      break;
    }
    let info = {
      name: name,
      amount: amount
    }
    budget.push(info);
  }
//  for( let i = 0; i < budget.length; i++ ){
//    Logger.log("i: " + i + ", " + budget[i].name + " = " + budget[i].amount);
//  }
  return budget;
}
