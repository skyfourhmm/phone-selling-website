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

const contentBox = document.querySelector('.content-mid-center')

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

// xử lý render ra trên chô hiển thị giỏ hàng

function render() {

    let array = []

    for (var i = 1; i < 22; i++) {
        let dataLocalStorage = JSON.parse(localStorage.getItem(`prod_${i}`));

        array.push(dataLocalStorage)
    }
 

    array.forEach(e => {
        if(e) {
            
            var allPrice = 0;

            allPrice = parseInt(e.quantity) * parseFloat(e.pricePro)

            var html = `
    <div class="item d-flex align-items-center" id ="${e.idPro}">
    <div>
        <label for="checkOne"></label>
        <input type="checkbox" id="checkOne">
    </div>

    <div class="title-img d-flex align-items-center">
        <div class="image">
            <img src="../imagine/Product/product_${e.idPro}.webp" alt="">
        </div>
        <span>${e.namePro}</span>
    </div>

    <div class="gia">
        <span>₫${e.pricePro}</span>
    </div>

    <div class="so-luong">
        <button class="giam">-</button>
        <input type="text" value = "${e.quantity}">
        <button class="tang">+</button>
    </div>

    <div class="so-tien">
        <span>₫${allPrice}0.000</span>
    </div>

    <div class="thao-tac">
        <button>Xóa</button>
    </div>
</div>
    `

    return contentBox.insertAdjacentHTML('beforeend', html)

        }
    })
}

render()

// xử lý sự kiện xóa sản phẩm

function handlDelete() {
    // Lưu trữ vị trí cuộn trước khi tải lại trang
    localStorage.setItem('scrollPosition', window.pageYOffset);

    // Tải lại trang
    location.reload();

    // Khôi phục vị trí cuộn sau khi tải xong
    window.onload = function() {
        var scrollPosition = localStorage.getItem('scrollPosition');
            if (scrollPosition) {
                window.scrollTo(0, scrollPosition);
                localStorage.removeItem('scrollPosition');
            }
};

}

const deleteBtn = document.querySelectorAll('.thao-tac button')

deleteBtn.forEach(e => {
    
    e.addEventListener('click', event => {
        var parentElement = event.target.parentNode.parentNode;
        var parentId = parentElement.id;
  
        localStorage.removeItem(`prod_${parentId}`);


        handlDelete()
        // location.reload(true)

        render()
    })
})



//  xử lý ô check 
const checkAll =  document.querySelector('#checkAll');
const checkOne = document.querySelectorAll('#checkOne')

checkAll.addEventListener('change', e => {
    if(checkAll.checked) {
        for(var i = 0; checkOne.length; i++) {
            checkOne[i].checked = true
        }
    } else {
        for(var i = 0; checkOne.length; i++) {
            checkOne[i].checked = false
        } 
    }
})


const buyBtn = document.querySelector('.buyBtn')

buyBtn.addEventListener('click', e => {
    // Chuyển đến trang mới

    var count = 0;
    var checkArr = []
    for(var i = 0; i<  checkOne.length; i++) {

        if(checkOne[i].checked) {
            count++;
            var idPrent = checkOne[i].parentNode.parentNode.id
            checkArr.push(idPrent)
        } 
    }
    if(count == 0) {
        alert('bạn chưa chọn sản phẩm cần mua')
    } else {
        window.location.href = "../src/payPage.html";
    }

    localStorage.setItem('dataPay', JSON.stringify(checkArr))


})

// xử lý những sản phẩm đã check để hiển thị lên trên trang pay

function handleCheck() {
    for(var i = 0; checkOne.length; i++) {
        if(checkOne[i].checked) {
            
        } 
    }

    window.location.href = "../src/payPage.html";
}


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
    window.location.href = '/index.html'
})