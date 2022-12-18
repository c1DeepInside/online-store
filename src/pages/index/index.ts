import './styles/style.scss';
import { renderGoods } from './scripts/render';
import { products } from "../../data/products";
import { renderFilters } from './scripts/renderFilters';
import { showFilters } from './scripts/showFilters';

renderGoods(products);
showFilters(products);
renderFilters();