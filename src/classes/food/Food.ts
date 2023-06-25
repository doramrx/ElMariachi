import { Product } from "./Product.js";

export abstract class Food extends Product {
    constructor(
        name: string,
        private protein: string,
        ingredients: string[],
        price: number,
        imgUrl: string
    ) {
        super(name, price, ingredients, imgUrl);
    }

    addIngredient(ingredient: string) {
        super.ingredients.push(ingredient);
    }

    removeIngredient(index: number) {
        super.ingredients.splice(index, 1);
    }
}
