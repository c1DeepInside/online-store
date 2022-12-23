import { Product } from "../../../data/interfaces";

export function renderCart(products: Product[]) {
  let ids: string[] = localStorage.getItem('onlineStoreCartIDs')!.split(',');
  const itemWrap: HTMLDivElement = document.querySelector('.cart_items_wrap')!;
  ids.forEach(id => {
    products.forEach(product => {
      if (Number(id) === product.id) {
        const item: HTMLDivElement = document.createElement('div');
        item.classList.add('item_temp');
        itemWrap.appendChild(item);

        const imgWrap: HTMLDivElement = document.createElement('div');
        imgWrap.classList.add('img_wrap');
        item.appendChild(imgWrap);

        const itemImg: HTMLImageElement = document.createElement('img');
        itemImg.classList.add('item_img');
        itemImg.alt = product.category;
        itemImg.src = product.thumbnail;
        imgWrap.appendChild(itemImg);

        const itemInfoWrap: HTMLDivElement = document.createElement('div');
        itemInfoWrap.classList.add('item_info_wrap');
        item.appendChild(itemInfoWrap);

        const itemName: HTMLParagraphElement = document.createElement('p');
        itemName.classList.add('item_name');
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
        itemCountMinus.textContent = '-';
        itemCountParam.appendChild(itemCountMinus);

        const itemCount: HTMLInputElement = document.createElement('input');
        itemCount.type = 'number';
        itemCount.id = 'item_count_' + product.id.toString();
        itemCount.value = '1';
        itemCount.classList.add('item_count');
        itemCountParam.appendChild(itemCount);

        const itemCountPlus: HTMLButtonElement = document.createElement('button');
        itemCountPlus.classList.add('item_count_plus');
        itemCountPlus.textContent = '+';
        itemCountParam.appendChild(itemCountPlus);

        const itemCost: HTMLParagraphElement = document.createElement('p');
        itemCost.classList.add('item_cost');
        itemCost.textContent = product.price.toString() + '₽';
        itemCountWrap.appendChild(itemCost);
      }
    });
  });
}