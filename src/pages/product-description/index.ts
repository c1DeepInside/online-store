import { products } from '../../data/products';
import { renderProduct } from './scripts/renderProduct';
import './styles/style.scss';

const pathname: string[] = window.location.pathname.split('/');
const productId: number = +pathname[pathname.length - 1] - 1;

if (products[productId] === undefined) {
    const description: HTMLDivElement = document.querySelector('.description__inner')!;
    description.innerHTML = `Product number ${productId + 1} not found`;
    description.classList.add('not-found');
} else {
    renderProduct(products[productId]);
}
