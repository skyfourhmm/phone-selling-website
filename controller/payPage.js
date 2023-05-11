const model = document.querySelector('.model') 
const back = document.querySelector('.back')
const complete = document.querySelector('.complete')
const change = document.querySelector('.change')

const name = document.querySelector('.name span')
const sdt = document.querySelector('.sdt span')
const local = document.querySelector('.local span')

const inputName = document.querySelector('.inputName')
const inputSdt = document.querySelector('.inputSdt')
const inputLocal = document.querySelector('.inputLocal')

const productItem = document.querySelector('.product_Items')

const payBtn = document.querySelector('.btnPay button')

back.addEventListener('click', (e) => {
    model.style.display = 'none'
})


// var patternName = /^[A-Z][a-z]+\s[A-Z][a-z]+\s[A-Z][a-z]+$/;
// var patternSDT = /^0\d{9}$/

complete.addEventListener('click', (e) => {
    
    model.style.display = 'none'

    name.textContent = inputName.value
    sdt.textContent = "(+84)" + inputSdt.value
    local.textContent = inputLocal.value

    
})

change.addEventListener('click', e=> {
    model.style.display = 'flex'
})

// xử lý get value item từ localStorage

function render() {
    var arr = JSON.parse(localStorage.getItem('dataPay'))

    arr.forEach(e => {
    
        var pro = JSON.parse(localStorage.getItem(`prod_${e}`))

        var count = parseInt(pro.quantity) * parseFloat(pro.pricePro) 

        var html = `
        <div class="item d-flex align-items-center">
        <div class="imaginePay">
            <img src="../imagine/Product/product_${pro.idPro}.webp" alt="">
        </div>
        <div class="namePay">
            <span>${pro.namePro} </span>
        </div>
        <div class="priceProductPay">
            <span>₫${pro.pricePro}</span>
        </div>
        <div class="qualityPay">
            <span>${pro.quantity}</span>
        </div>
        <div class="priceProductPayAll">
        ₫
            <span>${count}0.000</span>
        </div>
    </div>
    `

    return productItem.insertAdjacentHTML('beforeend', html)
});

const all = document.querySelectorAll('.priceProductPayAll span ')

let x = 0.0
all.forEach(e => {
    x += parseFloat(e.textContent)
})

const tongTien = document.querySelector('.bodyPay div:first-child span:nth-child(2)')
const thanhTien = document.querySelector('.bodyPay div:last-child span:nth-child(2)')

tongTien.innerText = `${x}0.000`
thanhTien.innerText = `${x}0.000`

}

render()

//  lấy data lên
let data = JSON.parse(localStorage.getItem('user_info'))
const nameuser = document.querySelector('.logined span')
const login = document.querySelector('.login')
const logined = document.querySelector('.logined');
const notLogined = document.querySelector('.not-logined')

if(data.loged == '1') {
    notLogined.style.display = 'none';
    logined.style.display = 'block'
    nameuser.textContent = data.user
    login.style.pointerEvents = "none";
}

// bấm vào logo di chuyển tới trang chính
// document.querySelector('.header-center img').addEventListener('click', e => {
//     window.location.href = '/index.html'
// })

//xử lý đặt hàng

payBtn.addEventListener('click', (e) => {
    if(data.loged == '1') {
        window.location.href = '/index.html'
    } else {
        window.location.href = './login.html'
    }
})


// xử lý hanlde 

