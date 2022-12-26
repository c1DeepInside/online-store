import { products } from '../../data/products';
import { Cart } from './scripts/cart';
import { setupCheckoutModal } from './scripts/modal';
import { performPagination } from './scripts/pagination';
import './styles/style.scss';
import { cartItems, updateCartSummary } from './utils';

setupCheckoutModal();

const cartProducts = products.filter((product) => cartItems.has(product.id));
const cart = new Cart(cartProducts);

const summaryCount = document.querySelector<HTMLElement>('.summary_count_number')!;
const totalPrice = document.querySelector<HTMLElement>('.summary_cost_number')!;

function updateSummary() {
    summaryCount.innerText = cart.itemsCount.toString();
    totalPrice.innerText = cart.totalPrice.toString() + '₽';
}

function createCartEmpty() {
    const itemWrap: HTMLDivElement = document.querySelector('.cart_items_wrap')!;
    const empty = document.createElement('div');
    empty.classList.add('empty');
    empty.innerHTML = 'Cart is empty';
    itemWrap.appendChild(empty);
}

updateSummary();
updateCartSummary();

performPagination();

if (cart.products.length === 0) {
    createCartEmpty();
}

cart.onChange(() => {
    updateSummary();
    updateCartSummary();
    performPagination();

    if (cart.products.length === 0) {
        createCartEmpty();
    }
})