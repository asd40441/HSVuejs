const app = Vue.createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io', // 站點
            path: 'asd40441', // api path
            products: [], // 產品列表
            tempProduct: {
                imagesUrl: [],
            }, // 暫存產品列表
            newData: false, //判斷是否新產品
            loading: false,
            pagination: {}
        }
    },
    mounted() { // 生命週期
        productModal = new bootstrap.Modal(document.getElementById('productModal')); // 取得Modal元素
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal')); // 取得delModal元素

        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // console.log(token);  
        axios.defaults.headers.common['Authorization'] = token;
        this.getProducts();
    },
    methods: {
        getProducts(page) { // 取得產品列表
            this.loading = true;
            let apiUrl = `${this.url}/api/${this.path}/admin/products?page=${page}`;
            axios.get(apiUrl)
                .then(res => {
                    console.log(res);
                    if (res.data.success) {
                        console.log("讀取產品成功");
                        this.products = res.data.products;
                        this.pagination = res.data.pagination;
                        this.loading = false;
                    } else {
                        console.log("讀取產品失敗");
                        return;
                    }
                })
                .catch(res => {
                    console.log(res);
                })
        },
        productUpdata() { // 新增產品或修改
            let apiUrl = `${this.url}/api/${this.path}/admin/product`;
            let http = 'post';
            if (!this.newData) {
                apiUrl = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;
                http = 'put';
            }
            axios[http](apiUrl, {
                    data: this.tempProduct
                })
                .then(res => {
                    console.log('成功', res);
                    productModal.hide();
                    this.getProducts();
                })
        },
        openModal(newData, item) {  // 判斷新增、修改、刪除產品功能
            if (newData === 'add') {
                this.tempProduct = {
                    imagesUrl: [],
                }
                this.newData = true;
                productModal.show();
            } else if (newData === 'edit') {
                this.tempProduct = {...item};
                this.newData = false;
                productModal.show();
            } else if (newData === 'delete') {
                this.tempProduct = {...item};
                this.newData = false;
                delProductModal.show();
            }
            // console.log(this.tempProduct);
        },
        deleteProduct() {   // 刪除產品
            axios.delete(`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`) // 傳送刪除請求
                .then(res => {
                    // console.log(res);
                    if (res.data.success) {
                        console.log("產品已刪除");
                    } else {
                        console.log("產品刪除失敗");
                        return;
                    }
                    delProductModal.hide();
                    this.getProducts();
                })
                .catch(res => {
                    console.log(res);
                })
        },
        createImagesArray() {   // 建立圖片陣列
            this.tempProduct.imagesUrl = [
                ''
            ];
        }
    },
});

app.component('pagination', {
    props: ['page'],
    template: `
    <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>   
    <li class="page-item" :class="{ 'active': item === page.current_page }" v-for="item in page.total_pages" :key="item">
        <a class="page-link" href="#" @click="$emit('get-products' , item)">{{ item }}</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
    `,
    data() {
        return {}
    },
    created() {
        // console.log(this.page);
    }
})


app.mount("#app");