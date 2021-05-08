// step1. 將 town 的內容複製到 townData。
// step2. 將 Ming, Rick 兩個物件加入到 townData.resident 中

// townData === town 的結果須為 false。

let town = {
    name: '真心鎮',
    resident: []
}
let townData = {};
let Ming = {
    name: '小明',
    age: 16
};
let Rick = {
    name: '瑞克',
    age: 21
};

/*程式碼修改處 (可以更改 function 規則)*/
function addResident(obj, res1, res2) {
    townData = Object.assign({},obj); //淺層複製
    // townData = {...obj};
    // townData = JSON.parse(JSON.stringify(obj)); //深層複製
    townData.resident.push(res1, res2);
    console.log(townData);
}
/*程式碼修改處*/

addResident(town, Ming, Rick);
console.log(townData === town); // 結果須為 false