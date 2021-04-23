function checkForDatabase(){
  let ssData = getSpreadsheetByName(ssID);
//  Logger.log(ssData.getName());
  if( ssData ){
    return true;
  } else {
    return false;
  }
}
