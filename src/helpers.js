export function filterObjectArray(data, item) {
  let res = data;
  res.sort((row1, row2) => {
    let a = row1[item];
    let b = row2[item];
    console.log(a,b)
    if(a > b) {
      return 1
    } else if(b > a) {
      return -1
    } else {
      return 0;
    }
  });
  return res;
}

export function sortByItem(data, item) {
  let res = filterObjectArray(data, item);
  return res;
}