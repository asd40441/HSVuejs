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
                products: [],// 產品列表
                product: {},    // props 傳遞到內層的暫存資料
                
                form: {// 表單結構
                    user: {
                        name: '',
                        email: '',
                        tel: '',
                        address: '',
                    },
                    message: '',
                },
                cart: {},   // 購物車列表
            }
    },
    methods: {
        getProducts(){  // 取得商品列表
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
        openModal(item){    // 開啟Modal
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
        addCart(id , qty = 1){  // 新增購物車
            this.loadingStatus.loadingItem = id;
            const api = `${url}/api/${path}/cart`;
            const cart = {
                "product_id" : id,
                qty
            };
            axios.post(api , {data : cart})
            .then(res=>{
                console.log('新增購物車',res);
                this.$refs.userProductModal.hideModal();
                this.getCart();
            })
            .catch(err=>{
                console.log(err);
            })
        },
        getCart(){  // 取得購物車
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
        updataCart(item){   // 修改購物車
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
        clearCart(){    // 清空購物車
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
        deleteCart(item){   // 刪除購物車
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
        },
        onSubmit(){     // 送出訂單
            this.loadingStatus.loadingItem = 'pay';
            const api = `${url}/api/${path}/order`;
            axios.post(api , {data : this.form})
            .then(res=>{
                if(res.data.success){
                    alert('送出訂單成功！');
                    this.$refs.form.resetForm();
                    this.form.message = '';
                }else{
                    alert(res.data.message);
                }                
                console.log('送出訂單',res);
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

Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, 
});

app.component('userProductModal' , productModal);
app.mount('#app');