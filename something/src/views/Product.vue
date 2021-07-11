<template>
  <h1>單一產品頁面</h1>
  {{ product }}
</template>

<script>
export default {
  data() {
    return {
      product: [],
    };
  },
  mounted() {
    // console.log(this.$route.params.id);
    const { id } = this.$route.params;
    const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
    this.$http.get(url).then((res) => {
      console.log('單一產品', res);
      this.product = res.data.product;
    });
  },
};
</script>
