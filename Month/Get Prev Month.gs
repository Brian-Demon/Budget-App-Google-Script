function getPrevMonth(currentMonth){
  let index = months.indexOf(currentMonth);
  if( index === -1 ){
    error(`\"${currentMonth}\" not found, check spelling or contact support. --getPrevMonth()`);
    return;
  }
  if( currentMonth === jan ){
    error('Cannot get prev month from January. --getPrevMonth()');
    return;
  }
  // Logger.log(months[index - 1]);
  return months[index - 1];
}
