function getCCSources(){
  // Check if CC sheet exists
  let sheet = ss.getSheetByName(ccSheetName);
  if( !sheet ){
    error("CC Sheet is missing. Please contact support. --getCCSources()");
    return;
  }
  
  // Find start location of where the cc source list (column) starts
  let ccLocation = locateOnSheet(sheet, "CC Sources");
  if( !ccLocation ){
    error('Could not locate "CC Sources" on "CC" sheet. --getCCSources()');
    return;
  }
  let startRow = ccLocation.row + 2;
  let column = ccLocation.col;
  let lastRow = sheet.getLastRow();
  // Itorate over section and store each cc source 
  let ccSources = [];
  for( let r = startRow; r <= lastRow; r++ ){
    let value = sheet.getRange(r, column).getValue();
    let color = sheet.getRange(r, column).getBackground();
//    Logger.log("Row: " + r + ", Value: " + value + ", Color: " + color + "darkGray4: " + colors.darkGray4);
    if( color !== colors.darkGray4 ){
      break;
    }
    if( value !== "" ){
      ccSources.push(value);
    }
  }
//  Logger.log(cc.toString());
  return ccSources;
}
