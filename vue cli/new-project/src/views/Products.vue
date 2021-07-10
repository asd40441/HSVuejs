<template>
  <h1>產品列表</h1>
  <table>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.title }}</td>
        <td><router-link :to="`/product/${item.id}`">連結</router-link></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`;
    this.$http.get(url).then((res) => {
      console.log('產品列表', res.data);
      this.products = res.data.products;
    });
  },
};
</script>
