import { products } from "./product.js";

const logined = document.querySelector('.logined');
const notLogined = document.querySelector('.not-logined')
const cart = document.querySelector('.cart')
const cartProduct = document.querySelector('.cart-product')
const categories = document.querySelector('.header-bottom_nav-top')
const categories_show = document.querySelector('.header-bottom_nav-top ul')


const filter = document.querySelectorAll('.filter-header >div')
const filterShow = document.querySelectorAll(".filter-show")
const productAll = document.querySelector('.product-all')

const input = document.querySelector('.search-product-shadown input')
const boxSearch = document.querySelector('.box-search')

const cartItem = document.querySelector('.cart span')
const cartBody = document.querySelector('.cart-body ul')

for( let i = 0; i < filter.length ; i++) {
    filter[i].addEventListener('click', (e, index) => {
        document.querySelectorAll(".filter-show")[i].classList.toggle('show')
    })
}

for(let i = 0 ; i< filterShow.length; i++) {
    filterShow[i].onclick = function(e) {
        e.stopPropagation()
    }
}

categories.addEventListener('click', (e) => {
    categories_show.classList.toggle('show')
})

cart.addEventListener('click', () => {
    cartProduct.classList.toggle('show')
})

function render() {
    const html = products.product.map( (e, index ) => {

            return `
        <div class="list-product-item product-all-item col-2" id = "${e.brand}">
            <a href="../src/detailProduct/product_${index+1}.html">
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
    })
    return productAll.innerHTML = html.join('')
}

render()


// xử lý nổi bọt
document.querySelector('.cart-product').onclick = (e) => {
    e.stopPropagation()
}

// xử lý sự kiện lọc sản phẩm

// lọc sản phẩm theo brand
document.querySelectorAll('.select-brand .filter-show .filter-show-items').forEach((e) => {
    e.addEventListener('click', (event, index) => {
        const parts = event.target.currentSrc.split('/');
        
        const lastPart = parts[parts.length - 1];
        const brand = lastPart.substring(6, lastPart.indexOf('.'));

        document.querySelectorAll('.list-product-item').forEach(item => {
            item.classList.remove('hide')
            if(brand == "1") {
                if(item.id =='iphone') {
                    item.classList.remove('hide')
                } else {
                    item.classList.add('hide')
                }
            }

            if(brand == "2") {
                if(item.id =='samsung') {
                    item.classList.remove('hide')
                } else {
                    item.classList.add('hide')
                }
            }

            if(brand == "3") {
                if(item.id =='oppo') {
                    item.classList.remove('hide')
                } else {
                    item.classList.add('hide')
                }
            }

            if(brand == "4") {
                if(item.id =='xiaomi') {
                    item.classList.remove('hide')
                } else {
                    item.classList.add('hide')
                }
            }

            if(brand == "5") {
                if(item.id =='vivo') {
                    item.classList.remove('hide')
                } else {
                    item.classList.add('hide')
                }
            }

            if(brand == "6") {
                if(item.id =='realme') {
                    item.classList.remove('hide')
                } else {
                    item.classList.add('hide')
                }
            }
        })
    })
})

document.querySelectorAll('.price .filter-show-items').forEach((e,index) => {
    e.addEventListener('click', (event)=> {
        document.querySelectorAll('.list-product-item').forEach(item => {
            item.classList.remove('hide')
            if(index == 0) {
                if(parseFloat(item.querySelector('strong').textContent) < 2.0) {
                    item.classList.remove('hide')
                } else {
                    item.classList.add('hide')
                }
            } 
            
            if(index == 1) {
                if(parseFloat(item.querySelector('strong').textContent) > 2.0 && parseFloat(item.querySelector('strong').textContent) < 4.0) {
                    item.classList.remove('hide')
                } else {
                    item.classList.add('hide')
                }
            } 

            if(index == 2) {
                if(parseFloat(item.querySelector('strong').textContent) > 4.0 && parseFloat(item.querySelector('strong').textContent) < 7.0) {
                    item.classList.remove('hide')
                } else {
                    item.classList.add('hide')
                }
            }

            if(index == 3) {
                if(parseFloat(item.querySelector('strong').textContent) > 7.0 && parseFloat(item.querySelector('strong').textContent) < 13.0) {
                    item.classList.remove('hide')
                } else {
                    item.classList.add('hide')
                }
            }

            if(index == 4) {
                if(parseFloat(item.querySelector('strong').textContent) > 13.0 && parseFloat(item.querySelector('strong').textContent) < 20.0) {
                    item.classList.remove('hide')
                } else {
                    item.classList.add('hide')
                }
            }

            if(index == 5) {
                if(parseFloat(item.querySelector('strong').textContent) > 20.0) {
                    item.classList.remove('hide')
                } else {
                    item.classList.add('hide')
                }
            }
        })       
    })
})


// xử lý sự kiện truyền dữ liệu vào trang detail 

// document.querySelectorAll('.list-product-item').forEach( e => {
//     e.addEventListener('click', event => {
//         // window.location.assign('../src/proDetail.html');
//     })
// })


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
                    window.location.href = `../src/detailProduct/product_${ev.id}.html`
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
    window.location.href = '../src/cartPage.html'
})

//  lấy data lên
let data = JSON.parse(localStorage.getItem('user_info'))
const nameuser = document.querySelector('.logined span')
if(data.loged == '1') {
    notLogined.style.display = 'none';
    logined.style.display = 'block'
    nameuser.textContent = data.user
}

// bấm vào logo di chuyển tới trang chính
document.querySelector('.header-center img').addEventListener('click', e => {
    window.location.href = '/index.html'
})