import './styles/style.scss';
import { products } from "../../data/products";
import { renderFilters } from './scripts/renderFilters';
import { showFilters } from './scripts/showFilters';
import { sortProducts } from './scripts/sortProducts';
import { addToCard } from './scripts/addToCart';

sortProducts();
showFilters(products);
renderFilters([{ fromSilderId: '#fromInput', toSliderId: '#toInput', fromValueId: '#from-Slider', toValueId: '#to-Slider' },
{ fromSilderId: '#fromInputStock', toSliderId: '#toInputStock', fromValueId: '#from-SliderStock', toValueId: '#to-SliderStock' }]);

addToCard();
