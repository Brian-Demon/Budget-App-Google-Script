function setDataValidation(sheet, rule, range){
  // Check if passed sheet exists
  if( !sheet ){
    error("Sheet passed does not exists. --setDataValidation()");
    return;
  }
  
  range.setDataValidation(rule);
}
