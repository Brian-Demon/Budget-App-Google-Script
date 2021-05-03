function getBudgetData(month){ // Returns 2D array containing the budget data for a given month
  // Check if database exiists
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ) return;
  // Check if sheet exists
  let sheet = ssData.getSheetByName(month);
  if( !sheet ){
    error('"' + month + '" does not exist in the database. Please contact support. --getBudgetData()');
    return;
  }
  
  let budgetRange = getBudgetRange(sheet);
  let values = budgetRange.getValues();
  let results = [];
  
  for( let i = 0; i < values.length; i++ ){
    let push = [];
    for( let j = 0; j < values[i].length; j++ ){
      let value = values[i][j];
      if( (typeof value) === "number" && value % 1 != 0){
        value = Number.parseFloat(value).toFixed(2);
      }
      push.push(value);
    }
    results.push(push);
  }
  
//  for( let i = 0; i < results.length; i++ ){
//    for( let j = 0; j < results[i].length; j++ ){
//      Logger.log("[" + i + "][" + j + "] = " + results[i][j]);
//    }
//  }
  
  if( results.length > 0 ){
    return results;
  } else {
    results.push([["NOTHING HERE"]]);
  }
}
