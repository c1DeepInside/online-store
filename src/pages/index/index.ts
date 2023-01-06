import './styles/style.scss';
import { products } from '../../data/products';
import { renderFilters } from './scripts/renderFilters';
import { showFilters } from './scripts/showFilters';
import { sortProducts } from './scripts/sortProducts';
import { updateCartSummary } from '../cart-page/utils';

updateCartSummary();

showFilters(products);
sortProducts();
renderFilters([
  { fromSilderId: '#fromInput', toSliderId: '#toInput', fromValueId: '#from-Slider', toValueId: '#to-Slider' },
  {
    fromSilderId: '#fromInputStock',
    toSliderId: '#toInputStock',
    fromValueId: '#from-SliderStock',
    toValueId: '#to-SliderStock',
  },
]);

console.log('300/300 All tasks are completed! \nPromo codes: rs, epm.');
