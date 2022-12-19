import { products } from "../../../data/products";
import { filterProducts } from "./filter";
import { RangeOptions } from "./interfaces";
import { renderGoods } from "./render";
import { getFiltersData } from "./sendFilters";
import { debounce } from "./utils";

export function renderFilters({ fromSilderId, toSliderId, fromValueId, toValueId }: RangeOptions) {
  const fromPrice: HTMLInputElement = document.querySelector(fromSilderId)!;
  const toPrice: HTMLInputElement = document.querySelector(toSliderId)!;

  const fromSlider: HTMLInputElement = document.querySelector(fromValueId)!;
  const toSlider: HTMLInputElement = document.querySelector(toValueId)!;

  const render = debounce(() => {
    const filteredProducts = filterProducts(filtersData, products);
    renderGoods(filteredProducts);
  }, 200);

  fromSlider.addEventListener('input', render);
  toSlider.addEventListener('input', render);
  fromPrice.addEventListener('input', render);
  toPrice.addEventListener('input', render);

  const categories = document.querySelectorAll<HTMLInputElement>('.checkbox__categories')!;
  const brands = document.querySelectorAll<HTMLInputElement>('.checkbox__brands')!;

  const filtersData = getFiltersData();

  categories.forEach(element => {
    element.addEventListener('input', render);
  });

  brands.forEach(element => {
    element.addEventListener('input', render);
  });


}