import { Product } from '../../../data/interfaces';
import { cartItems, updateCartSummary } from '../../cart-page/utils';
import { changeView } from './changeView';
import { itemsFound } from './itemsFound';
import { sortData } from './sortData';
import { sortVariable } from './sortProducts';

export function renderGoods(products: Product[]) {
  const catalog: HTMLDivElement = document.querySelector('.catalog__goods')!;
  catalog.innerHTML = '';

  itemsFound(products);

  const sortProducts = sortData(products, sortVariable);

  sortProducts.forEach((product) => {
    const goodsItem: HTMLDivElement = document.createElement('div');
    goodsItem.classList.add('goods__item');
    catalog.appendChild(goodsItem);

    const goodsImgContainer: HTMLDivElement = document.createElement('div');
    goodsImgContainer.classList.add('goods__item-img');
    goodsItem.appendChild(goodsImgContainer);
    goodsItem.appendChild(goodsImgContainer);

    const goodsImgLink: HTMLAnchorElement = document.createElement('a');
    goodsImgLink.href = `./product/${product.id}`;
    goodsImgContainer.appendChild(goodsImgLink);

    const goodsImg: HTMLImageElement = document.createElement('img');
    goodsImg.classList.add('goods-img');
    goodsImg.src = product.thumbnail;
    goodsImg.alt = product.category;
    goodsImgContainer.appendChild(goodsImg);
    goodsImgLink.appendChild(goodsImg);

    const goodsText: HTMLDivElement = document.createElement('div');
    goodsText.classList.add('goods__item-text');
    goodsItem.appendChild(goodsText);

    const goodsInStock: HTMLDivElement = document.createElement('div');
    goodsInStock.classList.add('goods__item-in-stock');
    goodsInStock.innerHTML = `Quantity in stock: ${product.stock}`;
    goodsText.appendChild(goodsInStock);

    const goodsAboutItem: HTMLAnchorElement = document.createElement('a');
    goodsAboutItem.classList.add('goods__item-about');
    goodsAboutItem.href = `./product/${product.id}`;
    goodsAboutItem.innerHTML = product.title;
    goodsText.appendChild(goodsAboutItem);

    const goodsPrice: HTMLDivElement = document.createElement('div');
    goodsPrice.classList.add('goods__item-price');
    goodsText.appendChild(goodsPrice);

    const priceInner: HTMLDivElement = document.createElement('div');
    priceInner.classList.add('price');
    goodsPrice.appendChild(priceInner);

    const priceTitle: HTMLDivElement = document.createElement('div');
    priceTitle.classList.add('price__title');
    priceTitle.innerHTML = 'Price:';
    priceInner.appendChild(priceTitle);

    const price: HTMLElement = document.createElement('h3');
    price.innerHTML = `${product.price} ₽`;
    priceInner.appendChild(price);

    const priceCart: HTMLDivElement = document.createElement('div');
    priceCart.classList.add('price__icon');
    priceCart.id = 'price__icon_' + product.id;
    goodsPrice.appendChild(priceCart);

    const cartIcon: HTMLSpanElement = document.createElement('span');
    cartIcon.classList.add('cart');
    if (cartItems.has(product.id)) {
      cartIcon.classList.add('trash');
    }

    priceCart.appendChild(cartIcon);

    priceCart.addEventListener('click', () => {
      if (cartItems.has(product.id)) {
        cartItems.del(product.id);
      } else {
        cartItems.set(product.id, 1);
      }

      cartIcon.classList.remove('cart');
      cartIcon.classList.remove('trash');

      if (cartItems.has(product.id)) {
        cartIcon.classList.add('trash');
      } else {
        cartIcon.classList.add('cart');
      }

      updateCartSummary();
    });
  });

  changeView();
}
