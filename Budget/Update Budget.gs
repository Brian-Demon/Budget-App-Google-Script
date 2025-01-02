function updateBudget(){
  // Check if database exiists
  let ssData = getSpreadsheetByName(ssID);
  if( !ssDataCheck(ssData) ) return;
  
  let budget = getBudget();
  let bills = getBills();
  
  let sheet = ssData.getSheetByName(budgetSheetName);
  if( !sheet ){
    ssData.insertSheet(budgetSheetName, defaultSheets.indexOf(budgetSheetName)).setTabColor(colors.red);
    sheet = ssData.getSheetByName(budgetSheetName);
  }
  
  // STORE IN DATABASE
  let oldBudget = getBudgetFromDatabase();
  let oldBills = getBillsFromBudget(oldBudget);
  // Check if the user wants to update the "Current Month" budget section in addition to in the database
  let ui = SpreadsheetApp.getUi();
  let response = ui.alert("Update Current Month?", "Are you sure you want to update the budget?\n", ui.ButtonSet.YES_NO);
  if( response === ui.Button.YES ){
    // LOADING...
    loading();
    sheet.clear();
    for( let i = 0; i < budget.length; i++ ){
      sheet.getRange(i + 1, 1).setValue(budget[i].name);
      sheet.getRange(i + 1, 2).setValue(budget[i].billDue);
      sheet.getRange(i + 1, 3).setValue(budget[i].amount);
    }
    // Set date updated (row, 2)
    let row = 3;
    today = Utilities.formatDate(new Date(), timeZone, dateFormat);
    let budgetSheet = ss.getSheetByName(budgetSheetName);
    budgetSheet.getRange(row, 2).setValue(today);
    let area = getBudgetArea();
    if( !budgetSheet ){
      error("Budget sheet is missing. Please contact support. --updateBudget()");
      return;
    }
    budgetSheet.getRange(area.endRow + 2, 4).setValue("=SUM(D" + area.startRow + ":D" + area.endRow + ")");
    buildBudget(ss.getSheetByName(currentMonthName));
    let didTheBillsChange = didBillsChange(oldBills, bills);
    //    Logger.log("Did the bills change: " + didTheBillsChange);
    if( didTheBillsChange ){
      buildBills(ss.getSheetByName(currentMonthName));
    }
    ss.toast("Budget updated in the database and Current Month successfully.");
    // STOP LOADING...
    stopLoading();
  }
}
