function showCC(){
  let sheet = ss.getSheetByName(ccSheetName);
  if( !sheet ){
    error("CC Sheet is missing. Please contact support. --showCC()");
    return;
  }

  // Unhide (show) CC Tab
  sheet.showSheet();
}
