export function filterObjectArray(data, item, type) {
  let factor = type === "asc" ? 1 : -1;
  let res = data;
  res.sort((row1, row2) => {
    let a = row1[item];
    let b = row2[item];
    if(a > b) {
      return 1 * factor
    } else if(b > a) {
      return -1 * factor
    } else {
      return 0;
    }
  });
  return res;
}

export function sortByItem(data, item ,type) {
  let res = filterObjectArray(data, item, type);
  return res;
}



export function collectDistinctData(data, item) {
  let result = {};
  let dataCollection = [];
  data.map(row => {
    let key = row[item];
    if(!result[key]) {
      result[key] = {};
      Object.keys(row).map(rowKey => {
        result[key][rowKey] = new Set();
      })
    }
    Object.keys(row).map(rowKey => {
      result[key][rowKey].add(row[rowKey])
    })
  });
  Object.keys(result).map(key => {
    let resultRow = result[key];
    let row = {};
    row[item] = key;
    Object.keys(resultRow).map(rowKey => {
      let rowItem = Array.from(resultRow[rowKey]);
      if(rowItem.length) {
        if(rowItem.length === 1) {
          row[rowKey] = rowItem[0];
        }  else {
          row[rowKey] = JSON.stringify(rowItem);
        }
      } else {

        row[rowKey] = null;
      }
    });
    dataCollection.push(row)
  })
  return dataCollection;
}



export function joinTable(masterData, join, key,fkey, items) {
  let master = Array.from(masterData);
  master.forEach((masterRow) => {
    join.map(joinRow => {
      let val1 = masterRow[key];
      let val2 = joinRow[fkey];
      if((val1 && val2) && val1.toString().toLowerCase() === val2.toString().toLowerCase()) {
        items.map(item => {
          masterRow[item] = joinRow[item];
        })
      } else {
        items.map(item => {
          if(!masterRow[item]) {
            masterRow[item] = "";
          }
        })
      }
      /* for(let joinKey in joinRow) {
        if(items.includes(joinKey) ) {
          if() {
            masterRow[joinKey] = joinRow[joinKey]
          } else {
            masterRow[joinKey] = "";
          }
        }
      } */
    })
  })
  return master;
}