import { FilterParams } from './enums';
import { FilterData, RangeOptions } from './interfaces';
import { sortS, sortVariable } from './sortProducts';

export function getFiltersData(): FilterData {
  const filters: FilterData = {
    price: getSelectedPriceRange({
      fromSilderId: '#fromInput',
      toSliderId: '#toInput',
      fromValueId: '#from-Slider',
      toValueId: '#to-Slider',
    }),
    get categories(): string[] {
      const checkedCategories: string[] = [];
      const categories = document.querySelectorAll<HTMLInputElement>('.checkbox__categories')!;
      categories.forEach((element) => {
        if (element.checked) {
          checkedCategories.push(element.id);
        }
      });

      return checkedCategories;
    },
    stock: getSelectedPriceRange({
      fromSilderId: '#fromInputStock',
      toSliderId: '#toInputStock',
      fromValueId: '#from-SliderStock',
      toValueId: '#to-SliderStock',
    }),
    get brand(): string[] {
      const checkedBrand: string[] = [];
      const brands = document.querySelectorAll<HTMLInputElement>('.checkbox__brands')!;
      brands.forEach((element) => {
        if (element.checked) {
          checkedBrand.push(element.id);
        }
      });

      return checkedBrand;
    },
    get search(): string {
      const searchField = document.querySelector<HTMLInputElement>('.search__input')!;
      return searchField.value;
    },
    set search(value: string) {
      const searchField = document.querySelector<HTMLInputElement>('.search__input')!;
      searchField.value = value;
    },
    view: getView(),
    sorting: sortS[sortVariable],
    getParams(): string {
      const params = new URLSearchParams();

      params.append('priceMin', this.price.min.toString());
      params.append('priceMax', this.price.max.toString());

      params.append('StockMin', this.stock.min.toString());
      params.append('StockMax', this.stock.max.toString());

      params.append('search', this.search.toString());

      if (this.brand.length > 0) {
        params.append('brand', this.brand.join(','));
      }

      if (this.categories.length > 0) {
        params.append('categories', this.categories.join(','));
      }

      params.append('view', this.view);

      params.append('sorting', this.sorting);

      return '?' + params.toString();
    },
    setParams(paramsString: string) {
      const params = new URLSearchParams(paramsString);

      for (const [key, value] of params.entries()) {
        if (key == FilterParams.priceMin) {
          this.price.min = +value;
        }

        if (key == FilterParams.priceMax) {
          this.price.max = +value;
        }

        if (key == FilterParams.stockMin) {
          this.stock.min = +value;
        }

        if (key == FilterParams.stockMax) {
          this.stock.max = +value;
        }

        if (key == FilterParams.search) {
          this.search = value;
        }

        if (key == FilterParams.view) {
          this.view = value;
        }

        if (key == FilterParams.sorting) {
          this.sorting = value;
        }

        if (key == FilterParams.brand) {
          const brands = document.querySelectorAll<HTMLInputElement>('.checkbox__brands');
          brands.forEach((element) => {
            const elemParent = element.parentNode!;
            const elemName: HTMLSpanElement = elemParent.querySelector('.brand_name')!;
            if (value.includes(elemName.textContent!)) {
              element.checked = true;
            }
          });
        }

        if (key == FilterParams.categories) {
          const categories = document.querySelectorAll<HTMLInputElement>('.checkbox__categories');
          categories.forEach((element) => {
            const elemParent = element.parentNode!;
            const elemName: HTMLSpanElement = elemParent.querySelector('.categories_name')!;
            if (value.includes(elemName.textContent!)) {
              element.checked = true;
            }
          });
        }
      }
    },
    reset() {
      const checkboxes = document.querySelectorAll<HTMLInputElement>('.checkbox');
      checkboxes.forEach((element) => {
        element.checked = false;
      });
      const maxPrice = document.querySelector<HTMLInputElement>('#from-Slider')!;
      const maxInStock = document.querySelector<HTMLInputElement>('#from-SliderStock')!;
      this.search = '';
      this.price.min = 0;
      this.price.max = +maxPrice.max;
      this.stock.min = 0;
      this.stock.max = +maxInStock.max;
    },
  };
  return filters;
}

function getView(): string {
  const list: HTMLDivElement = document.querySelector('.view__list_wrap')!;

  if (list.classList.contains('active_view')) {
    return 'list';
  }

  return 'tiles';
}

function getSelectedPriceRange({
  fromSilderId,
  toSliderId,
  fromValueId,
  toValueId,
}: RangeOptions): { min: number; max: number } {
  const fromPrice = document.querySelector<HTMLInputElement>(fromValueId)!;
  const toPrice = document.querySelector<HTMLInputElement>(toValueId)!;

  const fromSlider = document.querySelector<HTMLInputElement>(fromSilderId)!;
  const toSlider = document.querySelector<HTMLInputElement>(toSliderId)!;

  const slider = {
    get min(): number {
      return +fromSlider.value;
    },
    set min(value: number) {
      fromSlider.value = value.toString();
    },
    get max(): number {
      return +toSlider.value;
    },
    set max(value: number) {
      toSlider.value = value.toString();
    },
  };

  const price = {
    get min(): number {
      return Math.min(+fromPrice.value, +toPrice.value);
    },
    set min(value: number) {
      slider.min = value;
      fromPrice.value = value.toString();
    },
    get max(): number {
      return Math.max(+fromPrice.value, +toPrice.value);
    },
    set max(value: number) {
      slider.max = value;
      toPrice.value = value.toString();
    },
  };

  fromSlider.addEventListener('input', swapPriceOnOverlap);
  toSlider.addEventListener('input', swapPriceOnOverlap);

  fromPrice.addEventListener('input', swapSlidersOnOverlap);
  toPrice.addEventListener('input', swapSlidersOnOverlap);

  function swapPriceOnOverlap() {
    [price.min, price.max] = [Math.min(slider.min, slider.max), Math.max(slider.min, slider.max)];
  }

  function swapSlidersOnOverlap() {
    [slider.min, slider.max] = [Math.min(price.min, price.max), Math.max(price.min, price.max)];
  }

  return price;
}
