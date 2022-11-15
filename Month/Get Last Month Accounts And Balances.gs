function getLastMonthAccountsAndBalances(sheet){
  // let accountsAndBalances = {};
  let accountsAndBalances = [];
  let accountColumn = 3;
  let amountColumn = 6;
  let startMarker = "This Month Balance Per Account:";
  let endMarker = "Last Month Balance Per Account:";

  // Intorate over column data (C/3 & F/6) to retreive the account and amount information and return
  let initialData = getDataInColumn(sheet, accountColumn, amountColumn - accountColumn + 1);
  // Logger.log(initialData);
  for( let i = 0; i < initialData.length; i++ ){
    let value = initialData[i][0];
    if( value === startMarker){
      for( let j = i + 1; j < initialData.length; j++ ){
        let account = initialData[j][0];
        let balance = initialData[j][3];
        if( account === endMarker ){
          break;
        }
        accountsAndBalances.push([account, balance.toFixed(2)]);
      }
    }
  }
  // Logger.log(initialData);
  // Logger.log(accountsAndBalances);

  return accountsAndBalances;
}
