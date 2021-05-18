function didBillsChange(oldBills, currentBills){
  let bills = currentBills || getBills();
  let currentBillsNames = extractKey(bills, "name");
  // First simple checks
  if( !oldBills && bills || oldBills && !bills) return true;
  if( oldBills.length === 0 && bills.length > 0 ) return true;
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
