let crowdAge = [
    {
      name: 'Rick',
      age: 17
    },
    {
      name: 'Jane',
      age: 25
    },
    {
      name: 'Jordan',
      age: 19
    },
    {
      name: 'Jack',
      age: 7
    },
    {
      name: 'Reol',
      age: 27
    }
  ]
  
  // callback 函式
  function ageFilterCB(cb, arr) {
    return cb(arr);
  }
  
  function ageFilter(arr) {
    /* 只能在此插入程式碼 */
    let array = [];
    array = crowdAge.filter((item)=>{
        return item.age > 18
    })
    return array;
  }
  
  let filterResult = [];
  filterResult = ageFilterCB(ageFilter, crowdAge);
  console.log(filterResult); /* 為陣列，內容包含屬性 age > 18 的 crowdAge 元素 */

