// 取得HTML資料
const list = document.querySelector('#productList');
const productCount = document.querySelector('#productCount');

const admin = {
    url: 'https://vue3-course-api.hexschool.io', // 站點
    path: 'asd40441', // api path
    data: [],
    getProducts() { // 取得產品列表
        axios.get(`${this.url}/api/${this.path}/admin/products`)
            .then(res => {
                console.log(res);
                if (res.data.success) {
                    console.log("讀取產品成功");
                } else {
                    console.log("讀取產品失敗");
                    return;
                }
                data = res.data.products;
                // console.log(data);
                this.render();
            })
            .catch(res => {
                console.log(res);
            })
    },
    render() { // 渲染產品列表
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
    },
    deleteProduct() {
        list.addEventListener('click', (e) => { // 刪除按鈕
            if (e.target.nodeName !== 'BUTTON') {
                return;
            }
            const id = e.target.getAttribute('data-id');
            // console.log(id);
            axios.delete(`${this.url}/api/${this.path}/admin/product/${id}`) // 傳送刪除請求
                .then(res => {
                    console.log(res);
                    if (res.data.success) {
                        console.log("產品已刪除");
                    } else {
                        console.log("產品刪除失敗");
                        return;
                    }
                    this.getProducts();
                })
                .catch(res => {
                    console.log(res);
                })
        });
    },
    init() { // 初始化
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // console.log(token);
        axios.defaults.headers.common['Authorization'] = token;
        this.getProducts();
        this.deleteProduct();
    }
}

const app = {
    data() {
        return {
            daaa: '123'
        }
    },
    methods: {},
    created: {

    }
}
Vue.createApp(app).mount("#app");
admin.init(); // 頁面初始化