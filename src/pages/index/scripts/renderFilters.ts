import { Product } from '../../../data/interfaces';
import { products } from '../../../data/products';
import { filterProducts } from './filter';
import { RangeOptions } from './interfaces';
import { renderGoods } from './render';
import { getFiltersData } from './sendFilters';

export function renderFilters(ranges: RangeOptions[]) {
  const filtersData = getFiltersData();
  filtersData.setParams(window.location.search);

  const inputArr: string[][] = [];

  ranges.forEach((element) => {
    const fromPrice = document.querySelector<HTMLInputElement>(element.fromSilderId)!;
    const toPrice = document.querySelector<HTMLInputElement>(element.toSliderId)!;
    const fromSlider = document.querySelector<HTMLInputElement>(element.fromValueId)!;
    const toSlider = document.querySelector<HTMLInputElement>(element.toValueId)!;

    inputArr.push(Object.values(element));

    fromSlider.addEventListener('mouseup', slidersRender);
    toSlider.addEventListener('mouseup', slidersRender);
    fromPrice.addEventListener('mouseup', slidersRender);
    toPrice.addEventListener('mouseup', slidersRender);
  });

  function slidersRender(this: HTMLInputElement) {
    if (inputArr[0].includes('#' + this.id)) {
      resetRanges('price');
      const filteredProducts = filterProducts(filtersData, products);
      setRanges(filteredProducts, 'price');
    }

    if (inputArr[1].includes('#' + this.id)) {
      resetRanges('stock');
      const filteredProducts = filterProducts(filtersData, products);
      setRanges(filteredProducts, 'stock');
    }

    render();
  }

  const tiles: HTMLDivElement = document.querySelector('.view__tiles_wrap')!;
  const list: HTMLDivElement = document.querySelector('.view__list_wrap')!;

  const options = document.querySelectorAll<HTMLDivElement>('.select__option')!;

  const searchField: HTMLInputElement = document.querySelector('.search__input')!;

  const resetFilters: HTMLElement = document.querySelector('.trash-container')!;

  function render() {
    const filtersData = getFiltersData();
    window.history.replaceState({}, '', filtersData.getParams());

    const filteredProducts = filterProducts(filtersData, products);

    setNumbers(filteredProducts);
    renderGoods(filteredProducts);
  }

  function resetRanges(range = 'all') {
    if (range === 'stock' || range === 'all') {
      filtersData.price.min = 0;
      filtersData.price.max = products.reduce((p, c) => Math.max(p, c.price), -Infinity);
    }
    if (range === 'price' || range === 'all') {
      filtersData.stock.min = 0;
      filtersData.stock.max = products.reduce((p, c) => Math.max(p, c.stock), -Infinity);
    }
  }

  function setRanges(filteredProducts: Product[], range = 'all') {
    if (range === 'stock' || range === 'all') {
      const priceData = getRangeForAttribute(filteredProducts, 'price');
      filtersData.price.min = priceData.min;
      filtersData.price.max = priceData.max;
    }

    if (range === 'price' || range === 'all') {
      const stockData = getRangeForAttribute(filteredProducts, 'stock');
      filtersData.stock.min = stockData.min;
      filtersData.stock.max = stockData.max;
    }

    window.history.replaceState({}, '', filtersData.getParams());
  }

  tiles.addEventListener('click', render);
  list.addEventListener('click', render);
  searchField.addEventListener('input', () => {
    resetRanges();
    const filteredProducts = filterProducts(filtersData, products);
    setRanges(filteredProducts);
    render();
  });

  resetFilters.addEventListener('click', () => {
    filtersData.reset();
    render.apply(resetFilters);
    window.history.replaceState({}, '', window.location.origin);
  });

  const categories = document.querySelectorAll<HTMLInputElement>('.checkbox__categories')!;
  const brands = document.querySelectorAll<HTMLInputElement>('.checkbox__brands')!;

  categories.forEach((element) => {
    element.addEventListener('input', () => {
      resetRanges();
      const filteredProducts = filterProducts(filtersData, products);
      setRanges(filteredProducts);
      render();
    });
  });

  brands.forEach((element) => {
    element.addEventListener('input', () => {
      resetRanges();
      const filteredProducts = filterProducts(filtersData, products);
      setRanges(filteredProducts);
      render();
    });
  });

  options.forEach((element) => {
    element.addEventListener('click', render);
  });

  render();
}

function setNumbers(products: Product[]): void {
  setByTheme(products, 'categories');
  setByTheme(products, 'brand');

  function setByTheme(products: Product[], theme: string): void {
    const numbers = document.querySelectorAll('.current_number_' + theme);

    const categories: string[] =
      theme === 'categories' ? products.map((item) => item.category) : products.map((item) => item.brand);

    numbers.forEach((number) => {
      let sum = 0;
      categories.forEach((category) => {
        if (number.id.includes(category)) {
          sum += 1;
        }
      });
      number.textContent = sum.toString();
    });
  }
}

function getRangeForAttribute(filteredProducts: Product[], attrName: 'price' | 'stock'): { min: number; max: number } {
  if (products.length === 0) {
    return { min: 0, max: 0 };
  }

  let min = Infinity;
  let max = -Infinity;

  filteredProducts.forEach((element) => {
    const attr: number = element[attrName];
    [min, max] = [Math.min(min, attr), Math.max(max, attr)];
  });

  return { min, max };
}
