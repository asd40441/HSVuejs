// 請使用 filter() 操作 array 陣列，篩選出屬性 age <= 18 的陣列元素有哪些，並指派給 newArray。

const array = [
    {
      name: '小明',
      age: 18
    },
    {
      name: '小美',
      age: 15
    },
    {
      name: '杰倫',
      age: 19
    },
    {
      name: '漂亮阿姨',
      age: 22
    },
    {
      name: '老媽',
      age: 28
    }
];
let newArray = [];

newArray = array.filter((item)=>{
    return item.age <= 18;
})

console.log(newArray);