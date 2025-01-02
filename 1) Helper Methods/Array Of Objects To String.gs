function arrayOfObjectsToString(arrayOfObjects){
  var string = "";
  for (let i = 0; i < arrayOfObjects.length; i++){
    let object = arrayOfObjects[i];
    if (i == 0)
      string = `arrayOfObjects[${i}]:\n-------------------\n${objectToString(object)}`;
    else
      string += `\n\narrayOfObjects[${i}]:\n-------------------\n${objectToString(object)}`;
  }

  Logger.log(string);
  return string;
}
