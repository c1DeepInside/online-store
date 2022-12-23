

export function addToCard(): void {
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
  }
}