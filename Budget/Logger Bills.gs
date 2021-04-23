function loggerBills( b ){
  let bills = b || getBills();
  
  for( let i = 0; i < bills.length; i++ ){
    Logger.log( 'i: ' + i + ', name: ' + bills[i].name + ', amount: ' + bills[i].amount );
  }
}