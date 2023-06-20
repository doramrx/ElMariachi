import { Product } from "../food/Product.js";

export interface FoodComponent {
    getItem(): Product[] | Product;
}
