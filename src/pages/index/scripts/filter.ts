import { Product } from "../../../data/interfaces";
import { FilterData } from "./interfaces";

export function filterProducts(filterData: FilterData, products: Product[]): Product[] {
    return products.filter((product) => {
        if (product.price < filterData.price.min) {
            return false;
        }

        if (product.price > filterData.price.max) {
            return false;
        }

        if (filterData.categories.length !== 0) {
            if (!filterData.categories.includes(product.category)) {
                return false;
            }
        }

        return true;
    })
}