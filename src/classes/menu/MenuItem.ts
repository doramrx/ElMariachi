import { Product } from "../food/Product.js";
import { FoodComponent } from "./FoodComponent.js";

export class MenuItem implements FoodComponent {
    constructor(private food: Product) {}

    getItem(): Product {
        return this.food;
    }
}
