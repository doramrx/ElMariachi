import { Product } from "./Product.js";

export class Sauce extends Product {
    constructor(
        name: string,
        ingredients: string[],
        price: number,
        private quantityInMililiters: number,
        private isSpicy: boolean,
        imgUrl: string
    ) {
        super(name, price, ingredients, imgUrl);
    }
}