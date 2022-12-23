import { products } from '../../data/products';
import { renderProduct } from './scripts/renderProduct';
import './styles/style.scss';

const pathname: string[] = window.location.pathname.split('/');
const productId: number = +pathname[pathname.length-1] - 1;

renderProduct(products[productId]);