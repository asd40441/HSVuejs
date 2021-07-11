<template>
  <div id="nav">
    <h1>管理頁面</h1>
    <router-link to="/admin/products">管理產品列表</router-link> |
    <router-link to="/admin/orders">管理訂單列表</router-link>
  </div>
  <div v-if="checking">
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    確認是否有無登入
  </div>

  <router-view v-if="check"></router-view>
</template>

<script>
export default {
  data() {
    return {
      check: false,
      checking: true,
    };
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    this.$http.post(`${process.env.VUE_APP_API}/api/user/check`).then((res) => {
      if (res.data.success) {
        console.log('登入中', res);
        this.check = true;
        this.checking = false;
      } else {
        console.log('登出', res);
        this.$router.push('/login');
      }
    });
  },
};
</script>
