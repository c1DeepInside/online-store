import { products } from '../../data/products';
import { Cart } from './scripts/cart';
import { setupCheckoutModal } from './scripts/modal';
import './styles/style.scss';
import { cartItems, updateCartSummary } from './utils';

setupCheckoutModal();

const cartProducts = products.filter((product) => cartItems.has(product.id));
const cart = new Cart(cartProducts);

const summaryCount = document.querySelector<HTMLElement>('.summary_count_number')!;
const totalPrice = document.querySelector<HTMLElement>('.summary_cost_number')!;

function updateSummary() {
    summaryCount.innerText = cart.itemsCount.toString();
    totalPrice.innerText = cart.totalPrice.toString();
}

updateSummary();
updateCartSummary();

cart.onChange(() => {
    updateSummary();
    updateCartSummary();
})