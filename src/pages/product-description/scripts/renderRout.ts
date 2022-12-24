import { Product } from "../../../data/interfaces";

export function renderRouting(product: Product) {
  const descriptionBlock: HTMLDivElement = document.querySelector('.rout')!;

  const shop: HTMLAnchorElement = document.createElement('a');
  shop.classList.add('rout__item');
  shop.innerHTML = 'Shop';
  shop.href = '/';
  descriptionBlock.appendChild(shop);

  const arrow: HTMLDivElement = document.createElement('div');
  arrow.classList.add('rout__item');
  arrow.innerHTML = '>>>';
  descriptionBlock.appendChild(arrow);

  const category: HTMLAnchorElement = document.createElement('a');
  category.classList.add('rout__item');
  category.innerHTML = product.category;
  descriptionBlock.appendChild(category);

  const arrow2: HTMLDivElement = document.createElement('div');
  arrow2.classList.add('rout__item');
  arrow2.innerHTML = '>>>';
  descriptionBlock.appendChild(arrow2);

  const brand: HTMLAnchorElement = document.createElement('a');
  brand.classList.add('rout__item');
  brand.innerHTML = product.brand;
  descriptionBlock.appendChild(brand);

  const arrow3: HTMLDivElement = document.createElement('div');
  arrow3.classList.add('rout__item');
  arrow3.innerHTML = '>>>';
  descriptionBlock.appendChild(arrow3);

  const name: HTMLAnchorElement = document.createElement('a');
  name.classList.add('rout__item');
  const nameCut = product.title.split(' ').splice(0, 3).join(' ');
  name.innerHTML = nameCut;
  descriptionBlock.appendChild(name);
}