import { products } from '../../data/products';
import { calculateCart } from '../index/scripts/addToCart';
import { renderCart } from './scripts/renderCart';
import { showModal } from './scripts/showModal';
import './styles/style.scss';

calculateCart();
showModal();
renderCart(products);