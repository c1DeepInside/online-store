export interface FilterData {
    price: {
        min: number;
        max: number;
    };
    categories: string[];
    inStock: {
        min: number;
        max: number;
    };
    brand: string[];
}

export type RangeOptions = {
    fromSilderId: string,
    toSliderId: string,
    fromValueId: string,
    toValueId: string
  }