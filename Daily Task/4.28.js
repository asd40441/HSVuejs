let obj = {
    a: 'a',
    1: 'b',
    '這是中文字': 'c',
    'b': 'd',
    '--some data': 'e'
  }

// 建立一個陣列，其中包含所有的屬性名稱 (需使用 Object.keys)。
let array = Object.keys(obj);
console.log(array);
// 建立一個陣列，其中包含所有的屬性值 (需使用 Object.values)。
let newArray = Object.values(obj);
console.log(newArray);
// 承接第 1 題，透過 forEach、使用 console.log 輸出陣列的所有屬性名稱。
array.forEach((item)=>{
    console.log(item);
})
// 承接第 2 題，透過 for 迴圈、使用 console.log 輸出陣列的所有屬性值。
let len = newArray.length;
for (let index = 0; index < len; index++) {
  console.log(newArray[index]);
}





