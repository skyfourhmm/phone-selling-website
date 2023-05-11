const user = document.querySelector('input[type="text"]')
const pasword = document.querySelector('input[type="password"]')
const btnLogin = document.querySelector('button')



btnLogin.addEventListener('click', e=> {
    let data = JSON.parse(localStorage.getItem('user_info'))

    if(user.value == data.user && pasword.value == data.password) {
        data.loged = '1'

        localStorage.setItem('user_info', JSON.stringify(data))
        window.location.href = '/index.html';
    } else {
        alert('Bạn tài khoản không đúng !')
    }
})


