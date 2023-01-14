import { Product } from '../../../data/interfaces';
import { cartItems } from '../utils';

class CartProduct {
  public htmlItem?: HTMLDivElement;
  private amountHtml?: HTMLInputElement;

  private subscribers: ((product: CartProduct) => void)[] = [];

  constructor(private product: Product) {}

  public get amount(): number {
    if (this.amountHtml == null) {
      return 1;
    }

    return +this.amountHtml.value;
  }

  public set amount(value: number) {
    if (this.amountHtml == null) {
      return;
    }

    if (value > this.product.stock) {
      value = this.product.stock;
    }

    cartItems.set(this.product.id, value);
    this.amountHtml.value = value.toString();

    this.subscribers?.forEach((callback) => {
      callback(this);
    });
  }

  public get totalPrice(): number {
    return this.product.price * this.amount;
  }

  public onChange(callback: (product: CartProduct) => void) {
    this.subscribers.push(callback);
  }

  public destroy() {
    cartItems.del(this.product.id);
    this.htmlItem?.remove();
  }

  public createHtmlElement(): HTMLDivElement {
    this.htmlItem = document.createElement('div');
    this.htmlItem.classList.add('item_temp');

    const itemId: HTMLDivElement = document.createElement('div');
    itemId.classList.add('item-id');
    this.htmlItem.appendChild(itemId);

    const imgWrap: HTMLAnchorElement = document.createElement('a');
    imgWrap.classList.add('img_wrap');
    imgWrap.href = `./product/${this.product.id}`;
    this.htmlItem.appendChild(imgWrap);

    const itemImg: HTMLImageElement = document.createElement('img');
    itemImg.classList.add('item_img');
    itemImg.alt = this.product.category;
    itemImg.src = this.product.thumbnail;
    imgWrap.appendChild(itemImg);

    const itemInfoWrap: HTMLDivElement = document.createElement('div');
    itemInfoWrap.classList.add('item_info_wrap');
    this.htmlItem.appendChild(itemInfoWrap);

    const itemName: HTMLAnchorElement = document.createElement('a');
    itemName.classList.add('item_name');
    itemName.href = `./product/${this.product.id}`;
    itemName.textContent = this.product.title;
    itemInfoWrap.appendChild(itemName);

    const itemDes: HTMLParagraphElement = document.createElement('p');
    itemDes.classList.add('item_description');
    itemDes.textContent = this.product.description;
    itemInfoWrap.appendChild(itemDes);

    const itemCountWrap: HTMLDivElement = document.createElement('div');
    itemCountWrap.classList.add('item_count_wrap');
    this.htmlItem.appendChild(itemCountWrap);

    const itemStock: HTMLParagraphElement = document.createElement('p');
    itemStock.classList.add('item_stock');
    itemStock.textContent = 'Stock: ';
    itemCountWrap.appendChild(itemStock);

    const itemStockNumber: HTMLSpanElement = document.createElement('span');
    itemStockNumber.classList.add('item_stock_number');
    itemStockNumber.textContent = this.product.stock.toString();
    itemStock.appendChild(itemStockNumber);

    const itemCountParam: HTMLDivElement = document.createElement('div');
    itemCountParam.classList.add('item_count_param');
    itemCountWrap.appendChild(itemCountParam);

    const itemCountMinus: HTMLButtonElement = document.createElement('button');
    itemCountMinus.classList.add('item_count_minus');
    itemCountMinus.id = 'item_count_minus_' + this.product.id.toString();
    itemCountMinus.textContent = '-';
    itemCountParam.appendChild(itemCountMinus);

    this.amountHtml = document.createElement('input');
    this.amountHtml.type = 'number';
    this.amountHtml.id = 'item_count_' + this.product.id.toString();
    this.amountHtml.value = cartItems.get(this.product.id).toString();
    this.amountHtml.classList.add('item_count');
    this.amountHtml.max = this.product.stock.toString();
    this.amountHtml.min = '0';
    this.amountHtml.disabled = true;

    itemCountParam.appendChild(this.amountHtml);

    const itemCountPlus: HTMLButtonElement = document.createElement('button');
    itemCountPlus.classList.add('item_count_plus');
    itemCountPlus.id = 'item_count_plus_' + this.product.id.toString();
    itemCountPlus.textContent = '+';
    itemCountParam.appendChild(itemCountPlus);

    const itemCost: HTMLParagraphElement = document.createElement('p');
    itemCost.classList.add('item_cost');
    itemCost.textContent = `${this.totalPrice}₽`;
    itemCountWrap.appendChild(itemCost);

    itemCountMinus.addEventListener('click', () => {
      this.amount -= 1;
      itemCost.textContent = `${this.product.price * this.amount}₽`;
    });

    itemCountPlus.addEventListener('click', () => {
      this.amount += 1;
      itemCost.textContent = `${this.product.price * this.amount}₽`;
    });

    return this.htmlItem;
  }
}

export class Cart {
  public products: CartProduct[] = [];
  private itemWrap: HTMLDivElement = document.querySelector('.cart_items_wrap')!;

  private subscribers: (() => void)[] = [];

  constructor(products: Product[]) {
    this.createProducts(products);
  }

  public onChange(callback: () => void) {
    this.subscribers.push(callback);
  }

  public get itemsCount(): number {
    return this.products.reduce((acc, cartProduct) => acc + cartProduct.amount, 0);
  }

  public get totalPrice(): number {
    return this.products.reduce((acc, cartProduct) => acc + cartProduct.totalPrice, 0);
  }

  public clear() {
    this.products.forEach((item) => {
      item.destroy();
    });
    this.products = [];
    this.subscribers.forEach((callback) => {
      callback();
    });
  }

  private createProducts(products: Product[]) {
    products.forEach((product) => {
      const cartProduct = new CartProduct(product);
      cartProduct.onChange((product) => this.onProductChange(product));

      const productHtml = cartProduct.createHtmlElement();
      this.itemWrap.appendChild(productHtml);
      this.products.push(cartProduct);
    });

    this.updateProductIndexes();
  }

  private updateProductIndexes() {
    this.products.forEach((product, idx) => {
      const itemId = product.htmlItem?.querySelector('.item-id');
      if (!itemId) return;
      itemId.innerHTML = `${idx + 1}`;
    });
  }

  private onProductChange(product: CartProduct) {
    if (product.amount == 0) {
      this.products.splice(this.products.indexOf(product), 1);
      product.destroy();
    }

    this.subscribers.forEach((callback) => {
      callback();
    });

    this.updateProductIndexes();
  }
}
