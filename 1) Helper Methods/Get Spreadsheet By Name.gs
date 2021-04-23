function getSpreadsheetByName(filename){
  let files = DriveApp.getFiles();
  while (files.hasNext()) {
    let file = files.next();
    let name = file.getName();
    if( name === filename ){
//      Logger.log(name + ' FOUND!');
      let foundSS = SpreadsheetApp.open(file)
      return foundSS;
    }
  }
  return null;
}