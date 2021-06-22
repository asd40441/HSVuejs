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
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
        },
        openModal(item){
            const api = `${url}/api/${path}/product/${item.id}`;
            axios.get(api)
            .then(res=>{
                console.log(res);
                this.product = res.data.product;
                console.log(this.product);
                this.$refs.userProductModal.openModal();
            })
            .catch(err=>{
                console.log(err);
            })
        },
        addCart(id , qty = 1){
            const api = `${url}/api/${path}/cart`;
            const cart = {
                "product_id" : id,
                qty
            };
            axios.post(api , {data : cart})
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
        },
        getCart(){
            const api = `${url}/api/${path}/cart`;
            axios.get(api)
            .then(res=>{
                // console.log(res);
                this.cart = res.data.data;
                console.log(this.cart);
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
app.mount('#app');