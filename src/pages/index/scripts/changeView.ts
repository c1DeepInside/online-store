export function changeView() {
  const tiles: HTMLDivElement = document.querySelector('.view__tiles_wrap')!;
  const list: HTMLDivElement = document.querySelector('.view__list_wrap')!;
  const goodsItem = document.querySelectorAll<HTMLDivElement>('.goods__item')!;
  const goodsItemImg = document.querySelectorAll<HTMLDivElement>('.goods__item-img')!;
  const goodsItemText = document.querySelectorAll<HTMLDivElement>('.goods__item-text')!;
  const goodsImg = document.querySelectorAll<HTMLDivElement>('.goods-img')!;

  let view: string = 'tiles'; 

  const params = new URLSearchParams(window.location.search);

  for (const [key, value] of params.entries()) {
    if (key == 'view') {
      view = value;
    }
  }

  if (view === 'list') {
    renderList();
  } else {
    renderTiles();
  }

  tiles.addEventListener('click', renderTiles);

  list.addEventListener('click', renderList);

  function renderTiles() {
    tiles.classList.add('active_view');
    list.classList.remove('active_view');

    for (let i = 0; i < goodsItem.length; i++) {
      goodsItem[i].classList.remove('goods__item-list');
      goodsItemImg[i].classList.remove('goods__item-img-list');
      goodsItemText[i].classList.remove('goods__item-text-list');
      goodsImg[i].classList.remove('goods-img-list');
    }
  }

  function renderList() {
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