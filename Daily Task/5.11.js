// 1. 請修正以下程式碼錯誤，並執行 console.log
// 2. 請嘗試說明以下程式碼錯誤的原因

let saySomething = '小姐一個人嗎 :D'    // 未加分號
(function() {                          // 以(、[、/ 為開頭的話不會自動加入分號
  console.log(saySomething);
})                                     // 未加入 (); 因此函式不會被呼叫出來

// 修正過後
let saySomething = '小姐一個人嗎 :D'
;(function() {
  console.log(saySomething);
})();
