import './styles/style.scss';
import { products } from "../../data/products";
import { renderGoods } from './scripts/render';
import { Product } from '../../data/interfaces';
import { minMax } from './scripts/filter-price';

renderGoods(products);

minMax();