import { products } from "../../../data/products";
import { calculateCart } from "../../index/scripts/calculateCart";
import { renderCart } from "./renderCart";

export function changeCount(): void {
  const inputs = document.querySelectorAll<HTMLInputElement>('.item_count')!;
  const minuses = document.querySelectorAll<HTMLButtonElement>('.item_count_minus')!;
  const pluses = document.querySelectorAll<HTMLButtonElement>('.item_count_plus')!;
  const itemCost = document.querySelectorAll<HTMLButtonElement>('.item_cost')!;

  inputs.forEach((elem, i) => {
    elem.addEventListener('input', changeInputCount.bind(elem, i));
    minuses[i].addEventListener('click', changeInputCount.bind(minuses[i], i));
    pluses[i].addEventListener('click', changeInputCount.bind(pluses[i], i));
  });
  
  function changeInputCount(this: HTMLInputElement | HTMLButtonElement, i: number ): void {
    let ids: string[] = localStorage.getItem('onlineStoreCartIDs')!.split(',');
    let count: string[] = localStorage.getItem('onlineStoreCartCount')!.split(',');

    if (inputs[i].value === '0') {
      ids.splice(i, 1);
      count.splice(i, 1);
      localStorage.setItem('onlineStoreCartIDs', ids.join(','));
      localStorage.setItem('onlineStoreCartCount', count.join(','));
      renderCart(products);
    } else {
      count[i] = inputs[i].value;
      localStorage.setItem('onlineStoreCartCount', count.join(','));
    }

    itemCost[i].textContent = (Number(inputs[i].value) * products[Number(ids[i]) - 1].price).toString() + '₽';

    calculateCart();
    changeSummary();
  }
}

export function changeSummary(): void {
  const totalProducts: HTMLSpanElement = document.querySelector('.total_products')!;
  const totalCost: HTMLSpanElement = document.querySelector('.total_cost')!;

  const totalProdSum: HTMLSpanElement = document.querySelector('.summary_count_number')!;
  const totalCostSum: HTMLSpanElement = document.querySelector('.summary_cost_number')!;

  totalProdSum.textContent = totalProducts.textContent;
  totalCostSum.textContent = totalCost.textContent;
}