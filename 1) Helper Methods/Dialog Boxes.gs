function modelessDialog(title = "Example", html = "<p>Hello World!<p>", width = 250, height = 300){
  var htmlOutput = HtmlService
    .createHtmlOutput(html)
    .setWidth(width)
    .setHeight(height);
SpreadsheetApp.getUi().showModelessDialog(htmlOutput, title);
}

function modalDialog(title = "Example", html = "<p>Hello World!<p>", width = 250, height = 300){
  var htmlOutput = HtmlService
    .createHtmlOutput(html)
    .setWidth(width)
    .setHeight(height);
SpreadsheetApp.getUi().showModalDialog(htmlOutput, title);
}

