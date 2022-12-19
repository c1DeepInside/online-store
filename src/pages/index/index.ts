import './styles/style.scss';
import { renderGoods } from './scripts/render';
import { products } from "../../data/products";
import { renderFilters } from './scripts/renderFilters';
import { showFilters } from './scripts/showFilters';
import { sort } from './scripts/sort';

sort();
renderGoods(products);
showFilters(products);
renderFilters({ fromSilderId: '#fromInput', toSliderId: '#toInput', fromValueId: '#from-Slider', toValueId: '#to-Slider' });
renderFilters({ fromSilderId: '#fromInputStock', toSliderId: '#toInputStock', fromValueId: '#from-SliderStock', toValueId: '#to-SliderStock' });
