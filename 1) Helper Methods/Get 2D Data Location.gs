function get2DRow(array, data){
  for( let i = 0; i < array.length; i++ ){
    for( let j = 0; j < array[i].length; j++ ){
      if( array[i][j] === data ){
        return ( i + 1 );
      }
    }
  }
}

function get2DColumn(array, data){
  for( let i = 0; i < array.length; i++ ){
    for( let j = 0; j < array[i].length; j++ ){
      if( array[i][j] === data ){
        return ( j + 1 );
      }
    }
  }
}