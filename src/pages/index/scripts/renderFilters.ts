import { products } from "../../../data/products";
import { filterProducts } from "./filter";
import { RangeOptions } from "./interfaces";
import { renderGoods } from "./render";
import { getFiltersData } from "./sendFilters";

export function renderFilters(ranges: RangeOptions[]) {
  const filtersData = getFiltersData();
  filtersData.setParams(window.location.search);
  render();

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

  function render() {
    const filtersData = getFiltersData();
    window.history.replaceState({}, '', filtersData.getParams());

    const filteredProducts = filterProducts(filtersData, products);
    renderGoods(filteredProducts);
  }
  
  tiles.addEventListener('click', render);
  list.addEventListener('click', render);
  searchField.addEventListener('input', render);

  resetFilters.addEventListener('click', () => {
    filtersData.reset();
    render();
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
}