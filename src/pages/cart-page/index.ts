import { products } from '../../data/products';
import { renderCart } from './scripts/renderCart';
import { showModal } from './scripts/showModal';
import { validation } from './scripts/validation';
import './styles/style.scss';

showModal();
renderCart(products);
validation();