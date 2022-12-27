import { Product } from "../../../data/interfaces";
import { products } from "../../../data/products";
import { filterProducts } from "./filter";
import { RangeOptions } from "./interfaces";
import { renderGoods } from "./render";
import { getFiltersData } from "./sendFilters";

export function renderFilters(ranges: RangeOptions[]) {
  const filtersData = getFiltersData();
  filtersData.setParams(window.location.search);

  ranges.forEach(element => {
    const fromPrice: HTMLInputElement = document.querySelector(element.fromSilderId)!;
    const toPrice: HTMLInputElement = document.querySelector(element.toSliderId)!;

    const fromSlider: HTMLInputElement = document.querySelector(element.fromValueId)!;
    const toSlider: HTMLInputElement = document.querySelector(element.toValueId)!;

    fromSlider.addEventListener('mouseup', render);
    toSlider.addEventListener('mouseup', render);
    fromPrice.addEventListener('mouseup', render);
    toPrice.addEventListener('mouseup', render);
  });
    

  const tiles: HTMLDivElement = document.querySelector('.view__tiles_wrap')!;
  const list: HTMLDivElement = document.querySelector('.view__list_wrap')!;

  const options = document.querySelectorAll<HTMLDivElement>('.select__option')!;

  const searchField: HTMLInputElement = document.querySelector('.search__input')!;

  const resetFilters: HTMLElement = document.querySelector('.trash-container')!;

  function render(this: HTMLInputElement | HTMLDivElement | HTMLElement) {
    const filtersData = getFiltersData();
    window.history.replaceState({}, '', filtersData.getParams());


    const filteredProducts = filterProducts(filtersData, products);

    if (this.classList.contains('checkbox__categories') || this.classList.contains('checkbox__brands')) {
      filtersData.price = setInputs(filteredProducts, 'price');
      filtersData.inStock = setInputs(filteredProducts, 'stock');
      window.history.replaceState({}, '', filtersData.getParams());
    }

    setNumbers(filteredProducts);
    renderGoods(filteredProducts);
  }
  
  tiles.addEventListener('click', render);
  list.addEventListener('click', render);
  searchField.addEventListener('input', render);

  resetFilters.addEventListener('click', () => {
    filtersData.reset();
    render.apply(resetFilters);
    window.history.replaceState({}, '', window.location.origin);
  });

  const categories = document.querySelectorAll<HTMLInputElement>('.checkbox__categories')!;
  const brands = document.querySelectorAll<HTMLInputElement>('.checkbox__brands')!;

  categories.forEach(element => {
    element.addEventListener('input', render);
  });

  brands.forEach(element => {
    element.addEventListener('input', render);
  });

  options.forEach(element => {
    element.addEventListener('click', render);
  });

  render.apply(searchField);
}

function setNumbers(products: Product[]): void {
  setByTheme(products, 'categories');
  setByTheme(products, 'brand');

  function setByTheme(products: Product[], theme: string): void {
    let numbers = document.querySelectorAll('.current_number_' + theme);
    
    let categories: string[] = theme === 'categories' ? products.map(item => item.category) : products.map(item => item.brand);

    numbers.forEach(number => {
      let sum: number = 0;
      categories.forEach(category => {
        if (number.id.includes(category)) {
          sum += 1;
        }
      });
      number.textContent = sum.toString();
    });
  }
}

function setInputs(products: Product[], theme: string): {min: number, max: number} {
  if (products.length === 0) {
    return {min: 0, max: 0};
  } 
  let min: number = theme === 'price' ? products[0].price : products[0].stock;
  let max: number = 0;

  products.forEach(element => {
    const compare: number = theme === 'price' ? element.price : element.stock;
    if (compare < min) {
      min = compare;
    }
    if (compare > max) {
      max = compare;
    }
  });

  let fromPrice: HTMLInputElement = document.querySelector('#fromInputStock')!;
  let toPrice: HTMLInputElement = document.querySelector('#toInputStock')!;
  let fromSlider: HTMLInputElement = document.querySelector('#from-SliderStock')!;
  let toSlider: HTMLInputElement = document.querySelector('#to-SliderStock')!;

  if (theme === 'price') {
    fromPrice = document.querySelector('#fromInput')!;
    toPrice = document.querySelector('#toInput')!;

    fromSlider = document.querySelector('#from-Slider')!;
    toSlider = document.querySelector('#to-Slider')!;
  } 

  fromPrice.value = min.toString();
  toPrice.value = max.toString();
  fromSlider.value = min.toString();
  toSlider.value = max.toString();

  return {min, max};
}