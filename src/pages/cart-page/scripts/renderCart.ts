import { Product } from "../../../data/interfaces";
import { calculateCart } from "../../index/scripts/calculateCart";
import { changeCount, changeSummary } from "./changeCount";

export function renderCart(products: Product[]) {
  const itemWrap: HTMLDivElement = document.querySelector('.cart_items_wrap')!;
  itemWrap.innerHTML = '';
  if (localStorage.getItem('onlineStoreCartIDs')) {
    let ids: string[] = localStorage.getItem('onlineStoreCartIDs')!.split(',');
    let count: string[] = localStorage.getItem('onlineStoreCartCount')!.split(','); 
    ids.forEach((id, i) => {
      products.forEach(product => {
        if (Number(id) === product.id) {
          const item: HTMLDivElement = document.createElement('div');
          item.classList.add('item_temp');
          itemWrap.appendChild(item);

          const imgWrap: HTMLAnchorElement = document.createElement('a');
          imgWrap.classList.add('img_wrap');
          imgWrap.href = `./product/${product.id}`;
          item.appendChild(imgWrap);

          const itemImg: HTMLImageElement = document.createElement('img');
          itemImg.classList.add('item_img');
          itemImg.alt = product.category;
          itemImg.src = product.thumbnail;
          imgWrap.appendChild(itemImg);

          const itemInfoWrap: HTMLDivElement = document.createElement('div');
          itemInfoWrap.classList.add('item_info_wrap');
          item.appendChild(itemInfoWrap);

          const itemName: HTMLAnchorElement = document.createElement('a');
          itemName.classList.add('item_name');
          itemName.href = `./product/${product.id}`;
          itemName.textContent = product.title;
          itemInfoWrap.appendChild(itemName);

          const itemDes: HTMLParagraphElement = document.createElement('p');
          itemDes.classList.add('item_description');
          itemDes.textContent = product.description;
          itemInfoWrap.appendChild(itemDes);

          const itemCountWrap: HTMLDivElement = document.createElement('div');
          itemCountWrap.classList.add('item_count_wrap');
          item.appendChild(itemCountWrap);

          const itemStock: HTMLParagraphElement = document.createElement('p');
          itemStock.classList.add('item_stock');
          itemStock.textContent = 'Stock: ';
          itemCountWrap.appendChild(itemStock);

          const itemStockNumber: HTMLSpanElement = document.createElement('span');
          itemStockNumber.classList.add('item_stock_number');
          itemStockNumber.textContent = product.stock.toString();
          itemStock.appendChild(itemStockNumber);

          const itemCountParam: HTMLDivElement = document.createElement('div');
          itemCountParam.classList.add('item_count_param');
          itemCountWrap.appendChild(itemCountParam);

          const itemCountMinus: HTMLButtonElement = document.createElement('button');
          itemCountMinus.classList.add('item_count_minus');
          itemCountMinus.id = 'item_count_minus_' + product.id.toString();
          itemCountMinus.textContent = '-';
          itemCountParam.appendChild(itemCountMinus);

          const itemCount: HTMLInputElement = document.createElement('input');
          itemCount.type = 'number';
          itemCount.id = 'item_count_' + product.id.toString();
          itemCount.value = count[i];
          itemCount.classList.add('item_count');
          itemCount.max = product.stock.toString();
          itemCount.min = '0';
          itemCountParam.appendChild(itemCount);

          const itemCountPlus: HTMLButtonElement = document.createElement('button');
          itemCountPlus.classList.add('item_count_plus');
          itemCountPlus.id = 'item_count_plus_' + product.id.toString();
          itemCountPlus.textContent = '+';
          itemCountParam.appendChild(itemCountPlus);

          putBtnMinus(itemCount, itemCountMinus, itemCountPlus, product);

          putInputRange(itemCount, product);

          const itemCost: HTMLParagraphElement = document.createElement('p');
          itemCost.classList.add('item_cost');
          itemCost.textContent = product.price.toString() + '₽';
          itemCountWrap.appendChild(itemCost);
        }
      });
    });
  }
  changeCount();
  calculateCart();
  changeSummary();
}

function putBtnMinus(elem: HTMLInputElement, btnMinus: HTMLButtonElement, btnPlus: HTMLButtonElement, product: Product): void {
  btnMinus.addEventListener('click', (): void => {
    elem.value = (Number(elem.value) - 1).toString();
    if (Number(elem.value) < 0) {
      elem.value = '0';
    }
  });

  btnPlus.addEventListener('click', (): void => {
    elem.value = (Number(elem.value) + 1).toString();
    if (Number(elem.value) > product.stock) {
      elem.value = product.stock.toString();
    }
  });
}

function putInputRange(elem: HTMLInputElement, product: Product) {
  elem.addEventListener('input', (): void => {
    if (Number(elem.value) < 1) {
      elem.value = '1';
    }
    if (Number(elem.value) > product.stock) {
      elem.value = product.stock.toString();
    }
    elem.value = elem.value.replace(/\D/g, '');
  });
}