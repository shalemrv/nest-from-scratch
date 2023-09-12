import { Product } from "./product.model";

export type ProductStorage = {
    nextID: number,
    list: Product[]
};

export function isProductStorage(obj: any): obj is ProductStorage {
    return 'nextID' in obj && 'list' in obj;
}