function getNextMonth(thisMonth){
  let index = months.indexOf(thisMonth);
  if( index === -1 ){
    error('"' + thisMonth + '" not found, check spelling or contact support. --getNextMonth(thisMonth)');
    return;
  }
  
  return months[index + 1];
}
