let name = '小明';
const age = 16;
let person = {
  name: '小明',
}
const wallet = {
  money: 1000
}
const dessert = ['cake', 'ice-cream'];

/* 請問以下程式碼哪些會報錯? */
name = '小美';              // 可執行
age = 17;                   // 錯誤，因為宣告使用 const 所以無法修改其值
person.name = '大明';       // 可執行
wallet.money = 1100;        // 可執行，因為物件、陣列的屬性並沒有被保護
wallet = {};                // 錯誤，嘗試覆寫該物件、陣列將會發生錯誤
dessert.push('fruit');      // 可執行，同上
dessert = ['chocolate'];    // 錯誤，同上
