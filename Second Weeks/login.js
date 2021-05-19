const url = 'https://vue3-course-api.hexschool.io'; // 站點
const path = 'asd40441'; // api path

// 取得HTML資料
const email = document.querySelector('#username');
const password = document.querySelector('#password');
const btn = document.querySelector('#btn');

// 點擊登入
btn.addEventListener('click', loginUser);

// 登入驗證函式
function loginUser() {
    let user = {
        "username": email.value,
        "password": password.value
    };

    axios.post(`${url}/admin/signin`, user)
        .then(res => {
            console.log(res);
            alert(res.data.message);
            if(res.data.message == '登入失敗'){
                return;
            }
            const token = res.data.token;
            const expired = res.data.expired;
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
            window.location.href="admin.html";
        })
}