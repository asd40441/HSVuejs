import productModal from './productModal.js'

const url = 'https://vue3-course-api.hexschool.io'; // 站點
const path = 'asd40441'; // api path

const app = Vue.createApp(
    {
        data() {
            return {
                // 讀取效果
                loadingStatus: {
                    loadingItem: '',
                },
                // 產品列表
                products: [],
                // props 傳遞到內層的暫存資料
                product: {},
                // 表單結構
                form: {
                    user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                    },
                    message: '',
                },
                // 購物車列表
                cart: {},
            }
    },
    methods: {
        getProducts(){
            const api = `${url}/api/${path}/products`;
            axios.get(api)
            .then(res=>{
                this.products = res.data.products;
                console.log('取得商品列表',res);
                this.loadingStatus.loadingItem = '';
            })
            .catch(err=>{
                console.log(err);
            })
        },
        openModal(item){
            this.loadingStatus.loadingItem = item.id;
            const api = `${url}/api/${path}/product/${item.id}`;
            axios.get(api)
            .then(res=>{
                console.log('打開Modal',res);
                this.product = res.data.product;
                // console.log(this.product);
                this.$refs.userProductModal.openModal();
                this.loadingStatus.loadingItem = '';
            })
            .catch(err=>{
                console.log(err);
            })
        },
        addCart(id , qty = 1){
            this.loadingStatus.loadingItem = id;
            const api = `${url}/api/${path}/cart`;
            const cart = {
                "product_id" : id,
                qty
            };
            axios.post(api , {data : cart})
            .then(res=>{
                console.log('新增購物車',res);
                this.getCart();
            })
            .catch(err=>{
                console.log(err);
            })
        },
        getCart(){
            const api = `${url}/api/${path}/cart`;
            axios.get(api)
            .then(res=>{
                this.cart = res.data.data;
                console.log('更新購物車',res);
                this.loadingStatus.loadingItem = '';
            })
            .catch(err=>{
                console.log(err);
            })
        },
        updataCart(item){
            this.loadingStatus.loadingItem = item.id;
            const api = `${url}/api/${path}/cart/${item.id}`;
            const cart = {
                product_id : item.product.id,
                qty : item.qty
            }
            // console.log(cart);
            axios.put(api,{data : cart})
            .then(res=>{
                console.log('修改購物車',res);
                this.getCart();
            })
            .catch(err=>{
                console.log(err);
            })
        },
        clearCart(){
            this.loadingStatus.loadingItem = 'clear';
            const api = `${url}/api/${path}/carts`;
            axios.delete(api)
            .then(res=>{
                console.log('清空購物車',res);
                this.getCart();
            })
            .catch(err=>{
                console.log(err);
            })
        },
        deleteCart(item){
            this.loadingStatus.loadingItem = 'delete';
            const api = `${url}/api/${path}/cart/${item.id}`;
            axios.delete(api)
            .then(res=>{
                console.log('刪除購物車',res);
                this.getCart();
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
    mounted(){
        this.getProducts();
        this.getCart();
    }
}
);

app.component('userProductModal' , productModal);



app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

VeeValidate.defineRule('email', VeeValidateRules['email']);
VeeValidate.defineRule('required', VeeValidateRules['required']);

Object.keys(VeeValidateRules).forEach(rule => {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
});

VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為輸入字元立即進行驗證
});
app.mount('#app');