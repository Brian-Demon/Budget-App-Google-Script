function myHideRow(sheet, row){
  // Check if sheet passed exists
  if( !sheet ){
    error('Sheet passed does not exist. --myHideRow()');
    return;
  }
  let range = sheet.getRange(row, 1);
  sheet.hideRow(range);
}
