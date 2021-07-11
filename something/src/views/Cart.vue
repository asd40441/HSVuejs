<template>
  <div class="mt-4 wrap">
    <div class="text-end">
      <button class="btn btn-outline-danger" type="button" @click="clearCart">
        <i class="fas fa-spinner fa-pulse"></i>
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart.carts">
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteCart(item)">
                <i class="fas fa-spinner fa-pulse"></i>
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <div class="text-success">
                已套用優惠券
              </div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input
                    min="1"
                    type="number"
                    class="form-control"
                    v-model.number="item.qty"
                    disabled="true"
                  />
                  <span class="input-group-text" id="basic-addon2">{{ item.final_total }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <small class="text-success">折扣價：</small>
              無
            </td>
          </tr>
        </template>
        <template v-if="cart.carts == ''">
          <tr>
            <td></td>
            <td>
              無任何商品
            </td>
            <td></td>
            <td class="text-end"></td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cart.total }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">無</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: '',
    };
  },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(api)
        .then((res) => {
          this.cart = res.data.data;
          console.log('更新購物車', res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clearCart() {
      // 清空購物車
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(api)
        .then((res) => {
          console.log('清空購物車', res);
          this.getCart();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCart(item) {
      // 刪除購物車
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http
        .delete(api)
        .then((res) => {
          console.log('刪除購物車', res);
          this.getCart();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style>
.wrap{
  width: 1200px;
}
</style>
