import { Product } from "../../../data/interfaces";

export function renderProduct(product: Product) {
  const descriptionBlock: HTMLDivElement = document.querySelector('.description__inner')!;

  const blockWithImg: HTMLDivElement = document.createElement('div');
  blockWithImg.classList.add('description__images');
  descriptionBlock.appendChild(blockWithImg);

  const mainImg: HTMLImageElement = document.createElement('img');
  mainImg.classList.add('main-img');
  mainImg.src = product.thumbnail;
  mainImg.alt = product.category;
  blockWithImg.appendChild(mainImg);
  mainImg.addEventListener('click', () => {
    const body = document.querySelector('body')!;

    const popup: HTMLDivElement = document.createElement('div');
    popup.classList.add('popup');
    body.appendChild(popup);

    const popupImg: HTMLImageElement = document.createElement('img')!;
    popupImg.classList.add('popup__img');
    popupImg.src = mainImg.src;
    popupImg.alt = mainImg.alt;
    popup.appendChild(popupImg);

    const popupX: HTMLDivElement = document.createElement('div');
    popupX.innerHTML = 'x';
    popupX.classList.add('popup__x');
    popup.appendChild(popupX);

    popupX.addEventListener('click', () => {
      popup.remove();
    });
  });

  const smallImages: HTMLDivElement = document.createElement('div');
  smallImages.classList.add('description__mini-img');
  blockWithImg.appendChild(smallImages);

  for (let i = 0; i < product.images.length; i++) {
    const miniImg: HTMLImageElement = document.createElement('img');
    miniImg.classList.add('mini-img');
    miniImg.src = product.images[i];
    miniImg.alt = product.category;
    miniImg.addEventListener('click', () => {
      mainImg.src = miniImg.src;
    });
    smallImages.appendChild(miniImg);
  }

  const descriptionProduct: HTMLDivElement = document.createElement('div');
  descriptionProduct.classList.add('description__about-product');
  descriptionBlock.appendChild(descriptionProduct);

  const descriptionTitle: HTMLHeadingElement = document.createElement('h1');
  descriptionTitle.classList.add('product-title');
  descriptionTitle.innerHTML = product.title;
  descriptionProduct.appendChild(descriptionTitle);

  const categoryBlock: HTMLDivElement = document.createElement('div');
  categoryBlock.classList.add('category');
  descriptionProduct.appendChild(categoryBlock);

  const categoryName: HTMLDivElement = document.createElement('div');
  categoryName.classList.add('category__name');
  categoryBlock.appendChild(categoryName);

  const categoryInfo: HTMLDivElement = document.createElement('div');
  categoryInfo.classList.add('category__info');
  categoryBlock.appendChild(categoryInfo);

  const fieldProducKey = [
    { name: 'category', value: product.category },
    { name: 'price', value: `${product.price.toString()} ₽` },
    { name: 'in stock', value: product.stock.toString() },
    { name: 'about product', value: product.description }
  ];

  fieldProducKey.forEach((item) => {
    const categoryNameItem: HTMLDivElement = document.createElement('div');
    categoryNameItem.classList.add('category__name-item');
    categoryNameItem.innerHTML = item.name;
    categoryName.appendChild(categoryNameItem);

    const categoryInfoItem: HTMLDivElement = document.createElement('div');
    categoryInfoItem.classList.add('category__info-item');
    categoryInfoItem.innerHTML = item.value;
    categoryInfo.appendChild(categoryInfoItem);
  });

  const descriptionBtn: HTMLButtonElement = document.createElement('button');
  descriptionBtn.innerHTML = 'ADD TO CART';
  descriptionBtn.classList.add('description-btn');
  descriptionProduct.appendChild(descriptionBtn);
}