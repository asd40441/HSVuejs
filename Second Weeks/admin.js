const url = 'https://vue3-course-api.hexschool.io'; // 站點
const path = 'asd40441'; // api path
let data = [];

// 取得HTML資料
const list = document.querySelector('#productList');
const productCount = document.querySelector('#productCount');

// 取得產品列表
function getProducts() {
    axios.get(`${url}/api/${path}/admin/products`)
        .then(res => {
            // console.log(res);
            data = res.data.products;
            // console.log(data);
            render();
        })
}

// 渲染產品列表
function render() {
    let str = '';
    let count = 0;
    data.forEach(item => {
        str = `${str}
        <tr>
              <td>${item.title}</td>
              <td width="120">
                ${item.origin_price}
              </td>
              <td width="120">
                ${item.price}
              </td>
              <td width="100">
                <span class="">${item.is_enabled}</span>
              </td>
              <td width="120">
                <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
              </td>
            </tr>`
        count += 1;
    })
    list.innerHTML = str;
    productCount.innerHTML = count;
}

// 刪除按鈕
list.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }
    let id = e.target.getAttribute('data-id');
    // console.log(id);
    deleteProduct(id);
});

// 傳送刪除請求
function deleteProduct(id) {
    axios.delete(`${url}/api/${path}/admin/product/${id}`)
        .then(res => {
            console.log(res);
            getProducts();
        })
}

// 初始化
function init() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // console.log(token);
    axios.defaults.headers.common['Authorization'] = token;
    getProducts();
}
init();