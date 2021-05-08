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

newArray = array.map((item)=>{
    return item.name + " " + item.age + " " + "囉";
})

console.log(newArray);