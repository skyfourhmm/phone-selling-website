
import {products} from './product.js'


const cart = document.querySelector('.cart')
const cartProduct = document.querySelector('.cart-product')
const categories = document.querySelector('.header-bottom_nav-top')
const categories_show = document.querySelector('.header-bottom_nav-top ul')
const btnProductLeft = document.querySelector('.move-pro-left')
const btnProductRight = document.querySelector('.move-pro-right')
const logined = document.querySelector('.logined');
const notLogined = document.querySelector('.not-logined')
const productAll = document.querySelectorAll('.list-product-item');

const input = document.querySelector('.search-product-shadown input')
const boxSearch = document.querySelector('.box-search')

const cartItem = document.querySelector('.cart span')
const cartBody = document.querySelector('.cart-body ul')


function render() {
    const html = products.product.map((e,index) => {
        if(index < 12) {
            return `
        <div class="list-product-item product-all-item col-2 data-index = ${index}">
                    <a href="./proDetail.html">
                        <div class="list-product-label">
                            <span>Trả góp 0%</span>
                        </div>
                        <div class="list-product-item_img">
                            <img src="${e.img}" alt="">
                        </div>
                        <p class="result-label">
                            <img src="../imagine/icon-per.webp" alt="">
                            <span>Giá rẻ quá</span>
                        </p>
                        <h3>${e.name}</h3>
                        <strong>${e.price}</strong>
                        <div class="vote">
                            ${e.start}
                            <i class="fa-solid fa-star"></i>
                        </div>
                    </a>
                </div>
        `
        }
    })
    return document.querySelector('.product-all').innerHTML = html.join('')
}

function renderProductShowChildOne() {
    const html = products.product.map( (e, index ) => {
        if(index < 5) {
            return `
            <div class="list-product-item data-index = ${index}">
                            <a href="./proDetail.html">
                                <div class="list-product-label">
                                    <span>Trả góp 0%</span>
                                </div>
                                <div class="list-product-item_img">
                                    <img src="${e.img}" alt="">
                                </div>
                                <p class="result-label">
                                    <img src="../imagine/icon-per.webp" alt="">
                                    <span>Giá rẻ quá</span>
                                </p>
                                <h3>${e.name}</h3>
                                <strong>${e.price}</strong>
                                <div class="vote">
                                    ${e.start}
                                    <i class="fa-solid fa-star"></i>
                                </div>
                            </a>
                        </div>`
        }
    })
    return document.querySelector('.child-1 .d-flex').innerHTML = html.join('')
}

function renderProductShowChildTwo() {
    const html = products.product.map( (e, index ) => {
        if(index >= 5 && index < 10) {
            return `
            <div class="list-product-item data-index = ${index}">
                            <a href="">
                                <div class="list-product-label">
                                    <span>Trả góp 0%</span>
                                </div>
                                <div class="list-product-item_img">
                                    <img src="${e.img}" alt="">
                                </div>
                                <p class="result-label">
                                    <img src="../imagine/icon-per.webp" alt="">
                                    <span>Giá rẻ quá</span>
                                </p>
                                <h3>${e.name}</h3>
                                <strong>${e.price}</strong>
                                <div class="vote">
                                    ${e.start}
                                    <i class="fa-solid fa-star"></i>
                                </div>
                            </a>
                        </div>`
        }
    })
    return document.querySelector('.child-2 .d-flex').innerHTML = html.join('')
}

renderProductShowChildOne()
renderProductShowChildTwo()
render()

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


let counter = 1;
setInterval(() => {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 2) {
        counter = 1;
    }
},4000)

function handleMoveProduct() {
    btnProductLeft.addEventListener('click', (e) => {
        document.querySelector('.child-1').style.left = "20px"
        document.querySelector('.child-2').style.left = "103%"
    })

    btnProductRight.addEventListener('click', (e) => {
        document.querySelector('.child-1').style.left = "-103%"
        document.querySelector('.child-2').style.left= "20px"
    })
}

handleMoveProduct()

// --------------------

// xử lý nổi bọt 

document.querySelector('.cart-product').onclick = (e) => {
    e.stopPropagation()
}



// xử lý truyền dữ liệu vào trong search

// input.addEventListener('focus', e =>{
//     boxSearch.style.display = "block"
// })

// input.addEventListener('blur', e => {
//     boxSearch.style.display = "none"
// })

input.addEventListener('input', e=> {

    let txtSearch = e.target.value.trim().toLowerCase();
    products.product.forEach((event,index) => {
        if(event.name.includes(txtSearch)) {
            if(index < 5 ) {
                var newLi = document.createElement("li");
                var newI = document.createElement("i");
                var liText = document.createTextNode(event.name);
                newI.className = "fa-solid fa-magnifying-glass";
                newLi.appendChild(newI);
                newLi.appendChild(liText);

                boxSearch.appendChild(newLi);

                // console.log(document.querySelectorAll('.box-search li'))
                handleItem(document.querySelectorAll('.box-search li'))
            }
        }
    })
})

function handleItem(items) {
    
    items.forEach(e => {
        console.log(e)
        e.addEventListener('click', event => {

            products.product.forEach(ev=> {
                if(ev.name == event.target.innerText) {
                    window.location.href = `./src/detailProduct/product_${ev.id}.html`
                }
            })
        })
    })
}


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
                            <img class="w-100" src="../imagine/Product/product_${e.idPro}.webp" alt="">
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
    window.location.href = './src/cartPage.html'
})


//  lấy data lên
let data = JSON.parse(localStorage.getItem('user_info'))
const nameuser = document.querySelector('.logined span')
const login = document.querySelector('.login')

if(data.loged == '1') {
    notLogined.style.display = 'none';
    logined.style.display = 'block'
    nameuser.textContent = data.user
    login.style.pointerEvents = "none";
}

// bấm vào logo di chuyển tới trang chính
document.querySelector('.header-center img').addEventListener('click', e => {
    window.location.href = 'http://127.0.0.1:5500/index.html'
})