function getYearToDateTotals(){
  var yearToDateTotals = {};
  var lineItemMasterList = [];
  var lineItemMasterListUpperCase = [];
  var monthSheetsInDatabase = getMonthSheetsInDatabase();
  for (let i = 0; i < monthSheetsInDatabase.length; i++){
    let sheet = monthSheetsInDatabase[i];
    let sheetName = sheet.getSheetName();
    // Store budget data -- (lineItem: thisMonth)
    let budgetDataInSheet = getBudgetData(sheetName);
    budgetDataInSheet.pop();
    // Add budget line items to master list...
    for (let j = 0; j < budgetDataInSheet.length; j++){
      // Check if line item already exists...
      let lineItem = budgetDataInSheet[j][0];
      let amount = parseFloat(parseFloat(budgetDataInSheet[j][3]).toFixed(2));
      let lineItemUpperCase = lineItem.toUpperCase();
      // Check if the line item has been seen before. If not, add it to yearToDateTotals and set amount to 0...
      if (!lineItemMasterListUpperCase.includes(lineItemUpperCase)){
        lineItemMasterList.push(lineItem);
        lineItemMasterListUpperCase.push(lineItemUpperCase);
        yearToDateTotals[lineItem] = 0;
      }
      // Calculate line item amount versus what's in yearToDateTotals already...
      let currentLineItemAmountAsIs = yearToDateTotals[lineItem];
      currentLineItemAmount = parseFloat(parseFloat(currentLineItemAmountAsIs).toFixed(2));
      let currentAmountAsFloat = parseFloat(amount.toFixed(2));
      let newTotal = parseFloat((currentLineItemAmount + currentAmountAsFloat).toFixed(2));
      yearToDateTotals[lineItem] = newTotal;
    }
  }
  //Logger.log(yearToDateTotals);
  return yearToDateTotals;
}
