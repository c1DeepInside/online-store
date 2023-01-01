export interface FilterData {
    price: {
        min: number;
        max: number;
    };
    categories: string[];
    stock: {
        min: number;
        max: number;
    };
    brand: string[];
    search: string;
    view: string;
    sorting: string;
    getParams(): string;
    setParams(params: string): void;
    reset(): void;
}

export type RangeOptions = {
    fromSilderId: string,
    toSliderId: string,
    fromValueId: string,
    toValueId: string
  }