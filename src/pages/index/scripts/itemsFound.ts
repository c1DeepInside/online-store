import { Product } from "../../../data/interfaces";

export function itemsFound(products: Product[]): void {
  const foundText: HTMLSpanElement = document.querySelector('.found__number')!;

  foundText.textContent = products.length.toString();
}