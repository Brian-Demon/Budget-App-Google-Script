function loggerBudget( b ){
  let budget = b || getBudget();
  
  for( let i = 0; i < budget.length; i++ ){
    Logger.log( 'i: ' + i + ', name: ' + budget[i].name + ', amount: ' + budget[i].amount + ', isBill: ' + budget[i].isBill );
  }
}
