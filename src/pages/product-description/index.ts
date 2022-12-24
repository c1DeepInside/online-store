import { products } from '../../data/products';
import { addToCartDes } from './scripts/addToCartDes';
import { renderProduct } from './scripts/renderProduct';
import { renderRouting } from './scripts/renderRout';
import './styles/style.scss';

const pathname: string[] = window.location.pathname.split('/');
const productId: number = +pathname[pathname.length - 1] - 1;

if (products[productId] === undefined) {
    const description: HTMLDivElement = document.querySelector('.description__inner')!;
    description.innerHTML = `Product number ${productId + 1} not found`;
    description.classList.add('not-found');
} else {
    renderRouting(products[productId]);
    renderProduct(products[productId]);
}


addToCartDes();