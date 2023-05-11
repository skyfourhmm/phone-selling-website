import {products} from './product.js'

const cart = document.querySelector('.cart')
const cartItem = document.querySelector('.cart span')
const cartBody = document.querySelector('.cart-body ul')
const cartProduct = document.querySelector('.cart-product')
const categories = document.querySelector('.header-bottom_nav-top')
const categories_show = document.querySelector('.header-bottom_nav-top ul')
const decrease = document.querySelector('.decrease');
const increase = document.querySelector('.increase');
const text = document.querySelector('.control-value input')
const addCart = document.querySelector('.add-cart')
const colorBtn = document.querySelectorAll('.color button')
const buyBtn = document.querySelector('.buy-now')


let show_cart = true;
cart.addEventListener('click', () => {
    if(show_cart) {
        cartProduct.classList.add('show')
        show_cart = false;
    }
    else {
        cartProduct.classList.remove('show')
        show_cart = true;
    }
})

let show_nav = true;
categories.addEventListener('click', () => {
    if(show_nav) {
        categories_show.classList.add('show')
        show_nav = false;
    }
    else {
        categories_show.classList.remove('show')
        show_nav = true;
    }
})

// xử lý sự kiện nổi bọt
cartProduct.onclick = (e) => {
    e.stopPropagation()
}

// xử lý thêm giảm giỏ hàng
decrease.addEventListener('click', (e) => {
    if(text.value <= 1) {
        text.value == 0
    } else {
        text.value--
    }
})

increase.addEventListener('click', (e) => {
    text.value++
})

// xử lý thêm giỏ hàng
addCart.addEventListener('click', (e) => {
    cartItem.innerHTML = text.value

    const str = document.querySelector('.image img').src;
    const index = str.indexOf("_") + 1;
    const result = str.substring(index);

    const number = str.substring(str.lastIndexOf("_") + 1, str.lastIndexOf("."));
    
    let name = ""
    let price = 0.0
    let idPro = "";
    products.product.forEach( e => {
        if(e.id == number) {
            name = e.name
            price = e.price 


             // xử lý LocalStorage 
            let pro = {
                idPro: e.id,
                imgPro: e.img,
                namePro: name,
                pricePro: price,
                quantity: text.value
            }

            idPro = `prod_${e.id}`

            localStorage.setItem(idPro, JSON.stringify(pro))
        }
    })



    var html = `
    <li class="d-flex align-items-center">
                        <div class="cart-body_img">
                            <img class="w-100" src="../../imagine/Product/product_${result}" alt="">
                        </div>
                        <div class="cart-body_content">
                                        <a>${name}</a>
                            <div class="cart-body_content_control">
                            <span>-</span>
                            <span>${text.value}</span>
                            <span>+</span>

                            <span>${price}</span>
                </div>
            </div>
     </li>`
    cartBody.innerHTML = html



})

//  xử lý chọn màu

colorBtn.forEach(e => {
    e.addEventListener('click', event => {
        event.target.classList.toggle('select')
    })
})

// xử lý nút mua 

buyBtn.addEventListener('click', (e) => {
    let data = JSON.parse(localStorage.getItem('user_info'))
    if(data.loged == '1') {
        window.location.href = '../cartPage.html'
    } else {
        window.location.href = '../login.html'
    }
})



// thực hiện kêu LocalStorage 

let arr = []

for (var i = 1; i < 22; i++) {
    let dataLocalStorage = JSON.parse(localStorage.getItem(`prod_${i}`));

    arr.push(dataLocalStorage)
}
  
let countQualy = 0;
arr.forEach(e => {
    if(e) {

        countQualy =  parseInt(countQualy) + parseInt(e.quantity)

        var html = `
            <li class="d-flex align-items-center">
                        <div class="cart-body_img">
                            <img class="w-100" src="../../imagine/Product/product_${e.idPro}.webp" alt="">
                        </div>
                        <div class="cart-body_content">
                                        <a>${e.namePro}</a>
                            <div class="cart-body_content_control">
                            <span>-</span>
                            <span>${e.quantity}</span>
                            <span>+</span>

                            <span>${e.pricePro}</span>
                </div>
            </div>
         </li>`
    cartBody.insertAdjacentHTML('beforeend', html)
    }
})

cartItem.innerHTML = countQualy

// gán sự kiện vào go to cart
const cartSubmit = document.querySelector('.cart-submit button')
cartSubmit.addEventListener('click', e=> {
    window.location.href = '../cartPage.html'
})

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
document.querySelector('.header-center img').addEventListener('click', e => {
    window.location.href = '/index.html'
})