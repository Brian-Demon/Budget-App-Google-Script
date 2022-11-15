function getLastMonthBalances(sheet){
  // Check if passed sheet exists
  if( !sheet ){
    error("Sheet passed does not exists. --getLastMonthBalances()");
    return;
  }

  let lastRow = sheet.getLastRow();
  let value = "Last Month Balance Per Account:";
  
  let data = sheet.getRange(1, 3, lastRow, 4).getValues();
  let newData = [];
  // Logger.log(data);

  for( let i = 0; i < data.length; i++ ){
    let currentValue = data[i][0];
    if( currentValue === value ){
      for( let j = i + 1; j < data.length; j++ ){
        newData.push([data[j][0], data[j][3]]);
      }
    }
  }

  // Logger.log(newData);
  return newData;
}
