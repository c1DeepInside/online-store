import './styles/style.scss';
import { renderGoods } from './scripts/render';
import { products } from "../../data/products";
import { filterProducts } from './scripts/filter';
import { FilterData } from './scripts/interfaces';

//const filterData: FilterData = renderFilters(products);
//const filteredProducts = filterProducts(filterData, products);
//renderGoods(filteredProducts);
renderGoods(products);