function Logger2D(array2D, asIndex, arrayOrSheetName = "Array"){
  if( asIndex ){
    for( let i = 0; i < array2D.length; i++ ){
      for( let y = 0; y < array2D[i].length; y++ ){
        Logger.log(`${arrayOrSheetName}[${i}][${y}] = ${array2D[i][y]}`);
      }
    }
  }
  else {
    Logger.log(`${arrayOrSheetName}:`)
    for( let row = 0; row < array2D.length; row++ ){
      for( let col = 0; col < array2D[row].length; col++ ){
        let value = array2D[row][col];
        if( value == "" ) value = "** EMPTY CELL **";
        Logger.log(`Row: ${(row + 1)}, Column: ${(col + 1)} = ${value}`);
      }
    }
  }
}
