import { Product } from '../../../data/interfaces';

export function sortData(products: Product[], sortV: number): Product[] {
  let arr = [];
  switch (sortV) {
    case 0:
      arr = products.sort((a: Product, b: Product): number => a.price - b.price);
      break;
    case 1:
      arr = products.sort((a: Product, b: Product): number => b.price - a.price);
      break;
    case 2:
      arr = products.sort((a: Product, b: Product): number => a.stock - b.stock);
      break;
    case 3:
      arr = products.sort((a: Product, b: Product): number => b.stock - a.stock);
      break;
    default:
      arr = products;
      break;
  }
  return arr;
}
