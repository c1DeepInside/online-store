import { products } from "../../data/products";

const STORAGE_KEY = 'cartItems';

export const cartItems = {
    _cartItems: JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as {
        [productId: number]: number
    },
    _update() {
        this._cartItems = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    },
    has(productId: number): boolean {
        this._update();
        return productId in this._cartItems;
    },
    get(productId: number): number {
        this._update();
        return this._cartItems[productId] || 0;
    },
    set(productId: number, value: number) {
        this._update();
        this._cartItems[productId] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._cartItems));
    },
    del(productId: number) {
        this._update();
        delete this._cartItems[productId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._cartItems));
    },
    totalPrice(): number {
        this._update();
        return products.reduce((acc, product) => {
            if (this.has(product.id)) {
                return acc + product.price * this.get(product.id);
            }

            return acc;
        }, 0);
    },
    totalCount(): number {
        this._update();
        return Object.values(this._cartItems)
            .reduce((acc, count) =>  acc + count, 0)
    }
}

export function updateCartSummary() {
    const totalProducts = document.querySelector('.total_products')!;
    const totalCost = document.querySelector('.total_cost')!;

    totalProducts.innerHTML = `${cartItems.totalCount()}`;
    totalCost.innerHTML = `${cartItems.totalPrice()}₽`
}