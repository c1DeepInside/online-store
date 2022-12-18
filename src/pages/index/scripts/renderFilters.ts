import { products } from "../../../data/products";
import { filterProducts } from "./filter";
import { renderGoods } from "./render";
import { sendFilters } from "./sendFilters";

export function renderFilters(): void {
  const fromPrice: HTMLInputElement = document.querySelector('#fromInput')!;
  const toPrice: HTMLInputElement = document.querySelector('#toInput')!;

  const fromSlider: HTMLInputElement = document.querySelector('#from-Slider')!;
  const toSlider: HTMLInputElement = document.querySelector('#to-Slider')!;

  fromSlider.addEventListener('input', render);
  toSlider.addEventListener('input', render);
  fromPrice.addEventListener('input', render);
  toPrice.addEventListener('input', render);

  const categories: NodeListOf<HTMLInputElement> = document.querySelectorAll('.checkbox__categories')!;

  categories.forEach(element => {
    element.addEventListener('input', render);
  });

  function render(): void {
    renderGoods(filterProducts(sendFilters(products), products));
  }
}