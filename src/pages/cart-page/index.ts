import { promos } from '../../data/codes';
import { products } from '../../data/products';

import { Cart } from './scripts/cart';
import { setupCheckoutModal } from './scripts/modal';
import { performPagination } from './scripts/pagination';
import { validation } from './scripts/validation';

import './styles/style.scss';
import { cartItems, updateCartSummary } from './utils';


setupCheckoutModal();



const cartProducts = products.filter((product) => cartItems.has(product.id));
const cart = new Cart(cartProducts);

validation(cart);

const summaryCount = document.querySelector<HTMLElement>('.summary_count_number')!;
const totalPrice = document.querySelector<HTMLElement>('.summary_cost_number')!;
let discounts: Partial<Record<keyof typeof promos, boolean>> = JSON.parse(localStorage.getItem('discounts') || '{}');

const newCost: HTMLElement = document.querySelector('.new-cost')!;

function updateSummary() {
  const discount = Object.entries(discounts).reduce((sum, [key, value]) => {
    if (value) {
      return sum + promos[key as keyof typeof promos];
    }
    return sum;
  }, 0)

  if (discount) {
    totalPrice.classList.add('old-cost');
    const newPrice = Math.ceil(cart.totalPrice - (cart.totalPrice * discount / 100));
    newCost.innerHTML = `${newPrice}₽`;
  } else {
    totalPrice.classList.remove('old-cost');
    newCost.innerHTML = '';
  }

  summaryCount.innerText = cart.itemsCount.toString();
  totalPrice.innerText = cart.totalPrice.toString() + '₽';
}

function createCartEmpty() {
  const itemWrap: HTMLDivElement = document.querySelector('.cart_items_wrap')!;
  const summaryWrap: HTMLDivElement = document.querySelector('.summary_wrap')!;
  const cart: HTMLDivElement = document.querySelector('.cart')!;

  summaryWrap.style.display = 'none';

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
});

const addPromo: HTMLDivElement = document.querySelector('.add-promocodes')!;
const dropPromo: HTMLDivElement = document.querySelector('.drop-promocodes')!;
const input: HTMLInputElement = document.querySelector('#promocode')!;

input.addEventListener('input', () => onPromoInput());

Object.entries(discounts).forEach(([key, value]) => {
  if (value) {
    renderDiscount(key as keyof typeof promos);
  }
})

function onPromoInput() {
  const discount = input.value as keyof typeof promos;

  if (discount in promos && !discounts[discount]) {
    renderDiscount(discount);
  } else {
    addPromo.innerHTML = '';
  }
}

function renderDiscount(key: keyof typeof promos) {
  const promoItem = document.createElement('div');
  promoItem.classList.add('add-item');
  promoItem.innerHTML = `${key} - ${promos[key]}%`;

  const actionButton = document.createElement('div');
  actionButton.classList.add('add-button');
  
  if (discounts[key]) {
    actionButton.innerHTML = `DROP`;
    dropPromo.appendChild(promoItem);
  } else {
    actionButton.innerHTML = `ADD`;
    addPromo.appendChild(promoItem);
  }
  promoItem.appendChild(actionButton);

  actionButton.addEventListener('click', () => {
    if (discounts[key]) {
      promoItem.remove();
    } else {
      actionButton.innerHTML = `DROP`;
      dropPromo.appendChild(promoItem);
    }
    
    discounts[key] = !discounts[key];
    onPromoInput()

    updateSummary();
  });
}
