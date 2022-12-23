import { products } from "../../../data/products";


export function addToCart(): void {
  const cartBtn = document.querySelectorAll<HTMLDivElement>('.price__icon')!;

  cartBtn.forEach(element => {
    element.addEventListener('click', test)
  });


  function test(this: HTMLDivElement): void {
    const img: HTMLSpanElement = this.querySelector('.cart')!;

    const id: string = this.id.split('_')[this.id.split('_').length - 1];
    if (localStorage.getItem('onlineStoreCartIDs')) {
      let ids: string[] = localStorage.getItem('onlineStoreCartIDs')!.split(',');
      if (ids.includes(id)) {
        ids.splice(ids.indexOf(id), 1);
        localStorage.setItem('onlineStoreCartIDs', ids.join(','));
        img.classList.remove('trash');
      } else {
        localStorage.setItem('onlineStoreCartIDs', localStorage.getItem('onlineStoreCartIDs') + ',' + id);
        img.classList.add('trash');
      }
    } else {
      localStorage.setItem('onlineStoreCartIDs', id);
      img.classList.add('trash');
    }
    calculateCart();
  }
}

export function checkInCart(id: number) {
  const ids: string[] = localStorage.getItem('onlineStoreCartIDs')!.split(',');
  calculateCart();
  return ids.includes(id.toString());
}


export function calculateCart() {
  let ids: string[] = localStorage.getItem('onlineStoreCartIDs')!.split(',');
  const totalProducts: HTMLSpanElement = document.querySelector('.total_products')!;
  const totalCost: HTMLSpanElement = document.querySelector('.total_cost')!;
  if (ids[0] === '') {
    totalProducts.textContent = '0';
    totalCost.textContent = '0₽';
  } else {
    totalProducts.textContent = ids.length.toString();
    let sum: number = 0;
    ids.forEach(id => {
      products.forEach(product => {
        if (Number(id) === product.id) {
          sum += product.price;
        }
      });
    });
    totalCost.textContent = sum.toString() + '₽';
  }
}
