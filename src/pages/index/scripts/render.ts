import { products } from "../../../data/products";

export function renderGoods() {
    const catalog: HTMLDivElement = document.querySelector('.catalog__goods')!;

    products.forEach((product) => {
        let goodsItem: HTMLDivElement = document.createElement('div');
        goodsItem.classList.add('goods__item');
        catalog.appendChild(goodsItem);

        let goodsImgContainer: HTMLDivElement = document.createElement('div');
        goodsImgContainer.classList.add('goods__item-img');
        goodsItem.appendChild(goodsImgContainer);

        let goodsImg: HTMLImageElement = document.createElement('img');
        goodsImg.classList.add('goods-img');
        goodsImg.src = product.thumbnail;
        goodsImg.alt = product.category;
        goodsImgContainer.appendChild(goodsImg);

        let goodsText: HTMLDivElement = document.createElement('div');
        goodsText.classList.add('goods__item-text');
        goodsItem.appendChild(goodsText);

        let goodsInStock: HTMLDivElement = document.createElement('div');
        goodsInStock.classList.add('goods__item-in-stock');
        goodsInStock.innerHTML = `Quantity in stock: ${product.stock}`;
        goodsText.appendChild(goodsInStock);

        let goodsAboutItem: HTMLDivElement = document.createElement('div');
        goodsAboutItem.classList.add('goods__item-about');
        goodsAboutItem.innerHTML = product.title;
        goodsText.appendChild(goodsAboutItem);

        let goodsPrice: HTMLDivElement = document.createElement('div');
        goodsPrice.classList.add('goods__item-price');
        goodsText.appendChild(goodsPrice);

        let priceInner: HTMLDivElement = document.createElement('div');
        priceInner.classList.add('price');
        goodsPrice.appendChild(priceInner);

        let priceTitle: HTMLDivElement = document.createElement('div');
        priceTitle.classList.add('price__title');
        priceTitle.innerHTML = 'Price:';
        priceInner.appendChild(priceTitle);

        let price: HTMLElement = document.createElement('h3');
        price.innerHTML = `${product.price} ₽`;
        priceInner.appendChild(price);

        let priceCart: HTMLDivElement = document.createElement('div');
        priceCart.classList.add('price__icon');
        goodsPrice.appendChild(priceCart);

        let cartIcon: HTMLImageElement = document.createElement('img');
        cartIcon.src = require('../../../assets/icons/cart-white.svg');
        cartIcon.alt = 'Cart';
        cartIcon.classList.add('cart');
        priceCart.appendChild(cartIcon);
    });
}