function createTemplate(spreadsheet){
  // check to make sure ssData is there
  if ( !spreadsheet ){
    error('spreadsheet not found in Google Drive. Please contact support. --createTemplate(spreadsheet)');
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
  // Hide gridlines
  sheet.setHiddenGridlines(true);
  
  // Set first row height
  sheet.setRowHeight(1, 5);
  
  // Set column widths
  mySetColumnWidth(sheet, "A", 5);
  mySetColumnWidth(sheet, "G", 5);
  mySetColumnWidth(sheet, "L", 5);
  mySetColumnWidth(sheet, "Q", 5);
  mySetColumnWidth(sheet, "W", 5);
  
  // Set merged cells
  sheet.getRange(2, 2, 1, 5).mergeAcross();
  sheet.getRange(2, 8, 1, 2).mergeAcross();
  sheet.getRange(2, 13, 1, 2).mergeAcross();
  sheet.getRange(2, 18, 1, 3).mergeAcross();
  
  // Set background, font colors, horizontal & vertical alignments, font weight (bold), and borders
  sheet.getRange(2, 2).setBackground(colors.black).setFontColor(colors.white).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true, true, true, true, true, true, "black", solidMedium);;
  sheet.getRange(3, 2, 1, 5).setBackground(colors.darkRed2).setFontColor(colors.white).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true, true, true, true, true, true, "black", solidMedium);;
  sheet.getRange(2, 8, 2, 4).setBackground(colors.darkCornflowerBlue3).setFontColor(colors.white).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true, true, true, true, true, true, "black", solidMedium);;
  sheet.getRange(2, 13, 2, 4).setBackground(colors.darkCyan3).setFontColor(colors.white).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true, true, true, true, true, true, "black", solidMedium);;
  sheet.getRange(2, 18, 2, 5).setBackground(colors.darkPurple2).setFontColor(colors.white).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true, true, true, true, true, true, "black", solidMedium);;  
  
  // Set text
  // Budget 
  sheet.getRange(3, 2).setValue('Line Item');
  sheet.getRange(3, 3).setValue('Amount');
  sheet.getRange(3, 4).setValue('Last Month');
  sheet.getRange(3, 5).setValue('This Month');
  sheet.getRange(3, 6).setValue('Balance');
  // Expenses
  sheet.getRange(2, 8).setValue('Expense Tracker');
  sheet.getRange(2, 10).setValue('Expenses Total:').setHorizontalAlignment("right");
  sheet.getRange(2, 11).setValue(0).setNumberFormat(currencyFormat);
  sheet.getRange(3, 8).setValue('Category');
  sheet.getRange(3, 9).setValue('Date');
  sheet.getRange(3, 10).setValue('Notes');
  sheet.getRange(3, 11).setValue('Amount');
  // Income
  sheet.getRange(2, 13).setValue('Income Tracker');
  sheet.getRange(2, 15).setValue('Income Total:').setHorizontalAlignment("right");
  sheet.getRange(2, 16).setValue(0).setValue(0).setNumberFormat(currencyFormat);
  sheet.getRange(3, 13).setValue('Source');
  sheet.getRange(3, 14).setValue('Date');
  sheet.getRange(3, 15).setValue('Notes');
  sheet.getRange(3, 16).setValue('Amount');
  // Bill Reminders
  sheet.getRange(2, 18).setValue('Bill Reminders');
  sheet.getRange(2, 21).setValue('Bills Total:').setHorizontalAlignment("right");
  sheet.getRange(2, 22).setValue(0).setValue(0).setNumberFormat(currencyFormat);
  sheet.getRange(3, 18).setValue('Bill');
  sheet.getRange(3, 19).setValue('Paid?');
  sheet.getRange(3, 20).setValue('Paid Amount');
  sheet.getRange(3, 21).setValue('Budget');
  sheet.getRange(3, 22).setValue('Difference');
  // Hide row right before what will be the Start Row
  myHideRow(sheet, 4);
  
  // Set the template sheet as the active sheet (COMMENTED OUT BY DEFAULT)
//  setActiveSheet(sheet.getName());
}
