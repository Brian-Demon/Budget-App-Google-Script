function didBillsChange(oldBills, currentBills){
  let bills = currentBills || getBills();
  let currentBillsNames = extractKey(bills, "name");
//  Logger.log(currentBillsNames.toString());
  // First check if there are the same amount of bills in each 
  if( oldBills.length !== bills.length ) return true;
  // Second check if the oldBills contents exactly match the currentBills (bills) exactly regardless of order
  for( let i = 0; i < bills.length; i++ ){
    let name = bills[i].name;
    if( currentBillsNames.indexOf( name ) === -1 ){
      return true;
    } else {
//      Logger.log("i: " + i + ", Current: " + bills[i].amount + ", Old: " + oldBills[i].amount);
      if( bills[i].amount !== oldBills[i].amount ){
        return true;
      }
    }
  }
  return false;
}
