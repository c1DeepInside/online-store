import { products } from "../../../data/products";

export function calculateCart(): void {
  const totalProducts: HTMLSpanElement = document.querySelector('.total_products')!;
  const totalCost: HTMLSpanElement = document.querySelector('.total_cost')!;
  let prodCount: number = 0;
  let sum: number = 0;
  if (localStorage.getItem('onlineStoreCartIDs')) {
    let ids: string[] = localStorage.getItem('onlineStoreCartIDs')!.split(',');
    let count: string[] = localStorage.getItem('onlineStoreCartCount')!.split(',');
    if (ids[0] !== '') {
      ids.forEach((id, i) => {
        prodCount += Number(count[i]);
        products.forEach(product => {
          if (Number(id) === product.id) {
            sum += product.price * Number(count[i]);
          }
        });
      });
    }
  } 
  totalProducts.textContent = prodCount.toString();
  totalCost.textContent = sum.toString() + '₽';
}
