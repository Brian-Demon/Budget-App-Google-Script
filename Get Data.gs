/***********************************************************************************************************************
  USEAGE:
  Gets all the visible data (not including formats or colors) in a passed sheet.
  When passing true as the second parameter, the array will contain data in three array sections;
  the data, the row coordinate, and the collumn coordinate.
  
  EXAMPLE:
  getData( sheet, true ) => [ data, row, column, data, row, column, ... ]
  getData( sheet, false ) => [ data, data, data, data, data, data, ... ] *DEFAULT*
************************************************************************************************************************/

function getData( sheet = ss.getActiveSheet(), withCoordinates = false ){ // RETURNS DATA ARRAY => [STRING, INTEGER, INTEGER] => [Value, Row, Column] // *DOES NOT RETURN EMPTY VALUES
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  let data = [];
  
  for( let x = 1; x <= lastRow; x++ ){
    for( let y = 1; y <= lastColumn; y++ ){
      let value = sheet.getRange(x, y).getValue();
      if( value !== "" ){
        data.push(value);
        if( withCoordinates ){
          data.push(x);
          data.push(y);
        }
      }
    }
  }
  
 for( let i = 0; i < data.length; i++ ){
   Logger.log('i: ' + i + ' = ' + data[i]);
 }
  
  return data;
}
