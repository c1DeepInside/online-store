import { products } from "../../../data/products";
import { Product } from "../../../data/interfaces";
import { renderGoods } from "./render";

export function minMax(): void {
  const price: number[] = products.map(item => item.price);

  const minPrice: number = Math.min.apply(null, price);
  const maxPrice: number = Math.max.apply(null, price);

  const fromPrice: HTMLInputElement = <HTMLInputElement>document.querySelector('#fromInput');
  const toPrice: HTMLInputElement = <HTMLInputElement>document.querySelector('#toInput');

  fromPrice.value = minPrice.toString();
  toPrice.value = maxPrice.toString();

  changeMinMax(fromPrice, minPrice, maxPrice);
  changeMinMax(toPrice, minPrice, maxPrice);

  const fromSlider: HTMLInputElement = <HTMLInputElement>document.querySelector('#from-Slider');
  const toSlider: HTMLInputElement = <HTMLInputElement>document.querySelector('#to-Slider');

  changeMinMax(fromSlider, minPrice, maxPrice);
  changeMinMax(toSlider, minPrice, maxPrice);

  fromSlider.value = minPrice.toString();
  toSlider.value = maxPrice.toString();

  fromSlider.addEventListener('input', changeInput);
  toSlider.addEventListener('input', changeInput);

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

  function changeInput(): void {
    let min: number = Number(fromSlider.value);
    let max: number = Number(toSlider.value);
    if (min > max) {
      const save: number = min;
      min = max;
      max = save;
    }

    fromPrice.value = min.toString();
    toPrice.value = max.toString();

    const filteredProducts: Product[] = products.filter(item => item.price >= min && item.price <= max);

    renderGoods(filteredProducts);
  }

  function changeStepInput(this: HTMLInputElement) {
    if (Number(fromSlider.value) > Number(toSlider.value)) {
      toSlider.value = this.value;
    } else {
      fromSlider.value = this.value;
    }
    changeInput();
  }
}

function changeMinMax(input: HTMLInputElement, min: number, max: number): void {
  input.min = min.toString();
  input.max = max.toString();
}



