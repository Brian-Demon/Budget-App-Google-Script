function menu(){
  let menuName = "⚙️ Budget Menu ⚙️" 
  ss.removeMenu(menuName);
  let menu = SpreadsheetApp.getUi().createMenu(menuName);
  let previousMonthMenu = SpreadsheetApp.getUi().createMenu("Previous Month Optioins").addItem('Month Summary', 'getMonthSummary').addSeparator();
  let previousMonthSubMenu = SpreadsheetApp.getUi().createMenu("Edit Previous Month");
  menu.addSeparator();
  menu.addSeparator();
  menu.addItem('START NEW MONTH', 'createNewMonth');
  menu.addSeparator();
  menu.addSeparator();
  menu.addSubMenu(SpreadsheetApp.getUi().createMenu('Month Options').addItem('Need More Rows...', 'addRows'));
  menu.addSeparator();
  // Build Edit Previous Month submenu
  let availMonths = getAvailableMonths().sort((a, b) => months.indexOf(a) - months.indexOf(b));
  let monthsLength = availMonths.length;
  if( monthsLength > 0 ){
    for( let i = 0; i < monthsLength; i++ ){
      let month = availMonths[i];
      previousMonthSubMenu.addItem(month, `edit${month}`);
    }
    previousMonthMenu.addSubMenu(previousMonthSubMenu);
  }
  previousMonthMenu.addItem('Store Month', 'storeMonthCheck');
  if( getMonth(ss.getSheetByName(currentMonthName)) !== jan ){
    menu.addSubMenu(previousMonthMenu);
  }
  menu.addSeparator();
  menu.addSubMenu(SpreadsheetApp.getUi().createMenu('Budget Options')
              .addItem('Show Budget Tab ', 'showBudget')
              .addSeparator()
              .addSeparator()
              .addItem('Update Budget ', 'updateBudget')
              .addSeparator()
              .addItem('Add Line Below ', 'addLine')
              .addSeparator()
              .addItem('Remove Line ', 'removeLine')
              .addSeparator()
              .addSeparator()
              .addItem('Close Budget Tab ', 'closeBudget')
             )
  menu.addSubMenu(SpreadsheetApp.getUi().createMenu('Income Options')
              .addItem('Show Income Tab ', 'showIncome')
              .addSeparator()
              .addSeparator()
              .addItem('Update Income ', 'updateIncome')
              .addSeparator()
              .addItem('Add Line Below ', 'addLine')
              .addSeparator()
              .addItem('Remove Line ', 'removeLine')
              .addSeparator()
              .addSeparator()
              .addItem('Close Income Tab ', 'closeIncome')
             )
  menu.addSubMenu(SpreadsheetApp.getUi().createMenu('Accounts Options')
              .addItem('Show Accounts Tab ', 'showAccounts')
              .addSeparator()
              .addSeparator()
              .addItem('Update Accounts ', 'updateAccounts')
              .addSeparator()
              .addItem('Add Line Below ', 'addLine')
              .addSeparator()
              .addItem('Remove Line ', 'removeLine')
              .addSeparator()
              .addSeparator()
              .addItem('Close Accounts Tab ', 'closeAccounts')
             )
  menu.addSeparator();
  menu.addSeparator();
  menu.addSubMenu(SpreadsheetApp.getUi().createMenu('Help')
              .addItem('Tutortial', 'tutorial')
              .addSeparator()
              .addItem('Contacts', 'contacts')
             );
  menu.addToUi();
  
//  var menu = SpreadsheetApp.getUi().createMenu("⚙️ Admin Settings");
//  menu.addItem("Setting A", "settingA");
//  menu.addToUi();
}
