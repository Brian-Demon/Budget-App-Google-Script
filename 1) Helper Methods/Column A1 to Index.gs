function colA1ToIndex(colA1) {
  var i, l, chr,
      sum = 0,
      A = "A".charCodeAt(0),
      radix = "Z".charCodeAt(0) - A + 1;

  if(typeof colA1 !== 'string' || !/^[A-Z]+$/.test(colA1)) {
    throw new Error("Expected column label");
  }

  for(i = 0, l = colA1.length ; i < l ; i++) {
    chr = colA1.charCodeAt(i);
    sum = sum * radix + chr - A + 1
  }

  return sum;
}