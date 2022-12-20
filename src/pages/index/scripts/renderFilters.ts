import { products } from "../../../data/products";
import { filterProducts } from "./filter";
import { RangeOptions } from "./interfaces";
import { renderGoods } from "./render";
import { getFiltersData } from "./sendFilters";
// import { debounce } from "./utils"; old debounce

export function renderFilters({ fromSilderId, toSliderId, fromValueId, toValueId }: RangeOptions) {
  const fromPrice: HTMLInputElement = document.querySelector(fromSilderId)!;
  const toPrice: HTMLInputElement = document.querySelector(toSliderId)!;

  const fromSlider: HTMLInputElement = document.querySelector(fromValueId)!;
  const toSlider: HTMLInputElement = document.querySelector(toValueId)!;

  const options = document.querySelectorAll<HTMLDivElement>('.select__option')!;
  
  /* old debounce
  const render = debounce(() => {
    const filteredProducts = filterProducts(filtersData, products);
    renderGoods(filteredProducts);
  }, 200);
*/

  function render(): void {
    const filteredProducts = filterProducts(filtersData, products);
    renderGoods(filteredProducts);
  }
  
  fromSlider.addEventListener('mouseup', render);
  toSlider.addEventListener('mouseup', render);
  fromPrice.addEventListener('mouseup', render);
  toPrice.addEventListener('mouseup', render);

  const categories = document.querySelectorAll<HTMLInputElement>('.checkbox__categories')!;
  const brands = document.querySelectorAll<HTMLInputElement>('.checkbox__brands')!;

  const filtersData = getFiltersData();

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