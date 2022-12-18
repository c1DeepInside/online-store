import './styles/style.scss';
import { renderGoods } from './scripts/render';
import { products } from "../../data/products";
import { filterProducts } from './scripts/filter';
import { FilterData } from './scripts/interfaces';
import { Product } from '../../data/interfaces';
import { minMax } from './scripts/filter-price';

renderGoods(products);

//const filterData: FilterData = renderFilters(products);
//const filteredProducts = filterProducts(filterData, products);
//renderGoods(filteredProducts);
renderGoods(products);
minMax();