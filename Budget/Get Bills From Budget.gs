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
      let lineItem = {
        name: budget[i].name,
        amount: budget[i].amount,
      };
      bills.push(lineItem);
    }
  }
  // Check if bills array was filled
  if( bills.length === 0 ){
    error("Bills array for not created. --getBillsFromBudget()");
    return null;
  } else {
    return bills;
  }
}
