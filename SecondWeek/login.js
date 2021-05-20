const url = 'https://vue3-course-api.hexschool.io'; 
const path = 'asd40441'; 

// 取得HTML資料
const email = document.querySelector('#username');
const password = document.querySelector('#password');
const btn = document.querySelector('#btn');

const app = {
    url: 'https://vue3-course-api.hexschool.io',    // 站點
    path: 'asd40441',   // api path
    user: {
        "username": '',
        "password": ''
    },
    loginUser() {
        btn.addEventListener('click', e => {    // 點擊登入
            this.user.username = email.value;
            this.user.password = password.value;
            axios.post(`${url}/admin/signin`, this.user)    // 傳送登入請求
                .then(res => {
                    console.log(res);
                    alert(res.data.message);
                    if (res.data.message == '登入失敗') {
                        return;
                    }
                    const token = res.data.token;
                    const expired = res.data.expired;
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
                    window.location.href = "admin.html";
                })
        });

    },
    init(){
        this.loginUser();
    }
}
app.init();