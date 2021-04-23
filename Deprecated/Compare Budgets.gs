// ************************** //
// ******  DEPRECATED  ****** //
// ************************** //

/*
function compareBudgets(currentBudget, onFileBudget){ // RETURNS BOOLEAN
  if( currentBudget.length !== onFileBudget.length ){
    Logger.log('Current length: ' + currentBudget.length + ' !== On File length: ' + onFileBudget.length);
    return false;
  } else {
    let currentNames = getNames(currentBudget);
    let onFileNames = getNames(onFileBudget);
    let currentAmounts = getAmounts(currentBudget);
    let onFileAmounts = getAmounts(onFileBudget);
    
//    Logger.log('Current Names: ' + currentNames.toString());
//    Logger.log('onFile Names: ' + onFileNames.toString());
//    Logger.log('Current Amounts: ' + currentAmounts.toString());
//    Logger.log('onFile Amounts: ' + onFileAmounts.toString());
    
    // Check names and amounts
    for( let i = 0; i < currentBudget.length; i++ ){
      let index = onFileNames.indexOf(currentNames[i]);
      if( index === -1 ){
        Logger.log(currentNames[i] + ' is not on file')
        return false;
      } else {
        if( currentAmounts[index] !== onFileAmounts[index] ){
          Logger.log('Current (' + currentNames[index] + '): ' + currentAmounts[index] + ' !== ' + 'On File (' + onFileNames[index] + '): ' + onFileAmounts[index]);
          return false;
        }
      }
    }
  }
  
  return true;
}

function getNames(budget){
  let names = [];
  for( let i = 0; i < budget.length; i++ ){
    names.push(budget[i].name);
  }
  return names;
}

function getAmounts(budget){
  let amounts = [];
  for( let i = 0; i < budget.length; i++ ){
    amounts.push(budget[i].amount);
  }
  return amounts;
}
*/