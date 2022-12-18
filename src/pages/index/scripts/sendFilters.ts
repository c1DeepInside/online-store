import { Product } from "../../../data/interfaces";
import { FilterData } from "./interfaces";

export function sendFilters(products: Product[]): FilterData {
  const minMax: number[] = filterPrice();
  const min: number = Math.min.apply(null, minMax);
  const max: number = Math.max.apply(null, minMax);

  const filters: FilterData = {
    'price': {
      'min': min,
      'max': max,
    },
    'categories': filterCategories()
  }
  console.log(filters);
  return filters;
}

function filterCategories(): string[] {
  const checkedCategories: string[] = [];
  const categories: NodeListOf<HTMLInputElement> = document.querySelectorAll('.checkbox__categories')!;
  categories.forEach(element => {
    if (element.checked){
      checkedCategories.push(element.id);
    }
  });
  return checkedCategories;
}

function filterPrice(): number[] {
  const fromPrice: HTMLInputElement = document.querySelector('#fromInput')!;
  const toPrice: HTMLInputElement = document.querySelector('#toInput')!;

  const fromSlider: HTMLInputElement = document.querySelector('#from-Slider')!;
  const toSlider: HTMLInputElement = document.querySelector('#to-Slider')!;

  fromSlider.addEventListener('input', changeInput);
  toSlider.addEventListener('input', changeInput);
  
  function changeInput(): void {
    let min = Number(fromSlider.value);
    let max = Number(toSlider.value);
    if (min > max) {
      const save: number = min;
      min = max;
      max = save;
    }
    fromPrice.value = min.toString();
    toPrice.value = max.toString();
  }

  fromPrice.addEventListener('input', (): void => {
    if (Number(fromSlider.value) > Number(toSlider.value)) {
      toSlider.value = fromPrice.value;
    } else {
      fromSlider.value = fromPrice.value;
    }
    changeInput();
  });

  toPrice.addEventListener('input', (): void => {
    if (Number(fromSlider.value) < Number(toSlider.value)) {
      toSlider.value = toPrice.value;
    } else {
      fromSlider.value = toPrice.value;
    }
    changeInput();
  });

  return [Number(fromSlider.value), Number(toSlider.value)];
}