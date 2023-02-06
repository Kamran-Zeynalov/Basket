let titles = document.querySelectorAll(".title");

document.addEventListener("DOMContentLoaded", function () {
  let basketStr = localStorage.getItem("basket");
  let basket = JSON.parse(basketStr);

  if (!basket || !basket.length) {
    localStorage.setItem("basket", JSON.stringify([]));
  } else {
    showProductCount(basket);
    showTotalPrice(basket);
  }
});

titles.forEach((title) => {
  title.setAttribute("dataTitle", title.innerText);
  if (title.innerText.length > 15) {
    title.innerText = title.innerText.substring(0, 12) + "...";
  }
});

let buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      localStorage.setItem("basket", JSON.stringify([]));
      basket = JSON.parse(localStorage.getItem("basket"));
    }

    let product = getProductDatas(this);
    let existedProduct = basket.find((pro) => {
      return pro.id == product.id;
    });
    if (!existedProduct) {
      basket.push(product);
    } else {
      existedProduct.count++;
    }
    showProductCount(basket);
    showTotalPrice(basket);

    let basketStr = JSON.stringify(basket);
    localStorage.setItem("basket", basketStr);
  });
});

let cart = document.querySelector(".cart");
let basket = JSON.parse(localStorage.getItem("basket"));
let yourCart = document.querySelector(".yourCart");
let cartProduct = document.querySelector(".product");
let totalPrice = document.querySelector(".total-price");

cart.addEventListener("click", function () {
  yourCart.classList.toggle("active");
  let basket = JSON.parse(localStorage.getItem("basket"));
  cartProduct.innerHTML = " ";

  basket.forEach((cartInfo) => {
    let list = `
    <li>
    <div class="cartImage">
    <img src="${cartInfo.src}" alt="">
    </div>
    <div class="title-price">
    <h6>${cartInfo.title}</h6>
    <p>${cartInfo.price} x ${cartInfo.count}</p>
    </div>
    <div class="xBtn">
    <button class = "btn btn-outline-dark">X</button>
    </div>
    </li>
    `;

    cartProduct.innerHTML += list;
  });

  let removeProduct = document.querySelectorAll(".xBtn");

  removeProduct.forEach((event) => {
    event.addEventListener("click", function () {
      let li = this.parentElement;
      let src = li.querySelector(".cartImage img").src;
      basket = basket.filter((device) => device.src != src);
      li.remove();
      showTotalPrice(basket);
      showProductCount(basket);
      localStorage.setItem("basket", JSON.stringify(basket));
    });
  });
});

function getProductDatas(product) {
  let parent = product.parentElement.parentElement.parentElement;
  let id = parent.getAttribute("data-id");
  let price = parent.querySelector(".price").innerText;
  let title = parent.querySelector(".title").getAttribute("dataTitle");
  let desc = parent.querySelector("p").innerText;
  let src = parent.querySelector("img").src;
  let result = { id, price, title, desc, src, count: 1 };
  return result;
}

function showProductCount(basket) {
  let basketCount = document.querySelector(".basket-count");
  basketCount.innerText = basket.reduce((total, product) => {
    return (total += product.count);
  }, 0);
}

function showTotalPrice(basket) {
  let total = document.querySelectorAll(".total-price");
  total.forEach((tt) => {
    tt.innerText = basket.reduce((total, product) => {
      return (total += parseInt(product.price * product.count));
    }, 0);
  });
}
