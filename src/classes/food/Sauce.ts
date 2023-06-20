import { Product } from "./Product.js";

export class Sauce extends Product {
    constructor(
        name: string,
        ingredients: string[],
        price: number,
        private quantityInMililiters: number,
        private isSpicy: boolean
    ) {
        super(name, price, ingredients);
    }

    getName(): string {
        return super.name;
    }
}