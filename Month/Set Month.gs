function setMonthName(sheet, month){
  // Check if sheet passed exists
  if( !sheet ){
    error('Sheet passed does not exist. --setMonthName()');
    return;
  }
  
  // Check if month passed exists
  if( months.indexOf(month) === -1 ){
    error('"' + month + '" is not a valid month. --setMonthName()');
    return;
  }
  
  // Check if sheet is not a default sheet
  if( defaultSheets.indexOf(sheet.getName) > -1 ){
    error('"' + sheet.getName() + '" is not a valid sheet for this method. --setMonthName()');
    return;
  }
  
  // Find area that the month goes in passed sheet (the BLACK cell)
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  let sheetColors = sheet.getRange(1, 1, lastRow, lastColumn).getBackgrounds();
  for( let i = 1; i < sheetColors.length; i++ ){
    for( let j = 1; j < sheetColors[i].length; j++ ){
      let value = sheetColors[i][j];
      if( value === colors.black ){
        sheet.getRange((i + 1), (j + 1)).setValue(month);
      }
    }
  }
}
