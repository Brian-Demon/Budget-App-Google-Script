function ssDataCheck(ssData){
  if( ssData ){
    return true;
  } else {
    error("The database is missing. Please contact support. --ssDataCheck()");
    return false;
  }
}
