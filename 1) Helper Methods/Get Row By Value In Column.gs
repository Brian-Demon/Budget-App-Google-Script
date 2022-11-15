function getRowByValueInColumn(sheet, valueExpected, column = 1){
  // Check if passed sheet exists
  if( !sheet ){
    error("Sheet passed does not exists. --Helpers/getRowByValueInColumn()");
    return;
  }

  let data = getDataInColumn(sheet, column).flat();
  for( let i = 0; i < data.length; i ++ ){
    let valueFound = data[i];
    if( valueFound === valueExpected ){
      return i + 1; // The row it was found on is the index + 1 because getDataInColumn() starts at row 1
    }
  }

  error(`\"${valueExpected}\" not found on \"${sheet.getName()}\" in column ${column} sheet. --getRowByValueInColumn()`);
}
