import { Product } from "../../../data/interfaces";

export function showFilters(products: Product[]) {
  renderCategory(products);
  renderPrice(products);
}

function renderPrice(products: Product[]): void {
  const price: number[] = products.map(item => item.price);

  const minPrice: number = 0;
  const maxPrice: number = Math.max.apply(null, price);

  const fromPrice: HTMLInputElement = document.querySelector('#fromInput')!;
  const toPrice: HTMLInputElement = document.querySelector('#toInput')!;

  fromPrice.value = minPrice.toString();
  toPrice.value = maxPrice.toString();

  changeMinMax(fromPrice, minPrice, maxPrice);
  changeMinMax(toPrice, minPrice, maxPrice);

  const fromSlider: HTMLInputElement = document.querySelector('#from-Slider')!;
  const toSlider: HTMLInputElement = document.querySelector('#to-Slider')!;

  changeMinMax(fromSlider, minPrice, maxPrice);
  changeMinMax(toSlider, minPrice, maxPrice);

  fromSlider.value = minPrice.toString();
  toSlider.value = maxPrice.toString();

  function changeMinMax(input: HTMLInputElement, min: number, max: number): void {
    input.min = min.toString();
    input.max = max.toString();
  }
}

function renderCategory(products: Product[]): void {
  let categories: string[] = products.map(item => item.category);
  categories = [...new Set(categories)]
  
  const filterCategories: HTMLDivElement = document.querySelector('.filters__categories')!;

  categories.forEach(category => {
    const filterItem: HTMLLabelElement = document.createElement('label');
    filterItem.classList.add('filters__theme-item');
    filterItem.innerHTML = category;

    const inputCheckbox: HTMLInputElement = document.createElement('input');
    inputCheckbox.classList.add('checkbox');
    inputCheckbox.classList.add('checkbox__categories');
    inputCheckbox.id = category;
    inputCheckbox.type = 'checkbox';
    filterItem.appendChild(inputCheckbox);

    const inputCheckMark: HTMLSpanElement = document.createElement('span');
    inputCheckMark.classList.add('checkmark');
    filterItem.appendChild(inputCheckMark);

    filterCategories.appendChild(filterItem);
  });
}