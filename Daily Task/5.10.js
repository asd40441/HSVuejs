console.log('題目一');
// (1)
// 1-1. 請問以下的輸出結果為何?
// 123
// true
// 1-2. 如果希望 console.log(obj === objNew); 的結果為 false，則可以如何修改?

let obj = {
    title: '錢錢',
    amounts: 66666,
}
let objNew = {...obj};  // 1-2***改成...obj
objNew.amounts = 123;
console.log(obj.amounts); // 輸出結果為何? 
console.log(obj === objNew); // 輸出結果為 true 還是 false?


console.log('題目二');
// (2) (陷阱題!，需要用深拷貝處理)
// 2-1. 請問以下的輸出結果為何?
// false
// 2000
// 2-2. 如果希望調整 objNew.innerObj 時不會影響到 obj，則可以如何修改?

let obj2 = {
    title: '錢錢',
    amounts: 66666,
    innerObj: {
    	title: '私房錢',
      amounts: 1000
    }
}
let objNew2 = JSON.parse(JSON.stringify(obj2)); // 2-2***深層複製
console.log(obj2 === objNew2); // 輸出結果為 true 還是 false?
objNew2.innerObj.amounts = 2000;
console.log(obj2.innerObj.amounts); // 輸出結果為何?