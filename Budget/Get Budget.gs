function getBudget(){
  let sheet = ss.getSheetByName(budgetSheetName);
  let lastRow = sheet.getLastRow();
  let area = getBudgetArea();
  let budget = [];
  
  for( let r = area.startRow; r <= area.endRow; r++ ){
    let name = sheet.getRange(r, 2).getValue();
    let isBill = sheet.getRange(r, 3).getValue();
    let amount = sheet.getRange(r, 4).getValue();
    let lineItem = {
      name: name,
      amount: amount,
      isBill: isBill
    };
    budget.push(lineItem);
  }
  return budget;
}
