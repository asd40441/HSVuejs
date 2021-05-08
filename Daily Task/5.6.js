// 問題一 (判斷何者為表達式):
var Ans = {name: "hexSchool"};

if(Ans) {
  console.log("Ans 是表達式");
}

// 請問以下有哪些選項代入 Ans 可以輸出 console.log 不會報錯?

// 1. 2 === 2   //可
// 2. "string"  //可
// 3. var a     //錯誤
// 4. if(true){let a = 2;}  //錯誤
// 5. [25, 30] // 純陣列    //可
// 6. {name: "hexSchool"}  // 純物件    //可



// 問題二(表達式的應用):
function hexIsGood() {
  return true;
}
// 以上程式碼為一個「表達式」，請大家到 MDN 或是透過 Google 搜尋，尋找有哪些程式運作可以插入以上的表達式，仍能正確運行。

if(hexIsGood()) {console.log("此程式碼可以運作")};

console.log(hexIsGood ? 'True' : 'False');





// <!-- 報數 47 : 涂阿銘
// 問題一：請問以下有哪些選項代入 Ans 可以輸出 console.log 不會報錯?
// 1. 2 === 2   //可
// 2. "string"  //可
// 3. var a     //錯誤
// 4. if(true){let a = 2;}  //錯誤
// 5. [25, 30] // 純陣列    //可
// 6. {name: "hexSchool"}  // 純物件    //可

// 問題二：(表達式的應用):
// function hexIsGood() {
//     return true;
//   }
// console.log(hexIsGood ? 'True' : 'False');
// -->