const app = {
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io', // 站點
            path: 'asd40441', // api path
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        loginUser() {
            axios.post(`${this.url}/admin/signin`, this.user) // 傳送登入請求
                .then(res => {
                    console.log(res);
                    if (res.data.success) {
                        console.log("登入成功");
                        alert("登入成功");
                    } else {
                        console.log("登入失敗");
                        alert("登入失敗");
                        return;
                    }
                    // const token = res.data.token;
                    // const expired = res.data.expired;
                    const [token, expired] = [res.data.token, res.data.expired];
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)}`; // 儲存cookie
                    window.location.href = "admin.html";
                })
                .catch(res => {
                    console.log(res);
                })
        }
    },
    create() {

    }
}

Vue.createApp(app).mount("#app");