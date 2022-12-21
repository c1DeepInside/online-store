export function changeView(): void {
  const tiles: HTMLDivElement = document.querySelector('.view__tiles_wrap')!;
  const list: HTMLDivElement = document.querySelector('.view__list_wrap')!;
  const goodsItem = document.querySelectorAll<HTMLDivElement>('.goods__item')!;
  const goodsItemImg = document.querySelectorAll<HTMLDivElement>('.goods__item-img')!;
  const goodsItemText = document.querySelectorAll<HTMLDivElement>('.goods__item-text')!;
  const goodsImg = document.querySelectorAll<HTMLDivElement>('.goods-img')!;

  if (list.classList.contains('active_view')){
    renderList();
  }

  tiles.addEventListener('click', renderTiles);

  list.addEventListener('click', renderList);

  function renderTiles(): void {
    tiles.classList.add('active_view');
    list.classList.remove('active_view');

    for (let i = 0; i < goodsItem.length; i++) {
      goodsItem[i].classList.remove('goods__item-list');
      goodsItemImg[i].classList.remove('goods__item-img-list');
      goodsItemText[i].classList.remove('goods__item-text-list');
      goodsImg[i].classList.remove('goods-img-list');
    }
  }

  function renderList(): void {
    list.classList.add('active_view');
    tiles.classList.remove('active_view');

    for (let i = 0; i < goodsItem.length; i++) {
      goodsItem[i].classList.add('goods__item-list');
      goodsItemImg[i].classList.add('goods__item-img-list');
      goodsItemText[i].classList.add('goods__item-text-list');
      goodsImg[i].classList.add('goods-img-list');
    }
  }
}