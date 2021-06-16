import pagination from "./pagination.js";
let productModal = null;
let delProductModal = null;

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
    components: {   // 區域註冊
        pagination,
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
        getProducts(page = 1) { // 取得產品列表
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
        productUpdata(tempProduct) { // 新增產品或修改
            let apiUrl = `${this.url}/api/${this.path}/admin/product`;
            let http = 'post';
            if (!this.newData) {
                apiUrl = `${this.url}/api/${this.path}/admin/product/${tempProduct.id}`;
                http = 'put';
            }
            axios[http](apiUrl, {
                    data: tempProduct
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
    },
});

app.component('productModal',{
    template: `
    <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span>新增產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">

              <div class="col-sm-4">
                <div class="form-group">
                  <label for="tempProduct.imageUrl">主要圖片</label>
                  <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                  <img class="img-fluid" :src="tempProduct.imageUrl">
                </div>
                <div class="mb-1">多圖新增</div>
                <div v-if="Array.isArray(tempProduct.imagesUrl)">
                  <div class="mb-1" v-for="(image, key) in tempProduct.imagesUrl" :key="key">
                    <div class="form-group">
                      <label for="tempProduct.imageUrl">圖片網址</label>
                      <input type="text" class="form-control" placeholder="請輸入圖片連結"
                        v-model="tempProduct.imagesUrl[key]">
                      <button class="btn btn-outline-danger btn-sm d-block w-30" @click="tempProduct.imagesUrl.splice(key,1)">
                        刪除
                      </button>
                    </div>
                    <img class="img-fluid" :src="image">
                  </div>
                  <div v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] && tempProduct.imagesUrl.length < 5">
                    <button class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="tempProduct.imagesUrl.push('')">
                      新增圖片
                    </button>
                  </div>
                </div>
                <div v-else>
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImagesArray">
                    新增陣列圖片
                  </button>
                </div>
              </div>

              <div class="col-sm-8">
                <div class="form-group">
                  <label for="tempProduct.title">標題</label>
                  <input id="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
                </div>
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="tempProduct.category">分類</label>
                    <input id="tempProduct.category" type="text" class="form-control" placeholder="請輸入分類"
                      v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="tempProduct.unit">單位</label>
                    <input id="tempProduct.unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="tempProduct.origin_price">原價</label>
                    <input id="tempProduct.origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                      v-model.number="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="tempProduct.price">售價</label>
                    <input id="tempProduct.price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                      v-model.number="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="tempProduct.description">產品描述</label>
                  <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                    v-model="tempProduct.description">
                    </textarea>
                </div>
                <div class="form-group">
                  <label for="tempProduct.content">說明內容</label>
                  <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容"
                    v-model="tempProduct.content">
                    </textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input id="tempProduct.is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0"
                      v-model="tempProduct.is_enabled">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="$emit('updata-product' , tempProduct)">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    `,
    props: ['tempProduct'],
    methods: {
        createImagesArray() {   // 建立圖片陣列
            this.tempProduct.imagesUrl = [
                ''
            ];
        },
    }
})

app.mount("#app");