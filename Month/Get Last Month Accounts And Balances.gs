function getLastMonthAccountsAndBalances(sheet){
  // let accountsAndBalances = {};
  let lastMonth = sheet.getName();
  // Logger.log(lastMonth);
  let accountsAndBalances = [];
  let accountColumn = 3;
  let amountColumn = 6;
  let startMarker = "This Month Balance Per Account:";
  let endMarker = "Last Month Balance Per Account:";
  
  // if( lastMonth === "January" )
    // endMarker = "";
  // else
    // endMarker = "Last Month Balance Per Account:";

  // Intorate over column data (C/3 & F/6) to retreive the account and amount information and return
  let initialData = getDataInColumn(sheet, accountColumn, amountColumn - accountColumn + 1);
  // Logger.log(`initialData = ${initialData}`);
  for( let i = 0; i < initialData.length; i++ ){
    let value = initialData[i][0];
    // Logger.log(`value = ${value}`);
    if( value === startMarker){
      for( let j = i + 1; j < initialData.length; j++ ){
        let account = initialData[j][0];
        let balance = initialData[j][3];
        // Logger.log(`Account at initialData[${j}][0] = ${account}`);
        // Logger.log(`Balance at initialData[${j}][0] = ${balance}`);
        if( account === endMarker ){
          break;
        }
        // Logger.log(`balance = ${balance}`);
        accountsAndBalances.push([account, balance.toFixed(2)]);
      }
    }
  }
  // Logger.log(initialData);
  // Logger.log(accountsAndBalances);

  return accountsAndBalances;
}
