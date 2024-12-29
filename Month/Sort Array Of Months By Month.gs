function sortMonthsArray(monthsArray){
  var sortedMonths = monthsArray.toSorted(function(a, b){
      return months.indexOf(a) - months.indexOf(b);
  });
  return sortedMonths;
}
