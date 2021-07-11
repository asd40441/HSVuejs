<template>
  <div class="mt-4">
    <table class="table align-middle" v-for="item in products" :key="item.id">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="width: 200px">
            <div
              style="height: 100px; background-size: cover; background-position: center"
              :style="{ 'background-image': `url(${item.imageUrl})` }"
            ></div>
          </td>
          <td style="width: 500px">
            {{ item.title }}
          </td>
          <td style="width: 300px">
            <div class="h5">{{ item.price }} 元</div>
            <del class="h6">原價 {{ item.origin_price }} 元</del>
            <div class="h5">現在只要 {{ item.price }} 元</div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <router-link :to="`/product/${item.id}`"
                ><button type="button" class="btn btn-outline-secondary">
                  查看更多
                </button></router-link
              >
              <button type="button" class="btn btn-outline-danger" @click="addCart(item.id)">
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    addCart(id, qty = 1) {
      // 新增購物車
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http
        .post(api, { data: cart })
        .then((res) => {
          console.log('新增購物車', res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`;
    this.$http
      .get(url)
      .then((res) => {
        console.log('取得產品列表', res.data);
        this.products = res.data.products;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
table {
  margin: 0 auto;
}
</style>
