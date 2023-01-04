import { Product } from '../../../data/interfaces';
import { FilterData } from './interfaces';

export function filterProducts(filterData: FilterData, products: Product[]): Product[] {
  return products.filter((product) => {
    if (product.price < filterData.price.min) {
      return false;
    }

    if (product.price > filterData.price.max) {
      return false;
    }

    if (product.stock < filterData.stock.min) {
      return false;
    }

    if (product.stock > filterData.stock.max) {
      return false;
    }

    if (filterData.categories.length !== 0) {
      if (!filterData.categories.includes(product.category)) {
        return false;
      }
    }

    if (filterData.brand.length !== 0) {
      if (!filterData.brand.includes(product.brand)) {
        return false;
      }
    }

    if (
      filterData.search !== '' &&
      !product.title.toLowerCase().includes(filterData.search.toLowerCase()) &&
      !product.brand.toLowerCase().includes(filterData.search.toLowerCase()) &&
      !product.description.toLowerCase().includes(filterData.search.toLowerCase()) &&
      !product.price.toString().includes(filterData.search.toString()) &&
      !product.stock.toString().includes(filterData.search.toString())
    ) {
      return false;
    }

    return true;
  });
}
