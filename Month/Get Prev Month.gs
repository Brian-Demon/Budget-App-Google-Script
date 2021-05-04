function getPrevMonth(thisMonth){
  let index = months.indexOf(thisMonth);
  if( index === -1 ){
    error('"' + thisMonth + '" not found, check spelling or contact support. --getPrevMonth()');
    return;
  }
  if( thisMonth === jan ){
    error('Cannot get prev month from January. --getPrevMonth()');
    return;
  }
  return months[index - 1];
}
