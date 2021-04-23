function getBudgetFromDatabase(){
  // Check if database exiists
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ) return;
  // Check if budget sheet in database exists
  let sheet = ssData.getSheetByName(budgetSheetName);
  if( !sheet ){
    error("Budget sheet is missing in the database. --getBudgetFromDatabase()");
    return;
  }
  // Get budget from database
  let lastRow = sheet.getLastRow();
  if( lastRow === 0 ){
    Logger.log("No budget found in the database. --getBudgetFromDatabase()");
    return;
  }
  let budget = [];
  for( let r = 1; r <= lastRow; r++ ){
    let name = sheet.getRange(r, 1).getValue();
    let isBill = sheet.getRange(r, 2).getValue();
    let amount = sheet.getRange(r, 3).getValue();
//    Logger.log("r: " + r);
//    Logger.log("name: " + name);
//    Logger.log("isBill: " + isBill);
//    Logger.log("amount: " + amount);
    let lineItem = {
      name: name,
      amount: amount,
      isBill: isBill
    };
    budget.push(lineItem);
  }
  
  return budget;
}
