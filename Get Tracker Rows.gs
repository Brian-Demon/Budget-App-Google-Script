function getTrackerRows(sheet, section){
  // Check if sheet passed is valid 
  if( !sheet || defaultSheets.indexOf(sheet.getName()) > -1 ){
    error("Invalid sheet passed. --getTrackerRows(sheet, section)");
    return;
  }
  // Check if section passed is valid
  if( section !== expenseTrackerString && section !== incomeTrackerString ){
    error('Invalid section, "' + section + '" passed. --getTrackerRows(sheet, section)');
    return;
  }
  
  let maxRow = sheet.getMaxRows();
  let maxColumn = sheet.getMaxColumns();
  let startRow = 0;
  // Find column  and startRow based on section passed
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
//  Logger.log("Column: " + column);
  // Check if column and startRow were set
  if( column === 0 || startRow === 0 ){
    error('"' + section + '" not found on sheet passed. --getTrackerRows(sheet, section)');
    return;
  }
  // Find the number of rows
  let trackerColors = sheet.getRange(startRow, column, (maxRow - startRow), 1).getBackgrounds();
  for( let i = 0; i < trackerColors.length; i++ ){
    let color = trackerColors[i];
//    Logger.log("Index: " + i + ", Color: " + color);
    if( color == colors.white ){
      return ( i ); // Return the index value which is ultimately (length of section minus startRow plus one)
    }
  }
}
