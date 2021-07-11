<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">
        請先登入
      </h1>
      <div class="col-8">
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
              v-model="user.username"
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
              v-model="user.password"
            />
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="button" disabled v-if="loading">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
          <button
            class="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
            @click.prevent="loginUser"
            v-else
          >
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">
      &copy; 2021~∞ - 六角學院
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      loading: false,
    };
  },
  methods: {
    loginUser() {
      this.loading = true;
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, this.user) // 傳送登入請求
        .then((res) => {
          if (res.data.success) {
            console.log('登入成功', res);
          } else {
            console.log('登入失敗', res);
            this.loading = false;
            return;
          }
          const [token, expired] = [res.data.token, res.data.expired];
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`; // 儲存cookie
          // console.log(token, expired);
          this.$router.push('/admin/products');
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
};
</script>
