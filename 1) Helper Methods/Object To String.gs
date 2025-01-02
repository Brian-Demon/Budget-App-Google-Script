function objectToString(object){
  // verify object type
  var objectType = typeof object;
  objectIsArray = Object.prototype.toString.call(object) == '[object Array]';
  // Logger.log(`isArray: ${objectIsArray}`);
  if (objectIsArray){
    error(`Incorrect tpye passed. Expected object (key/value), Actual: array`);
    return false;
  }
  if (objectType != "object"){
    error(`Incorrect tpye passed. Expected object (key/value), Actual: ${objectType}`);
    return false;
  }

  var string = "";
  var keys = Object.keys(object);
  var values = Object.values(object);
  for (let i = 0; i < keys.length; i++){
    let key = keys[i];
    let value = values[i];
    if (i == 0)
      string = `${key}: ${value}`;
    else
      string += `\n${key}: ${value}`;
  }

  return string;
}
