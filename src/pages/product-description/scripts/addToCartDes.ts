import { calculateCart } from "../../index/scripts/calculateCart";

export function addToCartDes(): void {
  const btn: HTMLButtonElement = document.querySelector('.description-btn')!;
  const id: string = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

  btn.addEventListener('click', (): void => {
    if (localStorage.getItem('onlineStoreCartIDs')) {
      let ids: string[] = localStorage.getItem('onlineStoreCartIDs')!.split(',');
      let count: string[] = localStorage.getItem('onlineStoreCartCount')!.split(',');
      if (ids.includes(id)) {
        count.splice(ids.indexOf(id), 1);
        ids.splice(ids.indexOf(id), 1);
        localStorage.setItem('onlineStoreCartIDs', ids.join(','));
        localStorage.setItem('onlineStoreCartCount', count.join(','));
        btn.innerHTML = 'ADD TO CART';
      } else {
        localStorage.setItem('onlineStoreCartIDs', localStorage.getItem('onlineStoreCartIDs') + ',' + id);
        localStorage.setItem('onlineStoreCartCount', localStorage.getItem('onlineStoreCartCount') + ',' + 1);
        btn.innerHTML = 'DROP FROM CART';
      }
    } else {
      localStorage.setItem('onlineStoreCartIDs', id);
      localStorage.setItem('onlineStoreCartCount', '1');
      btn.innerHTML = 'DROP FROM CART';
    }
    calculateCart();
  });
}