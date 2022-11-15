function getRowByColumnAndValue(sheet, column, valueExpected, startAtRow = 1){
  // Check if passed sheet exists
  if( !sheet ){
    error("Sheet passed does not exists. --getRowByColumnAndValue()");
    return;
  }

  let lastRow = sheet.getLastRow();
  let data = getDataInColumn(sheet, column);
  for( let i = startAtRow - 1; i < lastRow; i++ ){
    let valueFound = data[i];
    // Logger.log(`data[${i}] = ${data[i]}`);
    if( valueFound == valueExpected ){
      // Logger.log(`Row returned = ${i + 1}`);
      return i + 1;
    }
  }

  return null;
}
