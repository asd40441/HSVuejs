let productData = []
const addProductBtn = document.getElementById('addProduct');
const clearAllBtn = document.getElementById('clearAll');
const productList = document.getElementById('productList');
const productCount = document.getElementById('productCount');
const title = document.getElementById('title');
const origin_price = document.getElementById('origin_price');
const price = document.getElementById('price');

// 新增資料
addProductBtn.addEventListener('click', (e) => {
    const timeStamp = Math.floor(Date.now()); // 產生亂數ID
    if (title.value !== '') {
        productData.push({
            'id': timeStamp,
            'title': title.value,
            'origin_price': parseInt(origin_price.value.trim()) || 0,
            'price': parseInt(price.value.trim()) || 0,
            'is_enabled': false,
        })
        render();   
    }
});

// 刪除所有
clearAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    productData = [];
    render();
});

// 個別刪除
productList.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    const id = e.target.dataset.id;
    if (action === 'remove') {
        let newIndex = 0;
        productData.forEach((item, key) => {
            if (id == item.id) {
                newIndex = key;
            }
        })
        productData.splice(newIndex, 1);

    } else if (action === 'complete') {
        productData.forEach((item) => {
            if (id == item.id) {
                item.is_enabled = !item.is_enabled;
            }
        })
    }
    render();
});

// 渲染
function render() {
    let str = '';
    productData.forEach((item) => {
        str += `
  <tr>
    <td>${item.title}</td>
    <td width="120">
      ${item.origin_price}
    </td>
    <td width="120">
      ${item.price}
    </td>
    <td width="100">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="is_enabled" ${item.is_enabled? 'checked': ''} data-action="complete" data-id="${item.id}">
        <label class="form-check-label" for="is_enabled">${item.is_enabled? '啟用' : '未啟用'}</label>
      </div>
    </td>
    <td width="120">
      <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${item.id}"> 刪除 </button>
    </td>
  </tr>`;
    })
    productList.innerHTML = str;
    productCount.textContent = productData.length;

    title.value = '';
    origin_price.value = '';
    price.value = '';
}
