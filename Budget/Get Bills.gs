function getBills(){
  let sheet = ss.getSheetByName(budgetSheetName);
  let lastRow = sheet.getLastRow();
  let area = getBudgetArea();
  let bills = [];
  
  for( let r = area.startRow; r <= area.endRow; r++ ){
    let name = sheet.getRange(r, 2).getValue();
    let isBill = sheet.getRange(r, 3).getValue();
    let amount = sheet.getRange(r, 4).getValue();
    let lineItem = {
      name: name,
      amount: amount,
    };
//    Logger.log('r: ' + r + ', name: ' + name + ', isBill: ' + isBill + ', amount: ' + amount);
    if( isBill ){
//      Logger.log('name: ' + name + ', amount: ' + amount);
      bills.push(lineItem);
    }
  }
//  Logger.log(bills.toString());
  return bills;
}
