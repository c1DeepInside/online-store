import { products } from '../../data/products';
import { cartItems, updateCartSummary } from '../cart-page/utils';
import { renderProduct } from './scripts/renderProduct';
import { renderRouting } from './scripts/renderRout';
import './styles/style.scss';

const pathname: string[] = window.location.pathname.split('/');

const productId: number = +pathname[pathname.length - 1];
const product = products.find((product) => product.id == productId);

updateCartSummary();

if (!product) {
  const description: HTMLDivElement = document.querySelector('.description__inner')!;
  description.innerHTML = `Product number ${productId} not found`;
  description.classList.add('not-found');
} else {
  renderRouting(product);
  renderProduct(product);
}

const descriptionButton: HTMLButtonElement = document.querySelector('.description-btn')!;
descriptionButton.addEventListener('click', (): void => {
  if (cartItems.has(productId)) {
    cartItems.del(productId);
    descriptionButton.innerHTML = 'ADD TO CART';
  } else {
    cartItems.set(productId, 1);
    descriptionButton.innerHTML = 'DROP FROM CART';
  }

  updateCartSummary();
});

const buy: HTMLButtonElement = document.querySelector('.buy')!;
buy.addEventListener('click', (): void => {
  if (!cartItems.has(productId)) {
    cartItems.set(productId, 1);
  }
  window.location.assign('../cart?isOpenModal=true');
});
