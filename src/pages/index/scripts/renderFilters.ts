import { products } from "../../../data/products";
import { filterProducts } from "./filter";
import { RangeOptions } from "./interfaces";
import { renderGoods } from "./render";
import { getFiltersData } from "./sendFilters";

export function renderFilters({ fromSilderId, toSliderId, fromValueId, toValueId }: RangeOptions) {
  const fromPrice: HTMLInputElement = document.querySelector(fromSilderId)!;
  const toPrice: HTMLInputElement = document.querySelector(toSliderId)!;

  const fromSlider: HTMLInputElement = document.querySelector(fromValueId)!;
  const toSlider: HTMLInputElement = document.querySelector(toValueId)!;

  const searchField: HTMLInputElement = document.querySelector('.search__input')!;

  const resetFilters: HTMLElement = document.querySelector('.trash-container')!;

  function render() {
    window.history.replaceState({}, '', filtersData.getParams());

    const filteredProducts = filterProducts(filtersData, products);
    renderGoods(filteredProducts);
  }
  
  fromSlider.addEventListener('mouseup', render);
  toSlider.addEventListener('mouseup', render);
  fromPrice.addEventListener('mouseup', render);
  toPrice.addEventListener('mouseup', render);
  searchField.addEventListener('input', render);

  resetFilters.addEventListener('click', () => {
    window.history.replaceState({}, '', window.location.origin);
    filtersData.reset();
  });

  const categories = document.querySelectorAll<HTMLInputElement>('.checkbox__categories')!;
  const brands = document.querySelectorAll<HTMLInputElement>('.checkbox__brands')!;

  const filtersData = getFiltersData();
  filtersData.setParams(window.location.search);

  categories.forEach(element => {
    element.addEventListener('input', render);
  });

  brands.forEach(element => {
    element.addEventListener('input', render);
  });

}