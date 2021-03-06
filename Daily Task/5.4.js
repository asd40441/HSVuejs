// 小明有固定存錢的好習慣，以下是小明的銀行帳戶資訊。

// 1. 請協助他將存款資訊 mingTransfer 的內容合併到 mingAccount.depositRecord 陣列中 (使用 .push())。
// 2. 請將他各月的存款累加到 mingAccount.deposit 中 (可以使用 forEach() 或 reduce())

// 小明的銀行帳戶資訊
let mingAccount = {
    name: '小明',
    age: 22,
    deposit: 10000,
    depositRecord: [
        {
        title: '開戶',
        amounts: 10000
    }
]
};
// 小明的存款資訊
let mingTransfer = [
    {
        title: '一月存款',
        amounts: 777
    },
    {
        title: '二月存款',
        amounts: 7000
    },
    {
        title: '三月存款',
        amounts: 70000
    }
]

mingTransfer.forEach((item) => {
    mingAccount.depositRecord.push(item);
    mingAccount.deposit += item.amounts;
})

console.log(mingAccount);


