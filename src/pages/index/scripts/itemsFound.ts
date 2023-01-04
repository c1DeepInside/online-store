import { Product } from '../../../data/interfaces';

export function itemsFound(products: Product[]) {
  const foundText: HTMLSpanElement = document.querySelector('.found__number')!;
  const catalog: HTMLSpanElement = document.querySelector('.catalog__goods')!;

  foundText.textContent = products.length.toString();

  if (foundText.textContent === '0') {
    catalog.innerHTML = 'No products found';
    catalog.classList.add('no-found');
  } else {
    catalog.classList.remove('no-found');
  }
}
