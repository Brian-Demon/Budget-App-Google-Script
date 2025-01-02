function getTrackerRows(sheet, section){
  // Check if sheet passed is valid 
  let sheetName = sheet.getName();
  // Logger.log(`!sheet: ${!sheet}`);
  // Logger.log(`defaultSheets.includes(sheetName): ${defaultSheets.includes(sheetName)}`)
  if( !sheet || !defaultSheets.includes(sheetName)){
    error(`Invalid sheet (${sheetName}) passed. --getTrackerRows()`);
    return;
  }
  // Check if section passed is valid
  if( section !== expenseTrackerString && section !== incomeTrackerString && section !== ccTrackerString ){
    error('Invalid section, "' + section + '" passed. --getTrackerRows()');
    return;
  }

  let maxRow = sheet.getMaxRows();
  let maxColumn = sheet.getMaxColumns();
  let startRow = 0;
  let numberOfTrackerRows = -1;
  // Find column and startRow based on section passed
  let column = 0;
  for( let r = 1; r <= maxRow; r++ ){
    let data = sheet.getRange(r, 1, 1, maxColumn).getValues().flat();
    let index = data.indexOf(section);
    if( index > -1 ){
      startRow = r + 3;
      column = index + 1;
      break;
    }
  }
  // Logger.log("Column: " + column);
  // Check if column and startRow were set
  if( column === 0 || startRow === 0 ){
    error('"' + section + '" not found on sheet passed. --getTrackerRows()');
    return;
  }
  // Find the number of rows
  let trackerColors = sheet.getRange(startRow, column, (maxRow - startRow), 1).getBackgrounds();
  for( let i = 0; i < trackerColors.length; i++ ){
    let color = trackerColors[i];
//    Logger.log("Index: " + i + ", Color: " + color);
    if( color[0] == colors.white ){
      numberOfTrackerRows = (i - 1);
      return (numberOfTrackerRows);
    }
  }
  // If gotten this far, the end of the tracker section is the end of the sheet (maxRow)...
  numberOfTrackerRows = maxRow - startRow - 1;
  return (numberOfTrackerRows);
}
