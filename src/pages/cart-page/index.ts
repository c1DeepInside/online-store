import { products } from '../../data/products';
import { renderCart } from './scripts/renderCart';
import { showModal } from './scripts/showModal';
import './styles/style.scss';

showModal();
renderCart(products);