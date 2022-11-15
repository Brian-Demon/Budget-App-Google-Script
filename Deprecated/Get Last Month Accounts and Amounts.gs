function getLastMonthAccountsAndAmounts(sheet){
  let accountsAndAmounts = {
    income: [],
    expenses: []
  };
  let accountColumn = 3;
  let amountColumn = 6;
  let incomeMarker = "This Month Income Per Account:";
  let expenseMarker = "This Month Expenses Per Account:";

  // Intorate over column data (C/3 & F/6) to retreive the account and amount information and return
  let initialData = getDataInColumn(sheet, accountColumn, amountColumn - accountColumn + 1);
  // Logger.log(initialData);
  for( let i = 0; i < initialData.length; i++ ){
    let value = initialData[i][0];
    if( value === incomeMarker){

      for( let j = i + 1; j < initialData.length; j++ ){
        if( initialData[j][0] === expenseMarker ){
          break;
        }
        accountsAndAmounts.income.push([initialData[j][0], initialData[j][3]]);
      }
    }
    if( value === expenseMarker){
      for( let j = i + 1; j < initialData.length; j++ ){
        if( initialData[j][0] === "" ){
          break;
        }
        accountsAndAmounts.expenses.push([initialData[j][0], initialData[j][3]]);
      }
    }
  }
  // Logger.log(initialData);
  // Logger.log(accountsAndAmounts);

  return accountsAndAmounts;
}
