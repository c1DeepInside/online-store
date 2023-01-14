import { assertUnreachable } from '../../../common/scripts/utils';
import { Product } from '../../../data/interfaces';
import { products } from '../../../data/products';
import { copyFilters } from './copyFilters';
import { CheckboxTheme } from './enums';
import { RangeOptions } from './interfaces';

export function showFilters(products: Product[]) {
  copyFilters();

  openModal();

  changeSmallView();

  renderCheckboxsFilters(products, CheckboxTheme.categories, '.filters__categories');
  renderCheckboxsFilters(products, CheckboxTheme.brand, '.filters__brand');

  renderInputsRange(products, 'price', {
    fromSilderId: '#fromInput',
    toSliderId: '#toInput',
    fromValueId: '#from-Slider',
    toValueId: '#to-Slider',
  });
  renderInputsRange(products, 'inStock', {
    fromSilderId: '#fromInputStock',
    toSliderId: '#toInputStock',
    fromValueId: '#from-SliderStock',
    toValueId: '#to-SliderStock',
  });
}

function changeSmallView() {
  const tiles: HTMLDivElement = document.querySelector('.view__tiles_wrap')!;
  window.addEventListener('resize', (): void => {
    if (document.documentElement.clientWidth <= 751) {
      if (!tiles.classList.contains('active_view')) {
        tiles.click();
      }
    }
  });
}

function openModal(): void {
  const show: HTMLButtonElement = document.querySelector('.show__filters')!;
  const filters: HTMLDivElement = document.querySelector('.filters')!;
  const crossFilters: HTMLSpanElement = document.querySelector('.hide__filters')!;

  show.addEventListener('click', (): void => {
    filters.classList.add('active__filters');
  });

  crossFilters.addEventListener('click', (): void => {
    filters.classList.remove('active__filters');
  });
}

function renderInputsRange(
  products: Product[],
  filterElem: string,
  { fromSilderId, toSliderId, fromValueId, toValueId }: RangeOptions
) {
  const selectedCategory: number[] =
    filterElem === 'price' ? products.map((item) => item.price) : products.map((item) => item.stock);

  const minNumber = 0;
  const maxNumber: number = Math.max.apply(null, selectedCategory);

  const fromPrice: HTMLInputElement = document.querySelector(fromSilderId)!;
  const toPrice: HTMLInputElement = document.querySelector(toSliderId)!;

  fromPrice.value = minNumber.toString();
  toPrice.value = maxNumber.toString();

  changeMinMax(fromPrice, minNumber, maxNumber);
  changeMinMax(toPrice, minNumber, maxNumber);

  const fromSlider = document.querySelector<HTMLInputElement>(fromValueId)!;
  const toSlider = document.querySelector<HTMLInputElement>(toValueId)!;

  changeMinMax(fromSlider, minNumber, maxNumber);
  changeMinMax(toSlider, minNumber, maxNumber);

  fromSlider.value = minNumber.toString();
  toSlider.value = maxNumber.toString();

  function changeMinMax(input: HTMLInputElement, min: number, max: number) {
    input.min = min.toString();
    input.max = max.toString();
  }
}

const CHECKBOX_CATEGORIES_CLASS = 'checkbox__categories';
const CHECKBOX_BRANDS_CLASS = 'checkbox__brands';

function renderCheckboxsFilters(products: Product[], theme: CheckboxTheme, themeBlock: string) {
  let categories: string[] =
    theme === CheckboxTheme.categories ? products.map((item) => item.category) : products.map((item) => item.brand);
  const classInput = theme === CheckboxTheme.categories ? CHECKBOX_CATEGORIES_CLASS : CHECKBOX_BRANDS_CLASS;
  categories = [...new Set(categories)];

  categories.sort((a: string, b: string): number => findMax(b, theme) - findMax(a, theme));

  const filterCategories: HTMLDivElement = document.querySelector(themeBlock)!;

  categories.forEach((category) => {
    const filterItem: HTMLLabelElement = document.createElement('label');
    filterItem.classList.add('filters__theme-item');

    const categoryName: HTMLSpanElement = document.createElement('span');
    categoryName.classList.add(theme + '_name');
    categoryName.innerHTML = category;
    filterItem.appendChild(categoryName);

    const inputCheckbox: HTMLInputElement = document.createElement('input');
    inputCheckbox.classList.add('checkbox');
    inputCheckbox.classList.add(classInput);
    inputCheckbox.id = category;
    inputCheckbox.type = 'checkbox';
    filterItem.appendChild(inputCheckbox);

    const inputCheckMark: HTMLSpanElement = document.createElement('span');
    inputCheckMark.classList.add('checkmark');
    filterItem.appendChild(inputCheckMark);

    const currNumber: HTMLSpanElement = document.createElement('span');
    currNumber.classList.add('current_number_' + theme);
    currNumber.id = 'curr_' + category;
    currNumber.textContent = findMax(category, theme).toString();
    filterItem.appendChild(currNumber);

    const maxNumber: HTMLSpanElement = document.createElement('span');
    maxNumber.classList.add('max_number');

    maxNumber.textContent = '/' + findMax(category, theme).toString();
    filterItem.appendChild(maxNumber);

    filterCategories.appendChild(filterItem);
  });
}

function findMax(category: string, theme: CheckboxTheme): number {
  let max = 0;
  products.forEach((elem) => {
    switch (theme) {
      case CheckboxTheme.categories:
        if (elem.category === category) {
          max++;
        }
        break;
      case CheckboxTheme.brand:
        if (elem.brand === category) {
          max++;
        }
        break;
      default:
        return assertUnreachable(theme);
    }
  });
  return max;
}
