function closeCC() {
  let sheet = ss.getSheetByName(ccSheetName);
  if( !sheet ){
    error("CC Sheet is missing. Please contact support. --closeCC()");
    return;
  }

  // Hide CC Tab
  sheet.hideSheet();
}
