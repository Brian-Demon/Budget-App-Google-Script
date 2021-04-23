function getPrevMonth(thisMonth){
  let index = months.indexOf(thisMonth);
  if( index === -1 ){
    error('"' + thisMonth + '" not found, check spelling or contact support. --getPrevMonth(thisMonth)');
    return;
  }
  if( thisMonth === jan ){
    error('Cannot get prev month from January. --getPrevMonth(thisMonth)');
    return;
  }
  return months[index - 1];
}
