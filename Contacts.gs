function contacts(){
  let ui = SpreadsheetApp.getUi();
  let title = "Contacts"
  let html = "<h3>Email:</h3> <h4>BrianWMatejka@gmail.com</h4><br>"
  + "<h3></h3> <h4></h4><br>"
  modalDialog(title, html, 350, 300);
}
