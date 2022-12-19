import { FilterData, RangeOptions } from "./interfaces";

export function getFiltersData(): FilterData {
  const filters: FilterData = {
    price: getSelectedPriceRange({ fromSilderId: '#fromInput', toSliderId: '#toInput', fromValueId: '#from-Slider', toValueId: '#to-Slider' }),
    get categories(): string[] {
      const checkedCategories: string[] = [];
      const categories = document.querySelectorAll<HTMLInputElement>('.checkbox__categories')!;
      categories.forEach(element => {
        if (element.checked){
          checkedCategories.push(element.id);
        }
      });

      return checkedCategories;
    },
    inStock: getSelectedPriceRange({ fromSilderId: '#fromInputStock', toSliderId: '#toInputStock', fromValueId: '#from-SliderStock', toValueId: '#to-SliderStock' }),
    get brand(): string[] {
      const checkedBrand: string[] = [];
      const brands = document.querySelectorAll<HTMLInputElement>('.checkbox__brands')!;
      brands.forEach(element => {
        if (element.checked){
          checkedBrand.push(element.id);
        }
      });

      return checkedBrand;
    },
  }
  return filters;
}

function getSelectedPriceRange({ fromSilderId, toSliderId, fromValueId, toValueId }: RangeOptions): { min: number, max: number } {
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
    }
  }

  const price = {
    get min(): number {
      return Math.min(+fromPrice.value, +toPrice.value);
    },
    set min(value: number) {
      fromPrice.value = value.toString();
    },
    get max(): number {
      return Math.max(+fromPrice.value, +toPrice.value);
    },
    set max(value: number) {
      toPrice.value = value.toString();
    }
  }

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