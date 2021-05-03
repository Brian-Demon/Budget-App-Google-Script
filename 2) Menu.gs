function menu(){
  let menuName = "⚙️ Budget Menu ⚙️" 
  ss.removeMenu(menuName);
  let menu = SpreadsheetApp.getUi().createMenu(menuName);
  let previousMonthMenu = SpreadsheetApp.getUi().createMenu("Previous Month Optioins").addItem('Month Summary', 'getMonthSummary').addSeparator();
  let previousMonthSubMenu = SpreadsheetApp.getUi().createMenu("Edit Previous Month");
  menu.addSeparator()
  menu.addSeparator()
  menu.addItem('START NEW MONTH', 'createNewMonth')
  menu.addSeparator()
  menu.addSeparator()
  menu.addSubMenu(SpreadsheetApp.getUi().createMenu('Month Options').addItem('Need More Rows...', 'addRows'));
  menu.addSeparator()
  // Build Edit Previous Month submenu
  let months = getAvailableMonths();
  let monthsLength = months.length;
  if( monthsLength > 0 ){
    for( let i = 0; i < monthsLength; i++ ){
      let month = months[i];
      previousMonthSubMenu.addItem(month, `edit${month}`);
    }
    previousMonthMenu.addSubMenu(previousMonthSubMenu);
    previousMonthMenu.addItem('Store Month', 'storeMonthCheck');
  }
  menu.addSubMenu(previousMonthMenu);
  menu.addSeparator();
  menu.addSubMenu(SpreadsheetApp.getUi().createMenu('Budget Options')
              .addItem('Update Budget ', 'updateBudget')
              .addSeparator()
              .addSeparator()
              .addItem('Add Line Below ', 'addLine')
              .addSeparator()
              .addItem('Remove Line ', 'removeLine')
             )
  menu.addSubMenu(SpreadsheetApp.getUi().createMenu('Income Options')
              .addItem('Update Income ', 'updateIncome')
              .addSeparator()
              .addSeparator()
              .addItem('Add Line Below ', 'addLine')
              .addSeparator()
              .addItem('Remove Line ', 'removeLine')
             )
  menu.addSeparator();
  menu.addSeparator();
  menu.addSubMenu(SpreadsheetApp.getUi().createMenu('Help')
              .addItem('Contacts', 'contacts')
             );
  menu.addToUi();
  
//  var menu = SpreadsheetApp.getUi().createMenu("⚙️ Admin Settings");
//  menu.addItem("Setting A", "settingA");
//  menu.addToUi();
}
