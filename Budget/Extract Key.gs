function extractKey(array, key){
  for( let i in array ){
    let keys = Object.keys(array[i]);
    if( keys.indexOf(key) === -1 ){
      error('The key "' + key + '" was not found in passed object');
      return;
    } else {
      let values = [];
      for( let i = 0; i < array.length; i++ ){
        values.push(array[i][key]);
      }
      return values;
    }
  }
}
