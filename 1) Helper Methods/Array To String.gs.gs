function arrayToString(array, seperator = ", "){
  var string = "";
  for (let i = 0; i < array.length; i++){
    if (i == 0)
      string = array[i] + seperator;
    else if (i == array.length)
      string += array[i];
    else
      string += array[i] + seperator;
  }
  return string;
}