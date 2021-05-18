function getBillsFromBudget(budget){
  // Check if budget passed is valid
  if( !budget || budget.length === 0 ){
    error("Invalid budget passed. --getBillsFromBudget()");
    return;
  }
  
  // GET BILLS
  let bills = [];
  for( let i in budget ){
    if( budget[i].isBill ){
      let name = budget[i].name;
      let amount = budget[i].amount;
      // Logger.log("i: " + i + ", name: " + name + ", amount: " + amount);
      let lineItem = {
        name: name,
        amount: amount,
      };
      bills.push(lineItem);
    }
  }
  // Check if bills array was filled
  if( bills.length === 0 ){
    Logger.log("Bills array was empty, was the old budget devoid of bills? --getBillsFromBudget()");
    return null;
  } else {
    return bills;
  }
}
