function createTemplate(spreadsheet){
  // check to make sure ssData is there
  if ( !spreadsheet ){
    error('spreadsheet not found in Google Drive. Please contact support. --createTemplate()');
    return;
  }
  
  let sheetName = "Template";
  let sheet = spreadsheet.getSheetByName(sheetName);
  let sheets = spreadsheet.getSheets();
  let tempSheet = false;
  
  if( sheet ){
    if( sheets.length === 1 ){
      spreadsheet.insertSheet("TEMP");
      tempSheet = true;
    }
    spreadsheet.deleteSheet(sheet);
  }
  // CREATE TEMPLATE SHEET
  sheet = spreadsheet.insertSheet(sheetName, 1).setTabColor(colors.purple);
  if( tempSheet ){
    spreadsheet.deleteSheet(spreadsheet.getSheetByName("TEMP"));
  }
  
  // **************************** //
  // *** SETUP TEMPLATE SHEET *** //
  // **************************** //
  let startingColumn = 2;
  // Hide gridlines
  sheet.setHiddenGridlines(true);
  
  // Set first row height
  sheet.setRowHeight(1, 5);
  
  // Set column widths
  mySetColumnWidth(sheet, "A", 5);
  mySetColumnWidth(sheet, "G", 5);
  mySetColumnWidth(sheet, "N", 5);
  mySetColumnWidth(sheet, "T", 5);
  sheet.insertColumnAfter(26);
  mySetColumnWidth(sheet, "AA", 5);
  
  // Set merged cells
  sheet.getRange(2, startingColumn, 1, 5).mergeAcross();
  sheet.getRange(2, startingColumn + 6, 1, 4).mergeAcross();
  sheet.getRange(2, startingColumn + 13, 1, 3).mergeAcross();
  sheet.getRange(2, startingColumn + 19, 1, 4).mergeAcross();
  
  // Set background, font colors, horizontal & vertical alignments, font weight (bold), and borders
  sheet.getRange(2, startingColumn).setBackground(colors.black).setFontColor(colors.white).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true, true, true, true, true, true, "black", solidMedium);
  sheet.getRange(3, startingColumn, 1, 5).setBackground(colors.darkRed2).setFontColor(colors.white).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true, true, true, true, true, true, "black", solidMedium);
  sheet.getRange(2, startingColumn + 6, 2, 6).setBackground(colors.darkCornflowerBlue3).setFontColor(colors.white).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true, true, true, true, true, true, "black", solidMedium);
  sheet.getRange(2, startingColumn + 13, 2, 5).setBackground(colors.darkCyan3).setFontColor(colors.white).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true, true, true, true, true, true, "black", solidMedium);
  sheet.getRange(2, startingColumn + 19, 2, 6).setBackground(colors.darkPurple2).setFontColor(colors.white).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true, true, true, true, true, true, "black", solidMedium);
  
  // Set text
  // Budget 
  sheet.getRange(3, startingColumn).setValue('Line Item');
  sheet.getRange(3, startingColumn + 1).setValue('Amount');
  sheet.getRange(3, startingColumn + 2).setValue('Last Month');
  sheet.getRange(3, startingColumn + 3).setValue('This Month');
  sheet.getRange(3, startingColumn + 4).setValue('Balance');
  // Expenses
  sheet.getRange(2, startingColumn + 6).setValue('Expense Tracker');
  sheet.getRange(2, startingColumn + 10).setValue('Expenses Total:').setHorizontalAlignment("right");
  sheet.getRange(2, startingColumn + 11).setValue(0).setNumberFormat(currencyFormat);
  sheet.getRange(3, startingColumn + 6).setValue('Category');
  sheet.getRange(3, startingColumn + 7).setValue('Date');
  sheet.getRange(3, startingColumn + 8).setValue('CC Date');
  sheet.getRange(3, startingColumn + 9).setValue('Account');
  sheet.getRange(3, startingColumn + 10).setValue('Notes');
  sheet.getRange(3, startingColumn + 11).setValue('Amount');
  // Income
  sheet.getRange(2, startingColumn + 13).setValue('Income Tracker');
  sheet.getRange(2, startingColumn + 16).setValue('Income Total:').setHorizontalAlignment("right");
  sheet.getRange(2, startingColumn + 17).setValue(0).setNumberFormat(currencyFormat);
  sheet.getRange(3, startingColumn + 13).setValue('Source');
  sheet.getRange(3, startingColumn + 14).setValue('Date');
  sheet.getRange(3, startingColumn + 15).setValue('Account');
  sheet.getRange(3, startingColumn + 16).setValue('Notes');
  sheet.getRange(3, startingColumn + 17).setValue('Amount');
  // Bill Reminders
  sheet.getRange(2, startingColumn + 19).setValue('Bill Reminders');
  sheet.getRange(2, startingColumn + 23).setValue('Bills Total:').setHorizontalAlignment("right");
  sheet.getRange(2, startingColumn + 24).setValue(0).setNumberFormat(currencyFormat);
  sheet.getRange(3, startingColumn + 19).setValue('Bill');
   sheet.getRange(3, startingColumn + 20).setValue('Due');
  sheet.getRange(3, startingColumn + 21).setValue('Paid?');
  sheet.getRange(3, startingColumn + 22).setValue('Paid Amount');
  sheet.getRange(3, startingColumn + 23).setValue('Budget');
  sheet.getRange(3, startingColumn + 24).setValue('Difference');
  // Hide row right before what will be the Start Row
  myHideRow(sheet, 4);
  
  // Set the template sheet as the active sheet (COMMENTED OUT BY DEFAULT)
//  setActiveSheet(sheet.getName());
}
